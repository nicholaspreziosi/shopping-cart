import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import PropTypes from "prop-types";
import styled from "styled-components";
import Theme from "../Theme.jsx";

const Img = styled.img`
  width: 100%;
`;

const Images = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 0;
  justify-content: center;
  @media (max-width: 1024px) {
    flex-direction: column;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }
`;

const ImgContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 50vw;
  height: 50vw;
  color: white;
  margin: 0;
  padding: 0;
  @media (max-width: 1024px) {
    width: 100vw;
    height: 100vw;
  }
`;

const ImgCredits = styled.p`
  position: absolute;
  font-size: 0.75rem;
  bottom: 0.5rem;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
  color: white;
`;

const ImgCreditsLink = styled.a`
  color: white;
`;

const ShopBtn = styled.p`
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 1.5rem;
  padding: 0.5rem;
  margin: 0;
  color: white;
  background-color: ${(props) => props.theme.colors.slate50opacity};
  border: 1px solid white;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.slate};
    background-color: white;
  }
`;

const Overlay = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  background-color: ${(props) => props.theme.colors.slate50opacity};
`;

function Home({ cartData, setFilter }) {
  function mensClick(e) {
    setFilter("men's clothing");
  }

  function womensClick(e) {
    setFilter("women's clothing");
  }

  function jeweleryClick(e) {
    setFilter("jewelery");
  }

  function electronicsClick(e) {
    setFilter("electronics");
  }

  return (
    <>
      <Navbar cartData={cartData}></Navbar>
      <Theme>
        <Images>
          <ImgContainer>
            <Img src="../../public/male-fashion.jpg" alt="male fashion shot" />
            <Overlay></Overlay>
            <Link onClick={(e) => mensClick(e)} to="/shop">
              <ShopBtn>Shop Men's</ShopBtn>
            </Link>
            <ImgCredits>
              Photo by{" "}
              <ImgCreditsLink href="https://unsplash.com/@dammypayne?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Dami Adebayo
              </ImgCreditsLink>{" "}
              on{" "}
              <ImgCreditsLink href="https://unsplash.com/photos/man-in-brown-leather-coat-k6aQzmIbR1s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Unsplash
              </ImgCreditsLink>
            </ImgCredits>
          </ImgContainer>
          <ImgContainer>
            <Img
              src="../../public/female-fashion.jpg"
              alt="female fashion shot"
            ></Img>
            <Overlay></Overlay>
            <Link onClick={(e) => womensClick(e)} to="/shop">
              <ShopBtn>Shop Women's</ShopBtn>
            </Link>
            <ImgCredits>
              Photo by{" "}
              <ImgCreditsLink href="https://unsplash.com/@alirezadolati?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Alireza Dolati
              </ImgCreditsLink>{" "}
              on{" "}
              <ImgCreditsLink href="https://unsplash.com/photos/woman-in-black-long-sleeve-shirt-covering-her-face-OVS3rqXq9gg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Unsplash
              </ImgCreditsLink>
            </ImgCredits>
          </ImgContainer>
          <ImgContainer>
            <Img
              src="../../public/jewelery.jpg"
              alt="female fashion shot"
            ></Img>
            <Overlay></Overlay>
            <Link onClick={(e) => jeweleryClick(e)} to="/shop">
              <ShopBtn>Shop Jewelery</ShopBtn>
            </Link>
            <ImgCredits>
              Photo by{" "}
              <ImgCreditsLink href="https://unsplash.com/@andesany?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Andie Gómez-Acebo
              </ImgCreditsLink>{" "}
              on{" "}
              <ImgCreditsLink href="https://unsplash.com/photos/woman-wearing-gold-colored-ring-pendant-necklaces-sEq4onJnWrI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Unsplash
              </ImgCreditsLink>
            </ImgCredits>
          </ImgContainer>
          <ImgContainer>
            <Img
              src="../../public/electronics.jpg"
              alt="female fashion shot"
            ></Img>
            <Overlay></Overlay>
            <Link onClick={(e) => electronicsClick(e)} to="/shop">
              <ShopBtn>Shop Electronics</ShopBtn>
            </Link>
            <ImgCredits>
              Photo by{" "}
              <ImgCreditsLink href="https://unsplash.com/@cgower?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Christopher Gower
              </ImgCreditsLink>{" "}
              on{" "}
              <ImgCreditsLink href="https://unsplash.com/photos/black-cordless-headphones-beside-closed-black-laptop-computer-and-smartphone-_aXa21cf7rY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Unsplash
              </ImgCreditsLink>
            </ImgCredits>
          </ImgContainer>
        </Images>
      </Theme>
    </>
  );
}

Home.propTypes = {
  cartData: PropTypes.array,
};

export default Home;
