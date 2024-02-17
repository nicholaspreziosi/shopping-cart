import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar.jsx";
import { MemoryRouter } from "react-router-dom";

describe("<Navbar>", () => {
  const cartData = {};
  cartData.length = 3;
  function renderNavbar() {
    render(
      <MemoryRouter>
        <Navbar cartData={cartData}></Navbar>
      </MemoryRouter>
    );
  }
  it("should render list of links", () => {
    renderNavbar();
    expect(screen.getAllByRole("link")).not.toHaveLength(0);
  });

  it("should render a home link", () => {
    renderNavbar();
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href");
  });

  it("should render a shop link", () => {
    renderNavbar();
    const shopLink = screen.getByRole("link", { name: /shop/i });
    expect(shopLink).toBeInTheDocument();
    expect(shopLink).toHaveAttribute("href");
  });

  it("should render p element with correct number of cart items", () => {
    renderNavbar();
    const cartItems = screen.getByTestId("cart-items");
    expect(cartItems).toBeInTheDocument();
    expect(cartItems.textContent).toEqual("3");
  });
});
