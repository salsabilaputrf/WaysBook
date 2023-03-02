package main

import (
	"fmt"
	"log"
	"os"
	"waysbook/database"
	"waysbook/pkg/mysql"
	"waysbook/routes"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/echo/v4"
)

func main() {
	// godotenv
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// SERVER_NAME := os.Getenv("SERVER_NAME")
	PORT := os.Getenv("PORT")
	VERSION := os.Getenv("API_VERSION")

	e := echo.New()

	mysql.DatabaseInit()
	database.RunMigration()
	database.RunSeeder()



	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PATCH, echo.DELETE},
		AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization"},
	}))

	routes.RouteInit(e.Group("/api/" + VERSION))

	fmt.Println("server running localhost:5000")
	e.Logger.Fatal(e.Start(":" + PORT))
}
