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

// Site palette settings
const palette = {
  white: '#ffffff',
  black: '#000000',
  silver: '#eeeeee',
  greyPale: '#3a4750',
  greyDark: '#222222',

  red: '#d72323',
  redPale: '#ff6666',
  redDark: '#990000',

  fontBody: 'Work Sans',
  fontHeading: 'Exo',
  fontSecondary: 'Signika',
};

const StyledLayout = styled.div`
  transition: .3s;

  &.light {
    color: ${palette.black};
    background: ${palette.white};
  }

  &.dark {
    color: ${palette.white};
    background: ${palette.greyDark};
  }
`

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()

  // Set theme to "dark" by default.
  let theme = "dark";
  let themeIsLight = false;

  // Grab cookies.
  var cookies = cookie.parse(document.cookie);

  // If we can find the 'theme' cookie, set the theme to the cookie value.
  if (typeof(cookies.theme) !== "undefined") {
    theme = cookies.theme;
    if (theme === "dark") { themeIsLight = false; }
                     else { themeIsLight = true; }
  }

  // Function to handle theme changes coming from ThemeButton.js.
  function handleThemeChange(val) {
    theme = val;

    // Set theme cookie with no expiry.
    document.cookie = "theme=" + val + ";path=/";

    window.location.reload();
  }

  return (
    <StyledLayout className={`${theme}`}>
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
      <ThemeButton onThemeChange={handleThemeChange} currentTheme={themeIsLight} />
      <Navbar theme={theme} />
      <div>{children}</div>
      <Footer />
    </StyledLayout>
  )
}

const WrappedWithThemeProvider = ({ children, pageType }) => (
  <ThemeProvider theme={theme}>
    <TemplateWrapper children={children} pageType={pageType} />
  </ThemeProvider>
);

export default WrappedWithThemeProvider;
