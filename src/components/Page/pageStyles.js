import { makeStyles } from '@material-ui/core/styles';

export const usePageStyles = makeStyles(theme => ({
    heading: {
        fontWeight: 'bold',
        fontSize: '1.1rem',
        borderBottom: '2px solid #e8e8e8',
        padding: `${theme.spacing(1.5)}px ${theme.spacing(5)}px`
    }
}));