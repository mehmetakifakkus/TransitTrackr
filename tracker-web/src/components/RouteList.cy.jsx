/* eslint-disable no-undef */

import React from 'react'
import RouteList from './RouteList'

const route = {
  id: "655336d3b88a2e9de88f6e2a",
  name: "Route 1",
  currentStep: 15,
  coordinate: {
      lat: 37.25937,
      lng: -122.0995,
  },
  percentage: 71,
  origin: {
      lat: 37.41033381213069,
      lng: -121.95613605712612
  }
}

describe('<RouteList />', () => {

  it('renders-start', () => {
    cy.mount(<RouteList locationUpdates={[route]} socket={null}/>)
    cy.get("[data-testid=start-route]").should('be.visible')
  }); 

  it('renders-desktop', () => {
    cy.mount(<RouteList locationUpdates={[route]} socket={null}/>)
    
    // desktop
    cy.viewport(1440, 900)
    cy.get('.routeItem').should('be.visible')
  })

  it('renders-mobile', () => {    
    cy.mount(<RouteList locationUpdates={[route]} socket={null}/>)
    // iphone se
    cy.viewport(375, 800)
    cy.get('.routeItem').should('be.visible')
  })

  it('renders-multiple-routelist', () => {
    cy.mount(<RouteList locationUpdates={[route, route, route]} socket={null}/>)
    
    // desktop
    cy.viewport(1440, 900)
    cy.get('.routeItem').should('be.visible')
    cy.get('.routeItem').should('have.length', 3)
  })

})