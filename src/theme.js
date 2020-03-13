import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#88FCA3',
            main: '#01e2c4'
        },
        secondary: {
            main: '#FCE788'
        },
        error: {
            main: '#F56236',
            dark: '#DE3626'
        }
    }
});

export default theme;