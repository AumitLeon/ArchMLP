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
import UploadDiaglog from './UploadDiaglog';
import PropTypes from 'prop-types';

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

function FileUpload({ dataName, setDataName, file, setFile }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = uploadedFile => {
    setFile(uploadedFile);
    setOpen(true);
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
              onChange={event => setDataName(event.target.value)}
            />
            <input
              accept=".csv"
              className={classes.input}
              id="contained-button-file"
              type="file"
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
            <UploadDiaglog
              open={open}
              setOpen={setOpen}
              dataName={dataName}
              file={file}
            />
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

FileUpload.propTypes = {
  dataName: PropTypes.string.isRequired,
  setDataName: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired,
  setFile: PropTypes.func.isRequired
};

export default FileUpload;
