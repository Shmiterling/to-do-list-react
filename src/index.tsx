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

import Home from './components/landingpage/LandingPage';
import Profile from './components/profile/Profile';
import MyTasks from './components/mytasks/MyTasks';
import TodaysList from './components/todayslist/TodaysList';

import './style/index.css';
import './style/style.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="to-do-list-react/" element={<Home />}></Route>
          <Route path="to-do-list-react/Profile" element={<Profile />}></Route>
          <Route path="to-do-list-react/MyTasks" element={<MyTasks />}></Route>
          <Route path="to-do-list-react/TodaysList" element={<TodaysList />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
