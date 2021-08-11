import React, { useState } from "react";
import "./user.css";
import useStyles from "./styles";
import { Dialog, Slide, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Index = ({ user }) => {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const classes = useStyles();

  const handleCloseUpdateForm = () => {
    setOpenUpdateDialog(false);
  };
  const handleOpenUpdateForm = () => {
    setOpenUpdateDialog(true);
  };
  const showUserDetail = () => {
    handleOpenUpdateForm();
  };
  return (
    <>
      <Dialog
        id="detailed_user"
        open={openUpdateDialog}
        TransitionComponent={Transition}
        keepMounted
        disableEscapeKeyDown
        disableBackdropClick
        onClose={handleCloseUpdateForm}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div id="dialog-title" className={classes.dialogTitle}>
          Detailed User Information
        </div>
        <div className={classes.dialogContent}>
          <div className={classes.title}>
            <div>Staff Code</div>
            <div>Full Name</div>
            <div>Username</div>
            <div>Date Of Birth</div>
            <div>Gender</div>
            <div>Joined Date</div>
            <div>Type</div>
            <div>Location</div>
          </div>
          <div>
            <div>{user.staffCode}</div>
            <div>{user.fullName}</div>
            <div>{user.username}</div>
            <div>{user.dateOfBirth}</div>
            <div>{user.gender}</div>
            <div>{user.joinedDate}</div>
            <div>{user.type.replace("ROLE_", "")}</div>
            <div>{user.location}</div>
          </div>
        </div>
        <Button onClick={handleCloseUpdateForm} color="primary">
          Cancel
        </Button>
      </Dialog>
      <tr>
        <td onClick={showUserDetail}>{user.staffCode}</td>
        <td onClick={showUserDetail}>{user.fullName}</td>
        <td onClick={showUserDetail}>{user.username}</td>
        <td onClick={showUserDetail}>{user.joinedDate}</td>
        <td onClick={showUserDetail}>{user.type.replace("ROLE_", "")}</td>
        <td id="icon_zone">
          <div id="edit_icon">
            <EditIcon />
          </div>
          <div>
            <DeleteIcon />
          </div>
        </td>
      </tr>
    </>
  );
};

export default Index;