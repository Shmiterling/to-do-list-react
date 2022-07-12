import React, { createRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateTask(): JSX.Element {

    const _taskName = createRef<HTMLInputElement>()
    const _taskDescription = createRef<HTMLTextAreaElement>()

    const navigate = useNavigate()

    const createTask = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        let taskName = (_taskName.current !== null ? _taskName.current.value : '');
        let taskDescription = (_taskDescription.current !== null ? _taskDescription.current.value : '')

        let data = {
            user_id: localStorage.user_id,
            title: taskName,
            task_body: taskDescription
        }

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
            })
            .catch(err => {
                console.log(err)
            })

            navigate('../tasks_library')
    }

    const backward = () => {
        navigate('../tasks_library')
    }

    return (
        <div className="CreateTask">
            <FontAwesomeIcon icon={faCircleArrowLeft} className="back" onClick={() => backward()}></FontAwesomeIcon>
            <form>
                <label htmlFor="task_name">Task Name <span className="add_info">maximum 20 characters</span></label>
                <input ref={_taskName} id="task_name" type="text" />

                <label htmlFor="description">Task Description <span className="add_info">maximum 20 characters</span></label>
                <textarea ref={_taskDescription} id="description" />

                <button type="submit" onClick={(e) => createTask(e)}>Create</button>
            </form>
        </div>
    )
}