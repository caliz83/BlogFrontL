//To create from CMD line:
//type: npm create vite@4.1.0
//name project & packet
//choose React
//choose JS (in this case)
//cd in project
//type: npm install
//npm run dev, type 'o' to open it, then 'q' to exit it
//to open in VS Code, type: code .

import "./App.css";
import BlogPage from "./components/BlogPage";
import Dashboard from "./components/Dashboard";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Our Blog</h1>
        </Col>
        <BlogPage />
        {/* <Dashboard /> */}
      </Row>
    </Container>
  );
}

export default App;
