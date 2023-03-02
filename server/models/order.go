package models

type Order struct {
	Model
	Books     []Book    `gorm:"many2many:order_books;"`
	Qty       int       `json:"qty" gorm:"type: int"`
	Subtotal  float64   `json:"subtotal" gorm:"type: decimal(10,2)"`
}
