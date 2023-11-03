import {
  Button,
  Container,
  Modal,
  Form,
  Accordion,
  Row,
  Col,
  ListGroup,
  Spinner
} from "react-bootstrap/";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddBlogItems,
  GetBlogItems,
  GetBlogItemsByUserId,
  LoggedInData,
  checkToken,
  updateBlogItems
} from "../services/DataService";

const Dashboard = () => {
  //checking for token to know whether to show content or not
  let navigate = useNavigate();
  useEffect(() => {
    //useEffect is the first thing that fires on load
    //put any logic we want to fire on load in here
    //our effect will fire again if we have a change in the state in our dependency (square brackets below)
    if (!checkToken()) {
      //if no token, maybe they haven't logged in yet
      navigate("/Login");
    } else {
      setTimeout (async () => {
        let loggedInData = LoggedInData();
        console.log(loggedInData);
        let userBlogItems = await GetBlogItemsByUserId(loggedInData.userId);
        setBlogItems(userBlogItems);
        setUserId(loggedInData.userId);
        setPublisherName(loggedInData.publisherName);
        console.log(userBlogItems);
        setIsLoading(false);
      }, 1000) //delayed for 1 second (in ms)
    }

    // let userInfo = LoggedInData();
    // console.log(userInfo);
  }, []);

  //functions
  const handleSetTitle = (e) => setBlogTitle(e.target.value);
  const handleBlogDescription = (e) => setBlogDescription(e.target.value);
  const handleTag = (e) => setBlogTags(e.target.value);
  const handleCategory = (e) => setBlogCategory(e.target.value);
  //const handleImage = (e) => setBlogImage(e.target.value);
  const handleClose = () => setShow(false);

  //when set to true, makes modal show up
  const handleShow = (e, {id, userId, publisherName, title, image, description, category, tag, isDeleted, isPublished}) => {
    setShow(true);
    //console.log(e.target.textContent); //when it's a form it's e.target.input; when it's text, it's e.target.textContent
    if (e.target.textContent === "Add Blog Item") {
      setEdit(false);
      // setBlogTitle("");
      // setBlogDescription("");
      // setBlogCategory("");
      // setBlogTags("");
    } else {
      setEdit(true); //means we already have something in there so it's an edit
      //console.log(blogData);
    }

    setBlogId(id);
    setUserId(userId);
    setPublisherName(publisherName);
    setBlogImage(image);
    setBlogTitle(title);
    setBlogDescription(description);
    setBlogCategory(category);
    setBlogTags(tag);
    setIsDeleted(isDeleted);
    setIsPublished(isPublished);
  };

  const [blogUserId, setUserId ] = useState(0);
  const [blogPublisherName, setPublisherName] = useState("");

  //create our useStates to help us handle our forms
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogTags, setBlogTags] = useState("");
  const [blogId, setBlogId] = useState(0);
  //const [userId, setUserId] = useState(0);
  //const [publisherName, setPublisherName] = useState("");

  const [blogItems, setBlogItems] = useState([
    // {
    //   Id: 1,
    //   Title: "Top Finishing and Crossing Drills",
    //   Publisher: "anonymous",
    //   Date: "01-13-2022",
    //   Text: "Developing finishing and crossing skills is an important aspect of soccer that can greatly constribute to your player.",
    //   Image: "./assets/Images/3soccerballs.jpg",
    //   Published: true,
    // },
    // {
    //   Id: 2,
    //   Title: "6 Soccer Drills to Work on Defense",
    //   Publisher: "anonymous",
    //   Date: "01-14-2022",
    //   Text: "A strong defense is the backbone of any successful soccer team",
    //   Image: "./assets/Images/3soccerballs.jpg",
    //   Published: true,
    // },
    // {
    //   Id: 3,
    //   Title: "5 Small Side Games",
    //   Publisher: "anonymous",
    //   Date: "01-15-2022",
    //   Text: "Small-sided games create a fast-paced and intense environment.",
    //   Image: "./assets/Images/3soccerballs.jpg",
    //   Published: true,
    // },
    // {
    //   Id: 4,
    //   Title: "5 Fun 1 V 1 Youth Soccer Activites",
    //   Publisher: "anonymous",
    //   Date: "01-15-2022",
    //   Text: "One of the best ways to naturally bring out the competitive nature.",
    //   Image: "./assets/Images/3soccerballs.jpg",
    //   Published: false,
    // },
    // {
    //   Id: 5,
    //   Title: "5 Fun warm up soccer drills",
    //   Publisher: "anonymous",
    //   Date: "01-15-2022",
    //   Text: "One of the challenges for youth soccer coaches is to make sure their players are always excited to come to practice.",
    //   Image: "./assets/Images/3soccerballs.jpg",
    //   Published: false,
    // },
  ]);

  //Bools
  const [show, setShow] = useState(false);
  //for the Edit function
  const [edit, setEdit] = useState(false);
  // while loading
  const [isLoading, setIsLoading] = useState(true);
  const [IsDeleted, setIsDeleted] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  //const handleSaveWithPublish = async () => {
  const handleSave = async ({target: {textContent}}) => {
    //let { publisherName, userId } = LoggedInData();

    const Published = {
      Id: 0,
      UserId: blogUserId,
      PublisherName: blogPublisherName,
      Title: blogTitle,
      Image: blogImage,
      Description: blogDescription,
      Category: blogCategory,
      Tag: blogTags,
      Date: new Date(),
      IsDeleted: false,
      //IsPublished: true,
      IsPublished: textContent == "Save" || textContent == "Save Changes" ? false : true, // make it dynamic so can use one function (handleSave) in place of ...WithPublish or ...WithUnpublish
    };
    console.log(Published);
    handleClose();
    let result = false;

    if(edit){
      result = await updateBlogItems(Published);
    } else {
      result = await AddBlogItems(Published);
    }

    if (result) {
      let userBlogItems = await GetBlogItemsByUserId(blogUserId);
      setBlogItems(userBlogItems);
      console.log(userBlogItems, "yes, it works!");
    } else {
      alert(`Blog Item Not ${edit ? "Updated" : "Added"}`);
    }
  };

  // const handleSaveWithUnpublish = async () => {
  //   let { publisherName, userId } = LoggedInData();

  //   const NotPublished = {
  //     Id: 0,
  //     UserId: userId,
  //     PublisherName: publisherName,
  //     Title: blogTitle,
  //     Image: blogImage,
  //     Description: blogDescription,
  //     Category: blogCategory,
  //     Tag: blogTags,
  //     Date: new Date(),
  //     IsDeleted: false,
  //     IsPublished: false,
  //   };
  //   console.log(NotPublished);
  //   handleClose();
  //   let result = await AddBlogItems(NotPublished);

  //   if (result) {
  //     let userBlogItems = await GetBlogItemsByUserId(userId);
  //     setBlogItems(userBlogItems);
  //     console.log(userBlogItems, "yes, it works!");
  //   }
  // };

  const handlePublish = async (item) => {
    console.log("first");
    item.isPublished = !item.isPublished;

    let result = await updateBlogItems(item);

    if(result){
      let userBlogItems = await GetBlogItemsByUserId(blogUserId);
      setBlogItems(userBlogItems);
      console.log(userBlogItems);
    } else {
      alert(`Blog Item Not ${edit ? "Updated" : "Added"}`);
    }
  }

  //handle delete
  const handleDelete = async (item) => {
    console.log("an item was deleted");
    item.isDeleted = !item.isDeleted;

    let result = await updateBlogItems(item);

    if(result){
      let userBlogItems = await GetBlogItemsByUserId(blogUserId);
      setBlogItems(userBlogItems);
      console.log(userBlogItems);
    } else {
      alert(`Blog Item Not ${edit ? "Updated" : "Added"}`);
    }
  }

  //handle our image
  const handleImage = async (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      setBlogImage(reader.result);
    };
    reader.readAsDataURL(file);
    //setBlogImage(target.files[o]);
  };

  return (
    <>
      <Container>
        <Button className="me-3" variant="outline-success" onClick={(e) => handleShow(e, {id: 0, userId: blogUserId, publisherName: blogPublisherName, title: "", image: "", description: "", category: "", tag: "", isDeleted: false, isPublished: false})}>
          Add Blog Item
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header style={{ background: "bisque" }} closeButton>
            <Modal.Title style={{ background: "bisque" }}>
              {edit ? "Edit" : "Add"} Blog Item
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: "bisque" }}>
            <Form>
              <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={blogTitle}
                  onChange={handleSetTitle}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={blogDescription}
                  onChange={handleBlogDescription}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Category">
                <Form.Select
                  aria-label="Default select example"
                  value={blogCategory}
                  onChange={handleCategory}
                >
                  <option>Select Category</option>
                  <option value="projects">Butch the Builder (Projects)</option>
                  <option value="food">Food</option>
                  <option value="pets">Pets & Livestock</option>
                  <option value="wildlife">Wildlife</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="Tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Tags"
                  value={blogTags}
                  onChange={handleTag}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Image">
                <Form.Label>Pick an Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Select Image From File"
                  accept="image/png, image/jpg"
                  // value={blogImage}
                  onChange={handleImage}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ background: "bisque" }}>
            <Button variant="outline-success" onClick={handleSave}>
              {edit ? "Save Changes" : "Save"}
            </Button>
            <Button variant="outline-primary" onClick={handleSave}>
              {edit ? "Save Changes" : "Save"} and Publish
            </Button>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Button variant="outline-success" onClick={handleShow}>
          Edit Blog Item
        </Button>{" "}
        <Row>
          <Col>
          {isLoading ? <><Spinner animation="border" variant="success" /><h1>Loading...</h1></> : (
            blogItems.length == 0 ? (
              <h1 className="text-center">Nothing to See Here</h1>
            ) : (
              <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Published</Accordion.Header>
                  <Accordion.Body
                    style={{ backgroundColor: "#f2f2f2", color: "black" }}
                  >
                    {blogItems.map((item, i) =>
                      item.isPublished && !item.isDeleted ? (
                        <ListGroup key={i}>
                          {item.title}
                          <Col className="d-flex justify-content-end">
                            <Button variant="outline-danger mx-2" onClick={() => handleDelete(item)}>
                              Delete
                            </Button>
                            <Button variant="outline-info mx-2" onClick={(e) => handleShow(e, item)}>Edit</Button>
                            <Button variant="outline-primary mx-2" onClick={() => handlePublish(item)}>
                              Unpublish
                            </Button>
                          </Col>
                        </ListGroup>
                      ) : null
                    )}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Unpublished</Accordion.Header>
                  <Accordion.Body
                    style={{ backgroundColor: "#f2f2f2", color: "black" }}
                  >
                    {blogItems.map((item, i) =>
                      !item.isPublished && !item.isDeleted ? (
                        <ListGroup key={i}>
                          {item.title}
                          <Col className="d-flex justify-content-end">
                            <Button variant="outline-danger mx-2" onClick={() => handleDelete(item)}>
                              Delete
                            </Button>
                            <Button variant="outline-info mx-2" onClick={(e) => handleShow(e, item)}>Edit</Button>
                            <Button variant="outline-primary mx-2" onClick={() => handlePublish(item)}>
                              Publish
                            </Button>
                          </Col>
                        </ListGroup>
                      ) : null
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;

//onChange={(e) => setBlogTitle(e.target.value)} alternative way to handle the onChange function in each form element, don't have to create the function further up
