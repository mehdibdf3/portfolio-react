import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Particle from "../Particle";

function AddTestimonial() {
  const [validated, setValidated] = useState(false);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formKey, setFormKey] = useState(Date.now()); // Clé unique pour le formulaire

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      const newTestimonial = { name, rating, message };
      const storedTestimonials = localStorage.getItem("testimonials");
      const testimonials = storedTestimonials ? JSON.parse(storedTestimonials) : [];
      testimonials.push(newTestimonial);
      localStorage.setItem("testimonials", JSON.stringify(testimonials));
      setName("");
      setEmail("");
      setMessage("");
      setRating(0);
      setValidated(false);
      setFormKey(Date.now()); // Changer la clé pour forcer le rerender du formulaire
      toast.success("Testimonial added successfully!");
    }
  };

  const containerStyle = {
    paddingTop: "100px",
    paddingBottom: "100px",
    position: "relative",
    zIndex: 1,
  };

  const sectionTitleStyle = {
    color: "white",
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "2.5em",
  };

  const formGroupStyle = {
    marginBottom: "20px",
  };

  const labelStyle = {
    color: "white",
    fontSize: "1.2em",
  };

  const inputStyle = {
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: "#444",
    color: "white",
    border: "1px solid #555",
    marginBottom: "10px",
  };

  const textAreaStyle = {
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: "#444",
    color: "white",
    border: "1px solid #555",
    marginBottom: "10px",
    height: "100px", // Fixed height for 4 lines
  };

  const buttonStyle = {
    display: "block",
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "1.2em",
    border: "none",
    cursor: "pointer",
    marginTop: "20px",
  };

  const backgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  };

  const contentStyle = {
    position: "relative",
    zIndex: 1,
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <div style={backgroundStyle}>
        <Particle />
      </div>
      <Container style={containerStyle}>
        <div style={contentStyle}>
          <h1 style={sectionTitleStyle}>Add Testimonial</h1>
          <Row>
            <Col md={8} className="mx-auto">
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                key={formKey} // Utiliser la clé unique pour forcer le rerender
              >
                <Form.Group controlId="formName" style={formGroupStyle}>
                  <Form.Label style={labelStyle}>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your name"
                    style={inputStyle}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formEmail" style={formGroupStyle}>
                  <Form.Label style={labelStyle}>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter your email"
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formRating" style={formGroupStyle}>
                  <Form.Label style={labelStyle}>Rating</Form.Label>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                    <Rating
                      count={5}
                      value={rating}
                      onChange={handleRatingChange}
                      size={30}
                      activeColor="#ffd700"
                    />
                  </div>
                  <Form.Control.Feedback type="invalid">
                    Please provide a rating.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formMessage" style={formGroupStyle}>
                  <Form.Label style={labelStyle}>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    required
                    style={textAreaStyle}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a message.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" style={buttonStyle}>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default AddTestimonial;
