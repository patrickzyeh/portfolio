import { useState } from "react";

import WindowBar from "./components/WindowBar/WindowBar";
import Window from "./components/Window/Window";
import Application from "./components/Application/Application";
import type { App } from "./components/Application/ApplicationProps";

type WindowApp = App & { minimized: boolean };

function App() {
    const [selected, setSelected] = useState<string | null>("My Computer");
    const [opened, setOpened] = useState<Array<WindowApp>>([{ icon: "../public/computer-icon.png", name: "My Computer", minimized: false }]);
    const [windowOrder, setWindowOrder] = useState<string[]>(["My Computer"]);

    function handleUrlClick(url: string): void {
        window.open(url, "_blank");
    }

    function handleAppClick(app: WindowApp): void {
        if (opened.some((openedApp) => openedApp.name === app.name)) {
            return;
        }
        setOpened((prev) => [...prev, app]);
        focusWindow(app.name);
    }

    function focusWindow(name: string): void {
        setSelected(name);
        setWindowOrder((prev) => [...prev.filter((windowName) => windowName !== name), name]);
        setOpened((prev) => prev.map((item) => (item.name === name ? { ...item, minimized: false } : item)));
    }

    function handleClose(name: string): void {
        setOpened((prev) => prev.filter((item) => item.name !== name));
    }

    function handleMinimize(name: string): void {
        setOpened((prev) => prev.map((item) => (item.name === name ? { ...item, minimized: true } : item)));
        setSelected(null);
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
                    onDoubleClick={() => {
                        focusWindow("My Computer");
                        handleAppClick({ icon: "../public/computer-icon.png", name: "My Computer", minimized: false });
                    }}
                    selected={selected == "My Computer"}
                />
                <Application
                    icon="../public/text-icon.png"
                    name="About Me"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected("About Me");
                    }}
                    onDoubleClick={() => {
                        focusWindow("About Me");
                        handleAppClick({ icon: "../public/text-icon.png", name: "About Me", minimized: false });
                    }}
                    selected={selected == "About Me"}
                />
                <Application
                    icon="../public/folder-icon.png"
                    name="Projects"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected("Projects");
                    }}
                    onDoubleClick={() => {
                        focusWindow("Projects");
                        handleAppClick({ icon: "../public/folder-icon.png", name: "Projects", minimized: false });
                    }}
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
            {opened.map(
                (window) =>
                    !window.minimized && (
                        <Window
                            key={window.name}
                            icon={window.icon}
                            name={window.name}
                            zIndex={windowOrder.indexOf(window.name) + 1}
                            onFocus={() => focusWindow(window.name)}
                            onClose={handleClose}
                            onMinimize={handleMinimize}
                        />
                    ),
            )}
            <WindowBar tabs={opened} selected={selected} onSelect={focusWindow} />
        </div>
    );
}

export default App;
