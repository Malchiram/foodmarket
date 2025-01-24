package handlers

import (
	"fmt"
	"log"
	authdto "mytask/dto/author"
	dto "mytask/dto/result"
	usersdto "mytask/dto/user"
	"mytask/models"
	"mytask/pkg/bcrypt"
	jwtToken "mytask/pkg/jwt"
	repositories "mytask/repository"

	"net/http"
	"time"

	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerAuth struct {
	AuthRepository repositories.AuthRepository
}

func HandlerAuth(AuthRepository repositories.AuthRepository) *handlerAuth {
	return &handlerAuth{AuthRepository}
}

func (h *handlerAuth) Register(c echo.Context) error {
	request := new(usersdto.CreateUserRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	if err := validation.Struct(request); err != nil {
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		return c.JSON(http.StatusBadRequest, response)
	}

	password, err := bcrypt.PasswordHash(request.Password)
	if err != nil {
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		return c.JSON(http.StatusInternalServerError, response)
	}

	user := models.User{
		Fullname: request.Fullname,
		Email:    request.Email,
		Password: password,
		Gender:   request.Gender,
		Phone:    request.Phone,
		Address:  request.Address,
		Role:     request.Role,
	}

	data, err := h.AuthRepository.Register(user)
	if err != nil {
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		return c.JSON(http.StatusInternalServerError, response)
	}

	claims := jwt.MapClaims{}
	claims["id"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix() // 2 hours expired

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		return echo.NewHTTPError(http.StatusUnauthorized)
	}

	registerResponse := authdto.RegResponse{
		Email: data.Email,
		Token: token,
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: registerResponse})
}
func (h *handlerAuth) Test(c echo.Context) error {
	return c.String(http.StatusOK, "API OKAY")
}

func (h *handlerAuth) Login(c echo.Context) error {
	request := new(authdto.LoginRequest)
	if err := c.Bind(request); err != nil {
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		return c.JSON(http.StatusBadRequest, response)
	}

	user := models.User{
		Email:    request.Email,
		Password: request.Password,
	}

	user, err := h.AuthRepository.Login(user.Email)
	if err != nil {
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		return c.JSON(http.StatusBadRequest, response)
	}

	isValid := bcrypt.CheckPasswordHash(request.Password, user.Password)
	if !isValid {
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Wrong Email or Password"}
		return c.JSON(http.StatusBadRequest, response)
	}
	userDetails, err := h.AuthRepository.CheckAuth(user.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	// GenerateToken
	claims := jwt.MapClaims{
		"id":        user.ID,
		"role":      user.Role,
		"exp":       time.Now().Add(time.Hour * 2).Unix(),
		"user_info": userDetails, // Menambahkan userDetails ke klaim
	}
	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		fmt.Println(errGenerateToken)
		return echo.NewHTTPError(http.StatusUnauthorized)
	}

	loginResponse := struct {
		Email string `json:"email"`
		Token string `json:"token"`
		Role  string `json:"role"`
		ID    int    `json:"id"`
	}{
		Email: user.Email,
		Token: token,
		Role:  user.Role,
		ID:    user.ID,
	}

	return c.JSON(http.StatusOK, loginResponse)

}

func (h *handlerAuth) CheckAuth(c echo.Context) error {
	userLogin := c.Get("userLogin")
	// Convert userLogin to float64
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, err := h.AuthRepository.CheckAuth(int(userId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	// Cek role dan siapkan response sesuai role
	var response interface{}
	if user.Role == "As Partner" {
		response = struct {
			ID        int    `json:"id"`
			Fullname  string `json:"fullname"`
			Email     string `json:"email"`
			Phone     string `json:"phone"`
			Address   string `json:"address"`
			Role      string `json:"role"`
			Shortname string `json:"Shortname"`
			Image     string `json:"image"`
		}{
			ID:        user.ID,
			Fullname:  user.Fullname,
			Email:     user.Email,
			Phone:     user.Phone,
			Address:   user.Address,
			Role:      user.Role,
			Shortname: user.Shortname,
			Image:     user.Image,
		}
	} else {
		response = models.UsersProfileResponse{
			ID:       user.ID,
			Fullname: user.Fullname,
			Email:    user.Email,
			Phone:    user.Phone,
			Address:  user.Address,
			Role:     user.Role,
			Image:    user.Image,
			Lat:      user.Lat,
			Lng:      user.Lng,
		}
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: response})
}
