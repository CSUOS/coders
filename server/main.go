package main

import (
	"coders/api"
	"coders/docs"
	_ "coders/docs"

	"database/sql"
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

func PingDB(db *sql.DB) {
	err := db.Ping()
	ErrorCheck(err)
	fmt.Println("--> Database is connected")
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

	// connect db
	db, err := sql.Open("mysql", DBCONFIG)
	ErrorCheck(err)
	PingDB(db)

	// set router
	app := gin.Default()
	app.GET("/ping", api.PingExample)
	app.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	fmt.Println("--> Server is running on :" + PORT + ". try http://localhost:" + PORT + "/ping")
	fmt.Println("--> Swagger docs created in http://localhost:" + PORT + "/swagger/index.html")
	app.Run(":" + PORT)
}
