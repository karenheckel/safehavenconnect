import React, { useState } from "react";
import { Container, Nav, Navbar, Button, Form, FormControl } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import GoogleTranslate from "./GoogleTranslate";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <Navbar
      expand="lg"
      className="py-3 shadow-sm"
      style={{ backgroundColor: "#cde5d7" }}
    >
      <Container fluid className="px-4">
        {/* Title */}
        <Navbar.Brand as={NavLink} to="/"> SafeHavenConnect </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Navigation links */}
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to="/" end> Home </Nav.Link>
            <Nav.Link as={NavLink} to="/about"> About </Nav.Link>
            <Nav.Link as={NavLink} to="/organizations"> Organizations </Nav.Link>
            <Nav.Link as={NavLink} to="/events"> Events </Nav.Link>
            <Nav.Link as={NavLink} to="/resources"> Resources </Nav.Link>
            <Nav.Link as={NavLink} to="/visualizations"> Visualizations </Nav.Link>
            <Nav.Link as={NavLink} to="/provider-visualizations"> Provider Visualizations </Nav.Link>
          </Nav>

          {/* Search + Language Selector */}
          <div className="d-flex align-items-center gap-2">
            <Form className="d-flex" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search..."
                className="me-2 rounded-pill px-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "180px",
                  border: "1px solid #9fb9a8",
                  backgroundColor: "#f8f9fa",
                }}
              />
              <Button
                type="submit"
                variant="outline-dark"
                className="rounded-circle"
                style={{
                  width: "38px",
                  height: "38px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="bi bi-search"></i>
              </Button>
            </Form>

            {/* Translate button */}
            <div style={{ transform: "scale(0.9)" }}>
              <GoogleTranslate />
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
