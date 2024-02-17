import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Shop from "./Shop.jsx";
import { MemoryRouter } from "react-router-dom";

describe("<ShopItem>", () => {
  const shopData = [
    { id: 0, title: "Item 1", price: 1, category: "men's clothing" },
    { id: 1, title: "Item 2", price: 2, category: "women's clothing" },
    { id: 2, title: "Item 3", price: 3, category: "men's clothing" },
  ];
  const setFilter = vi.fn();
  const cartData = {};
  const setCartData = vi.fn();
  describe("renders all elements", () => {
    const filter = "all";
    function renderShop() {
      render(
        <MemoryRouter>
          <Shop
            shopData={shopData}
            filter={filter}
            setFilter={setFilter}
            cartData={cartData}
            setCartData={setCartData}
          ></Shop>
        </MemoryRouter>
      );
    }
    it("renders all elements", () => {
      renderShop();
      const navbar = screen.getByTestId(`navbar`);
      expect(navbar).toBeInTheDocument();
      const title = screen.getByText("Fake Store");
      expect(title).toBeInTheDocument();
      const outerGrid = screen.getByTestId("outer-grid");
      expect(outerGrid).toBeInTheDocument();
      const filter = screen.getByTestId("filter");
      expect(filter).toBeInTheDocument();
      const grid = screen.getByTestId("grid");
      expect(grid).toBeInTheDocument();
    });
  });

  describe("test filter functionality and confirm correct number of items", () => {
    function renderShop(filter) {
      render(
        <MemoryRouter>
          <Shop
            shopData={shopData}
            filter={filter}
            setFilter={setFilter}
            cartData={cartData}
            setCartData={setCartData}
          ></Shop>
        </MemoryRouter>
      );
    }
    it("filter set to all", () => {
      const filter = "all";
      renderShop(filter);
      const items = screen.getAllByTestId(`shop-item`);
      expect(items.length).toEqual(shopData.length);
    });
    it("filter set to mens", () => {
      const filter = "men's clothing";
      renderShop(filter);
      const items = screen.getAllByTestId(`shop-item`);
      expect(items.length).toEqual(
        shopData.filter((item) => item.category === "men's clothing").length
      );
    });
    it("filter set to womens", () => {
      const filter = "women's clothing";
      renderShop(filter);
      const items = screen.getAllByTestId(`shop-item`);
      expect(items.length).toEqual(
        shopData.filter((item) => item.category === "women's clothing").length
      );
    });
  });
});
