import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

// https://www.gatsbyjs.com/docs/add-seo-component/

const Head = ({ title }) => {
  const { pathname } = useLocation();

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            siteUrl
          }
        }
      }
    `,
  );

  const { defaultTitle, siteUrl } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${defaultTitle}`}>
      <html lang="en" />

      {/* <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} /> */}

      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
};

Head.defaultProps = {
  title: null,
};
