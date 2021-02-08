import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Styling
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import App from "./pages/App";

// Dark theme
const ThemeifiedApp = () => {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

const component = <ThemeifiedApp />;
ReactDOM.render(component, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
