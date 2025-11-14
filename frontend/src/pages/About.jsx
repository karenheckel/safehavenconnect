import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image, Spinner } from "react-bootstrap";

/* Team list */
const team = [
  {
    photo: "/photos/karen_photo.jpg",
    name: "Karen Heckel",
    role: "Fullstack Developer",
    bio: "I am a junior majoring in Computer Science. Currently, I am an Undergraduate Research Assistant at TACC and the Academic officer for HACS. Outside of school, I enjoy thrifting and watching movies!",
    commitIds: ["karenheckel"],
    gitlabUser: "karenheckel",
    unitTests: "20",
  },
  {
    photo: "/photos/brianna_photo.jpeg",
    name: "Brianna Flores",
    role: "Full Stack Developer",
    bio: "Hello! I'm a junior studying Computer Science with a minor in Business. I currently serve as the Marketing Officer for the Hispanic Association of Computer Scientists (HACS) and am also a member of Longhorn Developers and TCUP. I also love to crochet and run a small business, StockysCrafts, where I sell handmade crochet plushies!",
    commitIds: ["Brianna-Flo"],
    gitlabUser: "Brianna-Flo",
    unitTests: "10",
  },
  {
    photo: "/photos/parul_photo.jpeg",
    name: "Parul Sadasivuni",
    role: "Full Stack Developer",
    bio: "My name is Parul and I'm a junior in Computer Science and Business here at UT. I'm a research assistant with Dr. Caleb Kwon in the McCombs School of Business studying the impacts of minimum wage shocks on employment. In my free time, I enjoy music and watching Longhorn sports!",
    commitIds: ["txpsree@gmail.com", "Parul S Sadasivuni"],
    gitlabUser: "parul.sadasivuni",
    unitTests: "0",
  },
  {
    photo: "/photos/jonathan_photo.jpg",
    name: "Jonathan Ho",
    role: "Full Stack Developer",
    bio: "Hi! My name is Jonathan Ho, and I'm currently a junior studying Computer Science and Business at UT Austin. Over the summer, I worked as a generative AI intern at Scale AI. In my free time, I enjoy playing basketball and absolutely nothing else.",
    commitIds: ["B4NAN4NA"],
    gitlabUser: "jnthnho",
    unitTests: "3",
  },
];

const prevContributors = [
  {
    photo: "/photos/ali_photo.jpg",
    name: "Ali Novruzov",
    role: "Backend Developer",
    bio: "My name is Ali and I'm in my final year at UT. I recently completed an AI Engineering position with Fujitsu. In my free time I like to learn history and watch sci-fi movies. Travel is also something I find really fun.",
    commitIds: ["anovruzov"],
    gitlabUser: "anovruzov",
    unitTests: "20",
  },
];

