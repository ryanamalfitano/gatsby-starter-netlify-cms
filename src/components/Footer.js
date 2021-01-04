import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  margin-top: auto;
  
  div.social {
    
    .row {
      margin: 15px 0;
      text-align: right;

      a {

        img {
          width: 40px;
          height: 40px;
          object-fit: cover;
        }
      }
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

    div.social img { filter: invert(100%); }
    
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

  @media screen and (max-width: 768px), print {
    .menu-list,
    div.social .row { text-align: center; }

    .content ul { margin-left: 0; }
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
                      <Link className="navbar-item" to="/about">About Us</Link>
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
                      src="/img/social/icon-discord.webp"
                      alt="Discord"
                    />
                  </a>
                  <a target="_blank" rel="noopener noreferrer"
                     title="facebook" href="https://www.facebook.com/PixelbyPixelStudios">
                    <img
                      src="/img/social/icon-facebook.webp"
                      alt="Facebook"
                    />
                  </a>
                  <a target="_blank" rel="noopener noreferrer"
                     title="twitter" href="https://twitter.com/PixelbyPixelStu">
                    <img
                      src="/img/social/icon-twitter.webp"
                      alt="Twitter"
                    />
                  </a>
                </div>
                <div className="row is-6">
                  <a target="_blank" rel="noopener noreferrer"
                     title="youtube" href="https://www.youtube.com/c/PixelbyPixelStudios">
                    <img
                      src="/img/social/icon-youtube.webp"
                      alt="YouTube"
                    />
                  </a>
                  <a target="_blank" rel="noopener noreferrer"
                     title="instagram" href="https://www.instagram.com/pixelbypixelstu/">
                    <img
                      src="/img/social/icon-instagram.webp"
                      alt="Instagram"
                    />
                  </a>
                  <a target="_blank" rel="noopener noreferrer"
                     title="linkedin" href="https://www.linkedin.com/company/16232821">
                    <img
                      src="/img/social/icon-linkedin.webp"
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
