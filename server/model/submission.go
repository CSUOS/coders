package model

import (
	"time"

	"gorm.io/gorm"
)

// Submission example
type Submission struct {
	ID           uint      `json:"id" example:"1" format:"int64" gorm:"autoIncrement"` // packet 에서는 submission-id
	MemberID     int       `json:"member-id" example:"1" format:"int64"`
	ProblemID    int       `json:"problem-id" example:"1" format:"int64"` // packet 에서는 problem-id
	Language     string    `json:"language" example:"C11"`                // 참고: https://github.com/DMOJ/judge-server/tree/master/dmoj/executors
	Source       string    `json:"source" example:"#include <stdio.h>" type:"text"`
	Result       string    `json:"result" example:"WA"`
	TimeLimit    int       `json:"time-limit" example:"1" format:"int64"`   // problem 모델과 통일 필요
	MemoryLimit  int       `json:"memory-limit" example:"1" format:"int64"` // problem 모델과 통일 필요
	ShortCircuit bool      `json:"short-circuit" example:"false"`           // problem 모델과 통일 필요
	Meta         string    `json:"meta" example:"meta data"`
	CreatedAt    time.Time `json:"createdAt"`
}

// EditSubmission 은 ID, CreatedAt, Result 컬럼이 없다
type EditSubmission struct {
	MemberID     int    `json:"member-id" example:"1" format:"int64"`
	ProblemID    int    `json:"problem-id" example:"1" format:"int64"` // packet 에서는 problem-id
	Language     string `json:"language" example:"C11"`                // 참고: https://github.com/DMOJ/judge-server/tree/master/dmoj/executors
	Source       string `json:"source" example:"#include <stdio.h>" type:"text"`
	TimeLimit    int    `json:"time-limit" example:"1" format:"int64"`   // problem 모델과 통일 필요
	MemoryLimit  int    `json:"memory-limit" example:"1" format:"int64"` // problem 모델과 통일 필요
	ShortCircuit bool   `json:"short-circuit" example:"false"`           // problem 모델과 통일 필요
	Meta         string `json:"meta" example:"meta data"`
}

// SubmissionsAll example
func SubmissionsAll(db *gorm.DB) ([]Submission, error) {
	var Submissions []Submission
	err := db.Find(&Submissions).Error
	return Submissions, err
}

// SubmissionOne example
func SubmissionOne(db *gorm.DB, memberID int) (Submission, error) {
	var Submission Submission
	err := db.Where("id = ?", memberID).First(&Submission).Error
	return Submission, err
}

// SubmissionInsert example
func SubmissionInsert(db *gorm.DB, Submission Submission) (Submission, error) {
	err := db.Create(&Submission).Error
	return Submission, err
}

// SubmissionDelete 는 submission id 를 받아 해당 submission 을 지운다
func SubmissionDelete(db *gorm.DB, id int) error {
	var Submission Submission
	err := db.Where("id=?", id).First(&Submission).Error
	if err != nil {
		return err
	}
	err = db.Delete(&Submission).Error
	return err
}
