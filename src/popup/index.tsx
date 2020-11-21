import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { App } from "./components/App";
import { blue, deepOrange } from "@material-ui/core/colors";
import "./styles/main.css";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: deepOrange
    }
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById("app")
);
