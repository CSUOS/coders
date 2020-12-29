package model

import (
	"gorm.io/gorm"
)
/*
* GORM uses ID as primary key, 
* pluralize struct name to snake_cases as table name, 
* snake_case as column name, 
* and uses CreatedAt, UpdatedAt to track creating/updating time
*/

// Ping example
type Ping struct {
	ID  int 		`json:"id" example:"1" format:"int64" gorm:"autoIncrement"`
	Result string 	`json:"result" example:"pong"`
}

// FirstPing example
func FirstPing(db *gorm.DB) (Ping, error) {
	var ping Ping
	err := db.First(&ping).Error
	
	return ping, err
}

// AddPing exmple
func AddPing(db *gorm.DB) (error){
	ping := Ping{Result: "pong"}
	err := db.Create(&ping).Error
	return err
}