package handlers

// import (
// 	"fmt"
// 	"net/http"
// 	"strconv"
// 	dto "waysbook/dto/result"

// 	"waysbook/repositories"

// 	"github.com/golang-jwt/jwt/v4"
// 	"github.com/labstack/echo/v4"
// )

// type handlerOrder struct {
// 	OrderRepository repositories.OrderRepository
// }

// func HandlerOrder(OrderRepository repositories.OrderRepository) *handlerOrder {
// 	return &handlerOrder{OrderRepository}
// }

// func (h *handlerOrder) AddOrder(c echo.Context) error {

// 	userLogin := c.Get("userLogin")
// 	userId, _ := strconv.Atoi(fmt.Sprintf("%v", userLogin.(jwt.MapClaims)["id"]))
// 	// userId := userLogin.(jwt.MapClaims)["id"]
// 	id, _ := strconv.Atoi(c.Param("id"))

// 	err := h.OrderRepository.AddOrder(userId, id)
// 	if err != nil {

// 		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 	}
// 	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK})
// }
