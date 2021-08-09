import { graphql, StaticQuery } from "gatsby";
import * as React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";

const BlogPage = ({ data }) => {
  const posts = extractPosts(data);

  return (
    <Layout>
      <BlogRoll>
        {posts.map(({ id, date, title, description }) => (
          <PostCard
            key={id}
            title={title}
            description={description}
            publishedDate={date}
          />
        ))}
      </BlogRoll>
    </Layout>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query MyQuery {
        allMarkdownRemark {
          edges {
            node {
              id
              frontmatter {
                title
                date
                description
              }
            }
          }
        }
      }
    `}
    render={(data) => <BlogPage data={data} />}
  />
);

const BlogRoll = styled.div`
  // margin-top: 0;
  padding: 0 1em;
`;

function extractPosts(data) {
  return data.allMarkdownRemark.edges.map(({ node }) => {
    const { id } = node;
    const { date, description, title } = node.frontmatter;

    return {
      id,
      date,
      description,
      title,
    };
  });
}
