import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import CartItem from "../CartItem/CartItem.jsx";
import styled from "styled-components";
import { useState } from "react";
import Theme from "../Theme.jsx";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartTitle = styled.h1`
  color: ${(props) => props.theme.colors.slate};
  text-align: center;
  font-size: 3rem;
  @media (min-width: 1025px) {
    margin: 2rem;
  }
  @media (max-width: 1024px) {
    margin: 1rem;
  }
  padding: 0;
`;

const CartTotal = styled.h2`
  color: ${(props) => props.theme.colors.slate};
  text-align: center;
  font-size: 2rem;
  @media (min-width: 1025px) {
    margin: 2rem;
  }
  @media (max-width: 1024px) {
    margin: 1rem;
  }
  padding: 0;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CheckoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const CheckoutBtn = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem;
  margin: 0;
  color: ${(props) => props.theme.colors.slate};
  background-color: white;
  border: 1px solid ${(props) => props.theme.colors.slate};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.slate};
    color: white;
  }
  @media (min-width: 1025px) {
    margin: 2rem;
  }
  @media (max-width: 1024px) {
    margin: 1rem;
  }
`;

function Cart({ cartData, setCartData }) {
  function updateTotal(data) {
    let initialValue = 0;
    let total = data.reduce(
      (accumulator, current) => accumulator + current.price * current.quantity,
      initialValue
    );

    return (Math.round(total * 100) / 100).toFixed(2);
  }

  return (
    <>
      <Navbar cartData={cartData}></Navbar>
      <Theme>
        <Container>
          <CartTitle>Shopping Cart</CartTitle>
          {cartData.map((item) => (
            <CartItem
              item={item}
              cartData={cartData}
              setCartData={setCartData}
              key={item.id}
            ></CartItem>
          ))}
          <CheckoutContainer>
            <CartTotal data-testid="cart-total">
              Total: $
              {Number.parseFloat(updateTotal(cartData))
                .toFixed(2)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </CartTotal>
            <BtnContainer>
              <CheckoutBtn>Check Out</CheckoutBtn>
            </BtnContainer>
          </CheckoutContainer>
        </Container>
      </Theme>
    </>
  );
}

Cart.propTypes = {
  cartData: PropTypes.array,
  setCartData: PropTypes.func,
};

export default Cart;
