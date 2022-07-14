import { Routes, Route } from "react-router-dom";

import Profile from "../profile/Profile";
import Navbar from "../navbar/Navbar";
import DailyList from "../dailylist/DailyList";
import TasksLibrary from "../taskslibrary/TasksLibrary";
import Edit from "../editprofile/edit";
import ChangePassword from "../changepassword/ChangePassword";
import CreateTask from "../createtask/CreateTask";

export default function App(): JSX.Element {

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path='/' element={<DailyList />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
                <Route path='/tasks_library' element={<TasksLibrary />}></Route>
                <Route path='/edit' element={<Edit />}></Route>
                <Route path='/change_password' element={<ChangePassword />}></Route>
                <Route path='/create_task' element={<CreateTask />}></Route>
            </Routes>
        </div>
    )
}