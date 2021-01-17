package model

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

// PComment example
// PCommnet belongs to Member, Problem
type PComment struct {
	ID        int       `json:"id" example:"1" format:"int64" gorm:"autoIncrement"`
	Text      string    `json:"text" example:"problem comment"`
	CreateAt  time.Time `json:"createdAt"`
	Edited    bool      `json:"edited" example:"false"`
	Deleted   bool      `json:"deleted" example:"false"`
	MemberID  int       `json:"userid" example:"1"`
	Member    Member    `gorm:"foreginKey:MemberID;association_foreginKey:ID"`
	ProblemID int       `json:"problemid" example:"1"`
	Problem   Problem   `gorm:"foreginKey:ProblemID;association_foreginKey:ID"`
}

// EditPComment adds or updates problem comment record
type EditPComment struct {
	Text    string `json:"text" example:"problem comment"`
	Edited  bool   `json:"edited" example:"true"`
	Deleted bool   `json:"deleted" example:"true"`
}

//  .
var (
	ErrTextInvalid = errors.New("text is empty")
)

// PCommentValidation .
func (c EditPComment) PCommentValidation() error {
	switch {
	case len(c.Text) == 0:
		return ErrTextInvalid
	default:
		return nil
	}
}

// PCommentsAll .
func PCommentsAll(db *gorm.DB) ([]PComment, error) {
	var pcomments []PComment
	err := db.Find(&pcomments).Error
	return pcomments, err
}

// PCommentOne .
func PCommentOne(db *gorm.DB, id int) (PComment, error) {
	var pcomment PComment
	err := db.Where("id = ?", id).First(&pcomment).Error
	return pcomment, err
}

// PCommentInsert .
func PCommentInsert(db *gorm.DB, pcomment PComment) (PComment, error) {
	err := db.Create(&pcomment).Error
	return pcomment, err
}

// PCommentUpdate .
func PCommentUpdate(db *gorm.DB, pcomment PComment) (PComment, error) {
	err := db.Model(&PComment{}).Where("id = ?", pcomment.ID).Update("text", pcomment.Text).Error
	return pcomment, err
}

// PCommentDelete .
func PCommentDelete(db *gorm.DB, id int) error {
	var pcomment PComment
	err := db.Where("id = ?", id).First(&pcomment).Error
	if err != nil {
		return err
	}
	err = db.Delete(&pcomment).Error
	return err
}
