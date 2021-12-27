import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <Copyright>© {new Date().getFullYear()} - Juan Pablo Elias</Copyright>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  font-family: monospace;
  background: ${(props) => props.theme.primary};
  padding: 1em;
  text-align: center;
`;

const Copyright = styled.small`
  color: ${(props) => props.theme.secondary};
`;

export default Footer;
