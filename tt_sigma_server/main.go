package main

import (
	"log"
	"tt_sigma_server/api"
	"tt_sigma_server/db"
	"tt_sigma_server/util"
)

// Main function is executed in order to run the server
func main() {
	//Loading the config
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("Couldn't load config", err)
	}
	//initializing the local storage
	storage := db.NewLocalStorage()
	//initializing the server instance passing config and storage
	server := api.NewServer(config, storage)
	//starting the server
	if err := server.Start(); err == nil {
		log.Fatal("Couldn't start the server on port: " + config.ServerAdress)
	}
}
