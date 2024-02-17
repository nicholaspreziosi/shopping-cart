import Router from "../Router/Router.jsx";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar.jsx";

function App() {
  const [filter, setFilter] = useState("all");
  const [shopData, setShopData] = useState([
    {
      id: 0,
      title: "DC Shoe",
      price: 99.95,
      img: "../../../public/shoe.jpg",
      category: "Mens",
    },
    {
      id: 1,
      title: "Womens Shoe",
      price: 199.95,
      img: "../../../public/womens-shoe.jpg",
      category: "Womens",
    },
    {
      id: 2,
      title: "Mens Shoe #2",
      price: 59.95,
      img: "../../../public/shoe.jpg",
      category: "Mens",
    },
    {
      id: 3,
      title: "Womens Shoe #2",
      price: 199.95,
      img: "../../../public/womens-shoe.jpg",
      category: "Womens",
    },
  ]);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=20")
      .then((res) => res.json())
      .then((json) => {
        setShopData(json);
      });
  }, []);

  return (
    <>
      <Router
        shopData={shopData}
        filter={filter}
        setFilter={setFilter}
        cartData={cartData}
        setCartData={setCartData}
      ></Router>
    </>
  );
}

export default App;
