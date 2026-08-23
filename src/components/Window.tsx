import { useState, useEffect, useRef } from "react";

function Window() {
    const [position, setPosition] = useState({ x: 750, y: 400 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({
        mouseX: 0,
        mouseY: 0,
        windowX: 0,
        windowY: 0,
    });

    const windowRef = useRef<HTMLDivElement>(null);

    function handlePointerDown(event: React.PointerEvent) {
        event.preventDefault();
        setIsDragging(true);

        setDragStart({
            mouseX: event.clientX,
            mouseY: event.clientY,
            windowX: position.x,
            windowY: position.y,
        });
    }

    useEffect(() => {
        function handlePointerMove(event: PointerEvent) {
            if (!isDragging || !windowRef.current) return;

            const rect = windowRef.current.getBoundingClientRect();

            const newX = dragStart.windowX + (event.clientX - dragStart.mouseX);

            const newY = dragStart.windowY + (event.clientY - dragStart.mouseY);

            const maxX = window.innerWidth - rect.width;
            const maxY = window.innerHeight - rect.height;

            setPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY)),
            });
        }

        function handlePointerUp() {
            setIsDragging(false);
        }

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [isDragging, dragStart]);

    return (
        <div
            ref={windowRef}
            className="absolute h-100 w-100 bg-windowbar border-t-2 border-l-2 border-t-white border-l-white
         border-r-3 border-b-2 border-b-windowgrey border-r-gray-600"
            style={{
                left: position.x,
                top: position.y,
            }}
        >
            <div
                id="topbar"
                className="flex h-8 w-full bg-windowblue cursor-windowgrab justify-between items-center font-windowtext"
                onPointerDown={handlePointerDown}
            >
                <div id="window-name" className="flex ml-1 items-center">
                    <img src="../../public/computer-icon.png" className="h-5 w-5" />
                    <p className="text-white ml-1">App Name</p>
                </div>

                <div id="window-buttons" className="flex items-center justify-center space-x-1 mr-1">
                    <button
                        className="flex h-4 w-4 items-center justify-center bg-windowbar 
                        border-t border-l border-t-white border-l-white border-r 
                        border-b border-b-windowgrey border-r-windowgrey
                         active:border-t-windowgrey active:border-l-windowgrey
                         active:border-r-white active:border-b-white
                         cursor-windowselect"
                    >
                        <span className="relative -top-1.5">_</span>
                    </button>

                    <button
                        className="flex h-4 w-4 items-center justify-center bg-windowbar 
                        border-t border-l border-t-white border-l-white border-r 
                        border-b border-b-windowgrey border-r-windowgrey
                         active:border-t-windowgrey active:border-l-windowgrey
                         active:border-r-white active:border-b-white
                         cursor-windowselect"
                    >
                        □
                    </button>

                    <button
                        className="flex h-4 w-4 items-center justify-center bg-windowbar 
                        border-t border-l border-t-white border-l-white border-r 
                        border-b border-b-windowgrey border-r-windowgrey
                         active:border-t-windowgrey active:border-l-windowgrey
                         active:border-r-white active:border-b-white
                         cursor-windowselect"
                    >
                        x
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Window;
