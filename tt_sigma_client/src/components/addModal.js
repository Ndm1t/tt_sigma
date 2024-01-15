import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";

/*The component is used to
render modal window for adding
the user into the list.

Here we get the data for a new user
from the form that contains users:
name, surname, hobby and age,
all of those are required,
user cannot submit form without
filling all of them
*/

const AddModal = (props) => {
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
          props.onSubmit(formJson);
        },
      }}
    >
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
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
          required
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
          required
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
          required
          margin="dense"
          id="age"
          name="age"
          label="Age's Hobby"
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
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
