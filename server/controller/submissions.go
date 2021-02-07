

package controller

import (
	"coders/httputil"
	"coders/model"

	"net/http"
	"strconv"

	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
)

// ListSubmissions godoc
// @Summary 조건에 맞는 submission 리스트를 반환한다.
// @Description query parameter 는 필수적이지 않으므로, 몇개만 선택해서 사용할 수 있으며, 만약 아무것도 없다면 모든 submission 리스트를 보여준다.
// @Tags Submissions
// @Accept  json
// @Produce  json
// @Param problem query int false "problem ID"
// @Param member query int false "member ID"
// @Param language query string false "language"
// @Param result query string false "result"
// @Success 200 {array} model.Submission
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /submissions [get]
func ListSubmissions(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	var pid, mid int
	var err error
	if ctx.Query("problem") != "" {
		pid, err = strconv.Atoi(ctx.Query("problem"))
		httputil.CheckError(ctx, err)
	}
	if ctx.Query("member") != "" {
		mid, err = strconv.Atoi(ctx.Query("member"))
		httputil.CheckError(ctx, err)
	}

	param := model.QuerySubmission{
		ProblemID:	pid,
		MemberID:	mid,
		Language:	ctx.Query("language"),
		Result:		ctx.Query("result"),
	}

	Submissions, err := model.SubmissionsQuery(db, param)
	httputil.CheckError(ctx, err)

	ctx.JSON(http.StatusOK, Submissions)
}

// ShowSubmission godoc
// @Summary Show an Submission
// @Description get string by ID
// @Tags Submissions
// @Accept  json
// @Produce  json
// @Param id path int true "Submission ID"
// @Success 200 {object} model.Submission
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /submissions/{id} [get]
func ShowSubmission(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	memberID := ctx.Param("id")
	aid, err := strconv.Atoi(memberID)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	Submission, err := model.SubmissionOne(db, aid)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, Submission)
}

// AddSubmission godoc
// @Summary Add an Submission
// @Description add by json Submission
// @Tags Submissions
// @Accept  json
// @Produce  json
// @Param Submission body model.EditSubmission true "Add Submission"
// @Success 200 {object} model.Submission
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /submissions [post]
func AddSubmission(ctx *gin.Context) {
	// 로그인되어있는지 확인
	claims, err := ParseValidAuthToken(ctx.Request)
	if err != nil {
		// 로그인되어있지 않다면 401 반환
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	db := ctx.MustGet("db").(*gorm.DB)
	requesterId := int(claims["id"].(float64))

	var req model.EditSubmission
	if err := ctx.ShouldBindJSON(&req); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	Submission := model.Submission{
		MemberID:     requesterId,
		ProblemID:    req.ProblemID,
		Language:     req.Language,
		Source:       req.Source,
		TimeLimit:    req.TimeLimit,
		MemoryLimit:  req.MemoryLimit,
		ShortCircuit: req.ShortCircuit,
		Meta:         req.Meta,
	}
	result, err := model.SubmissionInsert(db, Submission)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	ctx.JSON(http.StatusOK, result)
}

// DeleteSubmission godoc
// @Summary Delete an Submission
// @Description 제출기록 삭제기능은 다른 온라인저지들도 지원하지 않기때문에, 개발용으로만 남겨두었습니다. 따라서 멤버 아이디를 쿠키에서 가져오지 않고도 삭제가 가능합니다.
// @Tags Submissions
// @Accept  json
// @Produce  json
// @Param  id path int true "Submission ID" Format(int64)
// @Success 204 {object} model.Submission
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /submissions/{id} [delete]
func DeleteSubmission(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	id := ctx.Param("id")
	aid, err := strconv.Atoi(id)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	err = model.SubmissionDelete(db, aid)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusNoContent, gin.H{})
}
