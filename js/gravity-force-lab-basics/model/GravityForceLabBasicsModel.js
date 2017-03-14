// Copyright 2016, University of Colorado Boulder

/**
 * Main model for gravity-force-lab-basics.
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var InverseSquareLawModel = require( 'INVERSE_SQUARE_LAW_COMMON/model/InverseSquareLawModel' );
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var GravityForceLabBasicsConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsConstants' );
  var Property = require( 'AXON/Property' );
  var InverseSquareLawCommonConstants = require( 'INVERSE_SQUARE_LAW_COMMON/InverseSquareLawCommonConstants' );
  var Mass = require( 'INVERSE_SQUARE_LAW_COMMON/model/Mass' );
  var Color = require( 'SCENERY/util/Color' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );

  /**
   * @constructor
   * @param {Tandem} tandem
   */
  function GravityForceLabBasicsModel( tandem ) {

    // initial masses
    var massMultiplier = GravityForceLabBasicsConstants.BILLION_MULTIPLIER;
    var value1 = 2 * massMultiplier;
    var value2 = 4 * massMultiplier;

    // initial positions
    var position1 = -2000;
    var position2 = 2000;

    var valueRange = GravityForceLabBasicsConstants.MASS_RANGE;
    var density = 1.5; // kg/m^3

    // @public
    // TODO: Should this be in InverseSquareLawCommonModel?
    this.constantRadiusProperty = new Property( false, {
      tandem: tandem.createTandem( 'constantRadiusProperty' ),
      phetioValueType: TBoolean
    } );

    // TODO: Should these be in inverse-square-law-common?
    var baseColor1 = new Color( '#00f' );
    var baseColor2 = new Color( '#f00' );

    var mass1 = new Mass( value1, position1, valueRange, density, this.constantRadiusProperty, baseColor1, tandem );
    var mass2 = new Mass( value2, position2, valueRange, density, this.constantRadiusProperty, baseColor2, tandem );

    var leftBoundary = GravityForceLabBasicsConstants.LEFT_MASS_BOUNDARY;
    var rightBoundary = GravityForceLabBasicsConstants.RIGHT_MASS_BOUNDARY;

    InverseSquareLawModel.call( this, InverseSquareLawCommonConstants.G, mass1, mass2, leftBoundary, rightBoundary, tandem.createTandem( 'gravityForceLabBasicsModel' ) );

  }

  gravityForceLabBasics.register( 'GravityForceLabBasicsModel', GravityForceLabBasicsModel );

  return inherit( InverseSquareLawModel, GravityForceLabBasicsModel );
} );