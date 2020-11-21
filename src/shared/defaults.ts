import { Settings, TabInfo, ZoomClasses } from "./types";

export const defaultSettings = {
    type: "settings",
    on: false,
    drop: 3,
    timespan: 3
} as Settings;

export const defaultZoomClasses = [] as ZoomClasses;

export const defaultTabInfo = {
    windowId: -1,
    tabs: -1
} as TabInfo;
