// Copyright 2016-2019, University of Colorado Boulder

/**
 * Constants that are shared between the various portions of the Gravity Force Lab simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const Property = require( 'AXON/Property' );
  const Range = require( 'DOT/Range' );

  // constants
  const BILLION_MULTIPLIER = 1000000000;
  const MIN_MASS = 1.00 * BILLION_MULTIPLIER; // kg
  const MAX_MASS = 10.0 * BILLION_MULTIPLIER; // kg
  const MAX_DISTANCE_FROM_CENTER = 4800; // meters, empirically determined boundary for masses

  const GFLBConstants = {
    BACKGROUND_COLOR_PROPERTY: new Property( '#ffffc2' ),
    BILLION_MULTIPLIER: BILLION_MULTIPLIER, // a billion for scaling values (since basics version uses billions of kg)
    MASS_RANGE: new Range( MIN_MASS, MAX_MASS ),
    CONSTANT_RADIUS: 600, // meters
    MIN_DISTANCE_BETWEEN_MASSES: 200, // meters
    PULL_LOCATION_RANGE: new Range( -MAX_DISTANCE_FROM_CENTER, MAX_DISTANCE_FROM_CENTER ),
    MASS_POSITION_DELTA: 100, // in m, masses can move in 0.1 km increments and will snap to these locations
    MASS_STEP_SIZE: 500 // in m, each time the mass is moved with a keyboard
  };

  return gravityForceLabBasics.register( 'GFLBConstants', GFLBConstants );
} );