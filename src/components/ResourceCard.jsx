import React from "react";

const ResourceCard = (resInfo) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={resInfo.imgUrl} />
      <Card.Body>
        <Card.Title>{resInfo.title}</Card.Title>
        <Card.Text>Location: {resInfo.location}</Card.Text>
        <Card.Text>Type: {resInfo.type}</Card.Text>
        <Card.Text>Hours: {resInfo.hours}</Card.Text>
        <Card.Text>Online Availability: {resInfo.onlineAvailability}</Card.Text>
        <Card.Text>Organization: {resInfo.organization}</Card.Text>
        <Button
          style={{
            color: "black",
            backgroundColor: "#cde5d7",
            borderColor: "black",
          }}
          href={resInfo.pageLink}
        >
          View Resource
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ResourceCard;
