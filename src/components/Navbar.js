import React from 'react'
import { Link } from 'gatsby'
import logo from '../../static/img/PBPLogo_White.webp'
import logoRed from '../../static/img/PBPLogo_Red.webp'
import styled from 'styled-components'

const StyledNavbar = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;

  max-height: 50px;
  
  &.light {
    box-shadow: 0px 0px 7px ${props => props.theme.greyDark};
    
    .navbar-item {
      color: ${props => props.theme.greyDark};

      &:hover { color: ${props => props.theme.red}; }

      &.logo img {
        &.white { filter: invert(100%); }
        &.red { background: ${props => props.theme.white} !important; }

        :not(.is-active) { border-bottom: 2px solid ${props => props.theme.greyPale} !important; }

        &.white.is-active { border-bottom: 2px solid ${props => props.theme.black} !important; }
        &.red.is-active { border-bottom: 2px solid ${props => props.theme.white} !important; }
      }
    }
  }

  &.dark {
    color: ${props => props.theme.white};
    background: ${props => props.theme.black};
    box-shadow: 0px 2px 5px ${props => props.theme.black};

    .navbar-item {
      color: ${props => props.theme.white};

      &:hover { color: ${props => props.theme.redPale}; }
    }
  }

  .container {
    .navbar-brand {
      display: none;

      .navbar-item.logo {
        position: relative;
        flex-basis: 9%;

        img {
          position: absolute;
          top: 0px; right: 0; bottom: 0; left: 0;

          width: 88px;
          height: 88px;
          padding: 4px;
          max-height: unset;

          margin: 0 auto;
          border-radius: 10px;
          border-bottom: 2px solid ${props => props.theme.black};
          background: ${props => props.theme.black};

          transition: opacity 0.3s;

          :hover { opacity: 0.0; }

          &.white { z-index: 2; }
        }
      }
    }

    .navbar-menu {
      justify-content: center;

      .navbar-start,
      .navbar-end {
        flex-basis: 45%;
        margin-left: 0;
        margin-right: 0;
      }

      .navbar-item {
        transition: .1s;
      }
      
      .navbar-item.logo {
        position: relative;
        flex-basis: 9%;

        img {
          position: absolute;
          top: 0px; right: 0; bottom: 0; left: 0;

          width: 88px;
          height: 88px;
          padding: 4px;
          max-height: unset;

          margin: 0 auto;
          border-radius: 10px;
          background: ${props => props.theme.black};

          transition: opacity 0.3s;

          :hover { opacity: 0.0; }

          &.white { z-index: 2; }

          :not(.is-active) { border-bottom: 2px solid ${props => props.theme.black}; }
        }
      }

      .navbar-start { justify-content: flex-end; }
      .navbar-end { justify-content: flex-start; }

      .navbar-post {
        position: fixed;
        top: 8px;
        right: 8px;
      }
    }
  }

  @media screen and (max-width: 1024px), print {
    .container {
      .navbar-brand { display: block; }

      .navbar-menu {
        .navbar-item.logo { display: none; }
      }
    }

    &.dark {
      .navbar-burger { color: ${props => props.theme.white}; }

      .navbar-menu {
        background: ${props => props.theme.black};

        a.navbar-item:hover { background: ${props => props.theme.black}; }
      }
    }
  }
`

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <StyledNavbar
        className={`navbar is-transparent ${this.props.lighting}`}
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item logo" title="Logo" to="/">
              <img src={logo} className={`white ${this.state.navBarActiveClass}`}  alt="Pixel By Pixel Studios" />
              <img src={logoRed} className={`red ${this.state.navBarActiveClass}`} alt="Pixel By Pixel Studios" />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
              onKeyDown={() => this.toggleHamburger()}
              role="button"
              tabIndex="0"
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass} ${this.state.navBarThemeClass}`}
          >
            <div className="navbar-start">
              <Link className="navbar-item" to="/">        Home    </Link>
           {/*<Link className="navbar-item" to="/about-us">About Us</Link>*/}
              <Link className="navbar-item" to="/contact"> Contact </Link>
            </div>
            <Link className="navbar-item logo" title="Logo" to="/">
              <img src={logo} className="white"  alt="Pixel By Pixel Studios" />
              <img src={logoRed} className="red" alt="Pixel By Pixel Studios" />
            </Link>
            <div className="navbar-end">
              <Link className="navbar-item" to="/games/marbles-on-stream">Marbles On Stream</Link>
           {/*<Link className="navbar-item" to="/games/resurgence">Resurgence</Link>*/}
            </div>
            <div className="navbar-post">
           {/*<Link className="navbar-item" to="/log-in">Log In</Link>*/}
            </div>
          </div>
        </div>
      </StyledNavbar>
    )
  }
}

export default Navbar
