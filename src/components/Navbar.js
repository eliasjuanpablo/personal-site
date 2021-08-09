import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Nav>
      <Brand>
        <Link to="/">jpelias</Link>
      </Brand>
      <Links>
        <Link to="/blog">blog</Link>
        <Link to="/portfolio">portfolio</Link>
      </Links>
    </Nav>
  );
};

const Nav = styled.div`
  color: ${(props) => props.theme.primary};
  font-size: 1.2em;
  font-family: monospace;

  display: none;

  @media (max-width: 640px) {
    display: flex;
  }
`;

const Brand = styled.div`
  font-weight: 800;
  flex: 0 0 40%;
  padding: 0.5em;
  border: 1px solid ${(props) => props.theme.primary};
  border-top: none;
  border-left: none;
  text-align: center;
`;

const Links = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 0;

  border: 1px solid ${(props) => props.theme.primary};
  border-bottom: none;
  border-left: none;

  & a {
    margin-top: 0;
  }
`;

export default Navbar;
