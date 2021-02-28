package judge

import (
	"coders/model"
	"fmt"
	"net"
	"time"

	"gorm.io/gorm"
)

func FindJudge(db *gorm.DB) {
	server, err := net.Listen("tcp", ":9999")
	if err != nil {
		fmt.Println("[JUDGE] net.Listen:", err)
	}
	defer server.Close()

	for {
		fmt.Println("[JUDGE] Waiting for a judge:9999...")
		conn, err := server.Accept()
		if err != nil {
			fmt.Println("[JUDGE] server.Accept:", err)
			continue
		}
		conn.SetReadDeadline(time.Now().Add(time.Second*10))
		defer conn.Close()
		go handleConnection(conn, db)
	}
}

func handleConnection(conn net.Conn, db *gorm.DB) {
	fmt.Println("[JUDGE] Connected with judge server!")

	if info := HandShake(conn); info != nil {
		fmt.Println("[JUDGE] Handshaking is succeeded!")

		// Send ping repeatedly
		// and process submissions
		for conn != nil {
			sub, err := model.SubmissionJudging(db)
			if err == nil {
				conn = RequestSubmission(conn, sub, db)
			}
			
			conn = SendPing(conn)
			time.Sleep(time.Second * 3)
		}
		
	} else {
		fmt.Println("[JUDGE] Handshaking is failed...")
		return
	}
}