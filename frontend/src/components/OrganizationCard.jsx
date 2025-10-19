import React from "react";
import { Card, Button } from "react-bootstrap";

const OrganizationCard = (orgInfo) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="https://www.safeaustin.org/wp-content/uploads/2018/08/fb.png"
      />
      <Card.Body>
        <Card.Title>{orgInfo.title}</Card.Title>
        <Card.Text>Location: {orgInfo.location}</Card.Text>
        <Card.Text>
          Services: {orgInfo.services}
        </Card.Text>
        <Card.Text>Hours: {orgInfo.hours}</Card.Text>
        <Card.Text>Online Availability: {orgInfo.online}</Card.Text>
        <Card.Text>
          Target Demographic: {orgInfo.targetDemographic}
        </Card.Text>
        <Button
          style={{
            color: "black",
            backgroundColor: "#cde5d7",
            borderColor: "black",
          }}
          href={orgInfo.pageLink}
        >
          View Organization
        </Button>
      </Card.Body>
    </Card>
  );
};

export default OrganizationCard;
