import { Button, Container, Modal, Form } from "react-bootstrap/";
import { useState } from "react";

const Dashboard = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container>
        <Button className="me-3" variant="outline-primary" onClick={handleShow}>
          Add Blog Items
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header style={{ background: "bisque" }} closeButton>
            <Modal.Title style={{ background: "bisque" }}>
              Add Blog Item
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: "bisque" }}>
            <Form>
              <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter Description" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Category">
                <Form.Select aria-label="Default select example">
                  <option>Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Sports">Sports</option>
                  <option value="Tech">Tech</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="Tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control type="text" placeholder="Enter Tags" />
              </Form.Group>

            
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ background: "bisque" }}>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outline-primary" onClick={handleClose}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <Button variant="outline-primary">Edit Blog Item</Button>{" "}
      </Container>
    </>
  );
};

export default Dashboard;
