require("dotenv").config()

module.exports = {
    siteMetadata: {
        title: `Blog`,
        description: `Project 12A Blog site in Gatsby.js and Contentful CMs`,
        siteUrl: `https://gatsbystarterblogsource.gatsbyjs.io/`,
    },
    plugins: [
        `gatsby-transformer-remark`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-graphql-codegen`,
            options: {
                fileName: `./generated/gatsby-graphql.ts`,
            }
        },
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
            },
        },

    ],
}