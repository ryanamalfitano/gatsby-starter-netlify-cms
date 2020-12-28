import React from 'react'
import Layout from '../../components/Layout'
import styled from 'styled-components'

const StyledThanksSection = styled.section`
  text-align: center;
`

export default () => (
  <Layout>
    <StyledThanksSection className="section">
      <div className="container">
        <div className="content">
          <h1>Thank you!</h1>
          <p>We've got your message and we'll respond as soon as possible.</p>
        </div>
      </div>
    </StyledThanksSection>
  </Layout>
)
