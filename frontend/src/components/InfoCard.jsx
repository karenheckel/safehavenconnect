import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const InfoCard = ({ cardType, cardInfo, id }) => {
    const navigate = useNavigate()
    const {
        title,
        image_url,
        location,
        hours,
        online_availability,
        organization,
        services,
        target_demographic,
        time,
        date,
        event_type,
        resource_type,
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
          { label: "Services", value: services },
          { label: "Hours", value: hours },
          { label: "Online Availability", value: online_availability },
          { label: "Target Demographic", value: target_demographic },
        ],
        event: [
          { label: "Location", value: location },
          { label: "Time", value: time },
          { label: "Date", value: date },
          { label: "Event Type", value: event_type },
          { label: "Organization", value: organization },
        ],
      };

  const handleCardClick = () => {
    navigate(`/${cardType}s/${id}`)
  }
  
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image_url} />
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
          onClick={handleCardClick}
        >
          View {cardType.charAt(0).toUpperCase() + cardType.slice(1)}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default InfoCard;
