import type { Project } from "../ProjectApplicationWindow/ProjectApplicationWindow";

type ProjectDetailsApplicationWindowProps = {
    project: Project;
};

function ProjectDetailsApplicationWindow({ project }: ProjectDetailsApplicationWindowProps) {
    return (
        <div
            className="window-scrollbar flex h-full w-full min-h-0 min-w-0 flex-col gap-3 overflow-auto bg-white p-3 font-windowtext text-windowgrey
            border-t-2 border-l-2 border-t-gray-600 border-l-gray-700
            border-b border-r border-b-windowgrey border-r-windowgrey"
        >
            <img src={project.image} alt={project.Name} className="h-auto max-h-40 max-w-full w-auto min-w-0 shrink self-center object-contain" />
            {Object.entries(project)
                .filter(([label]) => label !== "image" && label !== "Name")
                .map(([label, value]) => (
                    <div key={label} className="grid min-w-0 grid-cols-[7rem_minmax(0,1fr)] gap-x-3 border-b border-windowgrey/50 py-2">
                        <p className="font-windowtextbold text-sm uppercase">{label}</p>
                        {label === "Source Code" || label === "Source" || label === "Project Link" ? (
                            <a href={value} target="_blank" rel="noreferrer" className="min-w-0 wrap-break-word text-sm text-windowblue underline">
                                {value}
                            </a>
                        ) : (
                            <p className="min-w-0 wrap-break-word text-sm">{value}</p>
                        )}
                    </div>
                ))}
        </div>
    );
}

export default ProjectDetailsApplicationWindow;
