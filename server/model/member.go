package model

import (
	"errors"
	"gorm.io/gorm"
)

// Member example
type Member struct {
	ID   int    `json:"id" example:"1" format:"int64" gorm:"autoIncrement"`
	Name string `json:"name" example:"Member name"`
}

// EditMember adds or updates member record
type EditMember struct {
	Name string `json:"name" example:"Member name"`
}

//  example
var (
	ErrNameInvalid = errors.New("name is empty")
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

// MembersAll example
func MembersAll(db *gorm.DB) ([]Member, error) {
	var members []Member
	err := db.Find(&members).Error
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
	err := db.Model(&Member{}).Where("id = ?", member.ID).Update("name", member.Name).Error
	return member, err
}

// Delete example
func Delete(db *gorm.DB, id int) error {
	var member Member
	err := db.Where("id=?", id).First(&member).Error
	if err != nil{
		return err
	}
	err = db.Delete(&member).Error
	return err
}
