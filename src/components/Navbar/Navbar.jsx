import { Link } from "react-router-dom";
import styled from "styled-components";
import Theme from "../Theme.jsx";
import PropTypes from "prop-types";

const Container = styled.div`
  width: 100%;
`;

const List = styled.ul`
  height: 4rem;
  margin: 0;
  padding: 2rem;
  color: ${(props) => props.theme.colors.slate};
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (min-width: 1025px) {
    justify-content: flex-end;
  }
  @media (max-width: 1024px) {
    justify-content: center;
  }

  gap: 2rem;
`;

const ListItem = styled.li`
  height: 100%;
  list-style-type: none;
  color: ${(props) => props.theme.colors.slate};
  border-radius: 0;
`;

const CartNumber = styled.p`
  color: ${(props) => props.theme.colors.slate};
  position: absolute;
  top: 53px;
  font-size: 1rem;
  margin: 0;
  padding-left: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: white;
  }
`;

function Navbar({ cartData }) {
  return (
    <>
      <Theme>
        <Container data-testid="navbar">
          <List>
            <ListItem>
              <Link to="/">Home</Link>
            </ListItem>
            <ListItem>
              <Link to="/shop">Shop</Link>
            </ListItem>
            <ListItem>
              <Link to="/cart">
                <CartNumber data-testid="cart-items">
                  {cartData.length}
                </CartNumber>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
              </Link>
            </ListItem>
          </List>
        </Container>
      </Theme>
    </>
  );
}

Navbar.propTypes = {
  cartData: PropTypes.array,
};

export default Navbar;
