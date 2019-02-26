// Copyright 2016-2018, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var GFLBModel = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/model/GFLBModel' );
  var GFLBScreenView = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GFLBScreenView' );
  var GravityForceLabKeyboardHelpContent = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabKeyboardHelpContent' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );

  // constants
  var tandem = Tandem.rootTandem;

  // strings
  var gravityForceLabBasicsTitleString = require( 'string!GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics.title' );

  var keyboardHelpContent = new GravityForceLabKeyboardHelpContent( Tandem.rootTandem.createTandem( 'keyboardHelpContent' ) );

  var simOptions = {
    credits: {
      leadDesign: 'Amy Rouinfar',
      softwareDevelopment: 'Michael Barlow, Jesse Greenberg',
      team: 'Ariel Paul, Kathy Perkins',
      qualityAssurance: 'Steele Dalton',
      graphicArts: 'Mariah Hermsmeyer',
      thanks: ''
    },
    keyboardHelpNode: keyboardHelpContent,
    accessibility: true
  };

  SimLauncher.launch( function() {

    var gravityForceLabBasicsScreenTandem = tandem.createTandem( 'gravityForceLabBasicsScreen' );

    var sim = new Sim( gravityForceLabBasicsTitleString,
      [ new Screen(
        function() {
          return new GFLBModel( gravityForceLabBasicsScreenTandem.createTandem( 'model' ) );
        },
        function( model ) {
          return new GFLBScreenView( model, gravityForceLabBasicsScreenTandem.createTandem( 'view' ) );
        },
        { backgroundColorProperty: new Property( '#ffffc2' ), tandem: gravityForceLabBasicsScreenTandem }
      )
      ], simOptions );
    sim.start();
  } );
} );
