const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query PostsQuery {
      allMarkdownRemark(sort: { order: ASC, fields: frontmatter___date }) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  `);
  const postTemplate = path.resolve(`src/templates/blog-post.js`);

  const { nodes } = result.data.allMarkdownRemark;

  nodes.forEach(({ id, fields: { slug } }, index) => {
    const previousPost = index === 0 ? null : nodes[index - 1];
    const nextPost = index === nodes.length - 1 ? null : nodes[index + 1];
    createPage({
      path: slug,
      component: postTemplate,
      context: { id, nextPost, previousPost },
    });
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
