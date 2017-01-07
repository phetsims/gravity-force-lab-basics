// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var GravityForceLabModel = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/model/GravityForceLabModel' );
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var GravityForceLabBasicsConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsConstants' );

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
      massRange: GravityForceLabBasicsConstants.MASS_RANGE,

      // boundaries for locations of the masses in meters
      leftMassBoundary: GravityForceLabBasicsConstants.LEFT_MASS_BOUNDARY,
      rightMassBoundary: GravityForceLabBasicsConstants.RIGHT_MASS_BOUNDARY
    };
    GravityForceLabModel.call( this, mass1, mass2 , position1, position2, tandem.createTandem( 'gravityForceLabBasicsModel' ), modelOptions );

    // @public @override

  }

  gravityForceLabBasics.register( 'GravityForceLabBasicsModel', GravityForceLabBasicsModel );

  return inherit( GravityForceLabModel, GravityForceLabBasicsModel );
} );