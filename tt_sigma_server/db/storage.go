package db

import (
	"fmt"
	"github.com/google/uuid"
	"slices"
)

// mocked data so that the server does not start with empty db
var mockUsers = []User{
	{
		Id:      uuid.NewString(),
		Name:    "Joseph",
		Surname: "Atckings",
		Hobby:   "Golf",
		Age:     33,
	},
	{
		Id:      uuid.NewString(),
		Name:    "Anakin",
		Surname: "Skywalker",
		Hobby:   "Skiing",
		Age:     29,
	},
	{
		Id:      uuid.NewString(),
		Name:    "Vasyl",
		Surname: "Holoborod'ko",
		Hobby:   "Poetry",
		Age:     22,
	},
}

/*
Storage interface, it is implemented as an interface in order
to be able to use any other implementation in case the primary db needs to be changed
*/
type Storage interface {
	Get(string) (User, error)
	Create(CreateUserParams) User
	List() []User
	Delete(string)
	Update(UpdateUserParams) User
}

// LocalStorage is a structure to store and access data locally
type LocalStorage struct {
	UsersCollection []User
}

// NewLocalStorage is the function that returns the new instance of local storage
func NewLocalStorage() (storage *LocalStorage) {
	return &LocalStorage{
		UsersCollection: mockUsers,
	}
}

// Get is a function that looks for particular user in the slice by the user's id
func (storage *LocalStorage) Get(userId string) (User, error) {
	var user User
	idx := slices.IndexFunc(storage.UsersCollection, func(user User) bool {
		return user.Id == userId
	})
	if idx == -1 {
		err := fmt.Errorf("there is no user with such an id")
		return user, err
	}
	user = storage.UsersCollection[idx]

	return user, nil
}

// CreateUserParams is a structure that should be passed in order to create new user
type CreateUserParams struct {
	Name    string
	Surname string
	Hobby   string
	Age     int64
}

// Create handles appending the new user to the slice of users in the localStorage
func (storage *LocalStorage) Create(userToAdd CreateUserParams) User {
	storage.UsersCollection = append(storage.UsersCollection, User{
		Id:      uuid.NewString(),
		Name:    userToAdd.Name,
		Surname: userToAdd.Surname,
		Hobby:   userToAdd.Hobby,
		Age:     userToAdd.Age,
	})
	return storage.UsersCollection[len(storage.UsersCollection)-1]
}

// Delete is a function that deletes the user from the slice by id
func (storage *LocalStorage) Delete(id string) {
	storage.UsersCollection = slices.DeleteFunc(storage.UsersCollection, func(user User) bool {
		return user.Id == id
	})
}

// List returns the slice of users stored in local storage
func (storage *LocalStorage) List() []User {
	return storage.UsersCollection
}

// UpdateUserParams is a structure that should be passed in order to update user
type UpdateUserParams struct {
	Id      string
	Name    string
	Surname string
	Hobby   string
	Age     int64
}

// Update is a function that finds the user by id and updates the user's data
func (storage *LocalStorage) Update(params UpdateUserParams) User {
	var res User
	for idx, val := range storage.UsersCollection {
		if val.Id == params.Id {
			storage.UsersCollection[idx] = User(params)
			res = storage.UsersCollection[idx]
		}

	}
	return res
}
