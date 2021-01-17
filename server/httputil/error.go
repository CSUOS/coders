package httputil

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func CheckError(ctx *gin.Context, err error){
	if err != nil {
		Error(ctx, http.StatusBadRequest, err)
		return
	}
}

// Error example
func Error(ctx *gin.Context, status int, err error) {
	er := HTTPError{
		Code:    status,
		Message: err.Error(),
	}
	ctx.JSON(status, er)
}

// HTTPError example
type HTTPError struct {
	Code    int    `json:"code" example:"400"`
	Message string `json:"message" example:"status bad request"`
}
