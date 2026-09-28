import type App from "../../App";

export type ResizeDirection = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export type WindowSize = {
    width: number;
    height: number;
};

export type WindowProps = App & {
    defaultSize: WindowSize;
    zIndex: number;
    onFocus: () => void;
    onClose: (name: string) => void;
    onMinimize: (name: string) => void;
    children?: React.ReactNode;
};
