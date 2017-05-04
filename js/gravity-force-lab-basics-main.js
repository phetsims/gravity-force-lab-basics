// Copyright 2016, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var Sim = require( 'JOIST/Sim' );
  var Property = require( 'AXON/Property' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Screen = require( 'JOIST/Screen' );
  var Tandem = require( 'TANDEM/Tandem' );
  var GravityForceLabBasicsModel = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/model/GravityForceLabBasicsModel' );
  var GravityForceLabBasicsScreenView = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GravityForceLabBasicsScreenView' );

  // constants
  var tandem = Tandem.createRootTandem();

  // strings
  var gravityForceLabBasicsTitleString = require( 'string!GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics.title' );

  var simOptions = {
    credits: {
      //TODO fill in proper credits, all of these fields are optional, see joist.AboutDialog
      leadDesign: '',
      softwareDevelopment: '',
      team: '',
      qualityAssurance: '',
      graphicArts: '',
      thanks: ''
    }
  };

  SimLauncher.launch( function() {

    var gravityForceLabBasicsScreenTandem = tandem.createTandem( 'gravityForceLabBasicsScreen' );

    var sim = new Sim( gravityForceLabBasicsTitleString,
      [ new Screen(
          function() {
            return new GravityForceLabBasicsModel( gravityForceLabBasicsScreenTandem.createTandem( 'model' ) );
          },
          function( model ) {
            return new GravityForceLabBasicsScreenView( model, gravityForceLabBasicsScreenTandem.createTandem( 'view' ) );
          },
          { backgroundColorProperty: new Property( '#ffffc2' ), tandem: gravityForceLabBasicsScreenTandem }
        )
      ], simOptions );
    sim.start();
  } );
} );
