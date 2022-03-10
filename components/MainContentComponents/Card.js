import { Fragment } from "react/cjs/react.development";

export default function Card(props) {
    const data = props.data;
    return (
        <div className="select-none p-5 shadow-lg bg-white border-t-4 border-t-slate-800 rounded-md">
            <h1 className="font-bold text-2xl">{data.text}</h1>
            <hr className="mt-2 mb-1" />
            <p className="">{data.description}</p>
        </div>
    );
}
