import React from "react";
import { Container } from "react-bootstrap";
import EventsChart from "./Visualizations/EventsChart";
import ResourceChart from "./Visualizations/ResourceChart";
import OrganizationsChart from "./Visualizations/OrganizationsChart";

const Visualizations = () => {
  return (
    <Container className="py-5">

      {/* Page Header */}
      <div className="text-center mb-4">
        <h1 className="fw-bold mb-3">SafeHavenConnect Data Visualizations</h1>
      </div>

      {/* Events */}
      <div className="my-5 text-center">
        <h4 className="mb-3 fw-semibold">Events per Category</h4>
        <div style={{ display: "flex", justifyContent: "center" }}><EventsChart /></div>
      </div>

      {/* Resources */}
      <div className="my-5 text-center">
        <h4 className="mb-3 fw-semibold">Resources by Location</h4>
        <div style={{ display: "flex", justifyContent: "center" }}><ResourceChart /></div>
      </div>

      {/* Organizations */}
      <div className="my-5 text-center">
        <h4 className="mb-3 fw-semibold">Top 20 Cities with the Most Organizations</h4>
        <div style={{ display: "flex", justifyContent: "center" }}><OrganizationsChart /></div>
      </div>

    </Container>
  );
};

export default Visualizations;
