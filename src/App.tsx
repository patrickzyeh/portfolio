import WindowBar from "./components/WindowBar";
import Application from "./components/Application/Application";

function App() {
    return (
        <div className="min-h-screen w-full bg-windows95 cursor-window">
            <div id="applications" className="flex-col">
                <Application icon="../public/computer-icon.png" name="My Computer" />
                <Application icon="../public/text-icon.png" name="About Me" />
                <Application icon="../public/text-icon.png" name="Resume" />
                <Application icon="../public/folder-icon.png" name="Projects" />

                <Application icon="../public/linkedin-logo.png" name="LinkedIn" />
                <Application icon="../public/github-logo.png" name="Github" />
            </div>

            <WindowBar />
        </div>
    );
}

export default App;
