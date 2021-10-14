import SnackbarProvider from './shared/SnackbarProvider';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './route';
import UserProvider from './UserProvider/index';
import MaterialThemeProvider from './MaterialThemeProvider'
import HeadProvider from './HeadProvider';
import WindowWidthProvider from './WindowWidthProvider';
function Root() {
  return (
    <>
      <WindowWidthProvider>
        <HeadProvider />
        <MaterialThemeProvider>
          <UserProvider>
            <BrowserRouter>
              <SnackbarProvider>
                <MainRouter />
              </SnackbarProvider>
            </BrowserRouter>
          </UserProvider>
        </MaterialThemeProvider>
      </WindowWidthProvider>
    </>
  );
}

export default Root;
