function WelcomeApplicationWindow() {
    return (
        <div
            className="flex h-full w-full min-h-0 min-w-0 flex-col justify-evenly overflow-auto bg-white px-3 text-center
                border-t-2 border-l-2 border-t-gray-600 border-l-gray-700
                border-b border-r border-b-windowgrey border-r-windowgrey"
        >
            <h1 className="max-w-full wrap-break-word text-3xl font-windowtextbold">Welcome to my portfolio!</h1>
            <p className="max-w-full wrap-break-word text-lg font-windowtext ">Start interacting by double-clicking a desktop icon!</p>
            <p className="max-w-full wrap-break-word text-lg font-windowtext">Applications can be dragged and resized!</p>
        </div>
    );
}

export default WelcomeApplicationWindow;
