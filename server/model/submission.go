package model

import (
	"strconv"
	"time"

	"gorm.io/gorm"
)

// Submission example
type Submission struct {
	ID           uint      `json:"id" example:"1" format:"int64" gorm:"autoIncrement"` // packet 에서는 submission-id
	MemberID     int       `json:"memberId" example:"1" format:"int64"`
	ProblemID    int       `json:"problemId" example:"1" format:"int64"` // packet 에서는 problem-id
	Language     string    `json:"language" example:"C11"`               // 참고: https://github.com/DMOJ/judge-server/tree/master/dmoj/executors
	Source       string    `json:"source" example:"#include <stdio.h>" type:"text"`
	IsJudging    bool      `json:"isJudging" example:"true"`
	Result       string    `json:"result" example:"WA"`
	TimeLimit    int       `json:"timeLimit" example:"1" format:"int64"`
	MemoryLimit  int       `json:"memoryLimit" example:"1" format:"int64"`
	ShortCircuit bool      `json:"shortCircuit" example:"false"`
	Meta         string    `json:"meta" example:"meta data"`
	CreatedAt    time.Time `json:"createdAt"`
	Member       Member    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Problem      Problem   `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

// EditSubmission 은 ID, CreatedAt, Result 컬럼이 없다
type EditSubmission struct {
	MemberID     int    `json:"memberId" example:"1" format:"int64"`
	ProblemID    int    `json:"problemId" example:"1" format:"int64"` // packet 에서는 problem-id
	Language     string `json:"language" example:"C11"`               // 참고: https://github.com/DMOJ/judge-server/tree/master/dmoj/executors
	Source       string `json:"source" example:"#include <stdio.h>" type:"text"`
	TimeLimit    int    `json:"timeLimit" example:"1" format:"int64"`
	MemoryLimit  int    `json:"memoryLimit" example:"1" format:"int64"`
	ShortCircuit bool   `json:"shortCircuit" example:"false"`
	Meta         string `json:"meta" example:"meta data"`
}

type QuerySubmission struct {
	ProblemID string
	MemberID  string
	Language  string
	Result    string
}

// SubmissionsQuery example
func SubmissionsQuery(db *gorm.DB, query QuerySubmission) ([]Submission, error) {
	var submissions []Submission

	if intPid, err := strconv.Atoi(query.ProblemID); query.ProblemID != "" && err != nil {
		db = db.Where("problem_id = ?", intPid)
	}
	if intMid, err := strconv.Atoi(query.MemberID); query.MemberID != "" && err != nil {
		db = db.Where("member_id = ?", intMid)
	}
	if query.Language != "" {
		db = db.Where("language = ?", query.Language)
	}
	if query.Result != "" {
		db = db.Where("result = ?", query.Result)
	}
	err := db.Find(&submissions).Error
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
