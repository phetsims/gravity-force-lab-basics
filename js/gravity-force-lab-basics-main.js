// Copyright 2016-2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const GFLBConstants = require( 'GRAVITY_FORCE_LAB_BASICS/GFLBConstants' );
  const GFLBModel = require( 'GRAVITY_FORCE_LAB_BASICS/model/GFLBModel' );
  const GFLBScreenView = require( 'GRAVITY_FORCE_LAB_BASICS/view/GFLBScreenView' );
  const GravityForceLabKeyboardHelpContent = require( 'GRAVITY_FORCE_LAB/view/GravityForceLabKeyboardHelpContent' );
  const Screen = require( 'JOIST/Screen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const Tandem = require( 'TANDEM/Tandem' );

  // constants
  const tandem = Tandem.ROOT;

  // strings
  const gravityForceLabBasicsTitleString = require( 'string!GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics.title' );

  const keyboardHelpContent = new GravityForceLabKeyboardHelpContent( {
    isBasics: true // in basics, there is no way to change the mass in smaller steps
  } );

  const simOptions = {
    credits: {
      leadDesign: 'Amy Rouinfar',
      softwareDevelopment: 'Michael Barlow, John Blanco, Jesse Greenberg, Michael Kauzmann',
      team: 'Ariel Paul, Kathy Perkins, Emily B. Moore, Taliesin Smith, Brianna Tomlinson',
      qualityAssurance: 'Logan Bray, Steele Dalton, Megan Lai, Liam Mulhall, Laura Rea, Jacob Romero, and Kathryn Woessner',
      graphicArts: 'Mariah Hermsmeyer',
      soundDesign: 'Ashton Morris',
      thanks: ''
    },
    keyboardHelpNode: keyboardHelpContent,
    accessibility: true
  };

  SimLauncher.launch( () => {

    const gravityForceLabBasicsScreenTandem = tandem.createTandem( 'gravityForceLabBasicsScreen' );

    const sim = new Sim( gravityForceLabBasicsTitleString,
      [ new Screen(
        () => new GFLBModel( gravityForceLabBasicsScreenTandem.createTandem( 'model' ) ),
        model => new GFLBScreenView( model, gravityForceLabBasicsScreenTandem.createTandem( 'view' ) ),
        {
          backgroundColorProperty: GFLBConstants.BACKGROUND_COLOR_PROPERTY,
          tandem: gravityForceLabBasicsScreenTandem
        }
      )
      ], simOptions );
    sim.start();
  } );
} );
