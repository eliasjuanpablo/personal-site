import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const NotFoundPage = () => (
  <Layout>
    <Seo title="Whoops!" />
    <Wrapper>
      <Error>404</Error>

      <Description>It seems it wasn't this way.</Description>
      <Back href="/">Get back home</Back>
    </Wrapper>
  </Layout>
);

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Error = styled.div`
  font-size: 15vmin;
`;
const Description = styled.div``;
const Back = styled.a``;

export default NotFoundPage;
