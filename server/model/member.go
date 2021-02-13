package model

import (
	"errors"

	"gorm.io/gorm"
)

// Member example
type Member struct {
	ID          int          `json:"id" example:"1" format:"int64" gorm:"autoIncrement"`
	Name        string       `json:"name" example:"Member name"`
	MemberRank  int          `json:"member_rank" example:"1" formant:"int64"`
	Intro       string       `json:"intro" example:"Introduction which users set"`
	Submissions []Submission `gorm:"ForeignKey:MemberID";constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
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
	Name  string
	Intro string
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
func MembersQuery(db *gorm.DB, name string, page int) ([]Member, error) {
	var members []Member
	var err error
	if name != "" {
		err = db.Model(&Member{}).Limit(20).Offset(20*(page-1)).Where("name LIKE ?", "%"+name+"%").Find(&members).Error
	} else {
		err = db.Model(&Member{}).Limit(20).Offset(20 * (page - 1)).Find(&members).Error
	}

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
