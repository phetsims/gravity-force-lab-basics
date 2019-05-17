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
  const Range = require( 'DOT/Range' );

  // constants
  const BILLION_MULTIPLIER = 1000000000;
  const MIN_MASS = 1.00 * BILLION_MULTIPLIER; // kg
  const MAX_MASS = 10.0 * BILLION_MULTIPLIER; // kg
  const MIN_FORCE = 35; // N
  const MAX_FORCE = 1070; // N
  const MAX_DISTANCE_FROM_CENTER = 4800; // meters, empirically determined boundary for masses

  const GFLBConstants = {
    BILLION_MULTIPLIER: BILLION_MULTIPLIER, // a billion for scaling values (since basics version uses billions of kg)
    MASS_RANGE: new Range( MIN_MASS, MAX_MASS ),
    PULL_FORCE_RANGE: new Range( MIN_FORCE, MAX_FORCE ), // empirically determined for linear mapping of pull objects
    CONSTANT_RADIUS: 500, // meters
    RIGHT_MASS_BOUNDARY: MAX_DISTANCE_FROM_CENTER,
    LEFT_MASS_BOUNDARY: -MAX_DISTANCE_FROM_CENTER,
    MASS_POSITION_DELTA: 100, // in m, masses can move in 0.1 km increments and will snap to these locations
    MASS_STEP_SIZE: 500 // in m, each time the mass is moved with a keyboard
  };

  return gravityForceLabBasics.register( 'GFLBConstants', GFLBConstants );
} );