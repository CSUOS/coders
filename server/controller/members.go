package controller

import (
	"coders/httputil"
	"coders/model"

	"errors"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"gorm.io/gorm"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

// ListMembers godoc
// @Summary List Members
// @Description get Members
// @Tags Members
// @Accept  json
// @Produce  json
// @Param name query string false "name"
// @Param page query int false "page"
///@Param limit query int false "limit"
// @Success 200 {array} model.Member
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /members [get]
func ListMembers(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	var name string
	var page int
	var limit int
	var err error
	if ctx.Query("page") != "" {
		page, err = strconv.Atoi(ctx.Query("page"))
		httputil.CheckError(ctx, err)
	}
	if ctx.Query("limit") != "" {
		limit, err = strconv.Atoi(ctx.Query("limit"))
		httputil.CheckError(ctx, err)
	}
	name = ctx.Query("name")

	members, err := model.MembersQuery(db, name, page, limit)

	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, members)
}

// GetListOfMemberRankedByCountOfProblem godoc
// @Summary 사용자의 문제 출제수를 바탕으로 순위를 매긴 멤버 리스트를 반환
// @Description get list of member ranked by count of problem
// @Tags Members
// @Accept  json
// @Produce  json
// @Param page query int false "page"
// @Param limit query int false "limit"
// @Param name query string false "name"
// @Success 200 {object} model.Member
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /rank/problem [get]
func GetListOfMemberRankedByCountOfProblem(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	var page int
	var limit int
	var name string
	var err error
	if ctx.Query("page") != "" {
		page, err = strconv.Atoi(ctx.Query("page"))
		httputil.CheckError(ctx, err)
	}
	if ctx.Query("limit") != "" {
		limit, err = strconv.Atoi(ctx.Query("limit"))
		httputil.CheckError(ctx, err)
	}
	name = ctx.Query("name")

	members, err := model.RankMembersByCountOfProblem(db, page, limit, name)

	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, members)
}

// GetListOfMemberRankedByCountOfSubmission godoc
// @Summary 사용자의 문제 제출 수를 바탕으로 순위를 매긴 멤버 리스트를 반환
// @Description get list of member ranked by count of submissions
// @Tags Members
// @Accept  json
// @Produce  json
// @Param page query int false "page"
// @Param limit query int false "limit"
// @Param name query string false "name"
// @Param result query string false "result"
// @Param language query string false "language"
// @Success 200 {object} model.Member
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /rank/submission [get]
func GetListOfMemberRankedByCountOfSubmission(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	var page, limit int
	var name, result, language string
	var err error
	if ctx.Query("page") != "" {
		page, err = strconv.Atoi(ctx.Query("page"))
		httputil.CheckError(ctx, err)
	}
	if ctx.Query("limit") != "" {
		limit, err = strconv.Atoi(ctx.Query("limit"))
		httputil.CheckError(ctx, err)
	}
	name = ctx.Query("name")
	result = ctx.Query("result")
	language = ctx.Query("language")

	members, err := model.RankMembersByCountOfSubmissions(db, page, limit, name, result, language)

	if err != nil {
		httputil.Error(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, members)
}

// ShowMember godoc
// @Summary 사용자의 회원 정보 가져오기
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
		Name:  req.Name,
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
// @Summary 사용자의 회원 정보 수정하기
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
	// 로그인되어있는지 확인
	claims, err := ParseValidAuthToken(ctx.Request)
	if err != nil {
		// 로그인되어있지 않다면 401 반환
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}
	db := ctx.MustGet("db").(*gorm.DB)
	requesterId := int(claims["id"].(float64))

	var req model.EditMember
	if err := ctx.ShouldBindJSON(&req); err != nil {
		httputil.Error(ctx, http.StatusBadRequest, err)
		return
	}

	member := model.Member{
		ID:    requesterId,
		Name:  req.Name,
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

// Login godoc
// @Summary Request Login
// @Description Request login to RABUMS
// @Tags Members
// @Accept  json
// @Produce  json
// @Param Info body model.LoginRequest true "ID/Password pair to request login"
// @Success 200 {object} model.Member
// @Failure 400 {object} httputil.HTTPError
// @Failure 401 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /members/login [post]
func Login(ctx *gin.Context) {
	var req model.LoginRequest

	if err := ctx.BindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Request body is not valid."})
		return
	}

	if req.ID == "" || req.Password == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "At least one parameter is not valid."})
		return
	}

	if ValidateByRabums(req) {
		// 로그인이 성공하면 JWT 토큰 발급
		secret := GetSecret()
		atClaims := jwt.MapClaims{}
		atClaims["id"] = int(1)
		atClaims["member_rank"] = int(1)
		atClaims["name"] = "홍길동"
		atClaims["intro"] = "안녕하세요!"
		accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)

		signed, err := accessToken.SignedString([]byte(secret))

		if err != nil {
			fmt.Println(err.Error())
			ctx.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		// 토큰의 유효 시간은 1시간
		ctx.SetCookie("access-token", signed, 60*60, "/", "", false, false)
		ctx.JSON(http.StatusOK, atClaims)
		return
	} else {
		// 그 어떤 이유로든 로그인이 실패하면
		// 부가적인 정보 없이 401 반환
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Login is failed for " + req.ID})
		return
	}
}

