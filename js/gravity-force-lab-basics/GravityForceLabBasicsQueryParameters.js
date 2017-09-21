// Copyright 2017, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );

  var GravityForceLabBasicsQueryParameters = QueryStringMachine.getAll( {

    // shows a grid that represents the possible locations for the masses in this sim
    // masses are restricted to being placed along this grid and will snap to the lines
    // shown
    showGrid: { type: 'flag' },

    // Shows boundary positions of the two masses, as solid green lines.  The boundary positions for each
    // object will change depending on the size and position of both objects.
    showDragBounds: { type: 'flag' },

    // for development - add a slider to the screen view allows one to slide view the latest mockup
    // overlayed above the sim.
    mockup: { type: 'flag' }
  } );

  gravityForceLabBasics.register( 'GravityForceLabBasicsQueryParameters', GravityForceLabBasicsQueryParameters );

  return GravityForceLabBasicsQueryParameters;
} );
