import type { App } from "../Application/ApplicationProps";

export type TabProps = App & {
    selected: boolean;
    onSelect: () => void;
};
