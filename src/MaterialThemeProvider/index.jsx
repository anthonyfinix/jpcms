import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
const MaterialThemeProvider = ({ children }) => {
    return <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>
}

export default MaterialThemeProvider