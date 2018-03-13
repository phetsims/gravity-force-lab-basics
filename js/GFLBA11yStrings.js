// Copyright 2018, University of Colorado Boulder

/**
 * Single location of all accessibility strings.  These strings are not meant to be translatable yet.  Rosetta needs
 * some work to provide translators with context for these strings, and we want to receive some community feedback
 * before these strings are submitted for translation.
 *
 * @author Michael Barlow
 */
define( function( require ) {
  'use strict';

  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );

  var GFLBA11yStrings = {
    moveMassHeadingString: { value: 'Move Mass' },
    moveMassLabelString: { value: 'Move mass' },
    moveInLargerStepsString: { value: 'Move in larger steps' },
    jumpToLeftString: { value: 'Jump to left' },
    jumpToRightString: { value: 'Jump to right' },
    changeMassHeadingString: { value: 'Change Mass' },
    increaseMassString: { value: 'Increase mass' },
    decreaseMassString: { value: 'Decrease mass' },
    changeMassInLargerStepsString: { value: 'Change mass in larger steps' },
    jumpToMaximumMassString: { value: 'Jump to maximum mass' },
    jumpToMinimumMassString: { value: 'Jump to minimum mass' },

    // valuetext read when changing the values of the mass controls
    massReadoutPatternString: { value: '{{value}} kilograms' },

    mass1ControlLabelString: { value: 'Mass 1' },
    mass2ControlLabelString: { value: 'Mass 2' }
  };

  if ( assert ) { Object.freeze( GFLBA11yStrings ); }

  gravityForceLabBasics.register( 'GFLBA11yStrings', GFLBA11yStrings );

  return GFLBA11yStrings;
} );