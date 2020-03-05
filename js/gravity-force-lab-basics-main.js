// Copyright 2016-2020, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import GravityForceLabKeyboardHelpContent from '../../gravity-force-lab/js/view/GravityForceLabKeyboardHelpContent.js';
import Screen from '../../joist/js/Screen.js';
import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import GFLBConstants from './GFLBConstants.js';
import gravityForceLabBasicsStrings from './gravity-force-lab-basics-strings.js';
import webSpeaker from '../../inverse-square-law-common/js/view/webSpeaker.js';
import GFLBModel from './model/GFLBModel.js';
import GFLBScreenView from './view/GFLBScreenView.js';
import ISLCQueryParameters from '../../inverse-square-law-common/js/ISLCQueryParameters.js';
import WebSpeechDialogContent from '../../inverse-square-law-common/js/view/WebSpeechDialogContent.js';

// constants
const tandem = Tandem.ROOT;

const gravityForceLabBasicsTitleString = gravityForceLabBasicsStrings[ 'gravity-force-lab-basics' ].title;

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
  accessibility: true,

  createOptionsDialogContent: ISLCQueryParameters.selfVoicing ? () => new WebSpeechDialogContent() : null
};

SimLauncher.launch( () => {

  const gravityForceLabBasicsScreenTandem = tandem.createTandem( 'gravityForceLabBasicsScreen' );


  // initialize prototypal web speech, if requested by query parameter
  if ( ISLCQueryParameters.selfVoicing ) {
    webSpeaker.initialize();
  }

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