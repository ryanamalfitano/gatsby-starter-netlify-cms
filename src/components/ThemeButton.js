import React from 'react'
import styled from 'styled-components'

const StyledThemeButton = styled.button`
  position: fixed;
  top: 8px;
  left: 8px;

  padding: 4px 6px;

  font-size: 0.65rem;
  color: inherit;
  background: none;
  cursor: pointer;

  z-index: 31;

  &.light {
    border: 1px solid ${props => props.theme.black};
  }

  &.dark {
    border: 1px solid ${props => props.theme.white};
  }
`

const ThemeButton = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lightingIsDark: props.currentTheme,
    }
  }

  toggleTheme = () => {
    // Toggle the theme boolean in the state (light = true, dark = false).
    this.setState(
      {
        lightingIsDark: !this.state.lightingIsDark,
      },
      // After the state has been updated,
      () => {
        // set the prop accordingly for the Layout to pull.
        this.state.lightingIsDark
          ? this.props.onThemeChange('dark')
          : this.props.onThemeChange('light')
      }
    )
  }

  render() {
    let lightingClass = "";
    this.state.lightingIsDark ? lightingClass = "dark" : lightingClass = "light";

    return (
      <StyledThemeButton
        className={`navbar-item ${lightingClass}`}
        id="change-theme"
        onClick={() => this.toggleTheme()}
        onKeyDown={() => this.toggleTheme()}
        role="button"
        tabIndex="0">
          Change Theme
      </StyledThemeButton>
    )
  }
}

export default ThemeButton
