import React from "react";
import { Box, Typography, List, ListItem } from "@material-ui/core";

export const AdditionalInfo = () => (
    <>
        <Box p={2}>
            <List>
                {[
                    "This only works in the browser verison of Zoom",
                    "Automation on/off controls whether or not you will auto leave classes",
                    '"Participant Drop" is the number of participants needed to leave within "Drop Timespan" seconds',
                    "Breakout room joining is not supported, if people leave to breakout rooms and automation is turned on, you will leave the meeting, so don't try it just yet (Will work in future releases)",
                    'Add classes with the "Add Classes" tab and access them through the "Class List" tab, so you don\'t need to go to the "Wondering where to go for your first days of class?" document',
                    "Make sure the window is regular sized, the leave button and participant count must be visible",
                    "The leave button and participant count should be blue a couple seconds after joining the meeting. If not, just refresh the page and it should work",
                    "If you have suggestions for future features, let me know",
                    "Version: 1.1",
                    "Created by Aniket, Idea by Collin"
                ].map((listItem, i) => (
                    <ListItem key={i}>
                        <Typography>{listItem}</Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    </>
);
