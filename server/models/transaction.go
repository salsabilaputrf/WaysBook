package models

import "time"

type Transaction struct {
	ID     int     `json:"id" gorm:"primary_key:auto_increment"`
	Total  float64 `json:"total" gorm:"type: decimal(10,2)"`
	Books  []Book  `json:"books" `
	UserID int     `json:"user_id" gorm:"type: int"`
	User   User    `json:"user" gorm:"foreignKey: UserID"`
	Status string  `json:"status" gorm:"type: varchar(255)"`

	CreatedAt time.Time `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"`
}
