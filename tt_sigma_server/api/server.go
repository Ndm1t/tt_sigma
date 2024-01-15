package api

import (
	"github.com/gin-gonic/gin"
	"tt_sigma_server/db"
	"tt_sigma_server/util"
)

// Server structure
type Server struct {
	config  util.Config
	router  *gin.Engine
	storage db.Storage
}

// NewServer returns new server instance
func NewServer(config util.Config, storage db.Storage) *Server {
	server := &Server{
		config:  config,
		storage: storage,
	}

	server.setupRouter()

	return server
}

// Setting up handlers for the requests matching those to the endpoints
func (server *Server) setupRouter() {
	router := gin.Default()

	router.POST("/users", server.createUser)
	router.GET("/users", server.listUsers)
	router.GET("/users/:id", server.getUser)
	router.DELETE("/users/:id", server.deleteUser)
	router.PATCH("/users", server.updateUser)

	server.router = router

}

// Start is the function that starts the server
func (server *Server) Start() error {
	return server.router.Run(server.config.ServerAdress)
}
