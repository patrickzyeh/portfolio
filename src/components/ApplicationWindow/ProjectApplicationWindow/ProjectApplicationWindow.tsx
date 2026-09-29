import { useState } from "react";

import projects from "./contents.json";

type ProjectApplicationWindowProps = {
    onOpenProject: (project: Project) => void;
};
export type Project = (typeof projects)[number];

function ProjectApplicationWindow({ onOpenProject }: ProjectApplicationWindowProps) {
    const [selectedProject, setSelectedProject] = useState<string | null>(null);

    return (
        <div
            className="window-scrollbar flex h-full w-full min-h-0 min-w-0 flex-wrap content-start gap-3 overflow-auto bg-white p-3
                border-t-2 border-l-2 border-t-gray-600 border-l-gray-700
                border-b border-r border-b-windowgrey border-r-windowgrey"
        >
            {projects.map((project) => {
                const isSelected = selectedProject === project.Name;

                return (
                    <div
                        key={project.Name}
                        className={`flex h-27 w-22 cursor-windowselect ml-2 flex-col items-center ${isSelected ? "bg-windowblue" : ""}`}
                        onClick={() => setSelectedProject(project.Name)}
                        onDoubleClick={() => onOpenProject(project)}
                    >
                        <div className="flex w-22 flex-col items-center">
                            <img src="/folder-icon.png" className="h-22 w-22 shrink-0" />
                            <p
                                className={`w-22 wrap-break-word font-windowtext text-sm font-light text-center leading-tight ${isSelected ? "border-2 border-dotted text-white" : ""}`}
                            >
                                {project.Name}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ProjectApplicationWindow;
