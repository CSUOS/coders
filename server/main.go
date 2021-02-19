package main

import (
	"coders/database"
	"coders/docs"
	"coders/router"
	"coders/judge"

	"fmt"
	"os"
	"net"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func ErrorCheck(err error) {
	if err != nil {
		panic(err.Error())
	}
}

// @Title Coders API
// @Version 1.0
// @Description Coders API version 1.0
// @BasePath /api/v1
func main() {
	server, err := net.Listen("tcp", ":9999")
	ErrorCheck(err)
	go judge.Server(server)

	// load .env variables
	err = godotenv.Load()
	ErrorCheck(err)
	PORT := os.Getenv("PORT")
	DBCONFIG := os.Getenv("DBCONFIG")
	docs.SwaggerInfo.Host = "localhost:" + PORT //set port in swagger doc

	// create gin router
	app := gin.Default()

	// connect db
	db, err := database.Initialize(DBCONFIG)
	ErrorCheck(err)
	app.Use(database.Inject(db))

	// set router
	router.ApplyRoutes(app)

	// run app
	fmt.Println("--> Server is running on :" + PORT + ". try http://localhost:" + PORT + "/ping")
	fmt.Println("--> Swagger docs created in http://localhost:" + PORT + "/swagger/index.html")
	app.Run(":" + PORT)
}
