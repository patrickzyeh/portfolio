import type ApplicationProps from "./ApplicationProps";

function Application({ icon, name, selected, onClick, onDoubleClick }: ApplicationProps) {
    return (
        <div className={`h-27 w-22 ml-2 cursor-windowselect ${selected ? "bg-blue-800" : ""}`} onClick={onClick} onDoubleClick={onDoubleClick}>
            <img src={icon} className="h-22 w-22" />
            <p className={`font-windowtext text-white text-sm font-light text-center ${selected ? "border-2 border-dotted" : ""}`}>{name}</p>
        </div>
    );
}

export default Application;
