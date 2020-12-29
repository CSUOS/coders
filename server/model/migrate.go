package model

import (	
	"fmt"
	
	"gorm.io/gorm"
)

// Migrate automigrates model using GORM
func Migrate(db *gorm.DB){
	db.AutoMigrate(&Ping{})
	fmt.Println("--> Automigration finished")
}