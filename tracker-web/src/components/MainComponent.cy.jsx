/* eslint-disable no-undef */

import React from 'react'
import MainComponent from './MainComponent'

describe('<MainComponent />', () => {
  it('renders', () => {
    cy.mount(<MainComponent />)

    cy.viewport(1200,800);

    cy.get('.main').should('be.visible');
    cy.get('.leftPane').should('be.visible');
    cy.get('.leaflet-container').should('be.visible');
  })
})