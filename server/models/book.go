package models

import "time"

type Book struct {
	ID               int         `json:"id" gorm:"primary_key:auto_increment"`
	Title            string      `json:"title" gorm:"type: varchar(255)"`
	Publication_date time.Time   `json:"publication_date" gorm:"type: date"`
	Pages            int         `json:"pages" gorm:"type: int"`
	ISBN             string      `json:"ISBN" gorm:"type: varchar(255)"`
	Author           string      `json:"author" gorm:"type: varchar(255)"`
	Price            float64     `json:"price" gorm:"type: decimal(10,2)"`
	IsPromo          bool        `json:"is_promo" gorm:"type: bool"`
	Discount         int         `json:"discount" gorm:"type: int"`
	DiscountPrice    float64     `json:"discount_price" gorm:"type: decimal(10,2)"`
	Description      string      `json:"description" gorm:"type: text"`
	Book_attachment  string      `json:"book_attachment" gorm:"type: varchar(255)"`
	Thumbnail        string      `json:"thumbnail" gorm:"type: varchar(255)"`
	UserID           int         `json:"user_id" gorm:"type: int"`
	User             User        `json:"user" gorm:"foreignKey: UserID"`
	TransactionID    int         `json:"transaction_id" gorm:"type: int"`
	Transaction      Transaction `json:"transaction" gorm:"foreignKey: TransactionID"`

	CreatedAt time.Time `json:"-" gorm:"type:timestamp with time zone;default:now()"`
	UpdatedAt time.Time `json:"-" gorm:"type:timestamp with time zone;default:now()"`
}
