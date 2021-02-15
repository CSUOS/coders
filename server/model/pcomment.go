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
	MemberID  int       `json:"userId" example:"1" format:"int64"`
	ProblemID int       `json:"problemId" example:"1" format:"int64"`
	Text      string    `json:"text" example:"problem comment"`
	CreatedAt time.Time `json:"createdAt"`
	Edited    bool      `json:"edited" example:"false"`
	Deleted   bool      `json:"deleted" example:"false"`
	Member    Member    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Problem   Problem    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`

}

// EditPComment adds or updates problem comment record
type EditPComment struct {
	MemberID  int    `json:"userId" example:"1" format:"int64"`
	ProblemID int    `json:"problemId" example:"1" format:"int64"`
	Text      string `json:"text" example:"problem comment"`
	Edited    bool   `json:"edited" example:"false"`
	Deleted   bool   `json:"deleted" example:"false"`
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

// PCommentsByProblemID .
func PCommentsByProblemID(db *gorm.DB, problemId int) ([]PComment, error) {
	var pcomments []PComment
	err := db.Where("problem_id = ?", problemId).Find(&pcomments).Error
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
	err := db.Model(&pcomment).Where("id = ?", pcomment.ID).Updates(PComment{MemberID: pcomment.MemberID, ProblemID: pcomment.ProblemID, Text: pcomment.Text, Edited: pcomment.Edited, Deleted: pcomment.Deleted}).Error
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
