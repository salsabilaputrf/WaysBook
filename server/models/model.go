package models

import "time"

type Model struct {
	ID        int       `json:"id" gorm:"primary_key:auto_increment"`
	CreatedAt time.Time `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"`
}
