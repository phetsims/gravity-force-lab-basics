// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var GravityForceLabModel = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/model/GravityForceLabModel' );
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );

  /**
   * @constructor
   */
  function GravityForceLabBasicsModel( tandem ) {
    GravityForceLabModel.call( this, tandem );
  }

  gravityForceLabBasics.register( 'GravityForceLabBasicsModel', GravityForceLabBasicsModel );

  return inherit( GravityForceLabModel, GravityForceLabBasicsModel );
} );