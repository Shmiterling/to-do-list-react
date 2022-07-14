import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Task from "../task/Task";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeToDaily } from "../../store/navbarSlice";
import axios from "axios";


export interface TaskList {
    id: string,
    title: string,
    task_body: string,
    completed: boolean,
    today: boolean
}

export default function DailyList(): JSX.Element {

    const [data, setData] = useState<TaskList[]>([]);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeToDaily());
        getData();
    }, [])

    const sortData: (data: TaskList[]) => TaskList[] = function (data): TaskList[] {
        let pivot = data[0];
        let length = data.length

        if (length < 2) {
            return data
        }

        const smaller: TaskList[] = data.filter((task) => task.id < pivot.id);
        const bigger: TaskList[] = data.filter((task) => task.id > pivot.id);

        return sortData(smaller).concat([pivot].concat(bigger)).reverse()

    };

    const getData = () => {
        let config = {
            method: 'GET',
            url: 'https://todo.coldwinternight.ru/api/tasks?userid=' + localStorage.user_id,
            headers: {
                'Authorization': localStorage.jwt,
            },
        };

        axios(config)
            .then(res => {
                setData(sortData(res.data))
                if (res.data[0] === undefined) {
                    setIsEmpty(true)
                } else {
                    setIsEmpty(false)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const toLibrary = () => {
        navigate('./tasks_library')
    }

    return (
        <div className="DailyList">
            {!isEmpty && <div className="tasks_list">
                {data.map((task) => {
                    return <Task key={task.id} id={task.id} title={task.title} description={task.task_body} completed={task.completed} renderedIn='list' />
                })}
            </div>}
            {isEmpty && <div className="empty_task_list">
                <p>There is no tasks added from your <span>Task Library</span> to the <span>Daily List</span>.</p>
                <p>Choose one or few of them!</p>
                <FontAwesomeIcon onClick={() => toLibrary()} icon={faCirclePlus} className='add_task'></FontAwesomeIcon>
            </div>}
        </div>
    )
}