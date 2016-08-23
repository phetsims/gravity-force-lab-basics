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

  // strings
  var gravityForceLabBasicsTitleString = require( 'string!GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics.title' );

  /**
   * @constructor
   */
  function GravityForceLabBasicsScreen() {

    //If this is a single-screen sim, then no icon is necessary.
    //If there are multiple screens, then the icon must be provided here.
    var icon = null;

    Screen.call( this, gravityForceLabBasicsTitleString, icon,
      function() { return new GravityForceLabBasicsModel(); },
      function( model ) { return new GravityForceLabBasicsScreenView( model ); },
      { backgroundColor: 'white' }
    );
  }

  gravityForceLabBasics.register( 'GravityForceLabBasicsScreen', GravityForceLabBasicsScreen );

  return inherit( Screen, GravityForceLabBasicsScreen );
} );