package main

import (
	"coders/api"
	"coders/database"
	"coders/docs"

	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func ErrorCheck(err error) {
	if err != nil {
		panic(err.Error())
	}
}

// @Title Coders API
// @Version 1.0
// @Description Coders API version 1.0
// @BasePath /
func main() {
	// load .env variables
	err := godotenv.Load()
	ErrorCheck(err)
	PORT := os.Getenv("PORT")
	DBCONFIG := os.Getenv("DBCONFIG")
	docs.SwaggerInfo.Host = "localhost:" + PORT

	app := gin.Default()

	// connect db
	db, err := database.Initialize(DBCONFIG)
	ErrorCheck(err)
	app.Use(database.Inject(db))

	// set router
	app.GET("/ping", api.PingExample)
	app.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	fmt.Println("--> Server is running on :" + PORT + ". try http://localhost:" + PORT + "/ping")
	fmt.Println("--> Swagger docs created in http://localhost:" + PORT + "/swagger/index.html")
	app.Run(":" + PORT)
}
