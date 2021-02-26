package judge

import (
	"coders/model"
	"fmt"
	"net"
	"strings"
	"time"

	"gorm.io/gorm"
)

func HandShake(conn net.Conn) *JudgeInfo {
	if conn == nil {
		return nil
	}

	packet := ReceivePacket(conn)
	if (packet == nil) {
		return nil
	}

	var info JudgeInfo

	for key, value := range packet {
		if key == "id" {
			info.ID = value.(string)
		} else if key == "key" {
			info.Key = value.(string)
		} else if key == "problems" {
			probs := value.([]interface{})
			info.Problems = make([]ProblemInfo, len(probs))
			for index, prob := range probs {
				nameModPair := prob.([]interface{})
				info.Problems[index].Name = nameModPair[0].(string)
				info.Problems[index].Modified = nameModPair[1].(float64)
			}
		} else if key == "executors" {
			exes := value.(map[string]interface{})
			info.Executors = make([]string, len(exes))
			i := 0
			for lang, _ := range exes {
				info.Executors[i] = lang
				i += 1
			}
		}
	}

	response := BaseResponse {
		Name: "handshake-success",
	}
	
	if SendPacket(response, conn) {
		return &info
	} else {
		return nil
	}
}

func SendPing(conn net.Conn) net.Conn {
	if conn == nil {
		return nil
	}

	req := PingRequest {
		Name: "ping",
		When: time.Now().String(),
	}

	if SendPacket(req, conn) {
		waiting := true
		success := false

		for waiting {
			response := ReceivePacket(conn)

			if response == nil {
				waiting = false;
				success = false;
			} else if response["name"].(string) == "ping-response" {
				waiting = false
				success = true
			}
		}

		if !success {
			fmt.Println("[JUDGE] Judge is not responding. Closing connection...")
			conn.Close()
			conn = nil
		}
	} else {
		fmt.Println("[JUDGE] Couldn't send a packet... Closing connection...")
		conn.Close()
		conn = nil
	}

	return conn
}

func GetCurrentSubmission(conn net.Conn) net.Conn {
	if conn == nil {
		return nil
	}

	req := BaseResponse {
		Name: "get-current-submission",
	}

	if SendPacket(req, conn) {
		// response := ReceivePacket(conn)
	} else {
		fmt.Println("[JUDGE] Couldn't send a packet... Closing connection...")
		conn.Close()
		conn = nil
	}

	return conn
}

