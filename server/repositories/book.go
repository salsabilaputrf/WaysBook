package repositories

import (
	"fmt"
	"waysbook/models"

	"gorm.io/gorm"
)

type BookRepository interface {
	AllBook() ([]models.Book, error)
	AddBook(book models.Book) (models.Book, error)
	AddPromo(discount, id int) (models.Book, error)
	GetBook(id int) (models.Book, error)
	ListAddPromo() ([]models.Book, error)
	ListPromoBook() ([]models.Book, error)
	RemovePromo(id int) (models.Book, error)
}

func RepositoryBook(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) AllBook() ([]models.Book, error) {
	var books []models.Book
	err := r.db.Find(&books).Error

	return books, err
}

func (r *repository) AddBook(book models.Book) (models.Book, error) {
	err := r.db.Create(&book).Error
	return book, err
}

func (r *repository) AddPromo(discount, id int) (models.Book, error) {
	var book models.Book
	r.db.First(&book, id)
	book.IsPromo = true
	book.Discount = discount
	book.DiscountPrice = book.Price * float64(discount) / 100
	fmt.Println(book.DiscountPrice)
	err := r.db.Save(&book).Error
	return book, err
}

func (r *repository) GetBook(id int) (models.Book, error) {
	var book models.Book
	err := r.db.First(&book, id).Error

	return book, err
}

func (r *repository) ListAddPromo() ([]models.Book, error) {
	var book []models.Book
	err := r.db.Where("is_promo != ?", true).Find(&book).Error

	return book, err
}

func (r *repository) ListPromoBook() ([]models.Book, error) {
	var book []models.Book
	err := r.db.Where("is_promo = ?", true).Find(&book).Error

	return book, err
}

func (r *repository) RemovePromo(id int) (models.Book, error) {
	var book models.Book
	r.db.First(&book, id)
	book.IsPromo = false
	book.Discount = 0
	book.DiscountPrice = 0

	err := r.db.Save(&book).Error
	return book, err
}




