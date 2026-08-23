import { useState, useEffect, useRef } from "react";
import type { App } from "./Application/ApplicationProps";

type ResizeDirection = "top-left" | "top-right" | "bottom-left" | "bottom-right";

function Window({ icon, name }: App) {
    const [position, setPosition] = useState({ x: 750, y: 400 });
    const [size, setSize] = useState({ width: 400, height: 400 });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState<ResizeDirection | null>(null);
    const [dragStart, setDragStart] = useState({
        mouseX: 0,
        mouseY: 0,
        windowX: 0,
        windowY: 0,
    });
    const [resizeStart, setResizeStart] = useState({
        mouseX: 0,
        mouseY: 0,
        windowX: 0,
        windowY: 0,
        width: 0,
        height: 0,
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

    function handleResizePointerDown(event: React.PointerEvent, direction: ResizeDirection) {
        event.preventDefault();
        event.stopPropagation();
        setIsResizing(true);
        setResizeDirection(direction);

        setResizeStart({
            mouseX: event.clientX,
            mouseY: event.clientY,
            windowX: position.x,
            windowY: position.y,
            width: size.width,
            height: size.height,
        });
    }

    useEffect(() => {
        function handlePointerMove(event: PointerEvent) {
            if (!windowRef.current) return;

            if (isResizing) {
                if (!resizeDirection) return;

                const direction = resizeDirection;
                const isLeft = direction.endsWith("left");
                const isTop = direction.startsWith("top");
                const deltaX = event.clientX - resizeStart.mouseX;
                const deltaY = event.clientY - resizeStart.mouseY;
                const rightEdge = resizeStart.windowX + resizeStart.width;
                const bottomEdge = resizeStart.windowY + resizeStart.height;
                const maxWidth = isLeft ? rightEdge : window.innerWidth - resizeStart.windowX;
                const maxHeight = isTop ? bottomEdge : window.innerHeight - resizeStart.windowY;
                const width = Math.max(240, Math.min(resizeStart.width + (isLeft ? -deltaX : deltaX), maxWidth));
                const height = Math.max(160, Math.min(resizeStart.height + (isTop ? -deltaY : deltaY), maxHeight));

                setSize({
                    width,
                    height,
                });
                setPosition({
                    x: isLeft ? rightEdge - width : resizeStart.windowX,
                    y: isTop ? bottomEdge - height : resizeStart.windowY,
                });
                return;
            }

            if (!isDragging) return;

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
            setIsResizing(false);
            setResizeDirection(null);
        }

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [isDragging, isResizing, resizeDirection, dragStart, position.x, position.y, resizeStart]);

    return (
        <div
            ref={windowRef}
            className="absolute bg-windowbar border-t-2 border-l-2 border-t-white border-l-white
         border-r-3 border-b-2 border-b-windowgrey border-r-gray-600"
            style={{
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
            }}
        >
            <div
                id="topbar"
                className="flex h-8 w-full bg-windowblue cursor-windowgrab justify-between items-center font-windowtext"
                onPointerDown={handlePointerDown}
            >
                <div id="window-name" className="flex ml-1 items-center">
                    <img src={icon} className="h-5 w-5" />
                    <p className="text-white ml-1">{name}</p>
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

            <button
                type="button"
                aria-label="Resize window from top left corner"
                data-resize-direction="top-left"
                className="absolute left-0 top-0 h-4 w-4 cursor-nwse-resize"
                onPointerDown={(event) => handleResizePointerDown(event, "top-left")}
            />
            <button
                type="button"
                aria-label="Resize window from top right corner"
                data-resize-direction="top-right"
                className="absolute right-0 top-0 h-4 w-4 cursor-nesw-resize"
                onPointerDown={(event) => handleResizePointerDown(event, "top-right")}
            />
            <button
                type="button"
                aria-label="Resize window from bottom left corner"
                data-resize-direction="bottom-left"
                className="absolute bottom-0 left-0 h-4 w-4 cursor-nesw-resize"
                onPointerDown={(event) => handleResizePointerDown(event, "bottom-left")}
            />
            <button
                type="button"
                aria-label="Resize window from bottom right corner"
                data-resize-direction="bottom-right"
                className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize"
                onPointerDown={(event) => handleResizePointerDown(event, "bottom-right")}
            />
        </div>
    );
}

export default Window;
