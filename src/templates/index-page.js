import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'

const StyledMasthead = styled.div`
  #titles {
    margin: auto;
    text-align: right;

    h3 { font-style: italic; }
  }

  #stream {

  }
`

const StyledContent = styled.section`
  
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
        border-right: 1px solid ${props => props.theme.black};

        h2 { color: ${props => props.theme.purple}; }
      }

      .viewer {
        box-shadow: inset 6px 6px 5px ${props => props.theme.red};
        border-left: 1px solid ${props => props.theme.black};

        h2 { color: ${props => props.theme.red}; }
      }
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
      <div id="titles" className="column is-6">
        <h1 className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen">
          {title}
        </h1>
        <h3 className="is-size-5-mobile is-size-5-tablet is-size-4-widescreen">
          {subtitle}
        </h3>
      </div>
      <div id="stream" className="column is-6 full-width-image margin-top-0"></div>
    </StyledMasthead>
    <StyledContent>
      <div className="container">
        <section className="mainPitch">
          <h1 className="title">{mainpitch.title}</h1>
          <p className="subtitle">{mainpitch.description}</p>
        </section>
        <section className="downloads columns">
          <div className="streamer column is-3">
            <h2>For Streamers</h2>
            <a href="https://store.steampowered.com/app/1170970/Marbles_on_Stream/" target="_blank" rel="noreferrer noopener">
              <img src="" alt="Download on Steam" />
            </a>
          </div>
          <div className="viewer column is-3">
            <h2>For Viewers</h2>
            <a href="https://apps.apple.com/de/app/marbles-on-stream-mobile/id1443250176" target="_blank" rel="noreferrer noopener">
              <img src="" alt="Download on App Store" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.pixelbypixel.mosmobile" target="_blank" rel="noreferrer noopener">
              <img src="" alt="Download on Google Play" />
            </a>
          </div>
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
     {/*<section className="streamsCarousel full-width-image-container">
          <div className="full-width-image" style={{backgroundImage: `url(${!!image.childImageSharp ? image.childImageSharp.fluid.src : image})`}}>
            <h1 style={{color: '#ffffff', fontSize: '36pt'}}>STREAMS LIST</h1>
          </div>
        </section>*/}
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
