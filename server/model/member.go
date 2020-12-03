package model

import (
	"errors"
	"fmt"
)

// Member example
type Member struct {
	ID   int    `json:"id" example:"1" format:"int64"`
	Name string `json:"name" example:"Member name"`
}

//  example
var (
	ErrNameInvalid = errors.New("name is empty")
)

// AddMember example
type AddMember struct {
	Name string `json:"name" example:"Member name"`
}

// Validation example
func (a AddMember) Validation() error {
	switch {
	case len(a.Name) == 0:
		return ErrNameInvalid
	default:
		return nil
	}
}

// UpdateMember example
type UpdateMember struct {
	Name string `json:"name" example:"Member name"`
}

// Validation example
func (a UpdateMember) Validation() error {
	switch {
	case len(a.Name) == 0:
		return ErrNameInvalid
	default:
		return nil
	}
}

// MembersAll example
func MembersAll(q string) ([]Member, error) {
	if q == "" {
		return Members, nil
	}
	as := []Member{}
	for k, v := range Members {
		if q == v.Name {
			as = append(as, Members[k])
		}
	}
	return as, nil
}

// MemberOne example
func MemberOne(id int) (Member, error) {
	for _, v := range Members {
		if id == v.ID {
			return v, nil
		}
	}
	return Member{}, fmt.Errorf("Member id=%d is not found", id)
}

// Insert example
func (a Member) Insert() (int, error) {
	MemberMaxID++
	a.ID = MemberMaxID
	a.Name = fmt.Sprintf("Member_%d", MemberMaxID)
	Members = append(Members, a)
	return MemberMaxID, nil
}

// Delete example
func Delete(id int) error {
	for k, v := range Members {
		if id == v.ID {
			Members = append(Members[:k], Members[k+1:]...)
			return nil
		}
	}
	return fmt.Errorf("Member id=%d is not found", id)
}

// Update example
func (a Member) Update() error {
	for k, v := range Members {
		if a.ID == v.ID {
			Members[k].Name = a.Name
			return nil
		}
	}
	return fmt.Errorf("Member id=%d is not found", a.ID)
}

var MemberMaxID = 3
var Members = []Member{
	{ID: 1, Name: "Member_1"},
	{ID: 2, Name: "Member_2"},
	{ID: 3, Name: "Member_3"},
}
