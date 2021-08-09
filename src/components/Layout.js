import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Footer from "./Footer";
import Navbar from "./Navbar";

const theme = {
  primary: "rebeccapurple",
  secondary: "white",
  background: "#eee",
};

/* TODO: 
  - create SideBar component for bigger viewports
*/

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Wrapper>
      <Navbar />
      <Content>{children}</Content>
      <Footer />
    </Wrapper>
  </ThemeProvider>
);

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 16px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background: ${(props) => props.theme.background};
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.primary}
  }

  * + * {
  margin-top: 1em;
  }

  #query-on-demand-indicator-element {
    margin-top: 0
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  min-height: 100vh;
`;

export default Layout;
