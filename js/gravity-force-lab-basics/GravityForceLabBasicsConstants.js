// Copyright 2016-2018, University of Colorado Boulder

/**
 * Constants that are shared between the various portions of the Gravity Force Lab simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var Range = require( 'DOT/Range' );

  // constants
  var BILLION_MULTIPLIER = 1000000000;
  var MIN_MASS = 1.00 * BILLION_MULTIPLIER; // kg
  var MAX_MASS = 10.0 * BILLION_MULTIPLIER; // kg
  var MAX_DISTANCE_FROM_CENTER = 4800; // meters, empirically determined boundary for masses

  var GravityForceLabBasicsConstants = {
    BILLION_MULTIPLIER: BILLION_MULTIPLIER, // a billion for scaling values (since basics version uses billions of kg)
    MASS_RANGE: new Range( MIN_MASS, MAX_MASS ),
    CONSTANT_RADIUS: 500, // meters
    RIGHT_MASS_BOUNDARY: MAX_DISTANCE_FROM_CENTER,
    LEFT_MASS_BOUNDARY: -MAX_DISTANCE_FROM_CENTER,
    MASS_POSITION_DELTA: 100 // in m, masses can move in 0.1 km increments and will snap to these locations
  };

  gravityForceLabBasics.register( 'GravityForceLabBasicsConstants', GravityForceLabBasicsConstants );

  return GravityForceLabBasicsConstants;
} );