package repositories

// import (
// 	"fmt"
// 	"waysbook/models"

// 	"gorm.io/gorm"
// )

// type OrderRepository interface {
// 	AddOrder(userId, bookId int) error
// }

// func RepositoryOrder(db *gorm.DB) *repository {
// 	return &repository{db}
// }

// func (r *repository) AddOrder(userId, bookId int) error {
// 	// cari user berdasarkan userId
// 	var user models.User
// 	var err error
// 	err = r.db.First(&user, userId).Error



// 	// // cari book berdasarkan bookId
// 	var books []models.Book
// 	err = r.db.Find(&books, bookId).Error
// 	fmt.Println("book : ", err)


// 	// membuat transaksi baru
// 	transaction := models.Transaction{
// 		Total: 0,
// 		UserID: user.ID,
// 	}

// 	err = r.db.Create(&transaction).Error


// 	// menghitung total harga buku
// 	total := 0.0
// 	for _, data := range books {
// 		total += data.Price
// 	}

// 	// membuat order baru
// 	order := models.Order{
// 		UserID: user.ID,
// 		TransactionID: uint(transaction.ID),
// 		Books: books,
// 	}

// 	err = r.db.Create(&order).Error

// 	transaction.Total = total
// 	err = r.db.Save(&transaction).Error
// 	// tambahkan book ke order
// 	// err = r.db.Model(&order).Association("Books").Append(&book)

// 	// fmt.Println("error : ", err)

// 	return err
// }
