// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var GravityForceLabBasicsModel = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/model/GravityForceLabBasicsModel' );
  var GravityForceLabBasicsScreenView = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GravityForceLabBasicsScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var Property = require( 'AXON/Property' );
  var Color = require( 'SCENERY/util/Color' );

  /**
   * @constructor
   */
  function GravityForceLabBasicsScreen() {
    Screen.call( this,
      function() { return new GravityForceLabBasicsModel(); },
      function( model ) { return new GravityForceLabBasicsScreenView( model ); },
      { backgroundColorProperty: new Property( Color.toColor( 'white' ) ) }
    );
  }

  gravityForceLabBasics.register( 'GravityForceLabBasicsScreen', GravityForceLabBasicsScreen );

  return inherit( Screen, GravityForceLabBasicsScreen );
} );