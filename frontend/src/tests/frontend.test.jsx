import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import Landing from "../pages/Landing";



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
