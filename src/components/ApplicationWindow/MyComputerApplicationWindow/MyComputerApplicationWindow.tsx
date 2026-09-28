import contents from "./contents.json";

function MyComputerApplicationWindow() {
    return (
        <div className="flex h-full min-h-0 w-full min-w-0 flex-col">
            <h1 className="mb-3 shrink-0 font-windowtextbold text-2xl">Patrick Yeh</h1>
            <div
                className="window-scrollbar flex min-h-0 w-full min-w-0 flex-1 flex-col gap-1 overflow-auto bg-white p-3
                border-t-2 border-l-2 border-t-gray-600 border-l-gray-700
                border-b border-r border-b-windowgrey border-r-windowgrey"
            >
                {contents.map((content) =>
                    Object.entries(content).map(([label, value]) => (
                        <div
                            key={label}
                            className="grid min-w-0 grid-cols-[6rem_minmax(0,1fr)] gap-x-3 border-b border-windowgrey/50 py-2 last:border-b-0"
                        >
                            <p className="font-windowtextbold text-sm uppercase text-windowgrey">{label}</p>
                            {Array.isArray(value) ? (
                                <ul className="col-start-2 min-w-0 list-none space-y-1 wrap-break-word text-left font-windowtext text-sm leading-5">
                                    {value.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="col-start-2 min-w-0 wrap-break-word text-left font-windowtext text-sm leading-5">{value}</p>
                            )}
                        </div>
                    )),
                )}
            </div>
        </div>
    );
}

export default MyComputerApplicationWindow;
