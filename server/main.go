package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	app := gin.Default()
	app.GET("/", func(c *gin.Context) {
		c.String(200, "hello world")
	})
	fmt.Println("Server is running on http://localhost:8080")
	app.Run()
}
