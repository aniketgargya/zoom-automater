import { Literal, Record, Boolean, Static, String, Number, Array } from "runtypes";

export const ZoomClass = Record({
    name: String,
    link: String,
    id: String
});
export type ZoomClass = Static<typeof ZoomClass>;

export const ZoomClasses = Array(ZoomClass);
export type ZoomClasses = Static<typeof ZoomClasses>;

export const Settings = Record({
    type: Literal("settings"),
    on: Boolean,
    drop: Number,
    timespan: Number
});
export type Settings = Static<typeof Settings>;

export const GetSettings = Record({
    action: Literal("GET_SETTINGS")
});
export type GetSettings = Static<typeof GetSettings>;

export const SetSettings = Record({
    action: Literal("SET_SETTINGS"),
    payload: Settings
});
export type SetSettings = Static<typeof SetSettings>;

export const GetZoomClasses = Record({
    action: Literal("GET_ZOOM_CLASSES")
});
export type GetZoomClasses = Static<typeof GetZoomClasses>;

export const SetZoomClasses = Record({
    action: Literal("SET_ZOOM_CLASSES"),
    payload: ZoomClasses
});
export type SetZoomClasses = Static<typeof SetZoomClasses>;

export const TabInfo = Record({
    windowId: Number,
    tabs: Number
});
export type TabInfo = Static<typeof TabInfo>;
