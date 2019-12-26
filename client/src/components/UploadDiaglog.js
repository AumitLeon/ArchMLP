import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function UploadDialog({ open, setOpen, dataName, file }) {
  const handleClose = () => {
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
          {'The dataset you upload will be used to preprocess, train, and deploy your machine learning model. Are you sure you want to upload the file ' +
            file.name +
            ' with the name ' +
            dataName +
            '?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UploadDialog;
