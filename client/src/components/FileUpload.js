import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://aumitleon.com/">
        Aumit Leon
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function FileUpload() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [dataName, setDataName] = useState('');
  const [file, setFile] = useState({});

  const handleClickOpen = file => {
    setFile(file);
    console.log(file);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            ArchMLP
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CloudUploadIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Upload Dataset
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="dataset"
              label="Dataset Name"
              name="dataset"
              autoComplete="dataset"
              helperText="File must be CSV format"
              autoFocus
              defaultValue={dataName === '' ? null : dataName}
              onChange={event => setDataName(event.target.value)}
            />
            <input
              accept=".csv"
              className={classes.input}
              id="contained-button-file"
              type="file"
              //   onChange={(event) => console.log(event.target.files[0])}
              onChange={event => handleClickOpen(event.target.files[0])}
            />
            <label htmlFor="contained-button-file">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                component="span"
                className={classes.submit}
              >
                Upload
              </Button>
            </label>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
              </DialogTitle>
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
            <Grid container>
              <Grid item xs>
                <Link
                  href="https://aumitleon1.gitbook.io/archmlp/"
                  variant="body2"
                >
                  Documentation
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

export default FileUpload;
