import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";

import Home from "../pages/index";
import { vehicles, film } from "../mocks/data";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("App", () => {
  it("renders a list of vehicles", async () => {
    useRouter.mockImplementation(() => ({ query: {} }));

    render(<Home />);

    const heading = screen.getByText("List of Vehicles");
    expect(heading).toBeInTheDocument();

    const vehicle = await screen.findByText(vehicles[0].name);
    expect(vehicle).toBeInTheDocument();
  });

  it("updates url on film click", async () => {
    const replace = jest.fn();
    useRouter.mockImplementation(() => ({ replace, query: {} }));

    render(<Home />);

    const films = await screen.findAllByText(film.title);
    fireEvent.click(films[0]);
    expect(replace).toHaveBeenCalled();
  });

  it("renders film details if in url", async () => {
    useRouter.mockImplementation(() => ({ query: { film: "5" } }));

    render(<Home />);

    await screen.findByText(vehicles[0].name);
    const heading = await screen.findByText("Film Details");
    expect(heading).toBeInTheDocument();
  });
});
