module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "gatsby-netlify",
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: "markdown-content",
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-styled-components",
  ],
};
