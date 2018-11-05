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

  var GravityForceLabBasicsA11yStrings = {
    screenSummaryDescription: {
      value: 'The Play Area has two spheres, a blue sphere labelled Mass 1 and a red sphere labelled Mass 2, and each sphere is held in place by a robot. Arrows representing force starts at center of each sphere and point directly at opposite sphere. Spheres can be moved closer or further from each other, and mass of each sphere can be increased or decreased. In Control Area there are checkboxes and buttons to show force values, show distance between spheres, set spheres to a constant size, and to reset sim.'
    },
    basicsSimStateLabel: {
      value: 'Currently, force on mass 1 by mass 2 is of equal magnitude and pointing directly opposite to the force on mass 2 by mass 1.'
    },
    massReadoutPattern: {
      value: '{{value}} billion kg'
    },
    massesDistanceApartPattern: {
      value: 'masses are {{distance}} km apart'
    },
    distanceCheckboxHelpText: {
      value: 'Measure distance between spheres in kilometers.'
    }
  };

  // TODO: This seems it should be factored out, see https://github.com/phetsims/tasks/issues/917
  if ( phet.chipper.queryParameters.stringTest === 'xss' ) {
    for ( var key in GravityForceLabBasicsA11yStrings ) {
      GravityForceLabBasicsA11yStrings[ key ].value += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABCQEBtxmN7wAAAABJRU5ErkJggg==" onload="window.location.href=atob(\'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==\')" />';
    }
  }

  // verify that object is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( GravityForceLabBasicsA11yStrings ); }

  gravityForceLabBasics.register( 'GravityForceLabBasicsA11yStrings', GravityForceLabBasicsA11yStrings );

  return GravityForceLabBasicsA11yStrings;
} );