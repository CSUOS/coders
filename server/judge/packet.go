package judge

import (
	"bytes"
	"compress/zlib"
	"encoding/binary"
	"encoding/json"
	"io/ioutil"
	"net"
	"fmt"
	"time"
)

func SendPacket(data interface{}, conn net.Conn) bool {
	if conn == nil {
		return false
	}

	jsonStr, err := json.Marshal(data)
	if err != nil {
		fmt.Println("[JUDGE] json.Marshal:", err)
		return false;
	}

	var buffer bytes.Buffer
	z := zlib.NewWriter(&buffer)
	z.Write([]byte(jsonStr))
	z.Close()
	compressed := buffer.Bytes()
	sizeBuffer := make([]byte, 4)
	binary.BigEndian.PutUint32(sizeBuffer, uint32(len(compressed)))

	conn.SetWriteDeadline(time.Now().Add(time.Second*10))
	_, err = conn.Write(sizeBuffer)

	if err != nil {
		fmt.Println("[JUDGE] conn.Write:", err)
		return false;
	}

	conn.SetWriteDeadline(time.Now().Add(time.Second*10))
	_, err = conn.Write(compressed)

	if err != nil {
		fmt.Println("[JUDGE] conn.Write:", err)
		return false;
	}

	return true;
}

func ReceivePacket(conn net.Conn) map[string]interface{} {
	if conn == nil {
		return nil
	}

	sizeBuffer := make([]byte, 4)

	conn.SetReadDeadline(time.Now().Add(time.Second*10))
	_, err := conn.Read(sizeBuffer)

	if err != nil {
		fmt.Println("[JUDGE] conn.Read:", err)
		return nil;
	}

	size := binary.BigEndian.Uint32(sizeBuffer)
	buffer := make([]byte, size)

	conn.SetReadDeadline(time.Now().Add(time.Second*10))
	count, err := conn.Read(buffer)

	if err != nil {
		fmt.Println("[JUDGE] conn.Read:", err)
		return nil;
	}

	if 0 < count {
		decoded := DecodePacket(buffer);
		if decoded == nil {
			fmt.Println("[JUDGE] Failed to DecodePacket")
			return nil;
		}

		return decoded
	}

	return nil;
}

func DecodePacket(data []byte) map[string]interface{} {
	reader := bytes.NewReader(data)
	z, err := zlib.NewReader(reader)
	if (err != nil) {
		fmt.Println("[JUDGE] zlib.NewReader:", err)
		return nil
	}

	defer z.Close()
	decompressed, err := ioutil.ReadAll(z)
	if (err != nil) {
		fmt.Println("[JUDGE] ioutil.ReadAll:", err)
		return nil
	}

	var parsed map[string]interface{}
	json.Unmarshal(decompressed, &parsed)
	return parsed
}