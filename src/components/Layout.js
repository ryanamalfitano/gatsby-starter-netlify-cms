import React from 'react'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'

import { CookiesProvider, useCookies } from 'react-cookie'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import useSiteMetadata from './SiteMetadata'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ThemeButton from '../components/ThemeButton'

import './all.scss'

// Site theme settings
const theme = {
  white: '#ffffff',
  black: '#000000',
  silver: '#eeeeee',
  grey: '#3a4750',
  greyPale: '#888888',
  greyDark: '#222222',

  red: '#d72323',
  redPale: '#ff6666',
  redDark: '#990000',

  purple: '#a970ff',

  fontBody: 'Work Sans',
  fontHeading: 'Exo',
  fontSecondary: 'Signika',

  lighting: 'light',
};

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 100vh;
  transition: .3s;

  padding-top: 65px;
  &.home { padding-top: 50px; }

  /* Entire index page styles here to fix weird
     first-load bug. Gross, I know. */

  #index-page {
    .masthead {
      align-items: stretch;

      .column { padding: 0; }
      
      #titles {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;

        padding-right: 30px;
        text-align: right;

        background: ${props => props.theme.grey} center / cover no-repeat;

        h3 {
          margin-top: 0;
          font-weight: normal;
          font-style: italic;
        }
      }

      #stream {
        p { display: none; }

        .embedVideo-container {
          text-align: center;
          background: black;

          iframe {
            width: 100%;
          }
        }
      }
    }

    .container {
      .mainPitch {
        margin-top: 50px;
        text-align: center;

        p {
          max-width: 30rem;
          margin: auto;
        }

        .title, .subtitle { color: inherit; }
      }

      .downloads {
        margin: 35px auto;
        justify-content: center;

        h4 {
          font-weight: normal;
        }

        .column.is-4 { flex: none; width: 33%; }

        .streamer {
          text-align: right;
          box-shadow: inset -6px 6px 5px ${props => props.theme.purple};
          border-top:   2px solid ${props => props.theme.black};
          border-right: 1px solid ${props => props.theme.black};

          h4 { color: ${props => props.theme.purple} !important; }

          a:first-of-type img { margin-right: 20px; }
          a:not(:first-of-type) img { margin-right: 5px; }
        }

        .viewer {
          box-shadow: inset 6px 6px 5px ${props => props.theme.red};
          border-top:  2px solid ${props => props.theme.black};
          border-left: 1px solid ${props => props.theme.black};

          h4 { color: ${props => props.theme.red} !important; }

          a:first-of-type img { margin-left: 20px; }
          a:not(:first-of-type) img { margin-left: 5px; }
        }
      }

      .sellingPoints {
        margin: 100px auto 50px;
        text-align: center;
      }
    }

    @media screen and (max-width: 1024px), print {
      .masthead #stream .embedVideo-container iframe { height: 300px; }
    }

    @media screen and (max-width: 768px), print {
      .masthead #titles {
        padding: 50px 25px;
        text-align: center;
      }

      .masthead #stream .embedVideo-container iframe { height: 250px; }

      .downloads {
        display: flex;

        .column {
          width: 50% !important;

          a {
            display: block;
            margin: 10px 20px;

            img { margin: 0 !important; }
          }
        }
      }
    }
  }

  &.light {
    color: ${theme.black};
    background: ${theme.white};

    .masthead #titles { background-image: url(/img/backgrounds/ABMSBT1.jpg) !important; }

    form input, form textarea {
      background: ${theme.silver};
      ::placeholder { color: ${theme.greyPale}; }
    }

    *.darkonly { display: none !important; }
  }

  &.dark {
    color: ${theme.white};
    background: ${theme.greyDark};

    .masthead #titles { background-image: url(/img/backgrounds/17924.jpg) !important; }

    form input, form textarea {
      background: ${theme.white};
      ::placeholder { color: ${theme.greyPale}; }
    }

    *.lightonly { display: none !important; }
  }
`

const TemplateWrapper = ({ children, pageType }) => {
  const { title, description } = useSiteMetadata()
  const [cookies, setCookie] = useCookies();

  // Set lighting bool based on the theme lighting.
  var lightingIsDark = false;
  if (theme.lighting === "dark") {
    lightingIsDark = true;
  }

  // Grab cookies.
  //var cookies = cookie.parse(document.cookie);

  // If we can find the 'lighting' cookie, set the lighting to the cookie value.
  if (typeof(cookies.lighting) !== "undefined") {
    theme.lighting = cookies.lighting;
    if (theme.lighting === "dark") { lightingIsDark = true; }
                    else { lightingIsDark = false; }
  }

  // Function to handle theme changes coming from ThemeButton.js.
  function handleThemeChange(val) {
    theme.lighting = val;

    // Set theme cookie with no expiry.
    setCookie("lighting", val, "/", "SameSite=Strict;");
  }

  return (
    <StyledLayout className={`${theme.lighting} ${pageType}`}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/logos/PBPSLogoWhite.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/logos/PBPSLogoWhite.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/logos/PBPSLogoWhite.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/logos/PBPSLogoWhite.png`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/logos/PBPSLogoWhite.png`}
        />
      </Helmet>
      <ThemeButton onThemeChange={handleThemeChange} currentTheme={lightingIsDark} />
      <Navbar lighting={theme.lighting} />
      <div>{children}</div>
      <Footer lighting={theme.lighting} />
    </StyledLayout>
  )
}

const WrappedWithThemeProvider = ({ children, pageType }) => (
  <ThemeProvider theme={theme}>
    <CookiesProvider>
      <TemplateWrapper children={children} pageType={pageType} />
    </CookiesProvider>
  </ThemeProvider>
);

export default WrappedWithThemeProvider;
