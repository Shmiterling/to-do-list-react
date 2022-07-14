import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'
import './style/style.scss';
import App from './components/app/App';
import StartingPage from './components/startingpage/StartingPage';
import LogIn from './components/login/LogIn';
import CreateAccount from './components/createaccount/CreateAccount';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StartingPage />}></Route>
          <Route path='/app/*' element={<App />}></Route>
          <Route path='/log_in' element={<LogIn />}></Route>
          <Route path='/create_account' element={<CreateAccount />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
