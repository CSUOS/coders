package main

import (
	"coders/api"
	_ "coders/docs"
	"fmt"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @Title Coders API
// @Version 1.0
// @Description Coders API version 1.0

// @Host localhost:8080
// @BasePath /
func main() {
	app := gin.Default()
	app.GET("/ping", api.PingExample)
	app.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	fmt.Println("Server is running on :8080. try http://localhost:8080/ping")
	fmt.Println("Swagger docs created in http://localhost:8080/swagger/index.html")
	app.Run()
}
