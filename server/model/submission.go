package model

import (
	"time"

	"gorm.io/gorm"
)

// Submission example
type Submission struct {
	ID           uint      `json:"id" example:"1" format:"int64" gorm:"autoIncrement"` // packet 에서는 submission-id
	MemberID     int       `json:"memberId" example:"1" format:"int64"`
	ProblemID    int       `json:"problemId" example:"1" format:"int64"` // packet 에서는 problem-id
	Language     string    `json:"language" example:"C11"`                // 참고: https://github.com/DMOJ/judge-server/tree/master/dmoj/executors
	Source       string    `json:"source" example:"#include <stdio.h>" type:"text"`
	Result       string    `json:"result" example:"WA"`
	TimeLimit    int       `json:"timeLimit" example:"1" format:"int64"`   
	MemoryLimit  int       `json:"memoryLimit" example:"1" format:"int64"` 
	ShortCircuit bool      `json:"shortCircuit" example:"false"`           
	Meta         string    `json:"meta" example:"meta data"`
	CreatedAt    time.Time `json:"createdAt"`
}

// EditSubmission 은 ID, CreatedAt, Result 컬럼이 없다
type EditSubmission struct {
	MemberID     int    `json:"memberId" example:"1" format:"int64"`
	ProblemID    int    `json:"problemId" example:"1" format:"int64"` // packet 에서는 problem-id
	Language     string `json:"language" example:"C11"`                // 참고: https://github.com/DMOJ/judge-server/tree/master/dmoj/executors
	Source       string `json:"source" example:"#include <stdio.h>" type:"text"`
	TimeLimit    int    `json:"timeLimit" example:"1" format:"int64"`   
	MemoryLimit  int    `json:"memoryLimit" example:"1" format:"int64"` 
	ShortCircuit bool   `json:"shortCircuit" example:"false"`           
	Meta         string `json:"meta" example:"meta data"`
}

type QuerySubmission struct{
	ProblemID    int   
	MemberID     int   
	Language     string
	Result       string
}

// SubmissionsQuery example
func SubmissionsQuery(db *gorm.DB, query QuerySubmission) ([]Submission, error) {
	var submissions []Submission
	err := db.Where(&query).Find(&submissions).Error
	return submissions, err
}

// SubmissionOne example
func SubmissionOne(db *gorm.DB, memberID int) (Submission, error) {
	var Submission Submission
	err := db.Where("id = ?", memberID).First(&Submission).Error
	return Submission, err
}

// SubmissionInsert example
func SubmissionInsert(db *gorm.DB, submission Submission) (Submission, error) {
	err := db.Create(&submission).Error
	return submission, err
}

// SubmissionDelete 는 submission id 를 받아 해당 submission 을 지운다
func SubmissionDelete(db *gorm.DB, id int) error {
	var submission Submission
	err := db.Where("id=?", id).First(&submission).Error
	if err != nil {
		return err
	}
	err = db.Delete(&submission).Error
	return err
}
