package router

import (
	c "coders/controller"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func ApplyRoutes(r *gin.Engine) {
	r.GET("/ping", c.PingExample)
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	v1 := r.Group("/api/v1")
	{
		members := v1.Group("/members")
		{
			members.GET(":id", c.ShowMember)
			members.GET("", c.ListMembers)
			members.POST("", c.AddMember)
			members.DELETE(":id", c.DeleteMember)
			members.PATCH(":id", c.UpdateMember)
		}
	}
}
