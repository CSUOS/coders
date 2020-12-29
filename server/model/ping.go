package model

/*
* GORM uses ID as primary key, 
* pluralize struct name to snake_cases as table name, 
* snake_case as column name, 
* and uses CreatedAt, UpdatedAt to track creating/updating time
*/

// Ping example
type Ping struct {
	ID  int 		`json:"id" example:"1" format:"int64"`
	Result string 	`json:"result" example:"pong"`
}
