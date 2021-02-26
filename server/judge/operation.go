package judge

import (
	"fmt"
	"net"
	"time"
	"coders/model"
	"gorm.io/gorm"
)

func HandShake(conn net.Conn) *JudgeInfo {
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
	req := PingRequest {
		Name: "ping",
		When: time.Now().String(),
	}

	if SendPacket(req, conn) {
		// response := ReceivePacket(conn)
	} else {
		fmt.Println("Couldn't send a packet... Closing connection...")
		conn.Close()
		conn = nil
	}

	return conn
}

func GetCurrentSubmission(conn net.Conn) net.Conn {
	req := BaseResponse {
		Name: "get-current-submission",
	}

	if SendPacket(req, conn) {
		// response := ReceivePacket(conn)
	} else {
		fmt.Println("Couldn't send a packet... Closing connection...")
		conn.Close()
		conn = nil
	}

	return conn
}

func RequestSubmission(conn net.Conn, sub model.Submission, db *gorm.DB) net.Conn {
	var req SubmissionRequest
	req.Name = "submission-request"
	req.SubmissionID = int64(sub.ID)
	req.ProblemID = fmt.Sprint(sub.ProblemID)
	req.Language = sub.Language;
	req.Source = sub.Language;
	req.TimeLimit = int64(sub.TimeLimit)
	req.MemoryLimit = int64(sub.MemoryLimit)
	req.ShortCircuit = true
	req.Meta = ""

	if SendPacket(req, conn) {
		fmt.Printf("Judging #%v. Waiting for responses...\n", sub.ID)

		totalCases := 0
		maxTime := 0.0
		maxMemory := 0

		for {
			response := ReceivePacket(conn)

			if response == nil {
				fmt.Println("Judge is not responding. Halt judging...")
				break
			}

			// https://github.com/DMOJ/judge-server/blob/master/dmoj/packet.py
			switch response["name"].(string) {
			case "test-case-status":
				if response["submission-id"].(int) != int(sub.ID) {
					break;
				}

				cases := response["cases"].([]map[string]interface{})
				for _, eachCase := range cases {
					status := eachCase["status"].(int)
					time := eachCase["time"].(float64)
					memory := eachCase["memory"].(int)
					
					if status == 0 { // AC
						if (maxTime < time) {
							maxTime = time
						}
						if (maxMemory < memory) {
							maxMemory = memory
						}
						totalCases += 1
					} else if float64(sub.TimeLimit) < time { // TLE

					}
				}

				break

			case "compile-error":
				break
			case "compile-message":
				break
			case "internal-error":
				break
			case "grading-begin":
				break
			case "grading-end":
				break
			case "batch-begin":
				break
			case "batch-end":
				break
			case "submission-terminated":
				break
			case "submission-acknowledged":
				break
			default:
				break
			}
		}

		fmt.Println("Done grading.")
	} else {
		fmt.Println("Couldn't send a packet... Closing connection...")
		conn.Close()
		conn = nil
	}

	return conn
}

func TerminateSubmission(conn net.Conn) net.Conn {
	req := BaseResponse {
		Name: "terminate-submission",
	}
	
	if !SendPacket(req, conn) {
		fmt.Println("Couldn't send a packet... Closing connection...")
		conn.Close()
		conn = nil
	}

	return nil
}

func Disconnect(conn net.Conn) net.Conn {
	fmt.Println("Disconnecting...")
	req := BaseResponse {
		Name: "disconnect",
	}
	SendPacket(req, conn)

	conn.Close()
	return nil
}