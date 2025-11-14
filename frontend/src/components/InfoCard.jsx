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
    <Card
      className="shadow-sm"
      style={{
        width: "100%",
        maxWidth: "20rem",
        borderRadius: "12px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
      }}
    >

      <div style={{ height: "160px", overflow: "hidden" }}>
        <Card.Img
          variant="top"
          src={image_url}
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
        />
      </div>

      <Card.Body className="p-3">
        <Card.Title
          className="fw-bold"
          style={{ fontSize: "1.15rem" }}
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <div className="mt-2">
          {infoToPresent[cardType].map((info, index) => (
            <Card.Text
              key={index}
              className="text-muted mb-1"
              style={{ fontSize: "0.9rem" }}
              dangerouslySetInnerHTML={{
                __html: `<strong class="text-dark">${info.label}:</strong> ${info.value || "N/A"}`,
              }}
            />
          ))}
        </div>

        <Button
          className="mt-3 w-100 fw-semibold"
          style={{
            backgroundColor: "#2e856e",
            borderColor: "#2e856e",
            borderRadius: "8px",
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
