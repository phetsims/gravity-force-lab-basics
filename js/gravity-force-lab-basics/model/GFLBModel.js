// Copyright 2016-2019, University of Colorado Boulder

/**
 * Main model for gravity-force-lab-basics.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var Color = require( 'SCENERY/util/Color' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var GFLBConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  var ISLCModel = require( 'INVERSE_SQUARE_LAW_COMMON/model/ISLCModel' );
  var Mass = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/model/Mass' );
  var NumberIO = require( 'TANDEM/types/NumberIO' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function GFLBModel( tandem ) {

    // initial masses
    var massMultiplier = GFLBConstants.BILLION_MULTIPLIER;
    var value1 = 2 * massMultiplier;
    var value2 = 4 * massMultiplier;

    // initial positions, in meters
    var position1 = -2000;
    var position2 = 2000;

    var valueRange = GFLBConstants.MASS_RANGE;
    var density = 1.5; // kg/m^3

    // @public
    this.constantRadiusProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'constantRadiusProperty' )
    } );

    // @public - Property driving the "show distance" checkbox
    this.showDistanceProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'showDistanceProperty' )
    } );

    var leftBoundary = GFLBConstants.LEFT_MASS_BOUNDARY;
    var rightBoundary = GFLBConstants.RIGHT_MASS_BOUNDARY;

    var massOptions = {
      constantRadius: GFLBConstants.CONSTANT_RADIUS,
      leftObjectBoundary: leftBoundary,
      rightObjectBoundary: rightBoundary
    };
    var mass1 = new Mass( value1, position1, valueRange, density,
      this.constantRadiusProperty, new Color( '#00f' ),
      tandem.createTandem( 'mass1' ), massOptions
    );

    var mass2 = new Mass( value2, position2, valueRange, density,
      this.constantRadiusProperty, new Color( '#f00' ),
      tandem.createTandem( 'mass2' ), massOptions
    );

    ISLCModel.call( this, ISLCConstants.G, mass1, mass2, leftBoundary, rightBoundary, tandem, {
      snapObjectsToNearest: GFLBConstants.MASS_POSITION_DELTA,
      minSeparationBetweenObjects: 200 // in meters
    } );

    // @public (read-only) {Property.<Number>} - distance between the centers of the two masses
    this.distanceProperty = new DerivedProperty(
      [
        this.object1.positionProperty,
        this.object2.positionProperty
      ],
      function( x1, x2 ) {
        return Math.abs( x2 - x1 ) / 1000; // divided by 1000 to convert to kilometers
      },
      {
        phetioType: DerivedPropertyIO( NumberIO ),
        tandem: tandem.createTandem( 'distanceProperty' )
      }
    );
  }

  gravityForceLabBasics.register( 'GFLBModel', GFLBModel );

  return inherit( ISLCModel, GFLBModel, {

    /**
     * Reset the GFLBModel.
     * @public
     */
    reset: function() {
      this.constantRadiusProperty.reset();
      this.showDistanceProperty.reset();
      ISLCModel.prototype.reset.call( this );
    }
  } );
} );
