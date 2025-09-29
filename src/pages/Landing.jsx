import React from "react";
import NavBar from "../components/NavBar";
import Events from "../components/Events";
import Organizations from "../components/Organizations";
import Resources from "../components/Resources";
import { Col, Container } from "react-bootstrap";

const Landing = () => {
  return (
    <Container>
      <NavBar />
      <Events />
      <Resources />
      <Organizations />
    </Container>
  );
};

export default Landing;
