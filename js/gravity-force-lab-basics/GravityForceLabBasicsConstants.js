// Copyright 2016, University of Colorado Boulder

/**
 * Constants that are shared between the various portions of the Gravity Force Lab simulation.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var Range = require( 'DOT/Range' );

  // constants
  var MIN_MASS = 1; // kg
  var MAX_MASS = 1000; // kg
  var MAX_DISTANCE_FROM_CENTER = 7.48; // meters, empirically determined boundary for masses

  var GravityForceLabBasicsConstants = {
    MIN_MASS: MIN_MASS,
    MAX_MASS: MAX_MASS,
    RIGHT_MASS_BOUNDARY: MAX_DISTANCE_FROM_CENTER,
    LEFT_MASS_BOUNDARY: -MAX_DISTANCE_FROM_CENTER,
    MASS_RANGE: new Range( MIN_MASS, MAX_MASS )
  };

  gravityForceLabBasics.register( 'GravityForceLabBasicsConstants', GravityForceLabBasicsConstants );

  return GravityForceLabBasicsConstants;
} );