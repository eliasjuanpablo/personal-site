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
        <Title>Blog</Title>
        <PostsList>
          {posts.map(({ id, date, title, description, slug }) => (
            <PostItem key={id}>
              <PostCard
                key={id}
                title={title}
                description={description}
                publishedDate={date}
                slug={slug}
              />
            </PostItem>
          ))}
        </PostsList>
      </BlogRoll>
    </Layout>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query MyQuery {
        allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
          edges {
            node {
              id
              frontmatter {
                title
                date
                description
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={(data) => <BlogPage data={data} />}
  />
);

const Title = styled.h1``;

const BlogRoll = styled.section`
  padding: 1em;
`;

const PostsList = styled.section``;

const PostItem = styled.article``;

function extractPosts(data) {
  return data.allMarkdownRemark.edges.map(({ node }) => {
    const { id } = node;
    const { date, description, title } = node.frontmatter;
    const { slug } = node.fields;

    return {
      id,
      date,
      description,
      title,
      slug,
    };
  });
}
