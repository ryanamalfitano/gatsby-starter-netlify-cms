import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'
import styled from 'styled-components'

const StyledContactSection = styled.section`
  text-align: center;

  p {
    max-width: 18rem;
    margin: 10px auto;
  }

  form {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    max-width: 50rem;
    margin: 50px auto 0;
    text-align: left;

    .field {
      flex-basis: 100%;

      input, textarea {
        border-radius: 0;
      }

      button[type=submit] {
        text-transform: uppercase;
        font-weight: bold;
      }

      &.name {
        flex-basis: 48%;
      }
    }
  }
`

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  render() {
    return (
      <Layout>
        <StyledContactSection className="section">
          <div className="container">
            <div className="content">
              <h1>Contact Us</h1>
              <p>Have a question or feedback? Want to pitch us a project or just say hi?
                 Drop us a line and we'll get back to you as soon as we can.</p>
              <form
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </div>
                <div className="field name">
                  <div className="control">
                    <input
                      className="input"
                      type={'text'}
                      name={'fname'}
                      onChange={this.handleChange}
                      id={'fname'}
                      required={true}
                      placeholder={'First Name'}
                    />
                  </div>
                </div>
                <div className="field name">
                  <div className="control">
                    <input
                      className="input"
                      type={'text'}
                      name={'lname'}
                      onChange={this.handleChange}
                      id={'lname'}
                      required={true}
                      placeholder={'Last Name'}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type={'email'}
                      name={'email'}
                      onChange={this.handleChange}
                      id={'email'}
                      required={true}
                      placeholder={'Email'}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <textarea
                      className="textarea"
                      name={'message'}
                      onChange={this.handleChange}
                      id={'message'}
                      required={true}
                      placeholder={'Message'}
                    />
                  </div>
                </div>
                <div className="field">
                  <button className="button is-link" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </StyledContactSection>
      </Layout>
    )
  }
}
