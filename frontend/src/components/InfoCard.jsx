import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const InfoCard = ({ cardType, cardInfo, id }) => {
  const navigate = useNavigate();
  const {
    title,
    image_url,
    location,
    hours,
    online_availability,
    organization,
    services,
    time,
    date,
    event_type,
    resource_type,
    org_type,
    description,
    registration,
  } = cardInfo;

  const infoToPresent = {
    resource: [
      { label: "Location", value: location },
      { label: "Type", value: resource_type },
      { label: "Hours", value: hours },
      { label: "Online Availability", value: online_availability },
      { label: "Organization", value: organization },
    ],
    organization: [
      { label: "Location", value: location },
      { label: "Type", value: org_type },
      { label: "Services", value: services },
      { label: "Hours", value: hours },
      { label: "Online Availability", value: online_availability },
    ],
    event: [
      { label: "Event Type", value: event_type },
      { label: "Description", value: description },
      { label: "Location", value: location },
      { label: "Date", value: date },
      { label: "Time", value: time },
      { label: "Online", value: online_availability },
      { label: "Registration", value: registration },
    ],
  };

  const handleCardClick = () => {
    navigate(`/${cardType}s/${id}`);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image_url} />
      <Card.Body>
        <Card.Title dangerouslySetInnerHTML={{ __html: title }} />

        {infoToPresent[cardType].map((info, index) => (
          <Card.Text key={index}
            dangerouslySetInnerHTML={{
              __html: `<strong>${info.label}:</strong> ${info.value || "N/A"}`,
            }}
          />
        ))}
        <Button
          style={{
            color: "black",
            backgroundColor: "#cde5d7",
            borderColor: "black",
          }}
          onClick={handleCardClick}
        >
          View {cardType.charAt(0).toUpperCase() + cardType.slice(1)}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default InfoCard;
