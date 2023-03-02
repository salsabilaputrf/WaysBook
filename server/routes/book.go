package routes

import (
	"waysbook/handlers"
	"waysbook/pkg/middleware"
	"waysbook/pkg/mysql"
	"waysbook/repositories"

	"github.com/labstack/echo/v4"
)

func BookRoutes(e *echo.Group) {
	bookRepository := repositories.RepositoryBook(mysql.DB)
	h := handlers.HandlerBook(bookRepository)

	e.GET("/books", h.AllBook)
	e.POST("/addBook", middleware.Auth( middleware.UploadFile(h.AddBook)))
	e.PATCH("/addPromo/:id", middleware.Auth(h.AddPromo))
	e.GET("/listAddPromo", middleware.Auth(h.ListAddPromo))
	e.GET("/listPromoBook", h.ListPromoBook)
	e.GET("/listBook", h.ListBook)
	e.GET("/book/:id", h.GetBook)
	e.PATCH("/removePromo/:id", h.RemovePromo)
}
