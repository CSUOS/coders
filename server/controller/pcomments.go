package controller

import (
	"coders/httputil"
	"coders/model"

	"net/http"
	"strconv"

	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
)

// ListPComments godc
// @Summary List PComments
// @Description get problem comments
// @Tags PComments
// @Accept json
// @Produce json
// @Success 200 {array} model.PComment
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /pcomments [get]
func ListPComments(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	pcomments, err := model.PCommentsAll(db)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, pcomments)
}

// ShowPComment godoc
// @Summary Show a Problem Comment
// @Description get string by ID
// @Tags PComments
// @Accept  json
// @Produce  json
// @Param id path int true "PComment ID"
// @Success 200 {object} model.PComment
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /pcomment/{id} [get]
func ShowPComment(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	id := ctx.Param("id")
	aid, err := strconv.Atoi(id)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	pcomment, err := model.PCommentOne(db, aid)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, pcomment)
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
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /pcomment [post]
func AddPComment(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)

	var req model.EditPComment
	if err := ctx.ShouldBindJSON(&req); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	if err := req.PCommentValidation(); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	pcomment := model.PComment{
		Text:    req.Text,
		Edited:  req.Edited,
		Deleted: req.Deleted,
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
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /pcomment/{id} [patch]
func UpdatePComment(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	id := ctx.Param("id")
	aid, err := strconv.Atoi(id)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	var req model.EditPComment
	if err := ctx.ShouldBindJSON(&req); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	pcomment := model.PComment{
		ID:      aid,
		Text:    req.Text,
		Edited:  req.Edited,
		Deleted: req.Deleted,
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
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /pcomment/{id} [delete]
func DeletePComment(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	id := ctx.Param("id")
	aid, err := strconv.Atoi(id)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	err = model.PCommentDelete(db, aid)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusNoContent, gin.H{})
}
