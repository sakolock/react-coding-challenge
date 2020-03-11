import { makeStyles } from '@material-ui/core/styles';

export const useMessageStyles = makeStyles(theme => ({
    message: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    error: {
        backgroundColor: theme.palette.error.main
    },
    warning: {
        backgroundColor: theme.palette.secondary.main
    },
    info: {
        backgroundColor: theme.palette.primary.light
    },
    button: {
        display: 'inline',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
        textTransform: 'capitalize'
    }
}));