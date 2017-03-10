// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var InverseSquareLawModel = require( 'INVERSE_SQUARE_LAW_COMMON/model/InverseSquareLawModel' );
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var GravityForceLabBasicsConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsConstants' );
  var InverseSquareLawModes = require( 'INVERSE_SQUARE_LAW_COMMON/InverseSquareLawModes' );

  /**
   * @constructor
   */
  function GravityForceLabBasicsModel( tandem ) {

    // initial masses
    var massMultiplier = GravityForceLabBasicsConstants.BILLION_MULTIPLIER;
    var mass1 = 2 * massMultiplier;
    var mass2 = 4 * massMultiplier;

    // initial positions
    var position1 = -2000;
    var position2 = 2000;

    var modelOptions = {
      massDensity: 1.5, // kg/m^3
      massConstantRadius: 500, // m

      valueRange: GravityForceLabBasicsConstants.MASS_RANGE,

      // boundaries for locations of the masses in meters
      leftObjectBoundary: GravityForceLabBasicsConstants.LEFT_MASS_BOUNDARY,
      rightObjectBoundary: GravityForceLabBasicsConstants.RIGHT_MASS_BOUNDARY,

      snapToNearest: GravityForceLabBasicsConstants.MASS_POSITION_DELTA,
      minSeparationBetweenObjects: GravityForceLabBasicsConstants.MASS_POSITION_DELTA
    };

    // leverage InverseSquareLawModel, in "Mass" mode
    InverseSquareLawModel.call( this, InverseSquareLawModes.MASS, mass1, mass2, position1, position2, tandem.createTandem( 'gravityForceLabBasicsModel' ), modelOptions );

    // @public @override

  }

  gravityForceLabBasics.register( 'GravityForceLabBasicsModel', GravityForceLabBasicsModel );

  return inherit( InverseSquareLawModel, GravityForceLabBasicsModel );
} );