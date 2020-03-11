import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@material-ui/core/index';
import Api from '../../api';
import { Message } from '../Message/message';
import { PageAlert } from '../PageAlert/page-alert';
import { ERROR_PRIORITY, MESSAGE_PRIORITY_MAPPING, ALERT_DURATION } from '../Common/Constants';
import { useMessageListStyles } from './messageListStyles';

const defaultMessagesObject = { 1: {}, 2: {}, 3: {} };

const MessageList = () => {
  const classes = useMessageListStyles();
  const [messages, setMessages] = useState({ ...defaultMessagesObject });
  const [apiInfo, setApi] = useState({
    api: {},
    isRunning: false
  });
  const [alert, setAlert] = useState({
    message: {},
    timeoutId: null,
    showing: false
  });

  useEffect(() => {
    const newApi = new Api({
      // @ts-ignore TODO
      messageCallback: (message: MessageProps) => {
        messageCallback(message);
      }
    });
    newApi.start();
    setApi({ api: newApi, isRunning: true });

    return () => {
      // @ts-ignore TODO
      if (apiInfo && apiInfo.api) {
        apiInfo.api.stop();
        setApi({
          api: {},
          isRunning: false
        });
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(alert.timeoutId);
    };
  }, [alert]);

  const messageCallback = (message: MessageProps) => {
    if (message.priority === Number(ERROR_PRIORITY)) {
      showAlert(message);
    }

    setMessages(messages => {
      const currentMessagesForGroup = messages[message.priority] || {};

      return {
        ...messages,
        [message.priority]: { ...currentMessagesForGroup, [message.id]: message }
      };
    });
  };

  const handleToggleClick = () => {
    const { api, isRunning } = apiInfo;

    isRunning ? api.stop() : api.start();

    setApi(apiInfo => {
      return {
        ...apiInfo,
        isRunning: !isRunning
      };
    });
  };

  const handleClearClick = () => {
    setMessages({ ...defaultMessagesObject });
  };

  const closeAlert = () => {
    setAlert({
      message: {},
      timeoutId: null,
      showing: false
    });
  };

  const showAlert = message => {
    setAlert({
      message,
      timeoutId: setTimeout(closeAlert, ALERT_DURATION),
      showing: true
    });
  };

  const deleteMessage = (priority, id) => {
    setMessages(messages => {
      const updatedMessages = { ...messages[priority] };
      delete updatedMessages[id];

      return {
        ...messages,
        [priority]: { ...updatedMessages }
      };
    });
  };

  return (
    <Grid container component="section" justify="center">
      <Grid
        container
        className={classes.buttonContainer}
        component="section"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <Button
            size="small"
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleToggleClick}
          >
            {apiInfo.isRunning ? 'Stop' : 'Start'}
          </Button>
        </Grid>
        <Grid item>
          <Button
            size="small"
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleClearClick}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
      {alert.showing && <PageAlert {...alert.message} handleCloseClick={closeAlert} />}
      <Grid container item component="section" justify="center" alignItems="flex-start" xs={12} md={9} spacing={1}>
        {Object.keys(messages).map(messagesKey => {
          const messagesObj = messages[messagesKey];

          return (
            <Grid key={messagesKey} item container component="section" direction="column" xs={4} spacing={1}>
              <Grid item component="header">
                <Typography component="h2" className={classes.heading}>
                  {MESSAGE_PRIORITY_MAPPING[messagesKey]} Type {messagesKey}
                </Typography>
                <Typography component="p" variant="subtitle2">
                  Count {Object.keys(messagesObj).length}
                </Typography>
              </Grid>
              <Grid component="section" container item alignItems="stretch" direction="column-reverse" spacing={1}>
                {Object.entries(messagesObj).map(([id, message]) => (
                  <Grid key={id} item xs="auto">
                    <Message {...message} deleteMessage={() => deleteMessage(messagesKey, id)} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export { MessageList };
