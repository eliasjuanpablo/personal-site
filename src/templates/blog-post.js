import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import styled from "styled-components";
import Layout from "../components/Layout";

import avatar from "../../static/img/avatar.jpeg";

const BlogPost = (queryResult) => {
  const { credit, description, html, title, date, picture } =
    extractPost(queryResult);

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
        <Credit dangerouslySetInnerHTML={{ __html: credit }}></Credit>
        <Body dangerouslySetInnerHTML={{ __html: html }}></Body>
      </Wrapper>
    </Layout>
  );
};

function extractPost({ data }) {
  const {
    html,
    frontmatter: { title, credit, description, date, picture },
  } = data.markdownRemark;

  return {
    credit,
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
  font-size: 1.2rem;
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
    margin-left: -2em;
    margin-right: -2em;
    max-width: 120%;
  }
`;
const Credit = styled.div`
  margin-top: 0.5em;
  font-size: 0.8em;
  color: gray;
  text-align: center;

  & > a {
    color: inherit;
    text-decoration: underline;
  }
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

  @media (max-width: 600px) {
    & > figure {
      width: 100vw;
      margin: 0 -1em;
    }
    & > figure > figcaption {
      padding: 0 1em;
    }
  }

  & > figure > figcaption {
    font-size: 0.8em;
    color: gray;
    text-align: center;
    margin-top: 0.5em;
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
        credit
      }
    }
  }
`;
