import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Task from "../task/Task";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeToDaily } from "../../store/navbarSlice";
import axios from "axios";
import preloader from "../../img/Pulse-1.5s-200px.gif"


export interface TaskList {
    id: string,
    title: string,
    taskBody: string,
    completed: boolean,
    today: boolean
}

export default function DailyList(): JSX.Element {

    const [data, setData] = useState<TaskList[]>([]);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [preloaderVisible, setPreloaderVisible] = useState<boolean>(false);
    const [allCompleted, setAllCompleted] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeToDaily());
        getData();
    }, [])

    useEffect(() => {
        allCompletedCheck()
    },[data])

    const sortData: (data: TaskList[]) => TaskList[] = function (data): TaskList[] {
        let pivot = data[0];
        let length = data.length;

        if (length < 2) {
            return data
        }

        const smaller: TaskList[] = data.filter((task) => task.id < pivot.id);
        const bigger: TaskList[] = data.filter((task) => task.id > pivot.id);

        return sortData(smaller).concat([pivot].concat(sortData(bigger)))

    };

    const getData = () => {

        setPreloaderVisible(true);

        let config = {
            method: 'GET',
            url: 'https://todo.coldwinternight.ru/api/tasks/today',
            headers: {
                'Authorization': localStorage.jwt,
            },
        };

        axios(config)
            .then(res => {
                setPreloaderVisible(false);
                
                setData(sortData(res.data).reverse())
                if (res.data[0] === undefined) {
                    setIsEmpty(true)
                } else {
                    setIsEmpty(false)
                };
            })
            .catch(err => {
                console.log(err)
            })
    }

    const toLibrary = () => {
        navigate('./tasks_library')
    }

    const allCompletedCheck = () => {
        setAllCompleted(false)
        let i = 0
        for (const task of data) {
            if (task.completed === false) {
                i++
            }
        };
        if (i === 0) {
            setAllCompleted(true);
        } else {
            setAllCompleted(false);
        };
    }

    const reverseCompleted = (id: string) => {

        let config = {
            method: 'PATCH',
            url: 'https://todo.coldwinternight.ru/api/tasks/' + id + '/reverseCompleted',
            headers: {
                'Authorization': localStorage.jwt,
            }
        };

        axios(config)
            .then(res => {
                let taskIndex = data.findIndex((task) => task.id === id);
                let task = data[taskIndex];
                task.completed = !task.completed;

                setData(data.slice(0, taskIndex).concat(task).concat(data.slice(taskIndex + 1, data.length)));
                allCompletedCheck()
            })
            .catch(err => {
                console.log(err)
            })

    }


    return (
        <div className="DailyList">
            {preloaderVisible && <img src={preloader} id="preloader" alt="preloader" />}
            {(!isEmpty && !preloaderVisible) && <div className="tasks_list">
                {data.map((task) => {
                    return <Task key={task.id} id={task.id} title={task.title} description={task.taskBody} completed={task.completed} renderedIn='list' reverseCompleted={reverseCompleted} />
                })}
            </div>}
            {(isEmpty && !preloaderVisible) && <div className="empty_task_list">
                <p>There is no tasks added from your <span>Task Library</span> to the <span>Daily List</span>.</p>
                <p>Choose one or few of them!</p>
                <FontAwesomeIcon onClick={() => toLibrary()} icon={faCirclePlus} className='add_task'></FontAwesomeIcon>
            </div>}
            {(allCompleted && !isEmpty) && <button onClick={() => console.log('Close function')}>Close Daily List</button>}
        </div>
    )
}