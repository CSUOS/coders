package api

import (
	"coders/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

// PingExample godoc
// @Summary ping example
// @Description do ping
// @Tags example
// @Accept json
// @Produce json
// @Success 200 {object} model.Ping
// @Failure 400 {string} string "error"
// @Failure 404 {string} string "not found error"
// @Failure 500 {string} string "internal server error"
// @Router /ping [get]
func PingExample(c *gin.Context) {
	c.JSON(http.StatusOK, model.Ping{Ping: "pong"})
}
