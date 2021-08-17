import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import styled from "styled-components";
import Layout from "../components/Layout";

import avatar from "../../static/img/avatar.jpeg";

const BlogPost = (queryResult) => {
  const { description, html, title, date, picture } = extractPost(queryResult);

  return (
    <Layout>
      <Wrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Author>
          <img src={avatar} />
          <div>
            Juan Pablo Elias <br />
            <PostDate>{date}</PostDate>
          </div>
        </Author>
        <Picture image={getImage(picture)} alt=""></Picture>
        <Body dangerouslySetInnerHTML={{ __html: html }}></Body>
      </Wrapper>
    </Layout>
  );
};

function extractPost({ data }) {
  const {
    html,
    frontmatter: { title, description, date, picture },
  } = data.markdownRemark;

  return {
    date,
    description,
    html,
    picture,
    title,
  };
}

const Wrapper = styled.article`
  padding: 0 1em;
  overflow-x: hidden;
  font-family: serif;
`;

const Title = styled.h1`
  font-size: 2em;
`;
const Description = styled.div`
  margin-top: 0.5em;
  opacity: 0.5;
`;
const Picture = styled(GatsbyImage)`
  max-width: 100%;
  @media (max-width: 1024px) {
    max-width: 120%;
  }
  margin-left: -2em;
  margin-right: -2em;
`;
const Author = styled.div`
  display: flex;
  align-items: center;
  font-family: monospace;
  font-size: 0.9em;
  & > * {
    margin-top: 0;
  }

  & img {
    width: 3em;
    border-radius: 100%;
    margin-right: 0.5em;
    border: 2px solid ${(props) => props.theme.primary};
  }
`;

const PostDate = styled.span`
  font-size: 0.8em;
`;

const Body = styled.div`
  line-height: 1.5;

  & > blockquote {
    background: rgba(0, 0, 0, 0.05);
    border-left: 2px solid gray;
    padding: 1em;
    font-style: italic;
  }
`;

export default BlogPost;

export const query = graphql`
  query PostBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
        date(formatString: "MM/DD/YYYY")
        picture {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, breakpoints: [750, 1080])
          }
        }
      }
    }
  }
`;
