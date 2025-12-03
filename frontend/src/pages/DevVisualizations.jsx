import React from "react";
import { Container, Button } from "react-bootstrap";
import ClinicsChart from "./DevVisualizations/ClinicsChart";
import HealthServicesChart from "./DevVisualizations/HealthServicesChart";
import PharmaciesChart from "./DevVisualizations/PharmaciesChart";

const DevVisualizations = () => {
  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold mb-3">MyHealthMatters Data Visualizations</h1>

        <Button
          variant="success"
          href="https://myhealthmatters.me"
          target="_blank"
          rel="noopener noreferrer"
          style={{ borderRadius: "10px", fontWeight: "600" }}
        > Visit MyHealthMatters </Button>
      </div>

      <div className="my-5 text-center">
        <h4 className="mb-3 fw-semibold">Clinics by License Type</h4>
        <div style={{ display: "flex", justifyContent: "center" }}><ClinicsChart /></div>
      </div>

      <div className="my-5 text-center">
        <h4 className="mb-3 fw-semibold">Health Services per ZIP Code</h4>
        <div style={{ display: "flex", justifyContent: "center" }}><HealthServicesChart /></div>
      </div>

      <div className="my-5 text-center">
        <h4 className="mb-3 fw-semibold">Pharmacies by ZIP Code</h4>
        <div style={{ display: "flex", justifyContent: "center" }}><PharmaciesChart /></div>
      </div>

    </Container>
  );
};

export default DevVisualizations;
