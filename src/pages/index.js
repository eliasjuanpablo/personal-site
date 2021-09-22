import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import Layout from "../components/Layout";
import SocialLinks from "../components/SocialLinks";

import avatar from "../../static/img/avatar.jpeg";
import { devices } from "../utils";

const IndexPage = () => {
  return (
    <Layout>
      <Wrapper>
        <Profile>
          <Avatar src={avatar}></Avatar>
          <Greetings>Hey there!</Greetings>
          <Bio>
            I'm Juan, a fullstack web developer based in Argentina.
            <br />I love coding, <Link to="/blog">writing</Link> and playing
            chess.
          </Bio>
          <p>
            Wanna build something great? <br /> Reach out at:
          </p>
          <SocialLinks />
        </Profile>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.main`
  display: grid;
  place-items: center;
  height: 80vh;
  line-height: 1.5;
`;

const Profile = styled.div`
  padding: 1.5em;
  background: white;
  border-radius: 10px;
  border-bottom: 4px solid darkgray;

  text-align: center;
  max-width: 80vw;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Greetings = styled.div`
  text-transform: uppercase;
  font-size: 1.5rem;
  letter-spacing: -1px;
  color: ${(props) => props.theme.primary};
  font-weight: 800;
`;

const Avatar = styled.div`
  display: block;
  height: 50vw;
  width: 50vw;
  @media ${devices.tablet} {
    height: 30vw;
    width: 30vw;
  }
  @media ${devices.laptop} {
    height: 20vw;
    width: 20vw;
  }
  border-radius: 100%;
  border: 3px solid ${(props) => props.theme.primary};

  background: url(${(props) => props.src}) no-repeat;
  background-size: cover;
`;

const Bio = styled.p`
  font-size: 1.2rem;
`;

export default IndexPage;
