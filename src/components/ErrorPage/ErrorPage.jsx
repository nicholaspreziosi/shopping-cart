import { Link } from "react-router-dom";
import styled from "styled-components";
import Theme from "../Theme.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 2rem;
  padding: 2rem;
  text-align: center;
`;

const Header = styled.h1`
  color: ${(props) => props.theme.colors.slate};
  font-size: 3rem;
  padding: 0;
  margin: 0;
`;

const Text = styled.p`
  font-size: 1.25rem;
  padding: 0.5rem;
  margin: 0;
  color: white;
  background-color: ${(props) => props.theme.colors.slate};
  border: 1px solid ${(props) => props.theme.colors.slate};
  &:hover {
    background-color: white;
    color: ${(props) => props.theme.colors.slate};
  }
`;

function ErrorPage() {
  return (
    <>
      <Theme>
        <Container>
          <Header>Oh no, this route doesn't exist!</Header>
          <Link to="/">
            <Text>Return to Home Page</Text>
          </Link>
        </Container>
      </Theme>
    </>
  );
}

export default ErrorPage;
