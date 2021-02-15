package controller

import (
	"coders/httputil"
	"coders/model"
	"errors"
	"time"

	"net/http"
	"strconv"

	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
)

// ListPComments godc
// @Summary List PComments
// @Description get problem comments by problem id
// @Tags PComments
// @Accept json
// @Produce json
// @Param  id path int true "Problem ID" Format(int64)
// @Success 200 {array} model.PComment
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /pcomments/{id} [get]
func ListPComments(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	problemIdStr := ctx.Param("id")
	problemId, err := strconv.Atoi(problemIdStr)

	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	pcomments, err := model.PCommentsByProblemID(db, problemId)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, pcomments)
}

// AddPComment godoc
// @Summary Add a Problem Comment
// @Description add by json PComment
// @Tags PComments
// @Accept  json
// @Produce  json
// @Param Member body model.EditPComment true "Add PComment"
// @Success 200 {object} model.PComment
// @Failure 400 {object} httputil.HTTPError
// @Failure 401 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /pcomments [post]
func AddPComment(ctx *gin.Context) {
	// 로그인되어있는지 확인
	claims, err := ParseValidAuthToken(ctx.Request)
	if err != nil {
		// 로그인되어있지 않다면 401 반환
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	db := ctx.MustGet("db").(*gorm.DB)
	requesterId := int(claims["id"].(float64))

	var req model.EditPComment
	if err := ctx.ShouldBindJSON(&req); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	if err := req.PCommentValidation(); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	_, err = model.MemberOne(db, requesterId)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, errors.New("There's no member which matches with current logged-in session."))
		return
	}

	_, err = model.ProblemOne(db, req.ProblemID)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, errors.New("There's no problem which matches with the request."))
		return
	}

	pcomment := model.PComment{
		Text:      req.Text,
		CreatedAt: time.Now(),
		Edited:    req.Edited,
		Deleted:   req.Deleted,
		MemberID:  requesterId,
		ProblemID: req.ProblemID,
	}
	result, err := model.PCommentInsert(db, pcomment)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	ctx.JSON(http.StatusOK, result)
}

// UpdatePComment godoc
// @Summary Update a Problem Comment
// @Description Update by json PComment
// @Tags PComments
// @Accept  json
// @Produce  json
// @Param  id path int true "PComment ID"
// @Param  PComment body model.EditPComment true "Update PComment"
// @Success 200 {object} model.PComment
// @Failure 400 {object} httputil.HTTPError
// @Failure 401 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /pcomments/{id} [patch]
func UpdatePComment(ctx *gin.Context) {
	// 로그인되어있는지 확인
	claims, err := ParseValidAuthToken(ctx.Request)
	if err != nil {
		// 로그인되어있지 않다면 401 반환
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	db := ctx.MustGet("db").(*gorm.DB)
	commentIdStr := ctx.Param("id")
	commentId, err := strconv.Atoi(commentIdStr)

	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	comment, err := model.PCommentOne(db, commentId)
	requesterId := int(claims["id"].(float64))

	// 댓글의 작성자와 수정을 요청한 유저가 동일한 사람인지 확인
	if comment.MemberID != requesterId {
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	var req model.EditPComment
	if err := ctx.ShouldBindJSON(&req); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	pcomment := model.PComment{
		ID:        commentId,
		MemberID:  req.MemberID,
		ProblemID: req.ProblemID,
		Text:      req.Text,
		Edited:    req.Edited,
		Deleted:   req.Deleted,
	}
	result, err := model.PCommentUpdate(db, pcomment)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, result)
}

// DeletePComment godoc
// @Summary Delete a problem comment
// @Description Delete by PComment ID
// @Tags PComments
// @Accept  json
// @Produce  json
// @Param  id path int true "PComment ID" Format(int64)
// @Success 204 {object} model.PComment
// @Failure 400 {object} httputil.HTTPError
// @Failure 401 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /pcomments/{id} [delete]
func DeletePComment(ctx *gin.Context) {
	// 로그인되어있는지 확인
	claims, err := ParseValidAuthToken(ctx.Request)
	if err != nil {
		// 로그인되어있지 않다면 401 반환
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	db := ctx.MustGet("db").(*gorm.DB)
	commentIdStr := ctx.Param("id")
	commentId, err := strconv.Atoi(commentIdStr)

	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	comment, err := model.PCommentOne(db, commentId)
	requesterId := int(claims["id"].(float64))

	// 댓글의 작성자와 삭제를 요청한 유저가 동일한 사람인지 확인
	if comment.MemberID != requesterId {
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	err = model.PCommentDelete(db, commentId)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{})
}
