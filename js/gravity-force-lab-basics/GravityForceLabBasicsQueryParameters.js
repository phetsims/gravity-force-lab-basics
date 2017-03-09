// Copyright 2016, University of Colorado Boulder

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
    showGrid: { type: 'flag' }
  } );

  gravityForceLabBasics.register( 'GravityForceLabBasicsQueryParameters', GravityForceLabBasicsQueryParameters );

  return GravityForceLabBasicsQueryParameters;
} );
