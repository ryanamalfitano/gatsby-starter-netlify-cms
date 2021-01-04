import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

import styled from 'styled-components'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const StyledGameInfoSection = styled.section`
  .title {
    margin-bottom: 50px;
    text-align: center;

    img { object-fit: contain !important; }
  }

  video { max-width: 100%; }
  
  .embedVideo-container {
    margin-bottom: 35px;
    text-align: center;
  }

  hr {
    color: ${props => props.theme.red}
    background-color: ${props => props.theme.red}
  }

  .selling-point {
    display: flex;
    justify-content: space-evenly;

    padding: 20px 0;
    text-align: center;

    > img {
      max-width: 50%;
      object-fit: contain;
    }

    h2, p {
      max-width: 25rem;
      margin: 15px auto;
    }
  }

  @media screen and (max-width: 768px), print {
    .selling-point {
      display: block;

      > img {
        max-width: 100%;
        margin: 15px 0;
      }
    }
  }
`

export const GamePageTemplate = ({ title, logoLight, logoDark, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  // Time to sort out the title and logos.
  let titleCard;

  // Proceed if at least one logo is defined.
  if (typeof(logoLight) !== "undefined" || typeof(logoDark) !== "undefined") {
    // If only one is defined, replace the other one with it.
    if (typeof(logoLight) !== "undefined" && typeof(logoDark) === "undefined") { logoDark = logoLight; }
    if (typeof(logoDark) !== "undefined" && typeof(logoLight) === "undefined") { logoLight = logoDark; }

    // Create both logos as PCIs.
    titleCard = (
      <div>
        <PreviewCompatibleImage imageInfo={logoLight} className="logo lightonly" />
        <PreviewCompatibleImage imageInfo={logoDark} className="logo darkonly" />
      </div>
    );
  } else {
    // If neither logo is defined then just use the title.
    titleCard = title;
  }

  return (
    <StyledGameInfoSection className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-2 has-text-weight-bold">
                {titleCard}
              </h2>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </StyledGameInfoSection>
  )
}

GamePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  logoLight: PropTypes.object,
  logoDark: PropTypes.object,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const GamePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <GamePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        logoLight={post.frontmatter.logoLight}
        logoDark={post.frontmatter.logoDark}
        content={post.html}
      />
    </Layout>
  )
}

GamePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default GamePage

export const gamePageQuery = graphql`
  query GamePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        logoLight {
          childImageSharp {
            fluid(maxWidth: 1020, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }

        logoDark {
          childImageSharp {
            fluid(maxWidth: 1020, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
