import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ALERT_ROOT_ID, ERROR_PRIORITY, MESSAGE_PRIORITY_MAPPING } from '../Common/Constants';
import Alert from '@material-ui/lab/Alert';
import { IconButton, Typography } from '@material-ui/core/index';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { usePageAlertStyles } from './pageAlertStyles';

/**
props = {
  message: string,
  id: string,
  handleCloseClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
 */

const pageAlertRoot = document.getElementById(ALERT_ROOT_ID);

const PageAlert = props => {
  const classes = usePageAlertStyles();
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    if (pageAlertRoot) {
      pageAlertRoot.appendChild(elRef.current);
    }
    return () => {
      if (pageAlertRoot) {
        pageAlertRoot.removeChild(elRef.current);
      }
    };
  });
  return createPortal(
    <Alert
      data-testid="page-alert"
      className={classes.root}
      severity={MESSAGE_PRIORITY_MAPPING[ERROR_PRIORITY]}
      variant="filled"
      icon={
        <IconButton className={classes.button} onClick={props.handleCloseClick}>
          <CloseOutlinedIcon />
        </IconButton>
      }
    >
      <Typography>{props.message}</Typography>
    </Alert>,
    elRef.current
  );
};

export { PageAlert };