const About = () => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    const projectId = 74738319;
    const perPage = 100;
    const fetchStats = async () => {
      try {
        const results = await Promise.all(
          team.map(async (member) => {
            /// Count commits across all commit names
            let totalCommits = 0;
            for (const commitId of member.commitIds) {
              let page = 1;
              let commitsPage;
              do {
                const res = await fetch(
                  `https://gitlab.com/api/v4/projects/${projectId}/repository/commits?per_page=${perPage}&page=${page}&author=${encodeURIComponent(
                    commitId
                  )}`
                );
                commitsPage = await res.json();
                totalCommits += commitsPage.length;
                page++;
              } while (commitsPage.length === perPage);
            }

            // Fetch all issues
            let allIssues = [];
            let page = 1;
            let issuesPage;
            do {
              const res = await fetch(
                `https://gitlab.com/api/v4/projects/${projectId}/issues?per_page=${perPage}&page=${page}`
              );
              issuesPage = await res.json();
              allIssues = [...allIssues, ...issuesPage];
              page++;
            } while (issuesPage.length === perPage);

            // Count issues created & closed by the member
            const createdIssues = allIssues.filter(
              (i) =>
                i.author &&
                i.author.username &&
                i.author.username
                  .toLowerCase()
                  .includes(member.gitlabUser.toLowerCase())
            );
            const closedIssues = allIssues.filter(
              (i) =>
                i.closed_by &&
                i.closed_by.username &&
                i.closed_by.username
                  .toLowerCase()
                  .includes(member.gitlabUser.toLowerCase())
            );

            return {
              [member.name]: {
                commits: totalCommits,
                issuesCreated: createdIssues.length,
                issuesClosed: closedIssues.length,
                unitTests: member.unitTests,
              },
            };
          })
        );

        const merged = results.reduce((acc, obj) => ({ ...acc, ...obj }), {});
        setStats(merged);
      } catch (err) {
        console.error("GitLab API error:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      {/* Title section */}
      <div style={{ backgroundColor: "#f5f7f6", padding: "4rem 0" }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 fw-bold">Our Mission</h1>
              <p className="lead mt-3">
                SafeHavenConnect is a platform designed to help individuals
                impacted by domestic violence find trustworthy, accessible, and local resources
                for safety, legal, medical, financial, and community support.
                Our goal is to connect users with verified organizations and
                events while providing platform that empowers them to take the
                next steps toward safety and recovery.
              </p>
              <p className="mt-3">
                <strong>Intended users:</strong> survivors of domestic violence,
                their families, allies, and community organizations seeking to
                share resources.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Team Section */}
      <section
        style={{
          padding: "5rem 0",
          backgroundColor: "#ffffff",
        }}
      >
        <Container>
          <h2 className="text-center fw-bold mb-5" style={{ fontSize: "2.5rem" }}>
            Meet the Team
          </h2>

          <Row className="g-4 justify-content-center">
            {team.map((member) => (
              <Col xs={12} md={6} key={member.name}>
                <Card
                  className="shadow-sm border-0 h-100"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    padding: "1.25rem",
                  }}
                >
                  <Row className="g-3 align-items-center">

                    <Col
                      md={5}
                      className="d-flex flex-column align-items-center"
                    >
                      <Image
                        src={member.photo}
                        alt={member.name}
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "18px",
                          objectFit: "cover",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          marginBottom: "1rem",
                        }}
                      />

                      {stats[member.name] ? (
                        <div style={{ width: "100%", padding: "0 .5rem" }}>
                          <Row className="g-2">
                            {[
                              ["Commits", stats[member.name].commits],
                              ["Issues Created", stats[member.name].issuesCreated],
                              ["Issues Closed", stats[member.name].issuesClosed],
                              ["Unit Tests", stats[member.name].unitTests],
                            ].map(([label, value]) => (
                              <Col xs={6} key={label}>
                                <div
                                  style={{
                                    borderRadius: "10px",
                                    padding: "0.55rem",
                                    background: "#f8faf9",
                                    border: "1px solid #eef3f1",
                                    textAlign: "center",
                                  }}
                                >
                                  <strong>{value}</strong>
                                  <p
                                    className="m-0 text-muted"
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {label}
                                  </p>
                                </div>
                              </Col>
                            ))}
                          </Row>
                        </div>
                      ) : (
                        <Spinner animation="border" size="sm" className="mt-3" />
                      )}
                    </Col>

                    <Col md={7}>
                      <Card.Body className="px-2">
                        <h4 className="fw-bold mb-1">{member.name}</h4>
                        <p className="text-muted mb-3">{member.role}</p>

                        <p style={{ minHeight: "90px", lineHeight: "1.45" }}>
                          {member.bio}
                        </p>
                      </Card.Body>
                    </Col>

                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>



      {/* Previous Contributors Section */}
      <section
        style={{
          padding: "4rem 0",
          backgroundColor: "#f8faf9",
        }}
      >
        <Container>
          <h2 className="text-center fw-bold mb-5" style={{ fontSize: "2rem" }}>
            Previous Contributors
          </h2>

          <Row className="g-4 justify-content-center">
            {prevContributors.map((member) => (
              <Col xs={12} md={8} key={member.name}>
                <Card
                  className="shadow-sm border-0"
                  style={{
                    borderRadius: "18px",
                    padding: "1.25rem",
                    overflow: "hidden",
                  }}
                >
                  <Row className="g-3 align-items-center">

                    <Col
                      md={4}
                      className="d-flex flex-column align-items-center"
                    >
                      <Image
                        src={member.photo}
                        alt={member.name}
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "16px",
                          objectFit: "cover",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
                          marginBottom: "0.75rem",
                        }}
                      />

                      <div style={{ width: "100%", padding: "0 .5rem" }}>
                        <Row className="g-2">
                          {[
                            ["Commits", 20],
                            ["Issues Created", 2],
                            ["Issues Closed", 2],
                            ["Unit Tests", 20],
                          ].map(([label, value]) => (
                            <Col xs={6} key={label}>
                              <div
                                style={{
                                  borderRadius: "10px",
                                  padding: "0.55rem",
                                  background: "#ffffff",
                                  border: "1px solid #eef3f1",
                                  textAlign: "center",
                                }}
                              >
                                <strong style={{ fontSize: "0.9rem" }}>{value}</strong>
                                <p
                                  className="m-0 text-muted"
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  {label}
                                </p>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </Col>

                    {/* RIGHT: name + role + bio */}
                    <Col md={8}>
                      <Card.Body className="px-2">
                        <h4 className="fw-bold mb-1">{member.name}</h4>
                        <p className="text-muted mb-3">{member.role}</p>

                        <p
                          style={{
                            minHeight: "70px",
                            fontSize: "0.95rem",
                            lineHeight: "1.45",
                          }}
                        >
                          {member.bio}
                        </p>
                      </Card.Body>
                    </Col>

                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Data Integration Section */}
      <div style={{ backgroundColor: "#e9f4ef", padding: "3rem 0" }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={9}>
              <h2 className="fw-bold">Why Data Integration Matters</h2>
              <p className="lead mt-3">
                Survivors shouldn't have to dig through
                websites, listings, and outdated information just to
                find help. By integrating data from multiple trusted sources,
                SafeHavenConnect brings together housing, crisis
                support, legal aid, and community events into a single platform.
              </p>
              <p className="mt-3">
                This approach makes it much easier for individuals to discover
                resources they may not have known existed. Instead of searching
                endlessly, users can now connect quickly with the support they need.
              </p>
            </Col>
          </Row>
        </Container>
      </div>


      {/* Tools Section */}
      <div style={{ backgroundColor: "#f5f7f6", padding: "3rem 0" }}>
        <Container>
          <h2 className="text-center mb-4">Tools We Used</h2>
          <ul>
            <li>
              <strong>React.js & Bootstrap:</strong> Frontend design and layout
              with reusable components.
            </li>
            <li>
              <strong>Vite:</strong> Fast development server and build tool for
              running and bundling the React app.
            </li>
            <li>
              <strong>GitLab:</strong> Version control, issues, and commit
              tracking.
            </li>
            <li>
              <strong>Postman:</strong> Used to design and document our API
              endpoints for SafeHavenConnect.
            </li>
            <li>
              <strong>Amazon Web Services (AWS):</strong> Hosting and deploying
              web services for our application.
            </li>
          </ul>
        </Container>
      </div>

      {/* Explore Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Explore More</h2>
        <Row className="g-4 justify-content-center">

          {/* GitLab Repository Card */}
          <Col md={4}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <Card.Title>GitLab Repository</Card.Title>
                <Card.Text>
                  Explore the full project repository, including code, commits,
                  and issues.
                </Card.Text>
                <a
                  href="https://gitlab.com/parul.sadasivuni/cs373-fall-2025-55085_03"
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                  style={{
                    backgroundColor: "#2e856e",
                    borderColor: "#2e856e",
                    color: "white",
                    borderRadius: "50px",
                    padding: "0.6rem 1.3rem",
                    fontWeight: "500",
                  }}
                >
                  Visit GitLab
                </a>

              </Card.Body>
            </Card>
          </Col>

          {/* Postman API Collection Card */}
          <Col md={4}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <Card.Title>Postman API Collection</Card.Title>
                <Card.Text>
                  View our Postman workspace with all API endpoints and
                  documentation.
                </Card.Text>
                <a
                  href="https://www.postman.com/karen-heckel-749077/group-3-workspace/collection/p7zssag/safehavenconnect-api?action=share&creator=48953322"
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                  style={{
                    backgroundColor: "#2e856e",
                    borderColor: "#2e856e",
                    color: "white",
                    borderRadius: "50px",
                    padding: "0.6rem 1.3rem",
                    fontWeight: "500",
                  }}
                >
                  View API
                </a>

              </Card.Body>
            </Card>
          </Col>

          {/* Data Sources Card */}
          <Col md={4}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <Card.Title>Data Sources</Card.Title>
                <Card.Text className="mb-3">
                  Access the APIs that provide our data.
                </Card.Text>

                {[
                  ["211 National Data Platform", "https://apiportal.211.org/"],
                  ["Homeless Shelter API", "https://topapis.com/homeless-shelter-api/"],
                  ["Eventbrite API", "https://www.eventbrite.com/"],
                  ["Medical Centers API", "https://data.hrsa.gov/tools/web-services"],
                ].map(([label, link]) => (
                  <a
                    key={label}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn mb-2"
                    style={{
                      backgroundColor: "#2e856e",
                      borderColor: "#2e856e",
                      color: "white",
                      borderRadius: "50px",
                      padding: "0.6rem 1.3rem",
                      width: "100%",
                      fontWeight: "500",
                    }}
                  >
                    {label}
                  </a>

                ))}

              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>

    </>
  );
};

export default About;
