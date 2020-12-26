import React from 'react';
import { Grid, Button, Typography, SvgIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  page: {
    margin: '0 10%',
  },
  menu: {
    backgroundColor: '#e9ecef',
    flexGrow: 1,
  },
  buttonText: {
    fontSize: 16,
  },
}));

const Problem = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid container direction="row" className={classes.menu}>
        <Grid item xs={6}>
          <Button className={classes.buttonText}>문제 설명</Button>
          <Button className={classes.buttonText}>맞은 사람</Button>
          <Button className={classes.buttonText}>채점 현황</Button>
        </Grid>
        <Grid item xs={6}>
            
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Problem;
