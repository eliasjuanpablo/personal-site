import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <Copyright>© {new Date().getFullYear()} - Juan Pablo Elias</Copyright>
      <Fork href="https://github.com/eliasjuanpablo" target="_blank">
        fork me
      </Fork>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  font-family: monospace;
  background: ${(props) => props.theme.primary};
  padding: 1em;
  text-align: center;
`;

const Copyright = styled.div`
  color: ${(props) => props.theme.secondary};
`;

const Fork = styled.a`
  display: block;
  color: ${(props) => props.theme.secondary};
  font-weight: 800;
  padding: 0.5em 1em;
  background: rgba(0, 0, 0, 0.4);
`;

export default Footer;
