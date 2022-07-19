import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { createRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

interface EditTask {
    id:string,
    title:string,
    description:string,
    setEdit: (params: boolean) => any;
    setTitle: (params:string) => void,
    setBody: (params:string) => void
}

export default function EditTask(props: EditTask): JSX.Element {

    const _taskName = createRef<HTMLInputElement>();
    const _taskDescription = createRef<HTMLTextAreaElement>();
    const [taskName,setTaskName] = useState<string>('')
    const [description,setDescription] = useState<string>('')
    const navigate = useNavigate();

    useEffect(() => {
        setTaskName(props.title);
        setDescription(props.description);
    },[]);

    const taskNameChangeHandle = () => {
        if (_taskName.current !== null) {
            setTaskName(_taskName.current.value)
        }
    };

    const descriptionChangeHandle = () => {
        if(_taskDescription.current !== null) {
            setDescription(_taskDescription.current.value)
        }
    };

    const submitChanges = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        let data = {
            title: taskName,
            task_body: description
        };

        let config = {
            method: 'PATCH',
            url: "https://todo.coldwinternight.ru/api/tasks/" + props.id + "/titleAndBody",
            headers: {
                'Authorization': localStorage.jwt,
            },
            data
        };
        
        axios(config)
        .then(res => {
            console.log(res);
            props.setTitle(taskName);
            props.setBody(description);
            backward()
        })
        .catch(err => {
            console.log(err)
        })


    };

    const backward = () => {
        props.setEdit(false);
        navigate('../tasks_library');
    };

    return (
        <div className="EditTask">
            <FontAwesomeIcon icon={faCircleArrowLeft} className="back" onClick={() => backward()}></FontAwesomeIcon>
            <form>
                <label htmlFor="task_name">Task Name <span className="add_info">maximum 20 characters</span></label>
                <input ref={_taskName} onChange={() => taskNameChangeHandle()}id="task_name" type="text" value={taskName}/>

                <label htmlFor="description">Task Description <span className="add_info">maximum 20 characters</span></label>
                <textarea onChange={() => descriptionChangeHandle()}ref={_taskDescription} id="description" value={description}/>

                <button type="submit" onClick={(e) => submitChanges(e)}>Submit changes</button>
            </form>
        </div>
    )
}