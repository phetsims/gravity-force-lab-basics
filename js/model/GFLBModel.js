// Copyright 2016-2021, University of Colorado Boulder

/**
 * Main model for gravity-force-lab-basics.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import Mass from '../../../gravity-force-lab/js/model/Mass.js';
import ISLCModel from '../../../inverse-square-law-common/js/model/ISLCModel.js';
import PhysicalConstants from '../../../phet-core/js/PhysicalConstants.js';
import { Color } from '../../../scenery/js/imports.js';
import GFLBConstants from '../GFLBConstants.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';

// constants
const INITIAL_VALUE_1 = 2 * GFLBConstants.BILLION_MULTIPLIER;
const INITIAL_VALUE_2 = 4 * GFLBConstants.BILLION_MULTIPLIER;

const INITIAL_POTISION_1 = -2000;
const INITIAL_POTISION_2 = 2000;

const VALUE_RANGE = GFLBConstants.MASS_RANGE;
const DENSITY = GFLBConstants.MASS_DENSITY;

const MASS_OPTIONS = {
  constantRadius: GFLBConstants.CONSTANT_RADIUS,
  leftObjectBoundary: GFLBConstants.PULL_POSITION_RANGE.min,
  rightObjectBoundary: GFLBConstants.PULL_POSITION_RANGE.max
};

class GFLBModel extends ISLCModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    // The Properties need to be passed to the Mass constructors, so store as local variables for now.
    const constantRadiusProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'constantRadiusProperty' )
    } );

    // Property driving the "show distance" checkbox
    const showDistanceProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'showDistanceProperty' )
    } );

    const mass1 = new Mass( INITIAL_VALUE_1, INITIAL_POTISION_1, VALUE_RANGE, DENSITY,
      constantRadiusProperty, new Color( '#00f' ),
      tandem.createTandem( 'mass1' ), MASS_OPTIONS
    );

    const mass2 = new Mass( INITIAL_VALUE_2, INITIAL_POTISION_2, VALUE_RANGE, DENSITY,
      constantRadiusProperty, new Color( '#f00' ),
      tandem.createTandem( 'mass2' ), MASS_OPTIONS
    );

    super( PhysicalConstants.GRAVITATIONAL_CONSTANT, mass1, mass2, GFLBConstants.PULL_POSITION_RANGE, tandem, {
      snapObjectsToNearest: GFLBConstants.MASS_POSITION_DELTA,
      minSeparationBetweenObjects: GFLBConstants.MIN_DISTANCE_BETWEEN_MASSES
    } );

    // @public
    this.constantRadiusProperty = constantRadiusProperty;
    this.showDistanceProperty = showDistanceProperty;

    // @public (read-only) - true when a reset is in progress
    this.resetInProgressProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'resetInProgressProperty' )
    } );
  }

  /**
   * Reset the GFLBModel.
   * @public
   */
  reset() {
    this.resetInProgressProperty.set( true );
    this.constantRadiusProperty.reset();
    this.showDistanceProperty.reset();
    super.reset();
    this.resetInProgressProperty.set( false );
  }
}

gravityForceLabBasics.register( 'GFLBModel', GFLBModel );
export default GFLBModel;