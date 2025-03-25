// pages/_app.js

import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css';  // Optional, if you're using Bootstrap
import '../styles/globals.css';  // Assuming you have global styles

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
