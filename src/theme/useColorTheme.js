import {createTheme, useMediaQuery} from "@mui/material";
import React from "react";
import theme, {getDesignTokens} from "./theme";

export const useColorTheme = () => {
    const isDarkModeEnabled = useMediaQuery('(prefers-color-scheme: dark)');
    const colorSchema = localStorage.getItem("colorSchema");
    const [mode, setMode] = React.useState(colorSchema ? colorSchema : (isDarkModeEnabled ? "dark" : "light"));

    const toggleColorMode = () =>
        setMode((prevMode) => {
            const mode = prevMode === "light" ? "dark" : "light";
            localStorage.setItem("colorSchema", mode);
            return mode;
        });

    const modifiedTheme = React.useMemo(
        () => createTheme(getDesignTokens(mode)),
        [mode]
    );

    return {
        theme: modifiedTheme,
        mode,
        toggleColorMode,
    };
};
