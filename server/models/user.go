package models

import "time"

type User struct {
	ID           int           `json:"id" gorm:"primary_key:auto_increment"`
	Fullname     string        `json:"fullname" gorm:"type: varchar(255)"`
	Email        string        `json:"email" gorm:"type: varchar(255);unique"`
	Password     string        `json:"-" gorm:"type: varchar(255)"`
	Gender       string        `json:"gender" gorm:"type: varchar(255)"`
	Phone        string        `json:"phone" gorm:"type: varchar(255)"`
	Address      string        `json:"address" gorm:"type: text"`
	Role         string        `json:"role" gorm:"type: varchar(255)"`
	Image        string        `json:"image" gorm:"type: varchar(255)"`
	Books        []Book        `json:"books" `
	Transactions []Transaction `json:"transactions" `

	CreatedAt time.Time `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `json:"-" gorm:"type: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"`
}

type UserProfileResponse struct {
	ID       int    `json:"id" `
	Fullname string `json:"fullname" `
	Email    string `json:"email" `
	Password string `json:"-" `
	Gender   string `json:"gender" `
	Phone    string `json:"phone" `
	Address  string `json:"address" `
	Role     string `json:"role" `
	Image    string `json:"image" `
	Books    []Book `json:"books"`
}

func (UserProfileResponse) TableName() string {
	return "users"
}
