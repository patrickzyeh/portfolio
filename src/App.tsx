function App() {
    return (
        <div className="min-h-screen w-full bg-windows95">
            <div id="windowbar" className="absolute left-0 bottom-0 bg-windowbar h-10 w-full border-t-3 border-white flex items-center">
                <button
                    id="start"
                    className="flex h-7.5 items-center ml-1 p-1
         border-t-2 border-l-2 border-t-white border-l-white
         border-r-2 border-b-2 border-b-[#808080]
         active:border-t-[#808080] active:border-l-[#808080]
         active:border-r-white active:border-b-white"
                >
                    <img src="../public/logo.png" className="h-5 w-5" />
                    <span className="font-windowtextbold ml-1">Start</span>
                </button>
                <div id="time"></div>
            </div>
        </div>
    );
}

export default App;
