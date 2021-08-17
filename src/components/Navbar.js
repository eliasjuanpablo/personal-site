import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Nav>
      <Wrapper>
        <Brand>
          <Link to="/">jpelias</Link>
        </Brand>
        <Links>
          <NavLink to="/blog">blog</NavLink>
        </Links>
      </Wrapper>
    </Nav>
  );
};

const Nav = styled.div`
  grid-area: nav;
  color: ${(props) => props.theme.primary};
  font-size: 1.2rem;
  font-family: monospace;
  border-bottom: 1px solid ${(props) => props.theme.primary};

  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  @media (min-width: 1024px) {
    width: 60%;
  }
`;

const Brand = styled.div`
  font-weight: 800;
  flex: 0 0 50%;
  padding: 0.5em;
  text-align: center;
`;

const Links = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 0;
  flex-direction: row-reverse;

  & a {
    margin-top: 0;
  }
`;

const NavLink = styled(Link)`
  text-decoration: ${(props) =>
    typeof window !== "undefined" && window.location.pathname === props.to
      ? "underline"
      : ""};
`;

export default Navbar;
