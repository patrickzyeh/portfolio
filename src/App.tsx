import { useState, type ReactNode } from "react";

import WindowBar from "./components/WindowBar/WindowBar";
import Window from "./components/Window/Window";
import Application from "./components/Application/Application";
import type { App as AppProps } from "./components/Application/ApplicationProps";
import MyComputerApplicationWindow from "./components/ApplicationWindow/MyComputerApplicationWindow/MyComputerApplicationWindow";
import WelcomeApplicationWindow from "./components/ApplicationWindow/WelcomeApplicationWindow/WelcomeApplicationWindow";
import ProjectApplicationWindow, { type Project } from "./components/ApplicationWindow/ProjectApplicationWindow/ProjectApplicationWindow";
import ProjectDetailsApplicationWindow from "./components/ApplicationWindow/ProjectDetailsApplicationWindow/ProjectDetailsApplicationWindow";
import projects from "./components/ApplicationWindow/ProjectApplicationWindow/contents.json";
import type { WindowSize } from "./components/Window/WindowProps";

type WindowApp = AppProps & { minimized: boolean };
type WindowApplication = {
    content: ReactNode;
    size: WindowSize;
};

const baseWindowApplication: Record<string, WindowApplication> = {
    "About Me": { content: <MyComputerApplicationWindow />, size: { width: 600, height: 300 } },
    Welcome: { content: <WelcomeApplicationWindow />, size: { width: 400, height: 400 } },
    Projects: { content: null, size: { width: 600, height: 600 } },
};

function App() {
    const [selected, setSelected] = useState<string | null>("Welcome");
    const [opened, setOpened] = useState<Array<WindowApp>>([{ icon: "/text-icon.png", name: "Welcome", minimized: false }]);
    const [windowOrder, setWindowOrder] = useState<string[]>(["Welcome"]);

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

    function handleProjectOpen(project: Project): void {
        handleAppClick({ icon: "/folder-icon.png", name: project.Name, minimized: false });
    }

    return (
        <div className="min-h-screen w-full bg-windows95 cursor-window" onClick={() => setSelected(null)}>
            <div id="applications" className="flex-col">
                <Application
                    icon="/computer-icon.png"
                    name="About Me"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected("About Me");
                    }}
                    onDoubleClick={() => {
                        focusWindow("About Me");
                        handleAppClick({ icon: "/computer-icon.png", name: "About Me", minimized: false });
                    }}
                    selected={selected == "About Me"}
                />
                <Application
                    icon="/text-icon.png"
                    name="Welcome"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected("Welcome");
                    }}
                    onDoubleClick={() => {
                        focusWindow("Welcome");
                        handleAppClick({ icon: "/text-icon.png", name: "Welcome", minimized: false });
                    }}
                    selected={selected == "Welcome"}
                />
                <Application
                    icon="/folder-icon.png"
                    name="Projects"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected("Projects");
                    }}
                    onDoubleClick={() => {
                        focusWindow("Projects");
                        handleAppClick({ icon: "/folder-icon.png", name: "Projects", minimized: false });
                    }}
                    selected={selected == "Projects"}
                />

                <Application
                    icon="/text-icon.png"
                    name="Resume"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected("Resume");
                    }}
                    onDoubleClick={() => handleUrlClick("/Resume.pdf")}
                    selected={selected == "Resume"}
                />
                <Application
                    icon="/linkedin-logo.png"
                    name="LinkedIn"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected("LinkedIn");
                    }}
                    onDoubleClick={() => handleUrlClick("https://www.linkedin.com/in/patrick-yeh-787b97270/")}
                    selected={selected == "LinkedIn"}
                />
                <Application
                    icon="/github-logo.png"
                    name="GitHub"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected("GitHub");
                    }}
                    onDoubleClick={() => handleUrlClick("https://github.com/patrickzyeh")}
                    selected={selected == "GitHub"}
                />
            </div>
            {opened.map((window) => {
                if (window.minimized) return null;

                const application =
                    window.name === "Projects"
                        ? { ...baseWindowApplication.Projects, content: <ProjectApplicationWindow onOpenProject={handleProjectOpen} /> }
                        : (baseWindowApplication[window.name] ?? {
                              content: (
                                  <ProjectDetailsApplicationWindow
                                      project={projects.find((project) => project.Name === window.name) ?? projects[0]}
                                  />
                              ),
                              size: { width: 600, height: 500 },
                          });

                return (
                    <Window
                        key={window.name}
                        icon={window.icon}
                        name={window.name}
                        defaultSize={application.size}
                        zIndex={windowOrder.indexOf(window.name) + 1}
                        onFocus={() => focusWindow(window.name)}
                        onClose={handleClose}
                        onMinimize={handleMinimize}
                    >
                        {application.content}
                    </Window>
                );
            })}
            <WindowBar tabs={opened} selected={selected} onSelect={focusWindow} />
        </div>
    );
}

export default App;
