import React from 'react'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'

import cookie from 'cookie'
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

  &.light {
    color: ${theme.black};
    background: ${theme.white};

    form input, form textarea {
      background: ${theme.silver};
      ::placeholder { color: ${theme.greyPale}; }
    }
  }

  &.dark {
    color: ${theme.white};
    background: ${theme.greyDark};

    form input, form textarea {
      background: ${theme.white};
      ::placeholder { color: ${theme.greyPale}; }
    }
  }
`

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()

  // Set lighting bool based on the theme lighting.
  let lightingIsDark = false;
  if (theme.lighting === "dark") {
    lightingIsDark = true;
  }

  // Only do this if the document is loaded.
  if (typeof document !== "undefined") {
    // Grab cookies.
    var cookies = cookie.parse(document.cookie);

    // If we can find the 'lighting' cookie, set the lighting to the cookie value.
    if (typeof(cookies.lighting) !== "undefined") {
      theme.lighting = cookies.lighting;
      if (theme.lighting === "dark") { lightingIsDark = false; }
                      else { lightingIsDark = true; }
    }
  }

  // Function to handle theme changes coming from ThemeButton.js.
  function handleThemeChange(val) {
    theme.lighting = val;

    // Set theme cookie with no expiry.
    document.cookie = "lighting=" + val + ";path=/";

    window.location.reload();
  }

  return (
    <StyledLayout className={`${theme.lighting}`}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
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
    <TemplateWrapper children={children} pageType={pageType} />
  </ThemeProvider>
);

export default WrappedWithThemeProvider;
