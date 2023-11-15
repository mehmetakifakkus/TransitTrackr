/* eslint-disable no-undef */

import React from 'react'
import Navbar from './Navbar'

describe('<Navbar />', () => {
  it('renders', () => {
    cy.mount(<Navbar />)
    cy.get('.navbar').should('contain', 'Simultaneous Route Tracking')

    // desktop
    cy.viewport(1440, 720)
    cy.get('.navbar').should('be.visible')
  })

  it('mobile visibility', () => {
    cy.mount(<Navbar />)

    // ipad-2
    cy.viewport(1080, 800)
    cy.get('.navbar').should('be.visible')

    // iphone se
    cy.viewport(375, 720)
    cy.get('.navbar').should('be.visible')
  })
})