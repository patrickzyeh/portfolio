import { useState, useEffect } from "react";

import Tab from "../Tab/Tab";
import type WindowBarProps from "./WindowBarProps";

function WindowBar({ tabs, selected, onSelect }: WindowBarProps) {
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            const updateTime = () => setDate(new Date());
            const interval = setInterval(updateTime, 10000);
            return () => clearInterval(interval);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formattedTime = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });

    return (
        <div id="windowbar" className="absolute left-0 bottom-0 bg-windowbar h-10 w-full border-t-3 border-white flex items-center justify-between">
            <div id="left-section" className="flex">
                <button
                    id="start"
                    className="flex h-7.5 items-center ml-1 p-1 cursor-windowselect
         border-t-2 border-l-2 border-t-white border-l-white
         border-r-2 border-b-2 border-b-windowgrey
         active:border-t-windowgrey active:border-l-windowgrey
         active:border-r-white active:border-b-white"
                >
                    <img src="../public/logo.png" className="h-5 w-5" />
                    <p className="font-windowtextbold ml-1">Start</p>
                </button>

                {tabs.map((tab) => (
                    <Tab key={tab.name} icon={tab.icon} name={tab.name} selected={selected === tab.name} onSelect={() => onSelect(tab.name)} />
                ))}
            </div>

            <div
                id="time"
                className="flex h-7.5 w-22 mr-1 items-center justify-center
                    border-t-2 border-l-2 border-r-2 border-b-2 
                    border-t-windowgrey border-l-windowgrey border-b-white border-r-white"
            >
                <p className="font-windowtext">{formattedTime}</p>
            </div>
        </div>
    );
}

export default WindowBar;
