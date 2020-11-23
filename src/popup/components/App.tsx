import React, { useState, FC } from "react";
import { AppBar, Tab, Tabs, Box } from "@material-ui/core";
import { SettingsMenu, ClassList, AddClasses, AdditionalInfo } from ".";

interface MiniPageProps {
    currentTab: number;
    i: number;
}

const MiniPage: FC<MiniPageProps> = ({ currentTab, i, children }) => (
    <>{currentTab === i && children}</>
);

const tabs = [
    {
        label: "Settings",
        component: <SettingsMenu />
    },
    {
        label: "Class List",
        component: <ClassList />
    },
    {
        label: "Add Classes",
        component: <AddClasses />
    },
    {
        label: "Additional Info",
        component: <AdditionalInfo />
    }
];

export const App = () => {
    const [tab, setTab] = useState<number>(0);

    return (
        <Box width={325} height={300} style={{ overflowY: "scroll" }}>
            <AppBar position="static" color="default">
                <Tabs
                    value={tab}
                    onChange={(event, tab) => setTab(tab)}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {tabs.map(({ label }, i) => (
                        <Tab key={i} label={label} />
                    ))}
                </Tabs>
            </AppBar>
            {tabs.map(({ component }, i) => (
                <MiniPage key={i} currentTab={tab} i={i}>
                    {component}
                </MiniPage>
            ))}
        </Box>
    );
};
