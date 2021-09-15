import './Root.css';
import SnackbarProvider from './shared/SnackbarProvider';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './route';
import UserProvider from './UserProvider/index';
function Root() {
  return (
    <UserProvider>
      <BrowserRouter>
        <SnackbarProvider>
          <MainRouter />
        </SnackbarProvider>
      </BrowserRouter>
    </UserProvider>
  );
}

export default Root;
