import type { MouseEventHandler } from "react";

type OverloadedFormat = {
    (): void;
    (url: string): void;
};

export default interface ApplicationProps {
    icon: string;
    name: string;
    selected: boolean;
    onClick: MouseEventHandler<HTMLDivElement>;
    onDoubleClick: OverloadedFormat;
}
