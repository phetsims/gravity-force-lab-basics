// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );

  /**
   * @constructor
   */
  function GravityForceLabBasicsModel() {

    PropertySet.call( this, {
      //TODO
    } );
  }

  gravityForceLabBasics.register( 'GravityForceLabBasicsModel', GravityForceLabBasicsModel );

  return inherit( PropertySet, GravityForceLabBasicsModel, {

    //TODO Called by the animation loop. Optional, so if your model has no animation, please delete this.
    // @public
    step: function( dt ) {
      //TODO Handle model animation here.
    }
  } );
} );