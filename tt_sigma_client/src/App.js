import React, { useEffect, useState } from "react";
import calls from "./utils/calls.js";
import UserTile from "./components/userTile.js";
import UpdateModal from "./components/updateModal.js";
import AddModal from "./components/addModal.js";
import DeleteAlert from "./components/deleteAlert.js";
import { Alert, Box, Button, Grid, List } from "@mui/material";

function App() {
    //Declaring state variables using useState hook
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [updateModal, setUpdateModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [deleteAlert, setDeleteAlert] = useState(false);

  //function that toggles update modal
  const toggleUpdateModal = () => {
    setUpdateModal(!updateModal);
  };
  //function that toggles add modal
  const toggleAddModal = () => {
    setAddModal(!addModal);
  };
  //function that toggles delete modal
  const toggleDeleteAlert = () => {
    setDeleteAlert(!deleteAlert);
  };
  //handler for submitting the adding of the user
  const handleAddSubmit = async (userData) => {
    await calls.createUser(userData).catch((err) => setError(err.message));
    toggleAddModal();
    await listUsers();
  };
  //handler for submitting the deletion of the user
  const handleDeleteSubmit = async (userId) => {
    await calls.deleteUser(userId).catch((err) => setError(err.message));
    toggleDeleteAlert();
    await listUsers();
  };
  //function that passes the currentUser from tile to modal windows as we need that data there
  const handleCurrentUser = (user, handleModal) => {
    setCurrentUser(user);
    handleModal();
  };
  //function that handles the update of the user's data
  const handleUpdateSubmit = async (userData) => {
    await calls.updateUser(userData).catch((err) => {
      setError(err.message);
    });
    toggleUpdateModal();
    await listUsers();
  };
  //wrapper for the list of users request as it can be reusable
  const listUsers = async () => {
    try {
      const users = await calls.listUsers();
      setUsers(users.data.data);
    } catch (e) {
      throw e;
    }
  };
  //useEffect hook that fetches the users from the server when component is mounted
  useEffect(() => {
    listUsers().catch((e) => {
      setError(e);
    });
  }, []);
  /*The component is wrapped in react fragment
  * it contains the header with the title and the button that triggers add modal,
  * list of user tiles and all available modals,
  * the header and list itself are wrapped in grid component in order to center the elements*/
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: "100vh",
          borderRadius: "30px",
        }}
      >
        <Box
          sx={{
            padding: "2px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            boxShadow: 2,
            maxWidth: 600,
            bgcolor: "info.main",
            position: "relative",
            overflow: "auto",
            maxHeight: 600,
          }}
        >
          <p
            style={{
              color: "white",
              margin: "2px",
            }}
          >
            List of Users
          </p>
          <Button
            onClick={toggleAddModal}
            variant="filled"
            sx={{
              backgroundColor: "#ffffff",
              ":hover": {
                backgroundColor: "#a4a2a2",
              },
            }}
          >
            Add User
          </Button>
        </Box>
        {error && <Alert severity="error">error</Alert>}
        <List
          sx={{
            width: "100%",
            padding: "5px",
            maxWidth: 600,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 600,
            boxShadow: 2,
            "& ul": { padding: 0 },
          }}
        >
          {users.map((user) => (
            <UserTile
              key={user.Id}
              props={user}
              handleUpdate={toggleUpdateModal}
              handleUser={handleCurrentUser}
              handleDelete={toggleDeleteAlert}
            />
          ))}
        </List>
      </Grid>
      <UpdateModal
        isOpen={updateModal}
        onClose={toggleUpdateModal}
        onSubmit={handleUpdateSubmit}
        currentUser={currentUser}
      />
      <AddModal
        isOpen={addModal}
        onClose={toggleAddModal}
        onSubmit={handleAddSubmit}
      />
      <DeleteAlert
        isOpen={deleteAlert}
        onClose={toggleDeleteAlert}
        onSubmit={handleDeleteSubmit}
        currentUser={currentUser}
      />
    </>
  );
}

export default App;
