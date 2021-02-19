package judge

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net"
	"time"
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
	fmt.Println("Sending ping...")
	req := PingRequest {
		Name: "ping",
		When: time.Now().String(),
	}

	if SendPacket(req, conn) {
		fmt.Println("Sent a ping packet. Waiting for a response...")
		response := ReceivePacket(conn)
		fmt.Println("Got Response!")
		fmt.Println()
		jsonBytes, _ := json.MarshalIndent(response, "", "  ")
		fmt.Println(string(jsonBytes))
	} else {
		fmt.Println("Couldn't send a packet... Closing connection...")
		conn.Close()
		conn = nil
	}

	return conn
}

func GetCurrentSubmission(conn net.Conn) net.Conn {
	fmt.Println("Sending a packet...")
	req := BaseResponse {
		Name: "get-current-submission",
	}

	if SendPacket(req, conn) {
		fmt.Println("Sent a packet. Waiting for a response...")
		response := ReceivePacket(conn)
		fmt.Println("Got Response!")
		fmt.Println()
		jsonBytes, _ := json.MarshalIndent(response, "", "  ")
		fmt.Println(string(jsonBytes))
	} else {
		fmt.Println("Couldn't send a packet... Closing connection...")
		conn.Close()
		conn = nil
	}

	return conn
}

func RequestSubmission(conn net.Conn) net.Conn {
	var req SubmissionRequest
	req.Name = "submission-request"

	fmt.Print("Submission ID: ")
	fmt.Scan(&req.SubmissionID)

	fmt.Print("Problem ID: ")
	fmt.Scan(&req.ProblemID)

	fmt.Print("Language: ")
	fmt.Scan(&req.Language)

	fmt.Print("Path of Source: ")
	var path string
	fmt.Scan(&path)
	source, err := ioutil.ReadFile(path)
	if err != nil {
		fmt.Println("Invalid path... Try again.")
		return conn
	}
	req.Source = string(source)

	req.TimeLimit = 2
	req.MemoryLimit = 1024*1024
	req.ShortCircuit = true
	req.Meta = ""

	fmt.Println("Sending a packet...")

	if SendPacket(req, conn) {
		fmt.Println("Sent a packet. Waiting for a response...")
		for {
			response := ReceivePacket(conn)
			fmt.Println()
			jsonBytes, _ := json.MarshalIndent(response, "", "  ")
			fmt.Println(string(jsonBytes))
			if (response["name"].(string) == "grading-end" ||
				response["name"].(string) == "compile-error" ||
				response["name"].(string) == "internal-error") {
				fmt.Println("Done grading.")
				break
			}
		}
	} else {
		fmt.Println("Couldn't send a packet... Closing connection...")
		conn.Close()
		conn = nil
	}

	return conn
}

func TerminateSubmission(conn net.Conn) net.Conn {
	fmt.Println("Sending a packet...")
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