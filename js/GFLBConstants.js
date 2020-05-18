// Copyright 2016-2020, University of Colorado Boulder

/**
 * Constants that are shared between the various portions of the Gravity Force Lab simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Property from '../../axon/js/Property.js';
import Range from '../../dot/js/Range.js';
import Mass from '../../gravity-force-lab/js/model/Mass.js';
import gravityForceLabBasics from './gravityForceLabBasics.js';

// constants
const BILLION_MULTIPLIER = 1000000000;
const MIN_MASS = 1.00 * BILLION_MULTIPLIER; // kg
const MAX_MASS = 10.0 * BILLION_MULTIPLIER; // kg
const MAX_DISTANCE_FROM_CENTER = 5000; // meters, empirically determined boundary for masses
const MASS_DENSITY = 1.5; // kg/m^3

const GFLBConstants = {
  BACKGROUND_COLOR_PROPERTY: new Property( '#ffffc2' ),
  BILLION_MULTIPLIER: BILLION_MULTIPLIER, // a billion for scaling values (since basics version uses billions of kg)
  MASS_RANGE: new Range( MIN_MASS, MAX_MASS ),
  MASS_DENSITY: MASS_DENSITY,
  CONSTANT_RADIUS: Mass.calculateRadius( MIN_MASS, MASS_DENSITY ), // meters
  MIN_DISTANCE_BETWEEN_MASSES: 200, // meters
  PULL_POSITION_RANGE: new Range( -MAX_DISTANCE_FROM_CENTER, MAX_DISTANCE_FROM_CENTER ),
  MASS_POSITION_DELTA: 100, // in m, masses can move in 0.1 km increments and will snap to these positions
  MASS_STEP_SIZE: 500 // in m, each time the mass is moved with a keyboard
};

gravityForceLabBasics.register( 'GFLBConstants', GFLBConstants );
export default GFLBConstants;