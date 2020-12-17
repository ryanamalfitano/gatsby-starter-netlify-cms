import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'
import styled from 'styled-components'

const StyledNavbar = styled.nav`
  &.light {
    box-shadow: 0px 0px 7px ${props => props.palette.greyDark};
    
    .navbar-item {
      color: ${props => props.palette.greyDark};

      &:hover { color: ${props => props.palette.red}; }
    }
  }

  &.dark {
    color: ${props => props.palette.white};
    background: ${props => props.palette.black};
    box-shadow: 0px 2px 5px ${props => props.palette.black};

    .navbar-item {
      color: ${props => props.palette.white};

      &:hover { color: ${props => props.palette.redPale}; }
    }
  }

  .container {
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
        flex-basis: 9%;

        img {
          width: 88px;
          margin: auto;
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
        className={`navbar is-transparent ${this.props.theme}`}
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
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
              <Link className="navbar-item" to="/about-us">About Us</Link>
              <Link className="navbar-item" to="/contact"> Contact </Link>
            </div>
            <Link className="navbar-item logo" title="Logo" to="/">
              <img src={logo} alt="Pixel By Pixel Studios" />
            </Link>
            <div className="navbar-end">
              <Link className="navbar-item" to="/games/marbles-on-stream">Marbles On Stream</Link>
            </div>
            <div className="navbar-post">
              <Link className="navbar-item" to="/games/marbles-on-stream">Log In</Link>
            </div>
          </div>
        </div>
      </StyledNavbar>
    )
  }
}

export default Navbar
