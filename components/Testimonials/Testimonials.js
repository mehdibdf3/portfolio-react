import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Particle from "../Particle";
import Rating from "react-rating-stars-component";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const storedTestimonials = localStorage.getItem("testimonials");
    if (storedTestimonials) {
      setTestimonials(JSON.parse(storedTestimonials));
    }
  }, []);

  const containerStyle = {
    paddingTop: "100px",
    paddingBottom: "100px",
  };

  const sectionTitleStyle = {
    color: "white",
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "2.5em",
  };

  const cardStyle = {
    backgroundColor: "#333",
    color: "white",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
  };

  const ratingContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Particle />
      <Container style={containerStyle}>
        <h1 style={sectionTitleStyle}>Testimonials</h1>
        <Row>
          {testimonials.map((testimonial, index) => (
            <Col md={4} key={index}>
              <Card style={cardStyle}>
                <Card.Body>
                  <Card.Title>{testimonial.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <div style={ratingContainerStyle}>
                      <Rating
                        count={5}
                        value={testimonial.rating}
                        size={24}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                  </Card.Subtitle>
                  <Card.Text>{testimonial.message}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Testimonials;
