import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

import styled from 'styled-components'
import Content, { HTMLContent } from '../components/Content'

const StyledGameInfoSection = styled.section`
  .title {
    margin-bottom: 50px;
    text-align: center;
  }

  .embedVideo-container {
    margin-bottom: 35px;
    text-align: center;
  }

  hr {
    color: ${props => props.theme.red}
  }

  .selling-point {
    display: flex;
    justify-content: space-evenly;

    padding: 20px 0;
    text-align: center;

    > img { object-fit: contain; }

    h2, p {
      max-width: 25rem;
      margin: 15px auto;
    }

    &:nth-of-type(even) {


      .companion-img { float: right; }
    }
  }
`

export const GamePageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <StyledGameInfoSection className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-2 has-text-weight-bold">
                {title}
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
      }
    }
  }
`
