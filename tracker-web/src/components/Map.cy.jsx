/* eslint-disable no-undef */

import React from 'react'
import { Map } from './Map'

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
  },
  steps:[
    {
        "lat": 37.41033381213069,
        "lng": -121.95613605712612,
    },
    {
        "lat": 37.41928,
        "lng": -121.96361,
    },
    {
        "lat": 37.40138,
        "lng": -122.03394,
    },
    {
        "lat": 37.3844,
        "lng": -122.06956,
    },
    {
        "lat": 37.36619,
        "lng": -122.06357,
    },
    {
        "lat": 37.33613,
        "lng": -122.05915,
    },
    {
        "lat": 37.30902,
        "lng": -122.04187,
    },
    {
        "lat": 37.28784,
        "lng": -122.03256,
    },
    {
        "lat": 37.27322,
        "lng": -122.0433,
    },
    {
        "lat": 37.26736,
        "lng": -122.05004,
    },
    {
        "lat": 37.25789,
        "lng": -122.05558,
    },
    {
        "lat": 37.25252,
        "lng": -122.06068,
    },
    {
        "lat": 37.24812,
        "lng": -122.06991,
    },
    {
        "lat": 37.25171,
        "lng": -122.08558,
    },
    {
        "lat": 37.26,
        "lng": -122.09655,
    },
    {
        "lat": 37.25937,
        "lng": -122.0995,
    },
    {
        "lat": 37.2559,
        "lng": -122.10941,
    },
    {
        "lat": 37.26063,
        "lng": -122.10955,
    },
    {
        "lat": 37.25655,
        "lng": -122.11574,
    },
    {
        "lat": 37.25934,
        "lng": -122.12606,
    },
    {
        "lat": 37.27423739756135,
        "lng": -122.13179675269143,
    }
]
}

describe('<Map />', () => {
  it('renders-desktop', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Map locationUpdates={[route, route, route]}/>)
    
    // desktop
    cy.viewport(1440, 900)
    cy.get('.leaflet-container').should('be.visible')
  })

  it('renders-mobile', () => {
    cy.mount(<Map locationUpdates={[route, route, route]}/>)
  
    // iphone se
    cy.viewport(375, 800)
    cy.get('.leaflet-container').should('be.visible')
  })
})