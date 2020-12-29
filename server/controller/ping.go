package controller

import (
	"coders/httputil"
	"coders/model"

	"gorm.io/gorm"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetPing godoc
// @Summary get a ping result
// @Description create a ping & get a ping result: separate in real usage
// @Tags Ping
// @Accept  json
// @Produce  json
// @Success 200 {object} model.Ping
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /ping [get]
func PingExample(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	err := model.AddPing(db) //add
	ping, err := model.FirstPing(db) //get
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, ping)
}