func RequestSubmission(conn net.Conn, sub model.Submission, db *gorm.DB) net.Conn {
	if conn == nil {
		return nil
	}

	var req SubmissionRequest
	req.Name = "submission-request"
	req.SubmissionID = int64(sub.ID)
	req.ProblemID = fmt.Sprint(sub.ProblemID)
	req.Language = sub.Language;
	req.Source = sub.Source;
	req.TimeLimit = int64(sub.TimeLimit)
	req.MemoryLimit = int64(sub.MemoryLimit)
	req.ShortCircuit = sub.ShortCircuit
	req.Meta = ""

	if SendPacket(req, conn) {
		fmt.Printf("[JUDGE] Judging #%v. Waiting for responses...\n", sub.ID)

		maxTime := 0.0
		maxMemory := 0
		sub.JudgedCases = 0

		for sub.IsJudging {
			response := ReceivePacket(conn)

			if response == nil {
				fmt.Println("[JUDGE] Judge is not responding. Closing connection...")
				conn.Close()
				return nil
			}

			// https://github.com/DMOJ/judge-server/blob/master/dmoj/packet.py
			switch response["name"].(string) {
			case "test-case-status":
				if int(response["submission-id"].(float64)) != int(sub.ID) {
					fmt.Println("[JUDGE] submission-id is invalid... Closing connection...")
					conn.Close()
					return nil
				}

				cases := response["cases"].([]interface{})
				for _, eachCase := range cases {
					caseProps := eachCase.(map[string]interface{})
					status := int(caseProps["status"].(float64))
					time := caseProps["time"].(float64)
					memory := int(caseProps["memory"].(float64))
					position := int(caseProps["position"].(float64))
					
					if status == 0 { // AC
						fmt.Printf("[JUDGE] Case #%v: AC\n", position)
						if (maxTime < time) {
							maxTime = time
						}
						if (maxMemory < memory) {
							maxMemory = memory
						}

						sub.JudgedCases += 1
						sub.Result = fmt.Sprintf("채점 중 (%v개 완료)", sub.JudgedCases)
						db.Save(&sub)
					} else if float64(sub.TimeLimit) < time { // TLE
						fmt.Printf("[JUDGE] Case #%v: TLE\n", position)
						sub.IsJudging = false
						sub.Result = "시간 초과"
						db.Save(&sub)
					} else if float64(sub.MemoryUsage) < float64(memory) { // MLE
						fmt.Printf("[JUDGE] Case #%v: MLE\n", position)
						sub.IsJudging = false
						sub.Result = "메모리 초과"
						db.Save(&sub)
					} else if status == 1 { // WA
						fmt.Printf("[JUDGE] Case #%v: WA\n", position)
						sub.IsJudging = false
						sub.Result = "틀렸습니다"
						db.Save(&sub)
					} else if time == 0 { // 이전 TC에서 이미 오답이 나왔으므로 채점을 생략했다는 의미
						fmt.Printf("[JUDGE] Case #%v: -\n", position)
					} else { // RTE
						fmt.Printf("[JUDGE] Case #%v: RTE\n", position)
						sub.IsJudging = false
						sub.Result = "런타임 에러"
						db.Save(&sub)
					}
				}
				break

			case "compile-error":
				fmt.Println("[JUDGE] Compile Error")
				sub.IsJudging = false
				sub.Result = "컴파일 에러"
				sub.CompileMessage = response["log"].(string)
				db.Save(&sub)
				break

			case "compile-message":
				fmt.Println("[JUDGE] Successfully Compiled")
				sub.CompileMessage = response["log"].(string)
				db.Save(&sub)
				break

			case "internal-error":
				fmt.Println("[JUDGE] Internel Error")
				sub.IsJudging = false
				sub.Result = "런타임 에러"
				db.Save(&sub)
				break

			case "grading-end":
				fmt.Println("[JUDGE] Done Grading")
				sub.IsJudging = false
				if strings.Contains(sub.Result, "채점 중") {
					sub.Result = "맞았습니다"
				}
				db.Save(&sub)
				break

			case "submission-terminated":
				fmt.Println("[JUDGE] Terminated")
				sub.IsJudging = false
				sub.Result = "강제 중단됨"
				db.Save(&sub)
				break

			case "ping-response":
			case "grading-begin":
			case "submission-acknowledged":
				// do nothing...
				break

			default:
				sub.IsJudging = false
				sub.Result = "강제 중단됨"
				db.Save(&sub)
				fmt.Printf("[JUDGE] response[\"name\"] == %v is invalid... Closing connection...\n", response["name"].(string))
				conn.Close()
				return nil
			}
		}

		sub.IsJudging = false
		sub.TimeUsage = maxTime
		sub.MemoryUsage = maxMemory
		db.Save(&sub)
	} else {
		fmt.Println("[JUDGE] Couldn't send a packet... Closing connection...")
		conn.Close()
		conn = nil
	}

	return conn
}

func TerminateSubmission(conn net.Conn) net.Conn {
	if conn == nil {
		return nil
	}

	req := BaseResponse {
		Name: "terminate-submission",
	}
	
	if !SendPacket(req, conn) {
		fmt.Println("[JUDGE] Couldn't send a packet... Closing connection...")
		conn.Close()
		conn = nil
	}

	return nil
}

func Disconnect(conn net.Conn) net.Conn {
	if conn == nil {
		return nil
	}

	fmt.Println("[JUDGE] Disconnecting...")
	req := BaseResponse {
		Name: "disconnect",
	}
	SendPacket(req, conn)

	conn.Close()
	return nil
}