import React from 'react';
import { createPortal } from 'react-dom';
import { ALERT_ROOT_ID, ERROR_PRIORITY, MESSAGE_PRIORITY_MAPPING } from '../Common/Constants';
import Alert from '@material-ui/lab/Alert';
import { IconButton, Typography } from '@material-ui/core/index';
// import { Card, IconButton, Typography } from '@material-ui/core/index';
// import Close from '@material-ui/icons/Close';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { usePageAlertStyles } from './pageAlertStyles';
/**
props = {
  message: string,
  id: string,
  handleCloseClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
 */

const PageAlert = props => {
  const classes = usePageAlertStyles();

  return (
    <>
      {createPortal(
        <Alert
          zIndex="tooltip"
          className={classes.root}
          severity={MESSAGE_PRIORITY_MAPPING[ERROR_PRIORITY]}
          variant="filled"
          icon={<CloseOutlinedIcon className={classes.button} onClick={props.handleCloseClick} />}
        >
          <Typography>{props.message}</Typography>
        </Alert>,
        document.getElementById(ALERT_ROOT_ID)
      )}
    </>
  );
};

export { PageAlert };
