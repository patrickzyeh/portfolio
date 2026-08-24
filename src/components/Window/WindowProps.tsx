import type App from "../../App";

export type ResizeDirection = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export type WindowProps = App & {
    zIndex: number;
    onFocus: () => void;
    onClose: (name: string) => void;
    onMinimize: (name: string) => void;
};
