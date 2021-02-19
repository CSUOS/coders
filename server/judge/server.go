package judge

import (
	"net"
	"fmt"
	"time"
)

func Server(server net.Listener){
	for {
		fmt.Println("Listening:9999...")
		conn, err := server.Accept()
		if err != nil {
			fmt.Println("server.Accept:", err)
			continue
		}
		conn.SetReadDeadline(time.Time{})
		defer conn.Close()
		go handleConnection(conn)
	}
}

func handleConnection(conn net.Conn) {
	fmt.Println("Connected with judge server!")

	if info := HandShake(conn); info != nil {
		fmt.Println("Handshaking is succeeded!")
		fmt.Println(info.Problems)

		// send ping
		for{
			time.Sleep(time.Second * 3)
			SendPing(conn)
		}
		
	} else {
		fmt.Println("Handshaking is failed...")
		return
	}
}