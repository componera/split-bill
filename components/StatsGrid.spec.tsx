/**
 * Unit tests for StatsGrid component
 */
import { describe, it, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import StatsGrid from "./StatsGrid";

describe("StatsGrid", () => {
  it("renders children", () => {
    render(
      <StatsGrid>
        <div data-testid="child">Child content</div>
      </StatsGrid>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("applies grid layout classes", () => {
    const { container } = render(
      <StatsGrid>
        <span>Item</span>
      </StatsGrid>
    );
    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass("grid", "grid-cols-1", "md:grid-cols-3");
  });
});
