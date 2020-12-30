import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'

const StyledFooter = styled.footer`
  margin-top: auto;
  
  div.social {
    img { width: 30px; height: 30px; }
    .row {
      margin: 15px 0;
      text-align: right;
    }
  }

  .copyright {
    padding: 10px 0;
  }

  .navbar-item {
    transition: .1s;
    &:hover { background-color: initial; }
  }

  &.light {
    box-shadow: 0px 0px 7px ${props => props.theme.greyDark};
    
    .navbar-item {
      color: ${props => props.theme.greyDark};
      
      &:hover { color: ${props => props.theme.red} !important; }
    }
  }
  
  &.dark {
    color: ${props => props.theme.white};
    background: ${props => props.theme.black};
    box-shadow: 0px 2px 5px ${props => props.theme.black};

    .navbar-item {
      color: ${props => props.theme.white};

      &:hover { color: ${props => props.theme.redPale} !important; }
    }
  }
`

const Footer = class extends React.Component {
  render() {
    return (
      <StyledFooter className={`footer ${this.props.lighting}`}>
        <div className="content has-text-centered">
          <div className="container">
            <div style={{ maxWidth: '100vw' }} className="columns">
              <div className="column is-3">
                <section className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link className="navbar-item" to="/">        Home    </Link>
                    </li>
                {/*<li>
                      <Link className="navbar-item" to="/about-us">About Us</Link>
                    </li>*/}
                    <li>
                      <Link className="navbar-item" to="/contact"> Contact </Link>
                    </li>
                 {/*<li>
                      <Link className="navbar-item" to="/log-in">Log In</Link>
                    </li>*/}
                  </ul>
                </section>
              </div>
              <div className="column is-3">
                <section>
                  <ul className="menu-list">
                  <li>
                      <Link className="navbar-item" to="/games/marbles-on-stream">Marbles On Stream</Link>
                    </li>
                 {/*<li>
                      <Link className="navbar-item" to="/games/resurgence">Resurgence</Link>
                    </li>*/}
                  </ul>
                </section>
              </div>
              <div className="column is-6 social">
                <div className="row is-6">
                  <a target="_blank" rel="noopener noreferrer"
                     title="discord" href="https://discord.com/invite/pixelbypixelstudios">
                    <img
                      src={facebook}
                      alt="Discord"
                    />
                  </a>
                  <a target="_blank" rel="noopener noreferrer"
                     title="facebook" href="https://www.facebook.com/PixelbyPixelStudios">
                    <img
                      src={facebook}
                      alt="Facebook"
                    />
                  </a>
                  <a target="_blank" rel="noopener noreferrer"
                     title="twitter" href="https://twitter.com/PixelbyPixelStu">
                    <img
                      src={twitter}
                      alt="Twitter"
                    />
                  </a>
                </div>
                <div className="row is-6">
                  <a target="_blank" rel="noopener noreferrer"
                     title="youtube" href="https://www.youtube.com/c/PixelbyPixelStudios">
                    <img
                      src={facebook}
                      alt="YouTube"
                    />
                  </a>
                  <a target="_blank" rel="noopener noreferrer"
                     title="instagram" href="https://www.instagram.com/pixelbypixelstu/">
                    <img
                      src={instagram}
                      alt="Instagram"
                    />
                  </a>
                  <a target="_blank" rel="noopener noreferrer"
                     title="linkedin" href="https://www.linkedin.com/company/16232821">
                    <img
                      src={facebook}
                      alt="LinkedIn"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="copyright">
              <p>&copy;Pixel By Pixel Studios Inc., 2020</p>
            </div>
          </div>
        </div>
      </StyledFooter>
    )
  }
}

export default Footer
