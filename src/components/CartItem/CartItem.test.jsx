import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from "./CartItem.jsx";
import { MemoryRouter } from "react-router-dom";

describe("<CartItem>", () => {
  const item = {
    id: 0,
    title: "DC Shoe",
    price: 99.95,
    img: "../../../public/shoe.jpg",
    category: "Mens",
    quantity: 5,
  };
  const cartData = [];
  const setCartData = vi.fn();
  function renderCartItem() {
    return render(
      <MemoryRouter>
        <CartItem
          item={item}
          cartData={cartData}
          setCartData={setCartData}
        ></CartItem>
      </MemoryRouter>
    );
  }
  describe("test item information", () => {
    it("render should populate all correct information", () => {
      renderCartItem();
      const cartItem = screen.getByTestId(`cart-item`);
      const container = screen.getByTestId(`cart-container`);
      const img = screen.getByTestId(`cart-img-${item.id}`);
      const title = screen.getByText(`${item.title}`);
      const price = screen.getByText(
        `$${Number.parseFloat(item.price).toFixed(2)}`
      );
      const decrement = screen.getByText(`-`);
      const input = screen.getByTestId(`cart-quantity-${item.id}`);
      const increment = screen.getByText(`+`);
      expect(cartItem).toBeInTheDocument();
      expect(container).toBeInTheDocument();
      expect(img).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(price).toBeInTheDocument();
      expect(decrement).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(input.value).toEqual("5");
      expect(increment).toBeInTheDocument();
    });
  });

  describe("test functionality", () => {
    it("test decrement button", async () => {
      renderCartItem();
      const user = userEvent.setup();
      const decrement = screen.getByText(`-`);
      await user.click(decrement);
      expect(setCartData).toHaveBeenCalled();
    });
    it("test increment button", async () => {
      renderCartItem();
      const user = userEvent.setup();
      const increment = screen.getByText(`+`);
      await user.click(increment);
      expect(setCartData).toHaveBeenCalled();
    });
    it("test input change", async () => {
      renderCartItem();
      const user = userEvent.setup();
      const input = screen.getByTestId(`cart-quantity-${item.id}`);
      await user.type(input, "2");
      expect(setCartData).toHaveBeenCalled();
    });
    it("test delete button", async () => {
      renderCartItem();
      const user = userEvent.setup();
      const cartDelete = screen.getByTestId(`cart-delete-${item.id}`);
      await user.click(cartDelete);
      expect(setCartData).toHaveBeenCalled();
    });
  });
});
