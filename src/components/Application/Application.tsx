import type ApplicationProps from "./ApplicationProps";

function Application({ icon, name }: ApplicationProps) {
    return (
        <div className="h-25 w-20 ml-2 cursor-windowselect">
            <img src={icon} className="h-20 w-20" />
            <p className="font-windowtext text-white text-sm font-light text-center">{name}</p>
        </div>
    );
}

export default Application;
