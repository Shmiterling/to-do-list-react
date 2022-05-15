import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import LogIn from './components/login/LogIn';
import SignUp from './components/signup/SignUp';
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
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="to-do-list-react/Home" element={<Home />}></Route>
        <Route path="to-do-list-react/LogIn" element={<LogIn />}></Route>
        <Route path="to-do-list-react/SignUp" element={<SignUp />}></Route>
        <Route path="to-do-list-react/Profile" element={<Profile />}></Route>
        <Route path="to-do-list-react/MyTasks" element={<MyTasks />}></Route>
        <Route path="to-do-list-react/TodaysList" element={<TodaysList />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
