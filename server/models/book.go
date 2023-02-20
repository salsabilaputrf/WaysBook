package models

import "time"

type Book struct {
	ID               int       `json:"id" gorm:"primary_key:auto_increment"`
	Title            string    `json:"title" gorm:"type: varchar(255)"`
	Publication_date time.Time `json:"publication_date" gorm:"type: date"`
	Pages            int       `json:"pages" gorm:"type: int"`
	ISBN             string    `json:"ISBN" gorm:"type: varchar(255)"`
	Author           string    `json:"author" gorm:"type: varchar(255)"`
	Price            float64   `json:"price" gorm:"type: decimal(10,2)"`
	IsPromo          bool      `json:"is_promo" gorm:"type: bool"`
	Discount         int       `json:"discount" gorm:"type: int"`
	DiscountPrice    float64   `json:"discount_price" gorm:"type: decimal(10,2)"`
	Description      string    `json:"description" gorm:"type: text"`
	Book_attachment  string    `json:"book_attachment" gorm:"type: varchar(255)"`
	Thumbnail        string    `json:"thumbnail" gorm:"type: varchar(255)"`
	// Users            []User    `gorm:"many2many:user_books;"`
	TransactionID    int       `json:"-" gorm:"type: int"`
	CreatedAt        time.Time `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP"`
	UpdatedAt        time.Time `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"`
}

type BookResponse struct {
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

func (BookResponse) TableName() string {
	return "books"
}
