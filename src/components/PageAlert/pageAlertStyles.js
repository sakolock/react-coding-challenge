import { makeStyles } from '@material-ui/core/styles';

export const usePageAlertStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        left: '50%',
        marginLeft: '-15rem',
        display: 'flex',
        alignItems: 'center',
        width: '30rem',
        color: theme.palette.text.primary,
        boxShadow: `0 3px 5px ${theme.palette.text.disabled}`,
        zIndex: 1
    },
    button: {
        fontSize: '1rem',
        padding: 0
    }
}));