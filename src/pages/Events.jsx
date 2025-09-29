import React from 'react'

const Events = () => {
  return (
    <Container className="text-center my-5">
      <h1>Upcoming Events</h1>
      <Row className="justify-content-center">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="https://picsum.photos/180/100" />
          <Card.Body>
            <Card.Title>Volunteer Information Session</Card.Title>
            <Card.Text>
                Location: 1515 Grove Blvd, Austin, TX 78741
                Time: 6:00 pm - 7:30 pm
                Date: October 1, 2025
                Event Type: Informational
            </Card.Text>
            <Button style={{color: "black", backgroundColor: "#cde5d7", borderColor: "black"}} href="/events">View Events</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="https://picsum.photos/180/100" />
          <Card.Body>
            <Card.Title>Volunteer Information Session</Card.Title>
            <Card.Text>
                Location: 1515 Grove Blvd, Austin, TX 78741
                Time: 10:00 am - 11:30 am
                Date: October 4, 2025
                Event Type: Informational
            </Card.Text>
            <Button style={{color: "black", backgroundColor: "#cde5d7", borderColor: "black"}} href="/events">View Events</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="https://picsum.photos/180/100" />
          <Card.Body>
            <Card.Title>TCFV’s 2025 Texas Town Hall</Card.Title>
            <Card.Text>
                Location: Texas Tribune Headquarters, Austin
                Time: 10:00 am - 12:00 pm
                Date: October 3, 2025
                Event Type:
            </Card.Text>
            <Button style={{color: "black", backgroundColor: "#cde5d7", borderColor: "black"}} href="/events">View Events</Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

export default Events