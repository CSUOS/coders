package controller

import (
	"coders/httputil"
	"coders/model"

	"gorm.io/gorm"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// ListMembers godoc
// @Summary List Members
// @Description get Members
// @Tags Members
// @Accept  json
// @Produce  json
// @Success 200 {array} model.Member
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /members [get]
func ListMembers(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	members, err := model.MembersAll(db)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, members)
}

// ShowMember godoc
// @Summary Show an Member
// @Description get string by ID
// @Tags Members
// @Accept  json
// @Produce  json
// @Param id path int true "Member ID"
// @Success 200 {object} model.Member
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /members/{id} [get]
func ShowMember(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	id := ctx.Param("id")
	aid, err := strconv.Atoi(id)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	member, err := model.MemberOne(db, aid)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, member)
}

// AddMember godoc
// @Summary Add an Member
// @Description add by json Member
// @Tags Members
// @Accept  json
// @Produce  json
// @Param Member body model.EditMember true "Add Member"
// @Success 200 {object} model.Member
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /members [post]
func AddMember(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)

	var req model.EditMember
	if err := ctx.ShouldBindJSON(&req); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	if err := req.Validation(); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	member := model.Member{
		Name: req.Name,
		Intro: req.Intro,
	}
	result, err := model.Insert(db, member)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	ctx.JSON(http.StatusOK, result)
}


// UpdateMember godoc
// @Summary Update an Member
// @Description Update by json Member
// @Tags Members
// @Accept  json
// @Produce  json
// @Param  id path int true "Member ID"
// @Param  Member body model.EditMember true "Update Member"
// @Success 200 {object} model.Member
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /members/{id} [patch]
func UpdateMember(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	id := ctx.Param("id")
	aid, err := strconv.Atoi(id)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	var req model.EditMember
	if err := ctx.ShouldBindJSON(&req); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	member := model.Member{
		ID:   aid,
		Name: req.Name,
		Intro: req.Intro,
	}
	result, err := model.Update(db, member)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, result)
}

// DeleteMember godoc
// @Summary Delete an Member
// @Description Delete by Member ID
// @Tags Members
// @Accept  json
// @Produce  json
// @Param  id path int true "Member ID" Format(int64)
// @Success 204 {object} model.Member
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /members/{id} [delete]
func DeleteMember(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	id := ctx.Param("id")
	aid, err := strconv.Atoi(id)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	err = model.Delete(db, aid)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusNoContent, gin.H{})
}