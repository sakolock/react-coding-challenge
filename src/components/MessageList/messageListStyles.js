import { makeStyles } from '@material-ui/core/styles';

export const useMessageListStyles = makeStyles(theme => ({
    heading: {
        textTransform: 'capitalize',
        fontWeight: 'bold'
    },
    buttonContainer: {
        marginBottom: theme.spacing(8)
    },
    button: {
        width: '6rem'
    }
}));