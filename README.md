# Steps to run the application

## Step 1:
Once the repository is cloned go to the server directory \
and run the `cd tt_sigma_server`.
## Step 2:
Now you should install the dependencies for server to work \
properly, type `go mod download` into the terminal
## Step 3
Once the dependencies are installed run `make server` into \
terminal, the script is defined in the makefile to make it easier
####
Server should be running locally on port 8080, the port is configurable \
via variable stored in `tt_sigma_server\app.env` file
## Step 4
The next step is to run the client side of an application. \
To do so go back to the root directory by typing `cd ..` \
into terminal. Once there go to the client directory using \
`cd tt_sigma_client`
## Step 5
When in the client directory you need to install the \
dependencies. Do so by typing `npm i` into terminal
## Step 6
Once the dependencies are installed run the frontend \
by typing `npm start` into terminal. Now the frontend is \
hosted locally on port 3000 

### That's it, thank you
