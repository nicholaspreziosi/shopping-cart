import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from "./Filter.jsx";
import { MemoryRouter } from "react-router-dom";

describe("<Filter>", () => {
  function renderFilter(categories, filter, setFilter, dropdown, setDropdown) {
    render(
      <MemoryRouter>
        <Filter
          categories={categories}
          filter={filter}
          setFilter={setFilter}
          dropdown={dropdown}
          setDropdown={setDropdown}
        ></Filter>
      </MemoryRouter>
    );
  }
  describe("chevron tests", () => {
    const setFilter = vi.fn();
    const setDropdown = vi.fn();
    let filter = "all";
    const categories = [];
    it("should render only chevron down when dropdown is false", () => {
      let dropdown = false;
      renderFilter(categories, filter, setFilter, dropdown, setDropdown);
      const chevronDown = screen.getByTestId("chevron-down");
      expect(chevronDown).toBeInTheDocument();
    });

    it("should render only chevron up when dropdown is true", () => {
      let dropdown = true;
      renderFilter(categories, filter, setFilter, dropdown, setDropdown);
      const chevronUp = screen.getByTestId("chevron-up");
      expect(chevronUp).toBeInTheDocument();
    });
  });
  describe("select group functionality tests", () => {
    const setFilter = vi.fn();
    const setDropdown = vi.fn();
    let filter = "all";
    let dropdown = false;
    const categories = [];
    const user = userEvent.setup();
    it("should fire setDropdown on select group click", async () => {
      renderFilter(categories, filter, setFilter, dropdown, setDropdown);
      const selectGroup = screen.getByTestId("select-group");
      await user.click(selectGroup);
      expect(setDropdown).toHaveBeenCalled();
    });
  });
  describe("option functionality tests", () => {
    const setFilter = vi.fn();
    const setDropdown = vi.fn();
    let filter = "all";
    let dropdown = true;
    const user = userEvent.setup();
    const categories = [
      "electronics",
      "jewelery",
      "men's clothing",
      "women's clothing",
    ];
    function toTitleCase(str) {
      return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    it("should fire setFilter and setDropdown on each option click", async () => {
      renderFilter(categories, filter, setFilter, dropdown, setDropdown);
      expect(setFilter).not.toHaveBeenCalled();
      expect(setDropdown).not.toHaveBeenCalled();
      let options = screen.getAllByTestId(`options`);
      for (let i = 0; i < options.length; i++) {
        expect(options[i]).toBeInTheDocument();
        await user.click(options[i]);
        expect(setFilter).toHaveBeenCalledTimes(i + 1);
        expect(setDropdown).toHaveBeenCalledTimes(i + 1);
      }
    });
  });
});
