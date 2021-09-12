import './Root.css';
import SnackbarProvider from './shared/SnackbarProvider';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './route';
function Root() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <MainRouter />
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default Root;
