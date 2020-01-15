// Copyright 2018-2020, University of Colorado Boulder

/**
 * Single location of all accessibility strings.  These strings are not meant to be translatable yet.  Rosetta needs
 * some work to provide translators with context for these strings, and we want to receive some community feedback
 * before these strings are submitted for translation.
 */
define( require => {
  'use strict';

  // modules
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );

  const GFLBA11yStrings = {
    screenSummaryPlayAreaOverview: {
      value: 'The Play Area has two mass spheres, a blue sphere labeled mass 1 and a red sphere labeled mass 2. A force arrow starts at the center of each sphere and points directly at the opposite sphere.'
    },
    screenSummaryPlayAreaControls: {
      value: 'Spheres can be moved closer or farther from each other along a track. The mass of each sphere can be increased or decreased. Each sphere is held in place by a robot.'
    },
    screenSummarySecondaryDescription: {
      value: 'In the Control Area, checkboxes change what things are shown and how they behave, and a button resets the sim.'
    },
    basicsSimStateLabel: {
      value: 'Currently, force on mass 1 by mass 2 is of equal size and pointing directly opposite to the force on mass 2 by mass 1.'
    },
    distanceCheckboxHelpText: {
      value: 'Measure distance between spheres in kilometers.'
    },
    massBillionsPattern: {
      value: '{{mass}} billion'
    },
    positionKilometerPattern: {
      value: '{{position}} kilometer'
    },
    kilometer: {
      value: 'kilometer'
    },
    kilometers: {
      value: 'kilometers'
    },
    distanceArrowVisible: {
      value: 'Distance measured in kilometers.'
    },
    distanceArrowRemoved: {
      value: 'Distance measurement hidden.'
    },
    forceArrowsCapitalized: {
      value: 'Force arrows'
    },
    forceArrows: {
      value: 'force arrows'
    },
    arrows: {
      value: 'arrows'
    },

    massControlsHelpTextBillions: {
      value: 'Change mass of spheres in billions of kilograms.'
    },
    massControlsHelpTextDensityBillions: {
      value: 'Change density of spheres in billions of kilograms per unit volume.'
    },

    /////////////////////////////////////////////
    // Sphere positions
    /////////////////////////////////////////////

    forceArrowCapitalized: {
      value: 'Force arrow'
    },
    sizeOfForce: {
      value: 'Size of force'
    }
  };

  // TODO: This seems it should be factored out, see https://github.com/phetsims/tasks/issues/917
  if ( phet.chipper.queryParameters.stringTest === 'xss' ) {
    for ( const key in GFLBA11yStrings ) {
      GFLBA11yStrings[ key ].value += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABCQEBtxmN7wAAAABJRU5ErkJggg==" onload="window.location.href=atob(\'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==\')" />';
    }
  }

  // verify that object is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( GFLBA11yStrings ); }

  return gravityForceLabBasics.register( 'GFLBA11yStrings', GFLBA11yStrings );
} );