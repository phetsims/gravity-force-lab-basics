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
    massReadoutPattern: {
      value: '{{value}} billion kg'
    },
    moveSphereDescription: {
      value: 'Move sphere left and right with the Left and Right Arrow keys.'
    },
    moveInLargerStepsDescription: {
      value: 'Move in larger steps with Page Up and Page Down keys.'
    },
    jumpToLeftDescription: {
      value: 'Jump to left with Home key.'
    },
    jumpToRightDescription: {
      value: 'Jump to right with End key.'
    },
    increaseMassDescription: {
      value: 'Increase mass with Up or Right Arrow key.'
    },
    decreaseMassDescription: {
      value: 'Decrease mass with Down or Left Arrow key.'
    },
    changeMassInLargerStepsDescription: {
      value: 'Change mass in larger steps with Page Up and Page Down keys.'
    },
    jumpToMaximumMassDescription: {
      value: 'Jump to maximum mass with End key.'
    },
    jumpToMinimumMassDescription: {
      value: 'Jump to minimum mass with Home key.'
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