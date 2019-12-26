import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  }
}));

function FileUpload() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}></div>

      <Grid container justify="space-around" spacing={1}>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">
            Name of dataset
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            type="text"
            startAdornment={
              <InputAdornment position="start">
                <CloudUploadIcon />
              </InputAdornment>
            }
          />
          <nput
            accept=".csv"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="inherit" component="span">
              Upload
            </Button>
          </label>
        </FormControl>
      </Grid>
    </div>
  );
}

export default FileUpload;
