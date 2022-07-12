import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeToLibrary } from "../../store/navbarSlice";
import { TaskList } from "../dailylist/DailyList";
import Task from "../task/Task";
import axios from "axios";

export default function TasksLibrary(): JSX.Element {

    const [data, setData] = useState<TaskList[]>([]);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(changeToLibrary())
        getData()
    }, [])

    const getData = () => {
        let config = {
            method:'GET',
            url: 'https://todo.coldwinternight.ru/api/tasks?userid=' + localStorage.user_id,
            headers: {
                'Authorization': localStorage.jwt,
            },
        };

        axios(config)
            .then(res => {
                setData(res.data)
                if(res.data[0] === undefined) {
                    setIsEmpty(true)
                } else {
                    setIsEmpty(false)
                }
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            }) 


    }

    const createNewTask = () => {
        navigate('../create_task')
    }

    return (
        <div className="TasksLibrary">
            {!isEmpty && <div>
                <FontAwesomeIcon className='add_icon' icon={faCirclePlus} onClick={() => { createNewTask() }}></FontAwesomeIcon>
                <div className="tasks_list">
                    {data.map((task) => {
                        return <Task key={task.id} id={task.id} title={task.title} description={task.task_body} completed={task.completed} today={task.today} renderedIn='library' />
                    })}
                </div>
                <div className="safe_container"></div>
            </div>}

            {isEmpty && <div className="empty_daily">
                <h1>Well Done</h1>
                <p>Seems you’ve already done all the tasks!
                    Perfect time to create a <span>NEW</span> one!</p>
                <FontAwesomeIcon onClick={() => createNewTask()} icon={faCirclePlus} className='add_task'></FontAwesomeIcon>
            </div>}
        </div>
    )
}