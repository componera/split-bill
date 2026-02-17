/**
 * Unit tests for StatsCard component
 */
import { describe, it, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import StatsCard from "./StatsCard";

describe("StatsCard", () => {
  it("renders title and value", () => {
    render(<StatsCard title="Active Bills" value={42} />);
    expect(screen.getByText("Active Bills")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders string value", () => {
    render(<StatsCard title="Status" value="Active" />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders currency value", () => {
    render(<StatsCard title="Revenue" value="R 1,234.56" />);
    expect(screen.getByText("R 1,234.56")).toBeInTheDocument();
  });
});
