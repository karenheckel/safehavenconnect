import { render, screen, waitFor, fireEvent} from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import '@testing-library/jest-dom';
import axios from "axios";
import Landing from "../pages/Landing";
import About from "../pages/About";
import Events from "../pages/Events";
import EventPage from "../pages/Events/EventPage";
import InfoCard from "../components/InfoCard";

describe("Landing", () => {
  test("renders hero text, call-to-action, and buttons", () => {
    render(<MemoryRouter><Landing /></MemoryRouter>);
    expect(screen.getAllByText(/SafeHavenConnect/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/What We Provide/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /View Events/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /View Resources/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /View Organizations/i })).toBeInTheDocument();
  });
});

beforeEach(() => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([]),
    })
  );
});

describe("AboutPage", () => {
  test("renders mission statement and progression of each developer", async () => {
    render(<MemoryRouter><About /></MemoryRouter>);
    expect(screen.getByText(/Our Mission/i)).toBeInTheDocument();
    expect(screen.getByText(/SafeHavenConnect is a platform designed to help individuals struggling to find trustworthy, accessible, and local resources for safety, legal, medical, financial, and community support. Our goal is to connect users with verified organizations and events while providing platform that empowers them to take the next steps toward safety and recovery./i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByText(/Commits/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Issues Created/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Issues Closed/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Unit Tests/i).length).toBeGreaterThan(0);
    })
  });
});

describe("AboutPage", () => {
  test("renders buttons containing links to resources like gitlab, api, and data sources", () => {
    render(<MemoryRouter><About /></MemoryRouter>);
    expect(screen.getByText(/Tools We Used/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Visit GitLab/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View API/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /211 National Data Platform/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Homeless Shelter API/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Eventbrite API/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Medical Centers API/i })).toBeInTheDocument();
  })
})


vi.mock("axios");

const mockEvents = [
  {
    id: 1,
    name: "Event One",
    location: "somewhere",
    start_time: "10:00 AM",
    date: "2025-10-25",
    event_type: "event",
    relatedOrganizations: [{ id: 1 }],
    image_url: "event1.png",
    event_url: "https://example.com/event1",
  },
  {
    id: 2,
    name: "Event Two",
    location: "place",
    start_time: "2:00 PM",
    date: "2025-10-30",
    event_type: "fun",
    relatedOrganizations: [{ id: 2 }],
    image_url: "event2.png",
    event_url: "https://example.com/event2",
  },
];

describe("Events Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("displays loading initially", () => {
    axios.get.mockReturnValue(new Promise(() => {})); // never resolves
    render(
      <MemoryRouter>
        <Events />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading events/i)).toBeInTheDocument();
  });

  test("renders events after fetching", async () => {
    axios.get.mockResolvedValue({ data: mockEvents });

    render(
      <MemoryRouter>
        <Events />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Upcoming Events/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Number of events: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Event One/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Two/i)).toBeInTheDocument();
  });

  test("handles API error gracefully", async () => {
    axios.get.mockRejectedValue(new Error("API failure"));

    render(
      <MemoryRouter>
        <Events />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Upcoming Events/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Number of events: 0/i)).toBeInTheDocument();
  });
});

// unit tests for events instance pages

const mockEvent = {
  id: "1",
  name: "Sample Event",
  location: "Austin, TX",
  start_time: "10:00 AM",
  date: "2025-10-25",
  event_type: "Workshop",
  image_url: "sample-event.jpg",
  event_url: "https://example.com/sample-event",
  map_url: "https://maps.google.com/sample",
  organization_ids: [101, 102],
  resource_ids: [201, 202],
};

describe("EventPage", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("displays loading initially", () => {
    axios.get.mockReturnValue(new Promise(() => {}));
    render(
      <MemoryRouter initialEntries={["/events/1"]}>
        <Routes>
          <Route path="/events/:id" element={<EventPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading event info/i)).toBeInTheDocument();
  });

  test("renders event info after fetch", async () => {
    axios.get.mockResolvedValue({ data: mockEvent });

    render(
      <MemoryRouter initialEntries={["/events/1"]}>
        <Routes>
          <Route path="/events/:id" element={<EventPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Sample Event/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Location: Austin, TX/i)).toBeInTheDocument();
    expect(screen.getByText(/Date: 2025-10-25/i)).toBeInTheDocument();
    expect(screen.getByText(/Time: 10:00 AM/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Type: Workshop/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Link/i).closest("a")).toHaveAttribute(
      "href",
      "https://example.com/sample-event"
    );

    // Check map iframe
    expect(screen.getByTitle(/Map to Event/i)).toHaveAttribute(
      "src",
      "https://maps.google.com/sample"
    );
  });
});


vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("InfoCard", () => {
  const mockNavigate = vi.fn();
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  const mockEventCard = {
    title: "Sample Event",
    location: "Austin, TX",
    time: "10:00 AM",
    date: "2025-10-25",
    event_type: "Workshop",
    organization: "SafeHavenConnect",
    image_url: "/sample.jpg",
  };

  test("renders event card with correct info", () => {
    render(
      <MemoryRouter>
        <InfoCard cardType="event" cardInfo={mockEventCard} id={1} />
      </MemoryRouter>
    );

    // Check title and image
    expect(screen.getByText("Sample Event")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "/sample.jpg");

    // Check info fields
    expect(screen.getByText(/Location: Austin, TX/i)).toBeInTheDocument();
    expect(screen.getByText(/Time: 10:00 AM/i)).toBeInTheDocument();
    expect(screen.getByText(/Date: 2025-10-25/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Type: Workshop/i)).toBeInTheDocument();
    expect(screen.getByText(/Organization: SafeHavenConnect/i)).toBeInTheDocument();

    // Check button
    expect(screen.getByRole("button", { name: /View Event/i })).toBeInTheDocument();
  });

  test("navigates to correct route when button is clicked", () => {
    render(
      <MemoryRouter>
        <InfoCard cardType="event" cardInfo={mockEventCard} id={1} />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /View Event/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/events/1");
  });
});