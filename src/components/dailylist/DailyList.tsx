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
    description: string,
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

        // let newData = [
        //     {
        //         id: '2',
        //         title: 'Wash the car',
        //         description: `My car is so dirty and i nither my wife can't carry it anymore`,
        //         completed: false,
        //         today: true
        //     },
        //     {
        //         id: '3',
        //         title: 'Get the post',
        //         description: 'I need to do it before i die',
        //         completed: false,
        //         today: true
        //     },
        //     {
        //         id: '5',
        //         title: `Don't kill the cat`,
        //         description: `I hope you'll not be so lucky, little bustard`,
        //         completed: false,
        //         today: true
        //     }
        // ]
        // setData(newData);
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
                console.log(res)
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
                    return <Task key={task.id} id={task.id} title={task.title} description={task.description} completed={task.completed} renderedIn='list' />
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