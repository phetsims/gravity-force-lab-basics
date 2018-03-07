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
    moveMassHeadingString: 'Move Mass',
    moveMassLabelString: 'Move mass',
    moveInLargerStepsString: 'Move in larger steps',
    jumpToLeftString: 'Jump to left',
    jumpToRightString: 'Jump to right',
    changeMassHeadingString: 'Change Mass',
    increaseMassString: 'Increase mass',
    decreaseMassString: 'Decrease mass',
    changeMassInLargerStepsString: 'Change mass in larger steps',
    jumpToMaximumMassString: 'Jump to maximum mass',
    jumpToMinimumMassString: 'Jump to minimum mass'
  };

  if ( assert ) { Object.freeze( GFLBA11yStrings ); }

  gravityForceLabBasics.register( 'GFLBA11yStrings', GFLBA11yStrings );

  return GFLBA11yStrings;
} );