package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"tt_sigma_server/db"
)

// CreateUserReq is a structure for create user request
type CreateUserReq struct {
	Name    string `json:"name" binding:"required"`
	Surname string `json:"surname" binding:"required"`
	Hobby   string `json:"hobby" binding:"required"`
	Age     int64  `json:"age" binding:"required"`
}

// Handler function to create the user
func (server *Server) createUser(context *gin.Context) {
	//Declaring req variable to store the request
	var req CreateUserReq
	//Binding request to the req variable
	if err := context.ShouldBindJSON(&req); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"success": "false",
			"error":   err,
		})
		return
	}
	//declaring params variable to pass it to the db request
	var params = db.CreateUserParams{
		Name:    req.Name,
		Surname: req.Surname,
		Hobby:   req.Hobby,
		Age:     req.Age,
	}

	/*performing request to create user in the database
	expecting no errors since the localStorage doesn't return
	those in create request*/
	user := server.storage.Create(params)

	//serving the response
	context.JSON(http.StatusOK, gin.H{
		"success": "true",
		"data":    user,
	})

	return

}

// GetUserReq is a structure for get user request
type GetUserReq struct {
	Id string `uri:"id" binding:"required"`
}

// Handler function to create the user
func (server *Server) getUser(context *gin.Context) {
	//Declaring req variable to store the request
	var req GetUserReq
	//Binding request to the req variable
	if err := context.ShouldBindUri(&req); err != nil {
		fmt.Println(err)
		context.JSON(http.StatusBadRequest, gin.H{
			"success": "false",
			"data":    err,
		})
		return
	}
	//Calling data access function to the server storage
	//expecting an error in case the user is not found
	user, err := server.storage.Get(req.Id)

	//if error exists serving error response
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"success": "false",
			"data":    err.Error(),
		})
		return
	}

	//serving response
	context.JSON(http.StatusOK, gin.H{
		"success": "true",
		"data":    user,
	})
	return

}

// Handler for list user request
func (server *Server) listUsers(context *gin.Context) {
	//Calling data access function to get the list of the stored users
	users := server.storage.List()
	//serving the response
	context.JSON(http.StatusOK, gin.H{
		"success": "true",
		"data":    users,
	})
	return
}

// handler function to delete user
func (server *Server) deleteUser(context *gin.Context) {
	//Initializing the GetUserReq variable as the requests for get and delete are the same
	var req GetUserReq
	//Binding the request to the req variable
	if err := context.ShouldBindUri(&req); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"success": "false",
			"data":    err,
		})
		return
	}
	//checking if the user exists before trying to delete it
	if _, err := server.storage.Get(req.Id); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"success": "false",
			"data":    err.Error(),
		})
		return
	}
	//deleting the user from the storage
	server.storage.Delete(req.Id)
	//serving the response
	context.JSON(http.StatusOK, gin.H{
		"success": "true",
	})
	return
}

// UpdateUserReq is a structure for update user request
type UpdateUserReq struct {
	Id      string `json:"id" binding:"required"`
	Name    string `json:"name"`
	Surname string `json:"surname"`
	Hobby   string `json:"hobby"`
	Age     int64  `json:"age"`
}

// Handler for update user request
func (server *Server) updateUser(context *gin.Context) {
	//Declaring req variable to store the request
	var req UpdateUserReq
	//Binding request to the req variable

	if err := context.ShouldBindJSON(&req); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"success": "false",
			"data":    err,
		})
		return
	}
	//Checking if the user exists in the db
	user, err := server.storage.Get(req.Id)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"success": "false",
			"data":    err.Error(),
		})
		return
	}
	//Initializing params for updating user
	params := db.UpdateUserParams{
		Id:      req.Id,
		Name:    user.Name,
		Surname: user.Surname,
		Hobby:   user.Hobby,
		Age:     user.Age,
	}
	//Checking if the parameters are present in request as those are not required except for id
	if req.Name != "" {
		params.Name = req.Name
	}

	if req.Surname != "" {
		params.Surname = req.Surname
	}

	if req.Hobby != "" {
		params.Hobby = req.Hobby
	}

	if req.Age != int64(0) {
		params.Age = req.Age
	}
	//updating user through data access function
	user = server.storage.Update(params)
	//serving the response
	context.JSON(http.StatusOK, gin.H{
		"success": "true",
		"data":    user,
	})
	return
}
