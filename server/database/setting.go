package database

import (
	"coders/model"

	"fmt"
	
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

// Initialize database setting
func Initialize(DBCONFIG string) (*gorm.DB, error) {
	db, err := gorm.Open(mysql.Open(DBCONFIG), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: false,
	})
	if err != nil {
		panic(err)
	}
	fmt.Println("--> Database is connected")
	model.Migrate(db) // auto migration
	return db, err
}

// Inject database to gin context
func Inject(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	}
}
