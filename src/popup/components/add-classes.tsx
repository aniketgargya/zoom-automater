import React, { useEffect, useState } from "react";
import { defaultZoomClasses } from "../../shared/defaults";
import { GetZoomClasses, SetZoomClasses, ZoomClass, ZoomClasses } from "../../shared/types";
import { Button, TextField, Box } from "@material-ui/core";
import update from "immutability-helper";
import _ from "lodash";
import { v4 } from "uuid";

export const AddClasses = () => {
    const [zoomClass, setZoomClass] = useState<ZoomClass>({ id: v4(), link: "", name: "" });
    const [zoomClasses, setZoomClasses] = useState<ZoomClasses>(_.cloneDeep(defaultZoomClasses));

    useEffect(() => {
        chrome.runtime.sendMessage({ action: "GET_ZOOM_CLASSES" } as GetZoomClasses, response => {
            try {
                const zoomClasses = ZoomClasses.check(response);
                setZoomClasses(zoomClasses);
            } catch (e) {}
        });
    }, []);

    return (
        <>
            <Box p={2}>
                <form
                    onSubmit={event => {
                        event.preventDefault();
                        const newZoomClasses = update(zoomClasses, {
                            $push: [_.cloneDeep(zoomClass)]
                        });
                        chrome.runtime.sendMessage({
                            action: "SET_ZOOM_CLASSES",
                            payload: newZoomClasses
                        } as SetZoomClasses);
                        setZoomClass({ id: v4(), link: "", name: "" });
                        setZoomClasses(newZoomClasses);
                    }}
                >
                    <Box mb={2}>
                        <TextField
                            fullWidth={true}
                            label="Class Name"
                            type="text"
                            variant="outlined"
                            size="small"
                            required
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={zoomClass.name}
                            onChange={e => {
                                setZoomClass(zoomClass =>
                                    update(zoomClass, {
                                        name: {
                                            $set: e.target.value
                                        }
                                    })
                                );
                            }}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth={true}
                            label="Class Link"
                            type="text"
                            variant="outlined"
                            size="small"
                            required
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={zoomClass.link}
                            onChange={e => {
                                setZoomClass(zoomClass =>
                                    update(zoomClass, {
                                        link: {
                                            $set: e.target.value
                                        }
                                    })
                                );
                            }}
                        />
                    </Box>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth={true}
                    >
                        Add Class
                    </Button>
                </form>
            </Box>
        </>
    );
};
