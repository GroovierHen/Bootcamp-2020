import * as React from 'react';
import { PageProps, Link, graphql } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { BlogPostByIdQuery } from '../../generated/gatsby-graphql';
import { FirebaseContext } from '../utils/Enhancer';
import Layout from '../components/layout';
import Seo from '../components/seo';

const BlogPostTemplate: React.FC<PageProps<BlogPostByIdQuery>> = ({
  data,
  location,
}) => {
  const firebase = React.useContext(FirebaseContext);

  const post = data.contentfulBlogPost;
  const siteTitle = data.site?.siteMetadata?.title || `Title`;
  const { previous, next } = data;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post?.title!}
        description={post?.excerpt?.childMarkdownRemark?.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post?.title}</h1>
          <p>{post?.publishedDate}</p>
        </header>

        <section itemProp="articleBody">
          {firebase?.user
            ? documentToReactComponents(JSON.parse(post?.body?.raw!))
            : post.excerpt.excerpt}
        </section>

        <hr />
      </article>

      {!firebase?.user && (
        <>
          <div className="artical-overlay" />
          <span>Login to view</span>
        </>
      )}

      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={'/blog/' + previous.slug!} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={'/blog/' + next.slug!} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(id: { eq: $id }) {
      title
      publishedDate(formatString: "Do MMMM, YYYY")
      excerpt {
        excerpt
        childMarkdownRemark {
          excerpt
        }
      }
      body {
        raw
      }
    }
    previous: contentfulBlogPost(id: { eq: $previousPostId }) {
      title
      slug
    }
    next: contentfulBlogPost(id: { eq: $nextPostId }) {
      title
      slug
    }
  }
`;
