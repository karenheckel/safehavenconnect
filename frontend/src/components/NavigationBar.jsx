import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import GoogleTranslate from "./GoogleTranslate";

const NavigationBar = () => {
  return (
    <Navbar expand="lg" className="px-3" style={{ backgroundColor: "#cde5d7" }}>
      <Container>
        <Navbar.Brand href="#">SafeHavenConnect</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/organizations">
              Organizations
            </Nav.Link>
            <Nav.Link as={NavLink} to="/events">
              Events
            </Nav.Link>
            <Nav.Link as={NavLink} to="/resources">
              Resources
            </Nav.Link>

            <GoogleTranslate />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
