import SnackbarProvider from './shared/SnackbarProvider';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './route';
import UserProvider from './UserProvider/index';
import MaterialThemeProvider from './MaterialThemeProvider'
import HeadProvider from './HeadProvider';
import WindowWidthProvider from './WindowWidthProvider';
import ReduxProvider from './redux';
import CompanyProvider from './company/provider';
function Root() {
  return (
    <>
      <ReduxProvider>
        <WindowWidthProvider>
          <HeadProvider />
          <MaterialThemeProvider>
            <CompanyProvider>
              <UserProvider>
                <BrowserRouter>
                  <SnackbarProvider>
                    <MainRouter />
                  </SnackbarProvider>
                </BrowserRouter>
              </UserProvider>
            </CompanyProvider>
          </MaterialThemeProvider>
        </WindowWidthProvider>
      </ReduxProvider>
    </>
  );
}

export default Root;
