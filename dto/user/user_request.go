package usersdto

type CreateUserRequest struct {
	Fullname  string  `json:"fullname" form:"fullname" gorm:"type: varchar(255)" validate:"required"`
	Email     string  `json:"email" form:"email" gorm:"type: varchar(255)" validate:"required"`
	Phone     string  `json:"phone" form:"phone" gorm:"type: varchar(255)" validate:"required"`
	Address   string  `json:"address" form:"address" gorm:"type: text" `
	Password  string  `json:"password" form:"password" gorm:"type: varchar(255)" validate:"required"`
	Gender    string  `json:"gender" form:"gender" gorm:"type: varchar(255)" validate:"required"`
	Role      string  `json:"role" form:"role" gorm:"type: varchar(255)" validate:"required"`
	Shortname string  `json:"shortname" form:"shortname" gorm:"type: varchar(255)"`
	Image     string  `json:"image" form:"image" gorm:"type: varchar(255)"`
	Lat       float64 `json:"lat" form:"lat" gorm:"type:float"`
	Lng       float64 `json:"lng" form:"lng" gorm:"type:float"`
}

type UpdateUserRequest struct {
	Fullname  string  `json:"fullname" form:"fullname" gorm:"type: varchar(255)"`
	Image     string  `json:"image" form:"image" gorm:"type: varchar(255)"`
	Email     string  `json:"email" form:"email" gorm:"type: varchar(255)"`
	Phone     string  `json:"phone" form:"phone" gorm:"type: varchar(255)"`
	Shortname string  `json:"shortname" form:"shortname" gorm:"type: varchar(255)"`
	Address   string  `json:"address" form:"address" gorm:"type: text"`
	Password  string  `json:"password" form:"password" gorm:"type: varchar(255)"`
	Gender    string  `json:"gender" form:"gender" gorm:"type: varchar(255)"`
	Lat       float64 `json:"lat" form:"lat" gorm:"type:float"`
	Lng       float64 `json:"lng" form:"lng" gorm:"type:float"`
}
