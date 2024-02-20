import { Link } from "react-router-dom";
import { useRef } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import styled from "styled-components";
import Theme from "../Theme.jsx";
import PropTypes from "prop-types";

const Container = styled.div`
  width: 100%;
  background-color: white;
`;

const Card = styled.div`
  width: auto;
  height: calc(100% - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin: 0;
  padding: 2rem;
  color: ${(props) => props.theme.colors.slate};
  background-color: white;
  border-radius: 0;
  position: relative;
  z-index: 0;
  &:after {
    content: "";
    background-color: ${(props) => props.theme.colors.slate};
    position: absolute;
    inset-block-start: calc(1rem * -1);
    inset-inline-start: 0;
    block-size: 1px;
    inline-size: 100vw;
  }
  &:before {
    content: "";
    background-color: ${(props) => props.theme.colors.slate};
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: calc(1rem * -1);
    block-size: 100vh;
    inline-size: 1px;
  }
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  margin: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const CardSection = styled.div`
  width: 100%;
  display: flex;
  margin: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const CardTitle = styled.h1`
  margin: 0;
  font-size: 0.9rem;
`;

const CardImg = styled.img`
  max-width: 80%;
  aspect-ratio: 1/1;
  border-radius: 0;
`;

const CardPrice = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const CardBtn = styled.a`
  font-size: 1.25rem;
  padding: 0.5rem;
  margin: 0;
  color: ${(props) => props.theme.colors.slate};
  background-color: white;
  border: 1px solid ${(props) => props.theme.colors.slate};
  border-radius: 0;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.slate};
    color: white;
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
  border-radius: 0;
  color: ${(props) => props.theme.colors.slate};
  border: 1px solid ${(props) => props.theme.colors.slate};
`;

const EditQuantity = styled.p`
  margin: 0;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.slate};
  cursor: pointer;
`;

function ShopItem({ data, cartData, setCartData }) {
  const inputRef = useRef(null);

  function decrementQuantity() {
    const input = inputRef.current;
    if (input.value > 1) {
      input.value--;
    }
  }

  function incrementQuantity() {
    const input = inputRef.current;
    if (input.value < 9) {
      input.value++;
    }
  }

  function handleAdd(id) {
    let inputValue = Number(inputRef.current.value);
    let idNum = Number(id);
    if (!inputValue) {
      return;
    }
    if (cartData.find((obj) => obj.id === idNum)) {
      let newObj = { ...cartData.find((obj) => obj.id === idNum) };
      newObj.quantity += inputValue;
      console.log(newObj.quantity);
      setCartData(cartData.map((item) => (item.id === idNum ? newObj : item)));
    } else {
      let newData = { ...data };
      newData.quantity = inputValue;
      console.log(newData.quantity);
      setCartData([...cartData, newData]);
    }
  }

  return (
    <>
      <Theme>
        <Container>
          <Card data-testid="shop-item">
            <CardImg data-testid={"img-" + data.id} src={data.image}></CardImg>
            <CardHeader>
              <CardTitle>{data.title}</CardTitle>
              <CardPrice>${Number.parseFloat(data.price).toFixed(2)}</CardPrice>
            </CardHeader>
            <CardSection>
              <QuantityContainer>
                <EditQuantity onClick={() => decrementQuantity(data.id)}>
                  -
                </EditQuantity>
                <CustomQuantity
                  onKeyPress={(event) => {
                    if (!/[1-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  id={"shop-quantity" + data.id}
                  data-testid={"input-" + data.id}
                  ref={inputRef}
                  type="tel"
                  min="0"
                  max="100"
                  maxLength="1"
                  defaultValue={1}
                />
                <EditQuantity onClick={() => incrementQuantity(data.id)}>
                  +
                </EditQuantity>
              </QuantityContainer>
              <CardBtn onClick={() => handleAdd(data.id)}>Add to Cart</CardBtn>
            </CardSection>
          </Card>
        </Container>
      </Theme>
    </>
  );
}

ShopItem.propTypes = {
  data: PropTypes.object,
  cartData: PropTypes.array,
  setCartData: PropTypes.func,
};

export default ShopItem;
