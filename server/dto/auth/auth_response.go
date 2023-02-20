package authdto

type LoginResponse struct {
	ID       int    `json:"id" gorm:"type: int"`
	Fullname string `json:"fullname" gorm:"type: varchar(255)" `
	Email    string `json:"email" gorm:"type: varchar(255)" `
	Password string `json:"password" gorm:"type: varchar(255)" `
	Gender   string `json:"gender" gorm:"type: varchar(255)" `
	Phone    string `json:"phone" gorm:"type: varchar(255)" `
	Address  string `json:"address" gorm:"type: text" `
	Role     string `json:"role" gorm:"type: varchar(255)"`
	Image    string `json:"image" gorm:"type: varchar(255)"`
	Token    string `gorm:"type: varchar(255)" json:"token"`
}

type RegisterResponse struct {
	Fullname string `json:"fullname" gorm:"type: varchar(255)"`
	Email    string `json:"email" gorm:"type: varchar(255)"`
	Message  string `gorm:"type: varchar(255)" json:"message"`
}

type CheckAuthResponse struct {
	ID       int    `gorm:"type: int" json:"id"`
	Fullname string `gorm:"type: varchar(255)" json:"fullname"`
	Email    string `gorm:"type: varchar(255)" json:"email"`
	Role     string `gorm:"type: string" json:"role"`
}
