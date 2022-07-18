import React, { createRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateTask(): JSX.Element {

    const _taskName = createRef<HTMLInputElement>()
    const _taskBody = createRef<HTMLTextAreaElement>()
    const [today, setToday] = useState<boolean>(false)

    const navigate = useNavigate()

    const createTask = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        let taskName = (_taskName.current !== null ? _taskName.current.value : '');
        let taskBody = (_taskBody.current !== null ? _taskBody.current.value : '')

        let data: {}

        if (taskBody !== '') {
            data = {
                user_id: localStorage.user_id,
                title: taskName,
                taskBody: taskBody,
                today: today
            }
        } else {
            data = {
                user_id: localStorage.user_id,
                title: taskName,
                today: today
            }
        }

        console.log(data)
        let config = {
            method: 'POST',
            url: 'https://todo.coldwinternight.ru/api/tasks?userid=' + localStorage.user_id,
            headers: {
                'Authorization': localStorage.jwt,
            },
            data
        };

        axios(config)
            .then(res => {
                console.log(res)
                navigate('../tasks_library')
            })
            .catch(err => {
                console.log(err)
            })

    }

    const backward = () => {
        navigate('../tasks_library')
    }

    const addToDaily = () => {
        setToday(!today)
    }

    return (
        <div className="CreateTask">
            <FontAwesomeIcon icon={faCircleArrowLeft} className="back" onClick={() => backward()}></FontAwesomeIcon>
            <form>
                <label htmlFor="task_name">Task Name <span className="add_info">maximum 20 characters</span></label>
                <input ref={_taskName} id="task_name" type="text" />

                <label htmlFor="description">Task Description <span className="add_info">maximum 20 characters</span></label>
                <textarea ref={_taskBody} id="description" />
                
                <div className="checkbox_container">
                    <span className={(today === true ? 'checkbox selected' : 'checkbox')} onClick={() => addToDaily()}></span>
                    <label htmlFor="today_checkbox" id="today_label">Add to Daily List</label>

                </div>

                <button type="submit" onClick={(e) => createTask(e)}>Create</button>
            </form>
        </div>
    )
}