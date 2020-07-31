import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import Navbar from "./components/Navbar";
import LaunchIndex from "./components/LaunchIndex";
import LaunchShoe from "./components/LaunchShoe";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#FFFFFF",
    },
    text: {
      primary: "#000000",
      secondary: "#FFFFFF",
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="launch" element={<Launch />}>
              <Route path="/" element={<LaunchIndex />} />
              <Route path=":slug" element={<LaunchShoe />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome Home!</h1>
    </div>
  );
}

function Launch() {
  return (
    <div>
      <h1>Launch!</h1>
      <Outlet />
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1>Not Found!</h1>
      <p>Sorry your page was not found</p>
    </div>
  );
}

export default App;
