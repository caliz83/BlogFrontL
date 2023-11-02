import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getPublishedBlogItems } from "../services/DataService";

const BlogPage = () => {
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

  useEffect(() => {
    getThePublishedItems();    
  }, [])

  //can't make a useEffect async so make a separate helper function first that's async, then put that into useEffect
  const getThePublishedItems = async () => {
    let publishedItems = await getPublishedBlogItems();
    console.log(publishedItems);
    setBlogItems(publishedItems);
  }

  return (
    <Container>
      <Row>
        <Col>
          {blogItems.map((item, i) => (
            <div key={i}>
              {i % 2 == 0 ? (
                <Row key={i}>
                  <Col md={6}>
                    <Row>
                      <Col style={{ border: "solid" }} className="d-flex justify-content-center" md={12}><h2>{item.title}</h2></Col>
                      <Col style={{ border: "solid" }} md={12}>
                        <Row>
                          <Col style={{ border: "solid" }} className="d-flex justify-content-center" md={6}><h2>{item.publisherName}</h2></Col>
                          <Col style={{ border: "solid" }} className="d-flex justify-content-center" md={6}><p>{item.date}</p></Col>
                        </Row>
                      </Col>
                      <Col style={{ border: "solid" }} className="d-flex justify-content-center" md={12}>{item.image}</Col>
                    </Row>
                  </Col>
                  <Col style={{ border: "solid" }} className="d-flex justify-content-center" md={6}><p>{item.description}</p></Col>
                </Row>
              ) : (
                <Row key={i}>
                  <Col style={{ border: "solid" }} className="d-flex justify-content-center" md={6}><p>{item.description}</p></Col>
                  <Col style={{ border: "solid" }} md={6}>
                    <Row style={{ border: "solid" }}>
                      <Col style={{ border: "solid" }} className="d-flex justify-content-center" md={12}><h2>{item.title}</h2></Col>
                      <Col style={{ border: "solid" }} md={12}>
                        <Row>
                          <Col style={{ border: "solid" }} className="d-flex justify-content-center" md={6}><h2>{item.publisherName}</h2></Col>
                          <Col style={{ border: "solid" }} className="d-flex justify-content-center" md={6}><p>{item.date}</p></Col>
                        </Row>
                      </Col>
                    </Row>
                    <Col style={{ border: "solid" }} className="d-flex justify-content-center" md={12}>{item.image}</Col>
                  </Col>
                </Row>
              )}
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default BlogPage;
