/* eslint-disable no-undef */

// Cypress spec file
describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Tracking').should('be.visible')
  })
})