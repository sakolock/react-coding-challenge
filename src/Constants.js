export const APP_TITLE = 'Help.com Coding Challenge';
export const ERROR_PRIORITY = 1;
export const WARNING_PRIORITY = 2;
export const INFO_PRIORITY = 3;
export const MESSAGE_PRIORITY_MAPPING = {
    [ERROR_PRIORITY]: 'error',
    [WARNING_PRIORITY]: 'warning',
    [INFO_PRIORITY]: 'info'
};
export const ALERT_ROOT_ID = 'alert';
export const ALERT_DURATION = 2000; // in ms

export const TEST_IDS = {
    pageAlert: {
        component: 'page-alert',
        closeButton: 'alert-close'
    },
    messageList: {
        component: 'message-list',
        clearAllButton: 'clear-all'
            // sectionCount: `${sectionType}-count` // this is dynamic, so no constant
    },
    message: {
        // component: `message-${MESSAGE_PRIORITY_MAPPING[priority]}` // this is dynamic, so no constant
        // content: `${id}` // this is dynamic, so no constant
    }
};