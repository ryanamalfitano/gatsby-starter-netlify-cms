import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

const StyledHomePageContent = styled.section`
  #titles {
    margin: auto;
    text-align: right;

    h3 { font-style: italic; }
  }

  #stream {

  }

  .container {
    .mainPitch {
      text-align: center;

      .subtitle {
        max-width: 30rem;
        margin: auto;
      }

      .title, .subtitle { color: inherit; }
    }

    .downloads {
      margin: 20px auto;
      justify-content: center;

      h2 {
        
      }

      .streamer {
        text-align: right;
        box-shadow: inset -6px 6px 5px ${props => props.theme.purple};
        border-top:   2px solid ${props => props.theme.black};
        border-right: 1px solid ${props => props.theme.black};

        h2 { color: ${props => props.theme.purple}; }
      }

      .viewer {
        box-shadow: inset 6px 6px 5px ${props => props.theme.red};
        border-top:  2px solid ${props => props.theme.black};
        border-left: 1px solid ${props => props.theme.black};

        h2 { color: ${props => props.theme.red}; }
      }
    }
  }
`

export const IndexPageTemplate = ({title, content, contentComponent}) => {
  const PageContent = contentComponent || Content

  return (
  <StyledHomePageContent className="section">
    <div className="container">
      <PageContent className="content" content={content} />
    </div>
  </StyledHomePageContent>
  )
}

IndexPageTemplate.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const IndexPage = ({ data }) => {
  const { markdownRemark: page } = data

  return (
    <Layout>
      <IndexPageTemplate
        contentComponent={HTMLContent}
        title={page.frontmatter.title}
        content={page.html}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
