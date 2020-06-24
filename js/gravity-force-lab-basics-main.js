// Copyright 2016-2020, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import GravityForceLabKeyboardHelpContent from '../../gravity-force-lab/js/view/GravityForceLabKeyboardHelpContent.js';
import ISLCQueryParameters from '../../inverse-square-law-common/js/ISLCQueryParameters.js';
import SpeakerHighlighter from '../../inverse-square-law-common/js/view/SpeakerHighlighter.js';
import webSpeaker from '../../inverse-square-law-common/js/view/webSpeaker.js';
import WebSpeechDialogContent from '../../inverse-square-law-common/js/view/WebSpeechDialogContent.js';
import Screen from '../../joist/js/Screen.js';
import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import GFLBConstants from './GFLBConstants.js';
import gravityForceLabBasicsStrings from './gravityForceLabBasicsStrings.js';
import GFLBModel from './model/GFLBModel.js';
import GFLBScreenView from './view/GFLBScreenView.js';

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
  createOptionsDialogContent: ISLCQueryParameters.selfVoicing ? () => new WebSpeechDialogContent() : null
};

simLauncher.launch( () => {

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

  // initialize prototypal web speech, if requested by query parameter
  if ( ISLCQueryParameters.selfVoicing ) {
    webSpeaker.initialize();

    if ( ISLCQueryParameters.selfVoicing === 'levels' || ISLCQueryParameters.selfVoicing === 'minimalLevels' ) {

      sim.isConstructionCompleteProperty.link( complete => {
        if ( complete ) {

          // for the 'levels' prototype, create and add SpeakerHighlighter, which draws arounds the bounds of things
          // that have self-voicing content
          const screenView = sim.screens[ 0 ].view;
          const highlighter = new SpeakerHighlighter( screenView.shapeHitDetector, webSpeaker );
          sim.rootNode.addChild( highlighter );
        }
      } );
    }
  }
} );