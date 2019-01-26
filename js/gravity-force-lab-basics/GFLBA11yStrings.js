// Copyright 2018, University of Colorado Boulder

/**
 * Single location of all accessibility strings.  These strings are not meant to be translatable yet.  Rosetta needs
 * some work to provide translators with context for these strings, and we want to receive some community feedback
 * before these strings are submitted for translation.
 */

define( function( require ) {
  'use strict';

  // modules
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );

  var GFLBA11yStrings = {
    screenSummaryMainDescription: {
      value: 'The Play Area has a blue sphere labeled Mass 1 and a red sphere labeled Mass 2. A force arrow starts at the center of each sphere and points directly at the opposite sphere. Spheres can be moved closer or farther from one another The mass of each sphere can be increased or decreased. Each sphere is held in place by a robot.'
    },
    screenSummarySecondaryDescription: {
      value: 'In the Control Area, checkboxes change what things are shown and how they behave, and a button resets the sim.'
    },
    basicsSimStateLabel: {
      value: 'Currently, force on mass 1 by mass 2 is of equal size and pointing directly opposite to the force on mass 2 by mass 1.'
    },
    massReadoutPattern: {
      value: '{{value}} billion kg'
    },
    massesDistanceApartPattern: {
      value: 'Masses are {{distance}} km apart.'
    },
    spherePositionsDescriptionPattern: {
      value: '{{distanceApart}} {{spherePositionsHelpText}}'
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
    mass1Mass2QualitativeDistancePattern: {
      value: '{{mass1}} and {{mass2}} are {{qualitativeDistance}} each other.'
    },
    distanceArrowVisible: {
      value: 'Distance shown in kilometers.'
    },
    distanceArrowRemoved: {
      value: 'Distance hidden.'
    },
    forceArrows: {
      value: 'Force arrows'
    },
    arrows: {
      value: 'arrows'
    }
  };

  // TODO: This seems it should be factored out, see https://github.com/phetsims/tasks/issues/917
  if ( phet.chipper.queryParameters.stringTest === 'xss' ) {
    for ( var key in GFLBA11yStrings ) {
      GFLBA11yStrings[ key ].value += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABCQEBtxmN7wAAAABJRU5ErkJggg==" onload="window.location.href=atob(\'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==\')" />';
    }
  }

  // verify that object is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( GFLBA11yStrings ); }

  gravityForceLabBasics.register( 'GFLBA11yStrings', GFLBA11yStrings );

  return GFLBA11yStrings;
} );