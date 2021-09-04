import * as React from 'react';
import { PageProps, Link, graphql } from 'gatsby';

import { BlogIndexQuery } from '../../generated/gatsby-graphql';
import Layout from '../components/layout';
import Seo from '../components/seo';

const BlogIndex: React.FC<PageProps<BlogIndexQuery>> = ({ data, location }) => {
  const siteTitle = data.site?.siteMetadata?.title || `Title`;
  const posts = data.allContentfulBlogPost.edges;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>No blog posts found.</p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const title = post.node.title || post.node.slug;

          return (
            <li key={post.node.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={'/blog/' + post.node.slug!} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.node.publishedDate}</small>
                </header>
                <section>
                  <p itemProp="description">
                    {post.node.excerpt?.childMarkdownRemark?.excerpt}
                  </p>
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
      edges {
        node {
          title
          slug
          publishedDate(formatString: "MMMM DD, YYYY")
          body {
            raw
          }
          excerpt {
            childMarkdownRemark {
              excerpt
            }
          }
        }
      }
    }
  }
`;
