package judge

import (
	"net"
	"fmt"
	"time"
	"gorm.io/gorm"
)

func FindJudge(db *gorm.DB) {
	server, err := net.Listen("tcp", ":9999")
	if err != nil {
		fmt.Println("net.Listen:", err)
	}
	defer server.Close()

	for {
		fmt.Println("Waiting for a judge:9999...")
		conn, err := server.Accept()
		if err != nil {
			fmt.Println("server.Accept:", err)
			continue
		}
		conn.SetReadDeadline(time.Time{})
		defer conn.Close()
		go handleConnection(conn, db)
	}
}

func handleConnection(conn net.Conn, db *gorm.DB) {
	fmt.Println("Connected with judge server!")

	if info := HandShake(conn); info != nil {
		fmt.Println("Handshaking is succeeded!")
		fmt.Println(info.Problems)

		// Send ping repeatedly
		// and process submissions
		for{

			
			SendPing(conn)
			time.Sleep(time.Second * 3)
		}
		
	} else {
		fmt.Println("Handshaking is failed...")
		return
	}
}