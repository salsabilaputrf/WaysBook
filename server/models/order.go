package models

import "time"

type Order struct {
	ID            uint      `gorm:"primaryKey"`
	TransactionID uint      `gorm:"not null"`
	Books         []Book    `gorm:"many2many:order_books;"`
	CreatedAt     time.Time `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP"`
	UpdatedAt     time.Time `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"`
}
