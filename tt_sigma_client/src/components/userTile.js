import { Box, Button, ListItem } from "@mui/material";
/*The component renders the user's data and two buttons
* that trigger the corresponding modals
* as the props it takes user's data and handler functions
* for edit and delete buttons*/
const UserTile = ({ props, handleUpdate, handleUser, handleDelete }) => {
  return (
    <ListItem
      sx={{
        marginBottom: "5px",
        padding: "10px",
        boxShadow: 2,
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
      }}
      key={props.Id}
    >
      <Box
        sx={{
          padding: "2px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
        }}
      >
        Name: {props.Name} {props.Surname}
        <br />
        Hobby: {props.Hobby}
        <br /> Age: {props.Age}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
        }}
      >
        <Button
          onClick={() => handleUser(props, handleUpdate)}
          variant="contained"
          color="success"
          sx={{
            margin: "2px",
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => handleUser(props, handleDelete)}
          variant="contained"
          color="error"
          sx={{
            margin: "2px",
          }}
        >
          Delete
        </Button>
      </Box>
    </ListItem>
  );
};

export default UserTile;
