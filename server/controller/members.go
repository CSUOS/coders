package controller

import (
	"coders/httputil"
	"coders/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

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
	id := ctx.Param("id")
	aid, err := strconv.Atoi(id)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	Member, err := model.MemberOne(aid)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, Member)
}

// ListMembers godoc
// @Summary List Members
// @Description get Members
// @Tags Members
// @Accept  json
// @Produce  json
// @Param q query string false "name search by q" Format(email)
// @Success 200 {array} model.Member
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /members [get]
func ListMembers(ctx *gin.Context) {
	q := ctx.Request.URL.Query().Get("q")
	Members, err := model.MembersAll(q)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, Members)
}

// AddMember godoc
// @Summary Add an Member
// @Description add by json Member
// @Tags Members
// @Accept  json
// @Produce  json
// @Param Member body model.AddMember true "Add Member"
// @Success 200 {object} model.Member
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /members [post]
func AddMember(ctx *gin.Context) {
	var addMember model.AddMember
	if err := ctx.ShouldBindJSON(&addMember); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	if err := addMember.Validation(); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	Member := model.Member{
		Name: addMember.Name,
	}
	lastID, err := Member.Insert()
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	Member.ID = lastID
	ctx.JSON(http.StatusOK, Member)
}

// UpdateMember godoc
// @Summary Update an Member
// @Description Update by json Member
// @Tags Members
// @Accept  json
// @Produce  json
// @Param  id path int true "Member ID"
// @Param  Member body model.UpdateMember true "Update Member"
// @Success 200 {object} model.Member
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /members/{id} [patch]
func UpdateMember(ctx *gin.Context) {
	id := ctx.Param("id")
	aid, err := strconv.Atoi(id)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	var updateMember model.UpdateMember
	if err := ctx.ShouldBindJSON(&updateMember); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	Member := model.Member{
		ID:   aid,
		Name: updateMember.Name,
	}
	err = Member.Update()
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, Member)
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
	id := ctx.Param("id")
	aid, err := strconv.Atoi(id)
	if err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}
	err = model.Delete(aid)
	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusNoContent, gin.H{})
}
