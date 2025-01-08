package repositories

import (
	"mytask/models"

	"gorm.io/gorm"
)

type AuthRepository interface {
	Register(user models.User) (models.User, error)
	Login(email string) (models.User, error)
	CheckAuth(ID int) (models.User, error)
}

func RepositoryAuth(db *gorm.DB) *repositories {
	return &repositories{db}
}

func (r *repositories) Register(user models.User) (models.User, error) {
	err := r.db.Create(&user).Error

	return user, err
}

func (r *repositories) Login(email string) (models.User, error) {
	var user models.User
	err := r.db.First(&user, "email=?", email).Error

	return user, err
}

func (r *repositories) CheckAuth(ID int) (models.User, error) {
	var user models.User

	response := models.User{
		ID:       user.ID,
		Fullname: user.Fullname,
		Image:    user.Image,
		Email:    user.Email,
		Phone:    user.Phone,
		Address:  user.Address,
	}
	if user.Role == "As Partner" {
		response.Shortname = user.Shortname
	}
	err := r.db.First(&response, ID).Error

	return response, err
}
