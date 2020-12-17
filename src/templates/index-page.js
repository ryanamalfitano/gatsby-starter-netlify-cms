import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'

const StyledMasthead = styled.div`
  
  .stream {
    background-image: url();
    background-position: 'top left';
    background-attachment: 'fixed';
  }

  .titles {

  }
`

const StyledContent = styled.section`
  
  .container {
    .mainPitch {
      .title, .subtitle { color: inherit; }
    }
  }
`

export const IndexPageTemplate = ({
  image,
  title,
  subtitle,
  mainpitch,
  main,
}) => (
  <div>
    <StyledMasthead className="columns">
      <div className="column is-6 titles">
        <h1 className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen">
          {title}
        </h1>
        <h3 className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen">
          {subtitle}
        </h3>
      </div>
      <div className="column is-6 stream full-width-image margin-top-0" style={{backgroundImage: `url(${!!image.childImageSharp ? image.childImageSharp.fluid.src : image})`}}></div>
    </StyledMasthead>
    <StyledContent>
      <div className="container">
        <section className="mainPitch">
          <h1 className="title">{mainpitch.title}</h1>
          <p className="subtitle">{mainpitch.description}</p>
        </section>
        <section className="sellingPoints">
          <h3 className="has-text-weight-semibold is-size-2">
            {main.heading}
          </h3>
          <p>{main.description}</p>
          <div className="columns">
            <div className="column is-4">
              <img src={!!main.image1.image.childImageSharp ? main.image1.image.childImageSharp.fluid.src : main.image1.image} alt={main.image1.alt} />
              <p>{main.image1.alt}</p>
            </div>
            <div className="column is-4">
              <img src={!!main.image2.image.childImageSharp ? main.image2.image.childImageSharp.fluid.src : main.image2.image} alt={main.image2.alt} />
              <p>{main.image2.alt}</p>
            </div>
            <div className="column is-4">
              <img src={!!main.image3.image.childImageSharp ? main.image3.image.childImageSharp.fluid.src : main.image3.image} alt={main.image3.alt} />
              <p>{main.image3.alt}</p>
            </div>
          </div>
        </section>
        <section className="streamsCarousel full-width-image-container">
          <div className="full-width-image" style={{backgroundImage: `url(${!!image.childImageSharp ? image.childImageSharp.fluid.src : image})`}}>
            <h1 style={{color: '#ffffff', fontSize: '36pt'}}>STREAMS LIST</h1>
          </div>
        </section>
      </div>
    </StyledContent>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  mainpitch: PropTypes.object,
  main: PropTypes.object,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        subtitle={frontmatter.subtitle}
        mainpitch={frontmatter.mainpitch}
        main={frontmatter.main}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        subtitle
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mainpitch {
          title
          description
        }
        main {
          heading
          description

          image1 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image2 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image3 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