// GetSecret JWT 토큰을 발행하는데 필요한 secret을 .env에서 가져옴. 없을 경우 경고 메세지를 출력하고 기본값 사용
func GetSecret() string {
	err := godotenv.Load()

	if err != nil {
		fmt.Println("Failed to load '.env'. Create one and set ACCESS_SECRET: " + err.Error())
		return "2kjhv5lk23j4vvl2jk34v5j23vo2jvio3r"
	}

	token, found := os.LookupEnv("ACCESS_SECRET")
	if !found {
		fmt.Println("There's no ACCESS_SECRET in .env: " + err.Error())
		return "2kjhv5lk23j4vvl2jk34v5j23vo2jvio3r"
	}

	return token
}

// ParseValidAuthToken 쿠키에 JWT 토큰이 있는지 확인하고, 그 토큰이 정상적으로 Sign되었는지 확인한 뒤 그 토큰 내 데이터(MapClaims) 반환.
func ParseValidAuthToken(r *http.Request) (jwt.MapClaims, error) {
	tokenCookie, err := r.Cookie("access-token")
	if err != nil {
		return nil, errors.New("There's no valid auth token.")
	}

	token, err := jwt.Parse(tokenCookie.Value, func(token *jwt.Token) (interface{}, error) {
		// token method가 SigningMethodHMAC 인지를 검증함.
		if _, verified := token.Method.(*jwt.SigningMethodHMAC); verified {
			return []byte(GetSecret()), nil
		} else {
			return nil, errors.New("Unexpected signing method: " + token.Header["alg"].(string))
		}
	})

	if err != nil {
		return nil, err
	}

	claims, casted := token.Claims.(jwt.MapClaims)
	if !casted || !token.Valid {
		return nil, errors.New("There's no valid auth token.")
	}

	return claims, nil
}

// ValidateByRabums RABUMS 서버와 통신하여 로그인 요청을 보냄.
func ValidateByRabums(req interface{}) bool {
	// 아직 RABUMS 서버가 활성화되지 않았으므로,
	// 현재는 디버그를 목적으로 모든 요청에 대하여
	// 로그인을 수락하는 것으로 함.
	return true
}

// Logout godoc
// @Summary Request Logout
// @Description Request logout
// @Tags Members
// @Accept  json
// @Produce  json
// @Success 200 {object} model.Member
// @Failure 401 {object} httputil.HTTPError
// @Router /members/logout [post]
func Logout(ctx *gin.Context) {
	// 로그인되어있는지 확인
	claims, err := ParseValidAuthToken(ctx.Request)
	if err != nil {
		// 로그인되어있지 않다면 401 반환
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	ctx.SetCookie("access-token", "", 0, "/", "", false, false)
	ctx.JSON(http.StatusOK, claims)
}
