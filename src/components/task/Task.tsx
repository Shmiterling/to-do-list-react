import { faBan, faCheck, faChevronCircleDown, faChevronDown, faEllipsisVertical, faFileCircleCheck, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import EditTask from "../editTask/EditTask";
import axios from "axios";

interface TaskProps {
    id: string,
    title: string,
    description: string,
    completed: boolean,
    today?: boolean,
    renderedIn: string,
}

export default function Task(props: TaskProps): JSX.Element {

    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [isToday, setIsToday] = useState<boolean>(false);
    const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        if (props.completed === true) {
            setIsCompleted(true)
        };

        if (props.description === '') {
            setIsEmpty(true)
        } else {
            setIsEmpty(false)
        };

        if (props.today === true) {
            setIsToday(true)
        };
    }, [])

    const openCloseTask = () => {
        if (isOpened === false) {
            setIsOpened(true)
        } else {
            setIsOpened(false)
        }
    }

    const reverseComplete = () => {
        let config = {
            method: 'PATCH',
            url: 'http://localhost:8080/api/tasks/' + props.id + '/reverseCompleted',
            headers: {
                'Authorization': localStorage.jwt,
            }
        };

        axios(config)
            .then(res => {
                console.log(res)
                setIsCompleted(!isCompleted)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const reverseOptions = () => {
        setOptionsVisible(!optionsVisible)
    }

    const reverseToday = (id: string) => {
        let config = {
            method: 'PATCH',
            url: 'http://localhost:8080/api/tasks/' + props.id + '/reverseToday',
            headers: {
                'Authorization': localStorage.jwt,
            }
        };

        axios(config)
            .then(res => {
                console.log(res)
                setIsToday(!isToday)
                reverseOptions()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const editTask = (id: string, title: string, description: string, completed: boolean, today?: boolean) => {
        setEdit(!edit);
        setOptionsVisible(!optionsVisible);
    }

    const deleteTask = (id: string) => {
        setOptionsVisible(false);
        console.log(id)
    }

    return (
        <div className={"Task " + props.renderedIn + (isOpened === true ? ' opened' : ' closed') + (isToday === false ? '' : ' today')}>
            {optionsVisible && <div className="background_container" onClick={() => reverseOptions()}></div>}
            <div className="title_container">
                <div className="chevron_container">
                    {!isEmpty && <FontAwesomeIcon icon={faChevronDown} onClick={() => openCloseTask()}></FontAwesomeIcon>}
                </div>
                <p>{props.title}</p>
                <div className={"complete_circle" + (isCompleted === true ? ' completed' : '')} onClick={() => reverseComplete()}>
                    <FontAwesomeIcon icon={faCheck} className="icon" ></FontAwesomeIcon>
                </div>
                <div className={"options_container"} onClick={() => reverseOptions()}>
                    <FontAwesomeIcon icon={faEllipsisVertical} className="icon" ></FontAwesomeIcon>
                </div>

                {optionsVisible && <div className="options_menu">
                    {!isToday && <span onClick={() => reverseToday(props.id)}>Add to Daily List<FontAwesomeIcon icon={faFileCircleCheck} /></span>}
                    {isToday && <span onClick={() => reverseToday(props.id)}>Remove from Daily List<FontAwesomeIcon icon={faBan} /></span>}
                    <span onClick={() => editTask(props.id, props.title, props.description, props.completed, props.today)}>Edit Task<FontAwesomeIcon icon={faPenToSquare} /></span>
                    <span onClick={() => deleteTask(props.id)}>Delete Task<FontAwesomeIcon icon={faTrash} /></span>
                </div>}
            </div>
            {!isEmpty && <div className="description_container visible">
                <p>{props.description}</p>
            </div>}

            {edit && <EditTask id={props.id} title={props.title} description={props.description} setEdit={setEdit} />}
        </div>
    )
}