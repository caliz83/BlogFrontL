//To create from CMD line:
//type: npm create vite@4.1.0
//name project & packet
//choose React
//choose JS (in this case)
//cd in project
//type: npm install
//npm run dev, type 'o' to open it, then 'q' to exit it
//to open in VS Code, type: code .

import BlogPage from "./components/BlogPage";
import CreateAccount from "./components/CreateAccount";
import Dashboard from "./components/Dashboard";
import { Col, Container, Row, } from "react-bootstrap";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CssBaseline, Switch } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import { useState } from "react";
import "./App.css";

function App() {

  //useState for DarkMode switch
  const [toggleDarkMode, setToggleDarkMode] = useState(true);

  //change it between true or false
  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  }

  //color schemes?
  const darkTheme = createTheme({
    palette: {
      mode: toggleDarkMode ? 'dark' : 'light', //dark mode state on toggle
      primary: {
        main: '#8bb384',
        color: '#546e4f'
      },
      secondary: {
        main: '#546e4f',
        color: '#8bb384'
      },
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <BrowserRouter>
      <Container>
        <Row>
          <Col>
            <h1 className="text-center" style={{color: '#8bb384', fontWeight: 'bold'}}>Homosteading Blog</h1>
          </Col>
          <Navbar />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
            <p>{toggleDarkMode ? 'Light Mode' : 'Dark Mode' }</p>
            <Switch checked={toggleDarkMode} onChange={toggleDarkTheme} />
          </div>
        {/* <Login /> */}
        {/* <CreateAccount /> */}
        {/* <BlogPage /> */}
        {/* <Dashboard /> */}
        <Routes>
          <Route path="/" element={<BlogPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
        </Row>
      </Container>    
    </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
