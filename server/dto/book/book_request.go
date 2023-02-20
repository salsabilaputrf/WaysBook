package bookdto

import "time"

type AddBookRequest struct {
	Title            string    `json:"title" form:"title" validate:"required"`
	Publication_date time.Time `json:"publication_date" form:"publication_date" validate:"required"`
	Pages            int       `json:"pages" form:"pages" validate:"required"`
	ISBN             string    `json:"isbn" form:"isbn" validate:"required"`
	Author           string    `json:"author" form:"author" validate:"required"`
	Price            float64   `json:"price" form:"price" validate:"required"`
	Description      string    `json:"description" form:"description" validate:"required"`
	Book_attachment  string    `json:"book_attachment" form:"book_attachment" validate:"required"`
	Thumbnail        string    `json:"thumbnail" form:"thumbnail" validate:"required"`
}

type AddPromoRequest struct {
	Discount int `json:"discount" form:"discount" validate:"required"`
}
