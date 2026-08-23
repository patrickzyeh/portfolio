import { useState } from "react";

import WindowBar from "./components/WindowBar";
import Window from "./components/Window";
import Application from "./components/Application/Application";

function App() {
    const [selected, setSelected] = useState<string | null>(null);
    // need state to track opened tab, feed this into the window bar as a prop, window bar will map each to a tab component

    function handleUrlClick(url: string): void {
        window.open(url, "_blank");
    }

    function handleAppClick(): void {}

    return (
        <div className="min-h-screen w-full bg-windows95 cursor-window" onClick={() => setSelected(null)}>
            <div id="applications" className="flex-col">
                <Application
                    icon="../public/computer-icon.png"
                    name="My Computer"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected("My Computer");
                    }}
                    onDoubleClick={handleAppClick}
                    selected={selected == "My Computer"}
                />
                <Application
                    icon="../public/text-icon.png"
                    name="About Me"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected("About Me");
                    }}
                    onDoubleClick={handleAppClick}
                    selected={selected == "About Me"}
                />
                <Application
                    icon="../public/folder-icon.png"
                    name="Projects"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected("Projects");
                    }}
                    onDoubleClick={handleAppClick}
                    selected={selected == "Projects"}
                />

                <Application
                    icon="../public/text-icon.png"
                    name="Resume"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected("Resume");
                    }}
                    onDoubleClick={() => handleUrlClick("../public/Resume.pdf")}
                    selected={selected == "Resume"}
                />
                <Application
                    icon="../public/linkedin-logo.png"
                    name="LinkedIn"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected("LinkedIn");
                    }}
                    onDoubleClick={() => handleUrlClick("https://www.linkedin.com/in/patrick-yeh-787b97270/")}
                    selected={selected == "LinkedIn"}
                />
                <Application
                    icon="../public/github-logo.png"
                    name="GitHub"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected("GitHub");
                    }}
                    onDoubleClick={() => handleUrlClick("https://github.com/patrickzyeh")}
                    selected={selected == "GitHub"}
                />
            </div>
            <Window />
            <WindowBar />
        </div>
    );
}

export default App;
