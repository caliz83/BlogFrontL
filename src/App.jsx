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
import { Col, Container, Row } from "react-bootstrap";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">Our Blog</h1>
          </Col>
          <Navbar />
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
        </Row>
      </Container>    
    </BrowserRouter>
  );
}

export default App;
