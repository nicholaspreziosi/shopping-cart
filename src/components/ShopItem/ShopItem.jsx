import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import styled from "styled-components";
import Theme from "../Theme.jsx";
import PropTypes from "prop-types";

const Card = styled.div`
  width: 300px;
  height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  @media (max-width: 1024px) {
    padding: 1rem;
    gap: 1rem;
  }
  color: ${(props) => props.theme.colors.slate};
  background-color: white;
  border-radius: 0;
  border-left: 1px solid ${(props) => props.theme.colors.slate};
  border-bottom: 1px solid ${(props) => props.theme.colors.slate};
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
  font-size: 1rem;
`;

const CardImg = styled.img`
  width: 100%;
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
  function decrementQuantity(id) {
    const input = document.querySelector(`#shop-quantity${id}`);
    if (input.value > 1) {
      input.value--;
    }
  }

  function incrementQuantity(id) {
    const input = document.querySelector(`#shop-quantity${id}`);
    if (input.value < 9) {
      input.value++;
    }
  }

  function handleAdd(id) {
    let inputValue = Number(
      document.querySelector(`#shop-quantity${id}`).value
    );
    let idNum = Number(id);
    if (!inputValue) {
      return;
    }
    if (cartData.find((obj) => obj.id === idNum)) {
      let newObj = { ...cartData.find((obj) => obj.id === idNum) };
      newObj.quantity += inputValue;
      setCartData(cartData.map((item) => (item.id === idNum ? newObj : item)));
    } else {
      let newData = { ...data };
      newData.quantity = inputValue;
      setCartData([...cartData, newData]);
    }
  }

  return (
    <>
      <Theme>
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
