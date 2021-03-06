import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import styled from "styled-components";
import AdjacentPosts from "../components/AdjacentPosts";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

import avatar from "../../static/img/avatar.jpeg";
import { devices } from "../utils";

const BlogPost = ({ data, pageContext }) => {
  const { credit, description, html, title, date, picture } = extractPost(data);
  const { nextPost, previousPost } = pageContext;

  return (
    <Layout>
      <Seo title={title} />
      <Wrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Author>
          <img src={avatar} alt="avatar" />
          <div>
            Juan Pablo Elias <br />
            <PostDate>{date}</PostDate>
          </div>
        </Author>
        <Picture image={getImage(picture)} alt=""></Picture>
        <Credit dangerouslySetInnerHTML={{ __html: credit }}></Credit>
        <Body dangerouslySetInnerHTML={{ __html: html }}></Body>
        <AdjacentPosts nextPost={nextPost} previousPost={previousPost} />
      </Wrapper>
    </Layout>
  );
};

function extractPost(data) {
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

  @media ${devices.laptop} {
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
  max-width: 90vw;
  margin-bottom: 4em;

  & > blockquote {
    background: rgba(0, 0, 0, 0.05);
    border-left: 2px solid gray;
    padding: 1em;
    font-style: italic;
  }

  & > figure > figcaption {
    font-size: 0.8em;
    color: gray;
    text-align: center;
    margin-top: 0.5em;
  }

  .gatsby-highlight {
    overflow: auto;
  }

  .gatsby-highlight-code-line {
    margin-top: 0;
    background-color: hsl(76deg 17% 26%);
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid #f99;
  }

  .gatsby-highlight pre[class*="language-"] {
    float: left;
    min-width: 100%;
  }

  .language-text {
    white-space: nowrap;
    background: #adadad6b;
    color: inherit;
    border-radius: 0;
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
