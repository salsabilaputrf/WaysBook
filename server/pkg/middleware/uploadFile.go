package middleware

import (
	"io"
	"io/ioutil"
	"net/http"

	"github.com/labstack/echo/v4"
)

func UploadFile(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		filePdf, err := c.FormFile("book_attachment")
		if err != nil && err != http.ErrMissingFile {
			return c.JSON(http.StatusBadRequest, err)
		}

		if filePdf != nil {
			src, err := filePdf.Open()
			if err != nil {
				return c.JSON(http.StatusBadRequest, err)
			}
			defer src.Close()

			tempFile, err := ioutil.TempFile("uploads", "pdf-*.pdf")
			if err != nil {
				return c.JSON(http.StatusBadRequest, err)
			}
			defer tempFile.Close()

			if _, err = io.Copy(tempFile, src); err != nil {
				return c.JSON(http.StatusBadRequest, err)
			}

			data := tempFile.Name()
			c.Set("dataPDF", data)
		} else {
			c.Set("dataPDF", "")
		}

		fileImage, err := c.FormFile("image")
		if err != nil && err != http.ErrMissingFile {
			return c.JSON(http.StatusBadRequest, err)
		}

		if fileImage != nil {
			src, err := fileImage.Open()
			if err != nil {
				return c.JSON(http.StatusBadRequest, err)
			}
			defer src.Close()

			tempFile, err := ioutil.TempFile("uploads", "image-*.png")
			if err != nil {
				return c.JSON(http.StatusBadRequest, err)
			}
			defer tempFile.Close()

			if _, err = io.Copy(tempFile, src); err != nil {
				return c.JSON(http.StatusBadRequest, err)
			}

			data := tempFile.Name()
			c.Set("dataImage", data)
		} else {
			c.Set("dataImage", "")
		}

		return next(c)
	}
}

// func generatePDFThumbnail(filename string) ([]byte, error) {
// 	// create new gopdf object
// 	pdf := gopdf.GoPdf{}
// 	pdf.Start(gopdf.Config{PageSize: *gopdf.PageSizeA4})
// 	// proxy := api.GoPdfProxy(&pdf)

// 	// read PDF file and add first page to gopdf object
// 	// err := proxy.ReadPdf(filename, nil)
// 	// if err != nil {
// 	// 	return nil, err
// 	// }
// 	// proxy.AddPage()

// 	// // get image of first page from gopdf object
// 	// img, err := proxy.ImageProxy(1)
// 	// if err != nil {
// 	// 	return nil, err
// 	// }

// 	// resize image
// 	resized := resizeImage(, 200, 200)

// 	// encode image as JPEG and return as byte slice
// 	buf := new(bytes.Buffer)
// 	if err := jpeg.Encode(buf, resized, nil); err != nil {
// 		return nil, err
// 	}
// 	return buf.Bytes(), nil
// }

// func resizeImage(img image.Image, width, height int) image.Image {
// 	// Calculate the new image size
// 	bounds := img.Bounds()
// 	ratio := float64(bounds.Dy()) / float64(bounds.Dx())
// 	newHeight := int(float64(width) * ratio)
// 	if newHeight > height {
// 		newHeight = height
// 		width = int(float64(height) / ratio)
// 	}

// 	// Resize the image
// 	newImg := image.NewRGBA(image.Rect(0, 0, width, newHeight))
// 	resized := resize.Thumbnail(uint(width), uint(newHeight), img, resize.Lanczos3)
// 	draw.Draw(newImg, newImg.Bounds(), resized, bounds.Min, draw.Src)

// 	return newImg
// }
