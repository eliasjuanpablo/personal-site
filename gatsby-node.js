const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query PostsQuery {
      allMarkdownRemark {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);
  const postTemplate = path.resolve(`src/templates/blog-post.js`);

  result.data.allMarkdownRemark.nodes.forEach(({ id, fields: { slug } }) => {
    createPage({ path: slug, component: postTemplate, context: { id } });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value: `/blog${slug}`,
    });
  }
};
