package bookdto

import "time"

type AddBookResponse struct {
	Title            string    `json:"title" gorm:"type: varchar(255)"`
	Publication_date time.Time `json:"publication_date" gorm:"type: date"`
	Pages            int       `json:"pages" gorm:"type: int"`
	ISBN             string    `json:"ISBN" gorm:"type: varchar(255)"`
	Author           string    `json:"author" gorm:"type: varchar(255)"`
	Price            float64   `json:"price" gorm:"type: decimal(10,2)"`
	Description      string    `json:"description" gorm:"type: text"`
	Book_attachment  string    `json:"book_attachment" gorm:"type: varchar(255)"`
	Thumbnail        string    `json:"thumbnail" gorm:"type: varchar(255)"`
}
