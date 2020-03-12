import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@material-ui/core/index';
import { MESSAGE_PRIORITY_MAPPING } from '../Common/Constants';
import { useMessageStyles } from './messageStyles';

/**
  props = {
    id: string;
    message: string;
    priority: 1 | 2 | 3;
    deleteMessage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, messagesKey: string, id: string) => void;
  }
 */

const Message = props => {
  const classes = useMessageStyles();
  const { id, message, priority, deleteMessage } = props;

  return (
    <Card
      data-testid="message"
      raised={true}
      className={`${classes.message} ${classes[MESSAGE_PRIORITY_MAPPING[priority]]}`}
    >
      <CardContent data-testid={`${id}`}>
        <Typography component="p" variant="subtitle2">
          {message}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className={classes.button} onClick={deleteMessage}>
          Clear
        </Button>
      </CardActions>
    </Card>
  );
};

export { Message };
