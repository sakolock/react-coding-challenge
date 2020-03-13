import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@material-ui/core/index';
import Api from '../../api';
import { Message } from '../Message/message';
import { PageAlert } from '../PageAlert/page-alert';
import { ERROR_PRIORITY, MESSAGE_PRIORITY_MAPPING, ALERT_DURATION, TEST_IDS } from '../../Constants';
import { useMessageListStyles } from './messageListStyles';

/**
props = {
  messages: {
    1: Array<{id: string, message: string, priority: number}>
    2: Array<{id: string, message: string, priority: number}>
    3: Array<{id: string, message: string, priority: number}>
  }
}
 */

const defaultMessages = { 1: [], 2: [], 3: [] };

const MessageList = props => {
  const classes = useMessageListStyles();
  const [messages, setMessages] = useState(props.messages ? { ...props.messages } : { ...defaultMessages });
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
      messageCallback: (message: MessageProps) => {
        messageCallback(message);
      }
    });
    newApi.start();
    setApi({ api: newApi, isRunning: true });

    return () => {
      if (apiInfo && apiInfo.api && apiInfo.api.stop) {
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
    if (message.priority === ERROR_PRIORITY) {
      showAlert(message);
    }

    setMessages(messages => {
      const currentMessagesForGroup = messages[message.priority] || [];

      return {
        ...messages,
        [message.priority]: [...currentMessagesForGroup, message]
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
    setMessages({ ...defaultMessages });
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
      const updatedMessages = messages[priority].filter(message => message.id !== id);

      return {
        ...messages,
        [priority]: [...updatedMessages]
      };
    });
  };

  return (
    <Grid data-testid={TEST_IDS.messageList.component} container component="section" justify="center">
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
            data-testid={TEST_IDS.messageList.clearAllButton}
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
          const messagesForPriorityLevel = messages[messagesKey];
          const sectionType = MESSAGE_PRIORITY_MAPPING[messagesKey];

          return (
            <Grid key={messagesKey} item container component="section" direction="column" xs={4} spacing={1}>
              <Grid item component="header">
                <Typography component="h2" className={classes.heading}>
                  {sectionType} Type {messagesKey}
                </Typography>
                <Typography data-testid={`${sectionType}-count`} component="p" variant="subtitle2">
                  Count {messagesForPriorityLevel.length}
                </Typography>
              </Grid>
              <Grid component="section" container item alignItems="stretch" direction="column-reverse" spacing={1}>
                {messagesForPriorityLevel.map(message => (
                  <Grid key={message.id} item xs="auto">
                    <Message {...message} handleClearClick={() => deleteMessage(messagesKey, message.id)} />
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
