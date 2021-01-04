package controller

import (
	"coders/httputil"
	"coders/model"

	"gorm.io/gorm"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// ListProblems godoc
// @Summary List Problems
// @Description get Problems
// @Tags Problems
// @Accept  json
// @Produce  json
// @Success 200 {array} model.Problem
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /problems [get]
func ListProblems(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	problems, err := model.ProblemsAll(db)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, problems)
}

// ShowProblem godoc
// @Summary Show an Problem
// @Description get string by ID
// @Tags Problems
// @Accept  json
// @Produce  json
// @Param id path int true "Problem ID"
// @Success 200 {object} model.Problem
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /problems/{id} [get]
func ShowProblem(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	id := ctx.Param("id")
	aid, err := strconv.Atoi(id)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	problem, err := model.ProblemOne(db, aid)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, problem)
}

// AddProblem godoc
// @Summary Add an Problem
// @Description add by json Problem
// @Tags Problems
// @Accept  json
// @Produce  json
// @Param Problem body model.EditProblem true "Add Problem"
// @Success 200 {object} model.Problem
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /problems [post]
func AddProblem(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)

	var req model.EditProblem
	if err := ctx.ShouldBindJSON(&req); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	if err := req.ProblemValidation(); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	problem := model.Problem{
		Title: req.Title,
		Desc: req.Desc,
		TimeLimit: req.TimeLimit,
		MemoryLimit: req.MemoryLimit,
		ShortCircuit: req.ShortCircuit,
	}
	result, err := model.ProblemInsert(db, problem)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	ctx.JSON(http.StatusOK, result)
}

// UpdateProblem godoc
// @Summary Update an Problem
// @Description Update by json Problem
// @Tags Problems
// @Accept  json
// @Produce  json
// @Param  id path int true "Problem ID"
// @Param  Problem body model.EditProblem true "Update Problem"
// @Success 200 {object} model.Problem
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /problems/{id} [patch]
func UpdateProblem(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	id := ctx.Param("id")
	aid, err := strconv.Atoi(id)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	var req model.EditProblem
	if err := ctx.ShouldBindJSON(&req); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	problem := model.Problem{
		ID:   aid,
		Title: req.Title,
		Desc: req.Desc,
		TimeLimit: req.TimeLimit,
		MemoryLimit: req.MemoryLimit,
		ShortCircuit: req.ShortCircuit,
	}
	result, err := model.ProblemUpdate(db, problem)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, result)
}

// DeleteProblem godoc
// @Summary Delete an Problem
// @Description Delete by Problem ID
// @Tags Problems
// @Accept  json
// @Produce  json
// @Param  id path int true "Problem ID" Format(int64)
// @Success 204 {object} model.Problem
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /problems/{id} [delete]
func DeleteProblem(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	id := ctx.Param("id")
	aid, err := strconv.Atoi(id)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	err = model.ProblemDelete(db, aid)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusNoContent, gin.H{})
}