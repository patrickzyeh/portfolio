import type { App } from "../Application/ApplicationProps";

export default interface WindowBarProps {
    tabs: Array<App>;
    selected: string | null;
    onSelect: (name: string) => void;
}
