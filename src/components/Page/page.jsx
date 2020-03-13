import React from 'react';
import { Grid, Typography } from '@material-ui/core/index';
import { APP_TITLE } from '../../Constants';
import { MessageList } from '../MessageList/message-list';
import { usePageStyles } from './pageStyles.js';

const Page = () => {
  const classes = usePageStyles();

  return (
    <Grid container component="main" direction="column" spacing={1}>
      <Grid item component="header">
        <Typography className={classes.heading} component="h1">
          {APP_TITLE}
        </Typography>
      </Grid>
      <Grid item component="article">
        <MessageList />
      </Grid>
    </Grid>
  );
};

export default Page;
