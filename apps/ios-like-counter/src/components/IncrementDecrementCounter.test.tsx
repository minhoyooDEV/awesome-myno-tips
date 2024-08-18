import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { IncrementDecrementCounter } from "./IncrementDecrementCounter";

vi.useFakeTimers();

describe("IncrementDecrementCounter", () => {
  it("renders initial value", () => {
    render(<IncrementDecrementCounter initialValue={10} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("increments by 1 every second by default", () => {
    render(<IncrementDecrementCounter initialValue={0} />);
    vi.advanceTimersByTime(3000);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("decrements when step is negative", () => {
    render(<IncrementDecrementCounter initialValue={10} step={-1} />);
    vi.advanceTimersByTime(3000);
    expect(screen.getByText("7")).toBeInTheDocument();
  });
});
