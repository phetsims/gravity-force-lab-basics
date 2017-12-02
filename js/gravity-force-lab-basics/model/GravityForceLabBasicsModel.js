// Copyright 2016-2017, University of Colorado Boulder

/**
 * Main model for gravity-force-lab-basics.
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var GravityForceLabBasicsConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  var ISLCModel = require( 'INVERSE_SQUARE_LAW_COMMON/model/ISLCModel' );
  var Mass = require( 'INVERSE_SQUARE_LAW_COMMON/model/Mass' );
  var Property = require( 'AXON/Property' );
  var PropertyIO = require( 'AXON/PropertyIO' );

  // phet-io modules
  var BooleanIO = require( 'ifphetio!PHET_IO/types/BooleanIO' );

  /**
   * @constructor
   * @param {Tandem} tandem
   */
  function GravityForceLabBasicsModel( tandem ) {

    // initial masses
    var massMultiplier = GravityForceLabBasicsConstants.BILLION_MULTIPLIER;
    var value1 = 2 * massMultiplier;
    var value2 = 4 * massMultiplier;

    // initial positions, in meters
    var position1 = -2000;
    var position2 = 2000;

    var valueRange = GravityForceLabBasicsConstants.MASS_RANGE;
    var density = 1.5; // kg/m^3

    // @public
    // TODO: Should this be in InverseSquareLawCommonModel?
    this.constantRadiusProperty = new Property( false, {
      tandem: tandem.createTandem( 'constantRadiusProperty' ),
      phetioType: PropertyIO( BooleanIO )
    } );

    // @public
    this.showDistanceProperty = new Property( true, {
      tandem: tandem.createTandem( 'showDistanceProperty' ),
      phetioType: PropertyIO( BooleanIO )
    } );

    // TODO: Should these be in inverse-square-law-common?
    var baseColor1 = new Color( '#00f' );
    var baseColor2 = new Color( '#f00' );

    var leftBoundary = GravityForceLabBasicsConstants.LEFT_MASS_BOUNDARY;
    var rightBoundary = GravityForceLabBasicsConstants.RIGHT_MASS_BOUNDARY;

    var massOptions = {
      constantRadius: GravityForceLabBasicsConstants.CONSTANT_RADIUS,
      leftObjectBoundary: leftBoundary,
      rightObjectBoundary: rightBoundary
    };
    var mass1 = new Mass( value1, position1, valueRange, density, this.constantRadiusProperty, baseColor1, tandem.createTandem( 'mass1'), massOptions );
    var mass2 = new Mass( value2, position2, valueRange, density, this.constantRadiusProperty, baseColor2, tandem.createTandem( 'mass2'), massOptions );

    ISLCModel.call( this, ISLCConstants.G, mass1, mass2, leftBoundary, rightBoundary, tandem, {
      snapObjectsToNearest: GravityForceLabBasicsConstants.MASS_POSITION_DELTA,
      minSeparationBetweenObjects: 200 // in meters
    } );

  }

  gravityForceLabBasics.register( 'GravityForceLabBasicsModel', GravityForceLabBasicsModel );

  return inherit( ISLCModel, GravityForceLabBasicsModel, {

    /**
     * Reset the GravityForceLabBasicsModel.
     * @public
     */
    reset: function() {
      this.constantRadiusProperty.reset();
      this.showDistanceProperty.reset();
      ISLCModel.prototype.reset.call( this );
    }
  } );
} );