package model

import (
	"errors"
	"gorm.io/gorm"
)

type Problem struct {
	ID   int    `json:"id" example:"1" format:"int64" gorm:"autoIncrement"`
	Title string `json:"title" example:"Problem title"`
	Desc string `json:"desc" example:"Problem description"`
	TimeLimit int `json:"timeLimit" example:"1000" format:"int64"`
	MemoryLimit int `json:"memoryLimit" example:"128" format:"int64"`
	ShortCircuit bool `json:"shortCircuit" example:"false"`
}

type EditProblem struct {
	Title string `json:"title" example:"Problem title"`
	Desc string `json:"desc" example:"Problem description"`
	TimeLimit int `json:"timeLimit" example:"1000" format:"int64"`
	MemoryLimit int `json:"memoryLimit" example:"1024" format:"int64"`
	ShortCircuit bool `json:"shortCircuit" example:"false"`
}

var (
	ErrTitleInvalid = errors.New("title is empty")
	ErrDescInvalid = errors.New("description is empty")
	ErrTimeLimitInvalid = errors.New("time limit is empty")
	ErrMemoryLimitInvalid = errors.New("memory limit is empty")
)

func (p EditProblem) ProblemValidation() error {
	switch {
	case len(p.Title) == 0:
		return ErrTitleInvalid
	case len(p.Desc) == 0:
		return ErrDescInvalid
	case p.TimeLimit == 0:
		return ErrTimeLimitInvalid
	case p.MemoryLimit == 0:
		return ErrMemoryLimitInvalid
	default:
		return nil
	}
}

func ProblemsAll(db *gorm.DB) ([]Problem, error) {
	var problems []Problem
	err := db.Find(&problems).Error
	return problems, err
}

func ProblemOne(db *gorm.DB, id int) (Problem, error) {
	var problem Problem
	err := db.Where("id = ?", id).First(&problem).Error
	return problem, err
}

func ProblemInsert(db *gorm.DB, problem Problem) (Problem, error) {
	err := db.Create(&problem).Error
	return problem, err
}

func ProblemUpdate(db *gorm.DB, problem Problem) (Problem, error) {
	err := db.Model(&Problem{}).Where("id = ?", problem.ID).Update("title", problem.Title).Error
	if err!=nil { return problem, err }
	err = db.Model(&Problem{}).Where("id = ?", problem.ID).Update("desc", problem.Desc).Error
	if err!=nil { return problem, err }
	err = db.Model(&Problem{}).Where("id = ?", problem.ID).Update("time_limit", problem.TimeLimit).Error
	if err!=nil { return problem, err }
	err = db.Model(&Problem{}).Where("id = ?", problem.ID).Update("memory_limit", problem.MemoryLimit).Error
	if err!=nil { return problem, err }
	err = db.Model(&Problem{}).Where("id = ?", problem.ID).Update("short_circuit", problem.ShortCircuit).Error
	if err!=nil { return problem, err }
	return problem, err
	// time_limit > timeLimit ?
}

func ProblemDelete(db *gorm.DB, id int) error {
	var problem Problem
	err := db.Where("id=?", id).First(&problem).Error
	if err != nil{
		return err
	}
	err = db.Delete(&problem).Error
	return err
}
