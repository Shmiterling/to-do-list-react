import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeToLibrary } from "../../store/navbarSlice";
import { TaskList } from "../dailylist/DailyList";
import Edit from "../editprofile/edit";
import EditTask from "../editTask/EditTask";
import Task from "../task/Task";

export default function TasksLibrary(): JSX.Element {

    const [data, setData] = useState<TaskList[]>([]);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(changeToLibrary())

        let newData = [
            {
                id: '1',
                title: 'Garbage',
                description: 'Throw the garbage off',
                completed: false,
                today: false
            },
            {
                id: '2',
                title: 'Wash the car',
                description: `My car is so dirty and i neither my wife can't carry it anymore`,
                completed: false,
                today: true
            },
            {
                id: '3',
                title: 'Get the post',
                description: 'I need to do it before i die',
                completed: false,
                today: true
            },
            {
                id: '4',
                title: 'Watch the new show',
                description: 'New show on NETFLIX is it cake is awesome',
                completed: true,
                today: false
            },
            {
                id: '5',
                title: `Don't kill the cat`,
                description: `I hope you'll not be so lucky, little bustard`,
                completed: false,
                today: true
            },
            {
                id: '6',
                title: `Do meanful thing`,
                description: `With pleasure,but don't know what...`,
                completed: false,
                today: false
            },
            {
                id: '7',
                title: `Cut the grass`,
                description: `It's already there`,
                completed: false,
                today: false
            },
            {
                id: '8',
                title: `Play in board games`,
                description: `I think it's not nerd at all, sometimes`,
                completed: false,
                today: false
            },
            {
                id: '9',
                title: `Take the children out`,
                description: `Need to go out with children, but can't find appropriate`,
                completed: false,
                today: false
            },
            {
                id: '10',
                title: `Take a rest`,
                description: ``,
                completed: false,
                today: false
            },

        ]
        setData(newData);
    }, [])

    const createNewTask = () => {
        navigate('../create_task')
    }

    return (
        <div className="TasksLibrary">
            {!isEmpty && <div>
                <FontAwesomeIcon className='add_icon' icon={faCirclePlus} onClick={() => { createNewTask() }}></FontAwesomeIcon>
                <div className="tasks_list">
                    {data.map((task) => {
                        return <Task key={task.id} id={task.id} title={task.title} description={task.description} completed={task.completed} today={task.today} renderedIn='library' />
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