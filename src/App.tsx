import { useState } from "react";

import WindowBar from "./components/WindowBar/WindowBar";
import Window from "./components/Window";
import Application from "./components/Application/Application";
import type { App } from "./components/Application/ApplicationProps";

function App() {
    const [selected, setSelected] = useState<string | null>(null);
    const [opened, setOpened] = useState<Array<App>>([{ icon: "../public/computer-icon.png", name: "My Computer" }]);

    // need to lift the state of minimize, fs, close here -> allows us to sync the tabs and windows and apps
    // need to make the selected app position on top

    function handleUrlClick(url: string): void {
        window.open(url, "_blank");
    }

    function handleAppClick(app: App): void {
        if (opened.some((openedApp) => openedApp.name === app.name)) {
            return;
        }
        setOpened((prev) => [...prev, app]);
    }

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
                    onDoubleClick={() => handleAppClick({ icon: "../public/computer-icon.png", name: "My Computer" })}
                    selected={selected == "My Computer"}
                />
                <Application
                    icon="../public/text-icon.png"
                    name="About Me"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected("About Me");
                    }}
                    onDoubleClick={() => handleAppClick({ icon: "../public/text-icon.png", name: "About Me" })}
                    selected={selected == "About Me"}
                />
                <Application
                    icon="../public/folder-icon.png"
                    name="Projects"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected("Projects");
                    }}
                    onDoubleClick={() => handleAppClick({ icon: "../public/folder-icon.png", name: "Folder" })}
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
            {opened.map((window) => (
                <Window icon={window.icon} name={window.name} />
            ))}
            <WindowBar tabs={opened} />
        </div>
    );
}

export default App;
