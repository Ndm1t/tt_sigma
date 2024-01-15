import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
/*The component renders the modal window with
* the form and cancel/update controls
* the functions to control cancel/update are
* passed as a props also the current user from the tile
* is passed in order to pass the id of the user
* that should be updated to the server
* form fields are name,surname,hobby and age
* none of those are required*/
const UpdateModal = (props) => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          formJson.age = Number(formJson.age);
          props.onSubmit({ id: props.currentUser.Id, ...formJson });
        },
      }}
    >
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          placeholder={props.currentUser.Name}
          margin="dense"
          id="name"
          name="name"
          label="User's Name"
          type="string"
          fullWidth
          variant="filled"
        />
        <TextField
          autoFocus
          placeholder={props.currentUser.Surname}
          margin="dense"
          id="surname"
          name="surname"
          label="User's Surname"
          type="string"
          fullWidth
          variant="filled"
        />
        <TextField
          autoFocus
          placeholder={props.currentUser.Hobby}
          margin="dense"
          id="hobby"
          name="hobby"
          label="User's Hobby"
          type="string"
          fullWidth
          variant="filled"
        />
        <TextField
          autoFocus
          placeholder={props.currentUser.Age}
          margin="dense"
          id="age"
          name="age"
          label="User's Age"
          type="number"
          fullWidth
          variant="filled"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="secondary">
          Close
        </Button>
        <Button type="submit" color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModal;
