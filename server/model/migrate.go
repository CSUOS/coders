package model

import (
	"fmt"

	"gorm.io/gorm"
)

// Migrate automigrates model using GORM
func Migrate(db *gorm.DB) {
	db.AutoMigrate(&Ping{}, &Member{}, &Problem{}, &PComment{}, &Submission{})
	fmt.Println("--> Automigration finished")
}
