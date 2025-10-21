import { render, screen, waitFor} from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import axios from "axios";
import Landing from "../pages/Landing";
import About from "../pages/About";
import Events from "../pages/Events";



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
