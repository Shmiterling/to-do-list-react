import React, { createRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function CreateTask(): JSX.Element {

    const _taskName = createRef<HTMLInputElement>()
    const _taskDescription = createRef<HTMLTextAreaElement>()

    const navigate = useNavigate()

    const createTask = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log('create task')
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