package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Ping struct {
	Ping string `json:"ping"`
}

func PingExample(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, Ping{Ping: "pong"})
}
