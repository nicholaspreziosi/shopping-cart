import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShopItem from "./ShopItem.jsx";
import { MemoryRouter } from "react-router-dom";

describe("<ShopItem>", () => {
  function renderShopItem(data, cartData, setCartData) {
    render(
      <MemoryRouter>
        <ShopItem
          data={data}
          cartData={cartData}
          setCartData={setCartData}
        ></ShopItem>
      </MemoryRouter>
    );
  }
  describe("test item information", () => {
    const data = {
      id: 0,
      title: "DC Shoe",
      price: 99.95,
      img: "../../../public/shoe.jpg",
      category: "Mens",
    };
    const cartData = [];
    const setCartData = vi.fn();
    it("render should populate all correct information", () => {
      renderShopItem(data, cartData, setCartData);
      const img = screen.getByTestId(`img-${data.id}`);
      const title = screen.getByText(`${data.title}`);
      const price = screen.getByText(
        `$${Number.parseFloat(data.price).toFixed(2)}`
      );
      const decrement = screen.getByText(`-`);
      const input = screen.getByTestId(`input-${data.id}`);
      const increment = screen.getByText(`+`);
      const addToCart = screen.getByText("Add to Cart");
      expect(img).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(price).toBeInTheDocument();
      expect(decrement).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(increment).toBeInTheDocument();
      expect(addToCart).toBeInTheDocument();
    });
  });

  describe("test add to cart button", () => {
    const data = {};
    const cartData = [];
    const setCartData = vi.fn();
    const user = userEvent.setup();
    it("click add to cart should trigger setCartData", async () => {
      renderShopItem(data, cartData, setCartData);
      const addToCart = screen.getByText("Add to Cart");
      expect(addToCart).toBeInTheDocument();
      await user.click(addToCart);
      expect(setCartData).toHaveBeenCalled();
    });
  });

  describe("test increment and decrement buttons", () => {
    const data = {};
    const cartData = [];
    const setCartData = vi.fn();
    const user = userEvent.setup();
    it("test increment and decrement buttons", async () => {
      renderShopItem(data, cartData, setCartData);
      const input = screen.getByTestId(`input-${data.id}`);
      expect(input.value).toEqual("1");
      const increment = screen.getByText(`+`);
      const decrement = screen.getByText(`-`);
      await user.click(decrement);
      expect(input.value).toEqual("1");
      await user.click(increment);
      expect(input.value).toEqual("2");
      for (let i = 0; i < 10; i++) {
        await user.click(increment);
      }
      expect(input.value).toEqual("9");
      await user.click(decrement);
      expect(input.value).toEqual("8");
    });
  });
});
