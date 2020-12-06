package database

import (
	"database/sql"
	"fmt"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

func pingDB(db *sql.DB) {
	err := db.Ping()
	if err != nil {
		panic(err)
	}
	fmt.Println("--> Database is connected")
}

// Initialize database setting
func Initialize(DBCONFIG string) (*sql.DB, error) {
	db, err := sql.Open("mysql", DBCONFIG)
	if err != nil {
		panic(err)
	}
	pingDB(db)
	return db, err
}

// Inject database to gin context
func Inject(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	}
}
