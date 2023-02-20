package handlers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"
	bookdto "waysbook/dto/book"
	dto "waysbook/dto/result"
	"waysbook/models"
	"waysbook/repositories"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"

	// "github.com/golang-jwt/jwt/v4/request"
	"github.com/labstack/echo/v4"
)

type handlerBook struct {
	BookRepository repositories.BookRepository
}

func HandlerBook(BookRepository repositories.BookRepository) *handlerBook {
	return &handlerBook{BookRepository}
}

func (h *handlerBook) AllBook(c echo.Context) error {
	books, err := h.BookRepository.AllBook()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: books})
}

func (h *handlerBook) AddBook(c echo.Context) error {
	dataPDF := c.Get("dataPDF")
	book_attachment := dataPDF.(string)
	dataImage := c.Get("dataImage")
	thumbnail := dataImage.(string)

	userLogin := c.Get("userLogin")
	userRole := userLogin.(jwt.MapClaims)["role"]
	if userRole != "admin" {
		return c.JSON(http.StatusUnauthorized, dto.ErrorResult{Code: http.StatusUnauthorized, Message: "unathorized"})
	}

	var err error
	// dataFile := c.Get("dataFile").(string)

	price, _ := strconv.Atoi(c.FormValue("price"))
	pages, _ := strconv.Atoi(c.FormValue("pages"))
	publication_date, _ := time.Parse("2006-01-02", c.FormValue("publication_date"))

	request := bookdto.AddBookRequest{
		Title:            c.FormValue("title"),
		Publication_date: publication_date,
		Pages:            pages,
		ISBN:             c.FormValue("isbn"),
		Author:           c.FormValue("author"),
		Price:            float64(price),
		Description:      c.FormValue("description"),
		Book_attachment:  book_attachment,
		Thumbnail:        thumbnail,
	}
	fmt.Println(request)

	validation := validator.New()
	err = validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	book := models.Book{
		Title:            request.Title,
		Publication_date: request.Publication_date,
		Pages:            request.Pages,
		ISBN:             request.ISBN,
		Author:           request.Author,
		Price:            request.Price,
		Description:      request.Description,
		Book_attachment:  request.Book_attachment,
		Thumbnail:        request.Thumbnail,
	}

	respPdf, err := cld.Upload.Upload(ctx, dataPDF, uploader.UploadParams{Folder: "book"})

	respImage, err := cld.Upload.Upload(ctx, dataImage, uploader.UploadParams{Folder: "thumbnail"})

	if err != nil {
		fmt.Println(err.Error())
	}
	book.Book_attachment = respPdf.SecureURL
	book.Thumbnail = respImage.SecureURL

	data, err := h.BookRepository.AddBook(book)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerBook) AddPromo(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userRole := userLogin.(jwt.MapClaims)["role"]
	if userRole != "admin" {
		return c.JSON(http.StatusUnauthorized, dto.ErrorResult{Code: http.StatusUnauthorized, Message: "unathorized"})
	}

	id, _ := strconv.Atoi(c.Param("id"))


	discount, _ := strconv.Atoi(c.FormValue("discount"))
	fmt.Println(discount)

	request := bookdto.AddPromoRequest{
		Discount: discount,
	}
	fmt.Println("tiga")

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		fmt.Println("satu")
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		
	}

	data, err := h.BookRepository.AddPromo(request.Discount, id)
	if err != nil {
	
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerBook) ListAddPromo(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userRole := userLogin.(jwt.MapClaims)["role"]
	if userRole != "admin" {
		return c.JSON(http.StatusUnauthorized, dto.ErrorResult{Code: http.StatusUnauthorized, Message: "unathorized"})
	}

	books, err := h.BookRepository.ListAddPromo()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: books})
}

func (h *handlerBook) ListPromoBook(c echo.Context) error {
	

	books, err := h.BookRepository.ListPromoBook()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: books})
}

func (h *handlerBook) ListBook(c echo.Context) error {
	

	books, err := h.BookRepository.ListAddPromo()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: books})
}

func (h *handlerBook) GetBook(c echo.Context) error {
	
	
	id, _ := strconv.Atoi(c.Param("id"))


	data, err := h.BookRepository.GetBook(id)
	if err != nil {

		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerBook) AddOrder(c echo.Context) error {
	
	userLogin := c.Get("userLogin")
	userId, _:= strconv.Atoi(fmt.Sprintf("%v", userLogin.(jwt.MapClaims)["id"]))
	// userId := userLogin.(jwt.MapClaims)["id"]
	id, _ := strconv.Atoi(c.Param("id"))


	err := h.BookRepository.AddOrder(userId, id)
	if err != nil {

		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK})
}
