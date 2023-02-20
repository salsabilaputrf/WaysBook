package models

import "time"

type Transaction struct {
	ID        int       `json:"id" gorm:"primary_key:auto_increment"`
	Total     float64   `json:"total" gorm:"type: decimal(10,2)"`
	UserID    int       `json:"user_id" gorm:"type: int"`
	// User      User      `json:"user" gorm:"foreignKey: UserID"`
	Orders     []Order    `json:"orders" gorm:"foreignKey: TransactionID"`
	CreatedAt time.Time `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"`
}

type TransactionResponse struct {
	ID int `json:"id" `
	// Title            string  `json:"title" `
	// Publication_date string  `json:"publication_date" `
	// Pages            int     `json:"pages" `
	// ISBN             string  `json:"ISBN" `
	// Author           string  `json:"author" `
	// Price            float64 `json:"price" `
	// Description      string  `json:"description" `
	// Book_attachment  string  `json:"book_attachment" `
	// Thumbnail        string  `json:"thumbnail"`
	// UserID           int     `json:"user_id"`
}

func (TransactionResponse) TableName() string {
	return "transactions"
}
