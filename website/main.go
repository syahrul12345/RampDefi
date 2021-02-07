package main

import (
	"log"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println(err)
	}
	hostDashboard()
}

func hostDashboard() {
	app := gin.New()
	stakingPath := "./build"
	app.Use(static.Serve("/", static.LocalFile(stakingPath, true)))
	app.Run(":" + "8000")
}
