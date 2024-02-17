import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";
import Home from "../Home/Home.jsx";
import Shop from "../Shop/Shop.jsx";
import Cart from "../Cart/Cart.jsx";
import PropTypes from "prop-types";

function Router({ shopData, filter, setFilter, cartData, setCartData }) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home cartData={cartData} setFilter={setFilter} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "shop",
      element: (
        <Shop
          shopData={shopData}
          cartData={cartData}
          setCartData={setCartData}
          filter={filter}
          setFilter={setFilter}
        />
      ),
    },
    {
      path: "cart",
      element: (
        <Cart
          shopData={shopData}
          cartData={cartData}
          setCartData={setCartData}
        />
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

Router.propTypes = {
  shopData: PropTypes.array,
  filter: PropTypes.string,
  setFilter: PropTypes.func,
  cartData: PropTypes.array,
  setCartData: PropTypes.func,
};

export default Router;
