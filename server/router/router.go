package router

import (
	c "coders/controller"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func ApplyRoutes(r *gin.Engine) {
	r.Use(sessions.Sessions("session", cookie.NewStore([]byte("secret"))))
	r.GET("/ping", c.PingExample)
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	r.GET("/submitted", c.ListSubmittedProblems)
	r.GET("/rank/problem", c.GetListOfMemberRankedByCountOfProblem)
	r.GET("/rank/submission", c.GetListOfMemberRankedByCountOfSubmission)

	v1 := r.Group("/api/v1")
	{
		members := v1.Group("/members")
		{
			members.GET("", c.ListMembers)
			members.GET(":id", c.ShowMember)
			members.POST("", c.AddMember)
			members.PATCH(":id", c.UpdateMember)
			members.DELETE(":id", c.DeleteMember)
			members.POST("/login", c.Login)
			members.POST("/logout", c.Logout)
		}
		problems := v1.Group("/problems")
		{
			problems.GET("", c.ListProblems)
			problems.GET(":id", c.ShowProblem)
			problems.POST("", c.AddProblem)
			problems.PATCH(":id", c.UpdateProblem)
			problems.DELETE(":id", c.DeleteProblem)
		}
		submissions := v1.Group("/submissions")
		{
			submissions.GET("", c.ListSubmissions)
			submissions.GET(":id", c.ShowSubmission)
			submissions.POST("", c.AddSubmission)
			submissions.DELETE(":id", c.DeleteSubmission)
		}
		pcomments := v1.Group("/pcomments")
		{
			pcomments.GET(":id", c.ListPComments)
			pcomments.POST("", c.AddPComment)
			pcomments.PATCH(":id", c.UpdatePComment)
			pcomments.DELETE(":id", c.DeletePComment)
		}
	}
}
