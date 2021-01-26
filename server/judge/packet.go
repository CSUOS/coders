package judge

import (
	"bytes"
	"compress/zlib"
	"encoding/binary"
	"encoding/json"
	"io/ioutil"
	"net"
	"fmt"
)

func SendPacket(data interface{}, conn net.Conn) bool {
	jsonStr, err := json.Marshal(data)
	if err != nil {
		fmt.Println("json.Marshal:", err)
		return false;
	}

	var buffer bytes.Buffer
	z := zlib.NewWriter(&buffer)
	z.Write([]byte(jsonStr))
	z.Close()
	compressed := buffer.Bytes()
	sizeBuffer := make([]byte, 4)
	binary.BigEndian.PutUint32(sizeBuffer, uint32(len(compressed)))
	_, err = conn.Write(sizeBuffer)
	if err != nil {
		fmt.Println("conn.Write:", err)
		return false;
	}

	_, err = conn.Write(compressed)
	if err != nil {
		fmt.Println("conn.Write:", err)
		return false;
	}

	fmt.Println("Wrote", len(sizeBuffer) + len(compressed), "bytes!")

	return true;
}

func ReceivePacket(conn net.Conn) map[string]interface{} {
	sizeBuffer := make([]byte, 4)
	_, err := conn.Read(sizeBuffer)

	if err != nil {
		fmt.Println("conn.Read:", err)
		return nil;
	}

	size := binary.BigEndian.Uint32(sizeBuffer)
	fmt.Println("Will receive", size, "bytes...")

	buffer := make([]byte, size)
	count, err := conn.Read(buffer)
	fmt.Println("Received", count, "bytes!")

	if err != nil {
		fmt.Println("conn.Read:", err)
		return nil;
	}

	if 0 < count {
		decoded := DecodePacket(buffer);
		if decoded == nil {
			fmt.Println("Failed to DecodePacket")
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
		fmt.Println("zlib.NewReader:", err)
		return nil
	}

	defer z.Close()
	decompressed, err := ioutil.ReadAll(z)
	if (err != nil) {
		fmt.Println("ioutil.ReadAll:", err)
		return nil
	}

	var parsed map[string]interface{}
	json.Unmarshal(decompressed, &parsed)
	return parsed
}