interface Props {
    text?:string;
    color?:string;
    function?: any;
}

export default function PrimaryButton(props:Props):JSX.Element {


    return (
        <div className="btn-container">
            <button onClick={props.function} className={`btn ` + props.color}>{props.text}</button>
        </div>
    )
}