import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { upload } from '../apiCalls';

function UploadDialog({ open, setOpen, dataName, file }) {
  //console.log(file.name)
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpload = () => {
    upload(file);
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Upload this file?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`The dataset you upload will be used to preprocess, train, and deploy your machine learning model. 
          Are you sure you want to use the file ${file.name} with the name ${dataName}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        {/* Pass a handler to make POST request to API */}
        <Button onClick={handleUpload} color="primary" autoFocus>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UploadDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  dataName: PropTypes.string.isRequired,
  file: PropTypes.object.isRequired
};

export default UploadDialog;
