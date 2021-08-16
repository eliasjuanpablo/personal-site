import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import Layout from "../components/Layout";
import SocialLinks from "../components/SocialLinks";

import avatar from "../../static/img/avatar.jpeg";

const IndexPage = () => {
  return (
    <Layout>
      <Wrapper>
        <Profile>
          <Avatar src={avatar}></Avatar>
          <Greetings>Hey there!</Greetings>
          <Bio>
            I'm Juan, a fullstack web developer based in Argentina.
            <br />
            <br />I love coding, <Link to="/blog">writing</Link> and playing
            chess.
          </Bio>
          <p>Feel free to reach out at:</p>
          <SocialLinks />
        </Profile>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  height: 80vh;
`;

const Profile = styled.div`
  text-align: center;
  max-width: 80vw;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Greetings = styled.div`
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${(props) => props.theme.primary};
  font-weight: 800;
`;

const Avatar = styled.img`
  display: block;
  width: 50vw;
  @media (min-width: 600px) {
    width: 30vw;
  }
  @media (min-width: 1024px) {
    width: 20vw;
  }
  border-radius: 100%;
  border: 2px solid ${(props) => props.theme.primary};
`;

const Bio = styled.p`
  font-size: 1.2rem;
`;

export default IndexPage;
