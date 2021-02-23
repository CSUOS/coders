package model

import (
	"errors"

	"gorm.io/gorm"
)

// Member example
type Member struct {
	ID         int    `json:"id" example:"1" format:"int64" gorm:"autoIncrement"`
	Name       string `json:"name" example:"Member name"`
	MemberRank int    `json:"member_rank" example:"1" formant:"int64"`
	Intro      string `json:"intro" example:"Introduction which users set"`
}

// EditMember adds or updates member record
type EditMember struct {
	Name  string `json:"name" example:"Member name"`
	Intro string `json:"intro" example:"Description which users set"`
}

// LoginRequest tries to login
type LoginRequest struct {
	ID       string `json:"id" example:"ID to login"`
	Password string `json:"password" example:"Password to login"`
}

type ResultMember struct {
	MemberID int
	Name     string
	Intro    string
	Total    int
}

//  example
var (
	ErrNameInvalid  = errors.New("name is empty")
	ErrLoginInvalid = errors.New("invalid login request")
)

// Validation example
func (m EditMember) Validation() error {
	switch {
	case len(m.Name) == 0:
		return ErrNameInvalid
	default:
		return nil
	}
}

func (r LoginRequest) Validation() error {
	if len(r.ID) == 0 || len(r.Password) == 0 {
		return ErrLoginInvalid
	}
	return nil
}

// MembersQuery example
func MembersQuery(db *gorm.DB, name string, page int, limit int) ([]Member, error) {
	var members []Member
	var err error
	db = db.Model(&Member{})

	if name != "" {
		db = db.Where("name LIKE ?", "%"+name+"%")
	}

	err = db.Limit(limit).Offset(limit * (page - 1)).Find(&members).Error

	return members, err
}

func RankMembersByCountOfProblem(db *gorm.DB, limit int, page int, name string) ([]ResultMember, error) {
	var members []ResultMember
	var err error

	db = db.Model(&Member{})

	if name != "" {
		db = db.Where("members.name LIKE ?", "%"+name+"%")
	}

	err = db.Order("total desc").Limit(limit).Offset(limit*(page-1)).Select("members.id as member_id", "members.name", "members.intro", "count(problems.member_id) as total").Joins("left join problems on members.id = problems.member_id").Group("members.id").Find(&members).Error

	return members, err
}

func RankMembersByCountOfSubmissions(db *gorm.DB, limit int, page int, name string, result string, language string) ([]ResultMember, error) {
	var members []ResultMember
	var err error
	var countedColumn string

	if result != "" {
		countedColumn = "distinct(submissions.problem_id)"
	} else {
		countedColumn = "submissions.member_id"
	}

	db = db.Model(&Member{})

	if name != "" {
		db = db.Where("members.name LIKE ?", "%"+name+"%")
	}

	if result != "" {
		db = db.Where("submissions.result=?", result)
	}

	if language != "" {
		db = db.Where("submissions.language=?", language)
	}

	err = db.Order("total desc").Limit(limit).Offset(limit*(page-1)).Select("members.id as member_id", "members.name", "members.intro", "count("+countedColumn+") as total").Joins("left join submissions on members.id = submissions.member_id").Group("members.id").Find(&members).Error
	return members, err
}

// MemberOne example
func MemberOne(db *gorm.DB, id int) (Member, error) {
	var member Member
	err := db.Where("id = ?", id).First(&member).Error
	return member, err
}

// Insert example
func Insert(db *gorm.DB, member Member) (Member, error) {
	err := db.Create(&member).Error
	return member, err
}

// Update example
func Update(db *gorm.DB, member Member) (Member, error) {
	err := db.Model(&Member{}).Where("id = ?", member.ID).Update("name", member.Name).Update("intro", member.Intro).Error
	return member, err
}

// Delete example
func Delete(db *gorm.DB, id int) error {
	var member Member
	err := db.Where("id=?", id).First(&member).Error
	if err != nil {
		return err
	}
	err = db.Delete(&member).Error
	return err
}
