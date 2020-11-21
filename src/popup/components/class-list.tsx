import React, { useEffect, useState, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { defaultZoomClasses } from "../../shared/defaults";
import { GetZoomClasses, SetZoomClasses, ZoomClasses } from "../../shared/types";
import _ from "lodash";
import { Box, Typography } from "@material-ui/core";
import { DragHandle, Launch } from "@material-ui/icons";
import update from "immutability-helper";

export const ClassList = () => {
    const usingDefault = useRef<boolean>(true);

    const [zoomClasses, setZoomClasses] = useState<ZoomClasses>(_.cloneDeep(defaultZoomClasses));

    useEffect(() => {
        chrome.runtime.sendMessage({ action: "GET_ZOOM_CLASSES" } as GetZoomClasses, response => {
            usingDefault.current = false;
            try {
                const zoomClasses = ZoomClasses.check(response);
                setZoomClasses(zoomClasses);
            } catch (e) {}
        });
    }, []);

    useEffect(() => {
        if (!usingDefault.current) {
            chrome.runtime.sendMessage({
                action: "SET_ZOOM_CLASSES",
                payload: zoomClasses
            } as SetZoomClasses);
        }
    }, [zoomClasses]);

    return (
        <>
            <Box p={2}>
                <DragDropContext
                    onDragEnd={({ destination, source }) => {
                        if (destination && destination.droppableId == "trash") {
                            setZoomClasses(zoomClasses =>
                                update(zoomClasses, {
                                    $splice: [[source.index, 1]]
                                })
                            );
                        } else if (destination) {
                            setZoomClasses(zoomClasses =>
                                update(
                                    update(zoomClasses, {
                                        $splice: [[source.index, 1]]
                                    }),
                                    {
                                        $splice: [[destination.index, 0, zoomClasses[source.index]]]
                                    }
                                )
                            );
                        }
                    }}
                >
                    <Droppable droppableId="class-list">
                        {provided => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {zoomClasses.map((zoomClass, i) => (
                                    <Draggable
                                        key={zoomClass.id}
                                        draggableId={zoomClass.id}
                                        index={i}
                                    >
                                        {provided => (
                                            <Box
                                                // @ts-ignore
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                display="flex"
                                                flexWrap="wrap"
                                                alignItems="center"
                                                mb={1.5}
                                                width="100%"
                                            >
                                                <Box mr={1} alignSelf="center">
                                                    <a href={zoomClass.link} target="_blank">
                                                        <Launch color="primary" />
                                                    </a>
                                                </Box>
                                                <Box width={0} mr={1} flex={1}>
                                                    <Typography
                                                        variant="body1"
                                                        style={{
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis"
                                                        }}
                                                    >
                                                        {zoomClass.name}
                                                    </Typography>
                                                </Box>
                                                <Box ml={1} {...provided.dragHandleProps}>
                                                    <DragHandle />
                                                </Box>
                                            </Box>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="trash">
                        {provided => (
                            <div
                                style={{
                                    backgroundColor: "#ffd9d9",
                                    border: "2px dashed red",
                                    padding: 10
                                }}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <Typography variant="body1" style={{ color: "black" }}>
                                    Drag Class Here To Delete
                                </Typography>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>
        </>
    );
};
