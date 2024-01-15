import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
/*DeleteAlert component renders dialog window
* to ensure that the user did not miss-click the delete
* button.
*
* It takes onClose and onSubmit functions as the props
* in order to control those events, also the id of a user from the
* tile where the button was triggered is passed as a prop*/
const DeleteAlert = (props) => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          props.onSubmit(props.currentUser.Id);
        },
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete the user?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {"Keep in mind that the deleted data cannot be restored"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Disagree</Button>
        <Button type="submit" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAlert;
