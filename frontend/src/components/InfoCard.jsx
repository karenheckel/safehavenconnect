import React from "react";
import { Card, Button } from "react-bootstrap";

const InfoCard = ({ cardType, cardInfo }) => {
    const {
        title,
        imgUrl,
        location,
        hours,
        onlineAvailability,
        organization,
        services,
        targetDemographic,
        time,
        date,
        eventType,
        resourceType,
        pageLink,
      } = cardInfo;

      const infoToPresent = {
        resource: [
          { label: "Location", value: location },
          { label: "Type", value: resourceType },
          { label: "Hours", value: hours },
          { label: "Online Availability", value: onlineAvailability },
          { label: "Organization", value: organization },
        ],
        organization: [
          { label: "Location", value: location },
          { label: "Services", value: services },
          { label: "Hours", value: hours },
          { label: "Online Availability", value: onlineAvailability },
          { label: "Target Demographic", value: targetDemographic },
        ],
        event: [
          { label: "Location", value: location },
          { label: "Time", value: time },
          { label: "Date", value: date },
          { label: "Event Type", value: eventType },
          { label: "Organization", value: organization },
        ],
      };
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imgUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {infoToPresent[cardType].map(
            (info, index) => (
                <Card.Text key={index}>
                    {info.label}: {info.value}
                </Card.Text>
            )
        )}
        <Button
          style={{
            color: "black",
            backgroundColor: "#cde5d7",
            borderColor: "black",
          }}
          href={pageLink}
        >
          View {cardType.charAt(0).toUpperCase() + cardType.slice(1)}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default InfoCard;
