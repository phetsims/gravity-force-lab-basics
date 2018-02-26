// Copyright 2017, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow
 */
define( function( require ) {
  'use strict';

  // modules
  var GeneralNavigationHelpContent = require( 'SCENERY_PHET/keyboard/help/GeneralNavigationHelpContent' );
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var SliderControlsHelpContent = require( 'SCENERY_PHET/keyboard/help/SliderControlsHelpContent' );

  /**
   * Constructor.
   *
   * @param {Tandem} tandem
   * @constructor
   */
  function GravityForceLabBasicsKeyboardHelpContent( tandem ) {

    var sliderControlsHelpContent = new SliderControlsHelpContent();
    var generalNavigationHelpContent = new GeneralNavigationHelpContent();

    var content = new HBox( {
      children: [ sliderControlsHelpContent, generalNavigationHelpContent ],
      align: 'top',
      spacing: 30
    } );

    Panel.call( this, content, {
      stroke: null,
      fill: 'rgb( 214, 237, 249 )',
      tandem: tandem
    } );
  }

  gravityForceLabBasics.register( 'GravityForceLabBasicsKeyboardHelpContent', GravityForceLabBasicsKeyboardHelpContent );

  return inherit( Panel, GravityForceLabBasicsKeyboardHelpContent );
} );
