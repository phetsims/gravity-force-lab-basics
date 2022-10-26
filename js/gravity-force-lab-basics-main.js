// Copyright 2016-2022, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import GravityForceLabKeyboardHelpContent from '../../gravity-force-lab/js/view/GravityForceLabKeyboardHelpContent.js';
import Screen from '../../joist/js/Screen.js';
import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import GFLBConstants from './GFLBConstants.js';
import GravityForceLabBasicsStrings from './GravityForceLabBasicsStrings.js';
import GFLBModel from './model/GFLBModel.js';
import GFLBScreenView from './view/GFLBScreenView.js';

// constants
const tandem = Tandem.ROOT;

const gravityForceLabBasicsTitleStringProperty = GravityForceLabBasicsStrings[ 'gravity-force-lab-basics' ].titleStringProperty;

const simOptions = {
  credits: {
    leadDesign: 'Amy Rouinfar',
    softwareDevelopment: 'Michael Barlow, John Blanco, Jesse Greenberg, Michael Kauzmann',
    team: 'Ariel Paul, Kathy Perkins, Emily B. Moore, Taliesin Smith, Brianna Tomlinson',
    qualityAssurance: 'Logan Bray, Steele Dalton, Megan Lai, Brooklyn Lash, Emily Miller, Liam Mulhall, Laura Rea, Jacob Romero, Nancy Salpepi, and Kathryn Woessner',
    graphicArts: 'Mariah Hermsmeyer',
    soundDesign: 'Ashton Morris',
    thanks: ''
  }
};

simLauncher.launch( () => {

  const gravityForceLabBasicsScreenTandem = tandem.createTandem( 'gravityForceLabBasicsScreen' );

  const sim = new Sim( gravityForceLabBasicsTitleStringProperty,
    [ new Screen(
      () => new GFLBModel( gravityForceLabBasicsScreenTandem.createTandem( 'model' ) ),
      model => new GFLBScreenView( model, gravityForceLabBasicsScreenTandem.createTandem( 'view' ) ),
      {
        backgroundColorProperty: GFLBConstants.BACKGROUND_COLOR_PROPERTY,
        tandem: gravityForceLabBasicsScreenTandem,
        createKeyboardHelpNode: () => new GravityForceLabKeyboardHelpContent( {
          isBasics: true // in basics, there is no way to change the mass in smaller steps
        } )
      }
    )
    ], simOptions );
  sim.start();

} );