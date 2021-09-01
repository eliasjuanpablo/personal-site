import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { devices } from "../utils";

const theme = {
  primary: "cornflowerblue",
  secondary: "white",
  background: "#eee",
};

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
    font-size: 4vw;
    @media ${devices.tablet} {
      font-size: 3vw;
    }
    @media ${devices.laptop} {
      font-size: 16px;
    }
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background: ${(props) => props.theme.background};
  }

  h1 {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.primary};
  }

  figure {
    margin: 0;
  }

  * + * {
    margin-top: 1em;
  }

  #query-on-demand-indicator-element {
    margin-top: 0
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    "nav"
    "content"
    "footer";
  @media ${devices.laptop} {
    grid-template-columns: 1fr 4fr 1fr;

    grid-template-areas:
      "nav nav nav"
      ". content ."
      "footer footer footer";
  }
`;

const Content = styled.div`
  grid-area: content;
  min-height: 100vh;
  display: block;
`;

export default Layout;
