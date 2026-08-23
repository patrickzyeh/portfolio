import type { TabProps } from "./TabProps";

function Tab({ icon, name, selected, onSelect }: TabProps) {
    return (
        <div
            className={`flex h-7.5 w-50 items-center ml-1 p-1 cursor-windowselect
         border-t-2 border-l-2 border-t-white border-l-white
         border-r-2 border-b-2 border-b-windowgrey ${selected ? "border-t-windowgrey border-l-windowgrey border-r-windowgrey" : ""}`}
            onClick={(event) => {
                event.stopPropagation();
                onSelect();
            }}
        >
            <img src={icon} className="h-5 w-5" />
            <p className="font-windowtext ml-1">{name}</p>
        </div>
    );
}
export default Tab;
