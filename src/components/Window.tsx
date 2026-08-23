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
            className="absolute h-100 w-100 bg-windowbar"
            style={{
                left: position.x,
                top: position.y,
            }}
        >
            <div id="topbar" className="h-10 w-full bg-windowblue cursor-windowselect" onPointerDown={handlePointerDown}></div>
        </div>
    );
}

export default Window;
