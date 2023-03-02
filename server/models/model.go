package models

import "time"

type Model struct {
	ID        int       `json:"id" gorm:"primary_key"`
	CreatedAt time.Time `json:"-" gorm:"type:timestamp with time zone;default:now()"`
	UpdatedAt time.Time `json:"-" gorm:"type:timestamp with time zone;default:now()"`
}
