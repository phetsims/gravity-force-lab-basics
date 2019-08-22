// Copyright 2016-2019, University of Colorado Boulder

/**
 * Main model for gravity-force-lab-basics.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Color = require( 'SCENERY/util/Color' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GFLBConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBConstants' );
  const ISLCModel = require( 'INVERSE_SQUARE_LAW_COMMON/model/ISLCModel' );
  const Mass = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/model/Mass' );
  const PhysicalConstants = require( 'PHET_CORE/PhysicalConstants' );

  // constants
  const INITIAL_VALUE_1 = 2 * GFLBConstants.BILLION_MULTIPLIER;
  const INITIAL_VALUE_2 = 4 * GFLBConstants.BILLION_MULTIPLIER;

  const INITIAL_POTISION_1 = -2000;
  const INITIAL_POTISION_2 = 2000;

  const VALUE_RANGE = GFLBConstants.MASS_RANGE;
  const DENSITY = 1.5; // kg/m^3

  const MASS_OPTIONS = {
    constantRadius: GFLBConstants.CONSTANT_RADIUS,
    leftObjectBoundary: GFLBConstants.PULL_LOCATION_RANGE.min,
    rightObjectBoundary: GFLBConstants.PULL_LOCATION_RANGE.max
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

      super( PhysicalConstants.GRAVITATIONAL_CONSTANT, mass1, mass2, GFLBConstants.PULL_LOCATION_RANGE, tandem, {
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

  return gravityForceLabBasics.register( 'GFLBModel', GFLBModel );
} );
