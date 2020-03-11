import { makeStyles } from '@material-ui/core/styles';

export const usePageAlertStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        left: '50%',
        marginLeft: '-15rem',
        display: 'flex',
        alignItems: 'center',
        width: '30rem',
        color: theme.palette.text.primary
    },
    button: {
        fontSize: '1.4rem',
        padding: theme.spacing(0.5)
            // '&:hover': {
            //     cursor: 'pointer',
            //     backgroundColor: theme.palette.error.dark
            // }
    }
}));