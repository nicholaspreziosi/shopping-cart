import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Theme from "../Theme.jsx";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ItemContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  @media (min-width: 1025px) {
    gap: 4rem;
    margin: 1rem;
  }
  @media (max-width: 1024px) and (min-width: 481px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
    padding: 2rem 1rem 1rem 1rem;
    margin: 1rem;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    gap: 2rem;
    padding: 2rem 1rem 1rem 1rem;
    margin: 2rem;
  }
  width: 75%;
  justify-items: center;
  align-items: center;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  @media (max-width: 1024px) {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 2;
  }
`;

const ItemTitle = styled.h1`
  margin: 0;
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.slate};
  @media (max-width: 1024px) {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;
  }
`;

const ItemPrice = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.slate};
`;

const Border = styled.div`
  height: 1px;
  width: calc(100% - 8rem);
  border-bottom: 1px solid ${(props) => props.theme.colors.slate};
  @media (max-width: 1024px) and (min-width: 481px) {
    width: calc(100% - 4rem);
  }
  @media (max-width: 480px) {
    width: calc(100% - 2rem);
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const CustomQuantity = styled.input`
  width: 3rem;
  font-size: 1.25rem;
  padding: 0.5rem;
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.slate};
  color: ${(props) => props.theme.colors.slate};
`;

const EditQuantity = styled.p`
  margin: 0;
  font-size: 2rem;
  color: black;
  cursor: pointer;
  color: ${(props) => props.theme.colors.slate};
`;

const SvgContainer = styled.div`
  color: ${(props) => props.theme.colors.slate};
  @media (max-width: 1024px) {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
  }
  &:hover {
    background-color: ${(props) => props.theme.colors.slate};
    color: white;
  }
`;

function CartItem({ item, cartData, setCartData }) {
  function decrementQuantity(id) {
    const input = document.querySelector(`#cart-quantity${id}`);
    if (input.value > 1) {
      input.value--;
    }
    handleChange(id);
  }

  function incrementQuantity(id) {
    const input = document.querySelector(`#cart-quantity${id}`);
    if (input.value < 9) {
      input.value++;
    }
    handleChange(id);
  }

  function handleChange(id) {
    let inputValue = Number(
      document.querySelector(`#cart-quantity${id}`).value
    );
    let idNum = Number(id);
    let newObj = { ...cartData.find((obj) => obj.id === idNum) };
    newObj.quantity = inputValue;
    setCartData(cartData.map((item) => (item.id === idNum ? newObj : item)));
  }

  function deleteItem(id) {
    setCartData(cartData.filter((obj) => obj.id !== id));
  }

  return (
    <>
      <Theme>
        <Container data-testid="cart-item">
          <ItemContainer data-testid="cart-container" key={item.id}>
            <Img data-testid={"cart-img-" + item.id} src={item.image}></Img>
            <ItemTitle>{item.title}</ItemTitle>
            <QuantityContainer $item={item}>
              <EditQuantity
                onClick={() => {
                  decrementQuantity(item.id);
                }}
              >
                -
              </EditQuantity>
              <CustomQuantity
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                id={"cart-quantity" + item.id}
                data-testid={"cart-quantity-" + item.id}
                type="tel"
                min="0"
                max="9"
                maxLength="1"
                defaultValue={item.quantity}
                onChange={() => handleChange(item.id)}
              />
              <EditQuantity
                onClick={() => {
                  incrementQuantity(item.id);
                }}
              >
                +
              </EditQuantity>
            </QuantityContainer>
            <ItemPrice>${Number.parseFloat(item.price).toFixed(2)}</ItemPrice>
            <SvgContainer>
              <svg
                data-testid={"cart-delete-" + item.id}
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                style={{ padding: "0.5rem 0.5rem 0.25rem 0.5rem" }}
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
                onClick={() => deleteItem(item.id)}
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </SvgContainer>
          </ItemContainer>
          <Border></Border>
        </Container>
      </Theme>
    </>
  );
}

CartItem.propTypes = {
  item: PropTypes.object,
  cartData: PropTypes.array,
  setCartData: PropTypes.func,
};

export default CartItem;
