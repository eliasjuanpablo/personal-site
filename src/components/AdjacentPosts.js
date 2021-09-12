import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import { devices } from "../utils";

const AdjacentPosts = ({ previousPost, nextPost }) => {
  return (
    <Wrapper>
      <Title>More posts</Title>
      <Posts>
        {previousPost ? (
          <Link to={previousPost.fields.slug}>
            ← {previousPost.frontmatter.title}
          </Link>
        ) : (
          <div></div>
        )}
        {nextPost ? (
          <Link to={nextPost.fields.slug}>{nextPost.frontmatter.title} →</Link>
        ) : (
          <div></div>
        )}
      </Posts>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-left: -1em;
  margin-right: -1em;
  padding: 1em;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

const Title = styled.h2`
  margin: 0;
`;

const Posts = styled.div`
  & a {
    display: block;
  }

  @media ${devices.tablet} {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & a {
      margin-top: 0;
      text-align: center;
    }
  }
`;

export default AdjacentPosts;
