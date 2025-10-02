import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary justify-content-between px-3"
      style={{ backgroundColor: "#cde5d7" }}
    >
      <Navbar.Brand href="#">SafeHavenConnect</Navbar.Brand>
      <Nav>
        <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
        <Nav.Link as={NavLink} to="/about">About</Nav.Link>
        <Nav.Link as={NavLink} to="/organizations">Organizations</Nav.Link>
        <Nav.Link as={NavLink} to="/events">Events</Nav.Link>
        <Nav.Link as={NavLink} to="/resources">Resources</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
