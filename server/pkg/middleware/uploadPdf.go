package middleware

import (
	"net/http"

	// "github.com/disintegration/imaging"
	"github.com/labstack/echo/v4"
	// "github.com/pdfcpu/pdfcpu"
)

func UploadPdf(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		// Menerima file PDF yang dikirim melalui form-data
		file, err := c.FormFile("bookAttachment")

		if file != nil {
			if err != nil {
				return c.JSON(http.StatusBadRequest, err)
			}

			src, err := file.Open()
			if err != nil {
				return c.JSON(http.StatusBadRequest, err)
			}
			defer src.Close()

			// Buat objek PDF dari file handle
			// pdfConfig := pdfcpu.NewDefaultConfiguration()
			// pdfConfig.Cmd.SetMode(pdfcpu.CMDExtractPage)
			// pdfConfig.Cmd.PageSelection = "1"

			// pdf, err := pdfcpu.Read(src, pdfConfig)
			// if err != nil {
			// 	return err
			// }

			// // Buat thumbnail dari halaman pertama PDF
			// page, err := pdfcpu.ExtractPageFile(src, pdfConfig, 1, "path/to/thumbnail/file.png")
			// if err != nil {
			// 	return err
			// }

			// thumbnail, err := imaging.Open("path/to/thumbnail/file.png")
			// if err != nil {
			// 	return err
			// }

			// thumbnail = imaging.Resize(thumbnail, 200, 0, imaging.Lanczos)

			// // Simpan thumbnail ke dalam file PNG
			// err = imaging.Save(thumbnail, "path/to/thumbnail/file.png")
			// if err != nil {
			// 	return err
			// }

			// tempFile, err := ioutil.TempFile("uploads", "image-*.png")
			// if err != nil {
			// 	return c.JSON(http.StatusBadRequest, err)
			// }
			// defer tempFile.Close()

			// if _, err = io.Copy(tempFile, src); err != nil {
			// 	return c.JSON(http.StatusBadRequest, err)
			// }

			// data := tempFile.Name()

			// // filename := data[8:] // delete this

			// c.Set("dataFile", data) // change this
			// return next(c)
		}

		c.Set("dataFile", "")
		return next(c)
	}
}
