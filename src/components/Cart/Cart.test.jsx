import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "./Cart.jsx";
import { MemoryRouter } from "react-router-dom";

describe("<CartItem>", () => {
  const cartData = [
    { id: 0, title: "Item 1", price: 1.95, quantity: 1 },
    { id: 1, title: "Item 2", price: 2.95, quantity: 2 },
    { id: 2, title: "Item 3", price: 3.95, quantity: 3 },
  ];
  const setCartData = vi.fn();
  function renderCart() {
    return render(
      <MemoryRouter>
        <Cart cartData={cartData} setCartData={setCartData}></Cart>
      </MemoryRouter>
    );
  }
  describe("renders all elements", () => {
    it("renders all elements", () => {
      renderCart();
      const navbar = screen.getByTestId(`navbar`);
      expect(navbar).toBeInTheDocument();
      const title = screen.getByText("Shopping Cart");
      expect(title).toBeInTheDocument();
      const total = screen.getByTestId(`cart-total`);
      expect(total).toBeInTheDocument();
      const checkoutBtn = screen.getByText("Check Out");
      expect(checkoutBtn).toBeInTheDocument();
    });
  });
  describe("test total amount", () => {
    it("total displays the correct amount", () => {
      renderCart();
      const total = screen.getByTestId(`cart-total`);
      expect(total.textContent).toEqual("Total: $19.70");
    });
  });
  describe("test items", () => {
    it("displays correct number of items", () => {
      renderCart();
      const items = screen.getAllByTestId(`cart-item`);
      expect(items.length).toEqual(cartData.length);
    });
  });
});
