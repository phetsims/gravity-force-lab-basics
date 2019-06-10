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
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GFLBConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBConstants' );
  const ISLCModel = require( 'INVERSE_SQUARE_LAW_COMMON/model/ISLCModel' );
  const Mass = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/model/Mass' );
  const NumberIO = require( 'TANDEM/types/NumberIO' );
  const PhysicalConstants = require( 'PHET_CORE/PhysicalConstants' );

  class GFLBModel extends ISLCModel {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      // initial masses
      const massMultiplier = GFLBConstants.BILLION_MULTIPLIER;
      const value1 = 2 * massMultiplier;
      const value2 = 4 * massMultiplier;

      // initial positions, in meters
      const position1 = -2000;
      const position2 = 2000;

      const valueRange = GFLBConstants.MASS_RANGE;
      const density = 1.5; // kg/m^3

      const constantRadiusProperty = new BooleanProperty( false, {
        tandem: tandem.createTandem( 'constantRadiusProperty' )
      } );

      // Property driving the "show distance" checkbox
      const showDistanceProperty = new BooleanProperty( true, {
        tandem: tandem.createTandem( 'showDistanceProperty' )
      } );

      const massOptions = {
        constantRadius: GFLBConstants.CONSTANT_RADIUS,
        leftObjectBoundary: GFLBConstants.PULL_LOCATION_RANGE.min,
        rightObjectBoundary: GFLBConstants.PULL_LOCATION_RANGE.max
      };
      const mass1 = new Mass( value1, position1, valueRange, density,
        constantRadiusProperty, new Color( '#00f' ),
        tandem.createTandem( 'mass1' ), massOptions
      );

      const mass2 = new Mass( value2, position2, valueRange, density,
        constantRadiusProperty, new Color( '#f00' ),
        tandem.createTandem( 'mass2' ), massOptions
      );

      super( PhysicalConstants.GRAVITATIONAL_CONSTANT, mass1, mass2, GFLBConstants.PULL_LOCATION_RANGE, tandem, {
        snapObjectsToNearest: GFLBConstants.MASS_POSITION_DELTA,
        minSeparationBetweenObjects: 200 // in meters
      } );

      // @public
      this.constantRadiusProperty = constantRadiusProperty;
      this.showDistanceProperty = showDistanceProperty;

      // @public (read-only) {Property.<Number>} - distance between the centers of the two masses
      this.distanceProperty = new DerivedProperty(
        [ this.object1.positionProperty, this.object2.positionProperty ],
        ( x1, x2 ) => Math.abs( x2 - x1 ) / 1000, // divided by 1000 to convert to kilometers
        {
          phetioType: DerivedPropertyIO( NumberIO ),
          tandem: tandem.createTandem( 'distanceProperty' )
        }
      );
    }

    /**
     * Reset the GFLBModel.
     * @public
     */
    reset() {
      this.constantRadiusProperty.reset();
      this.showDistanceProperty.reset();
      super.reset();
    }
  }

  return gravityForceLabBasics.register( 'GFLBModel', GFLBModel );
} );
