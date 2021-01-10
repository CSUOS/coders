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
// @Summary List Submissions
// @Description get Submissions
// @Tags Submissions
// @Accept  json
// @Produce  json
// @Success 200 {array} model.Submission
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /submissions [get]
func ListSubmissions(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	Submissions, err := model.SubmissionsAll(db)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
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
	db := ctx.MustGet("db").(*gorm.DB)

	var req model.EditSubmission
	if err := ctx.ShouldBindJSON(&req); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	Submission := model.Submission{
		MemberID:     req.MemberID,
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
// @Description Delete by Submission ID
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
