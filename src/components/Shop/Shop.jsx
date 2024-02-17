import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import Filter from "../Filter/Filter.jsx";
import ShopItem from "../ShopItem/ShopItem.jsx";
import Theme from "../Theme.jsx";
import styled from "styled-components";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Grid = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  grid-auto-rows: minmax(min-content, 1fr);
  overflow: hidden;
  gap: 2rem;
  @media (min-width: 1025px) {
    margin: 2rem;
  }
  @media (max-width: 1024px) {
    margin: 1rem;
  }
`;

const OuterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: start;
`;

const ShopTitle = styled.h1`
  text-align: center;
  font-size: 3rem;
  color: ${(props) => props.theme.colors.slate};
  @media (min-width: 1025px) {
    margin: 2rem;
  }
  @media (max-width: 1024px) {
    margin: 1rem;
  }
  padding: 0;
`;

const FillerDiv = styled.div`
  background-color: white;
  width: 100%;
  grid-column-end: -1;
`;

function Shop({ shopData, filter, setFilter, cartData, setCartData }) {
  const [filterDropdown, setFilerDropdown] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, []);

  return (
    <>
      <Theme>
        <Navbar cartData={cartData}></Navbar>
        <ShopTitle>Fake Store</ShopTitle>
        <OuterGrid data-testid="outer-grid">
          <Filter
            categories={categories}
            shopData={shopData}
            filter={filter}
            setFilter={setFilter}
            dropdown={filterDropdown}
            setDropdown={setFilerDropdown}
          ></Filter>
          <Grid data-testid="grid">
            {filter !== "all"
              ? shopData
                  .filter((item) => item.category === filter)
                  .map((item) => (
                    <ShopItem
                      key={item.id}
                      data={item}
                      filter={filter}
                      cartData={cartData}
                      setCartData={setCartData}
                    ></ShopItem>
                  ))
              : shopData.map((item) => (
                  <ShopItem
                    key={item.id}
                    data={item}
                    filter={filter}
                    cartData={cartData}
                    setCartData={setCartData}
                  ></ShopItem>
                ))}
          </Grid>
        </OuterGrid>
      </Theme>
    </>
  );
}

Shop.propTypes = {
  shopData: PropTypes.array,
  filter: PropTypes.string,
  setFilter: PropTypes.func,
  cartData: PropTypes.array,
  setCartData: PropTypes.func,
};

export default Shop;
