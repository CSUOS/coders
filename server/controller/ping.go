package controller

import (
	"coders/httputil"
	"coders/model"

	"gorm.io/gorm"
	"net/http"

	"github.com/gin-gonic/gin"
)

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
