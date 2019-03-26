// Copyright 2016-2019, University of Colorado Boulder

/**
 * Label with a number picker for setting mass.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const Color = require( 'SCENERY/util/Color' );
  const GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBA11yStrings' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GFLBConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBConstants' );
  const GFLBAlertManager = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GFLBAlertManager' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const billionKgString = require( 'string!GRAVITY_FORCE_LAB_BASICS/billionKg' );

  // a11y strings
  const massReadoutPatternString = GFLBA11yStrings.massReadoutPattern.value;

  // constants
  const MIN_PANEL_WIDTH = 150;
  const MAX_TEXT_WIDTH = 125; // i18n

  class GFLBMassControl extends Panel {

    /**
     * @param {string} titleString
     * @param {Property.<number>} valueProperty
     * @param {Range} massRange
     * @param {String} labelContent - a11y, the content of the label for the mass control
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( titleString, valueProperty, massRange, labelContent, tandem, options ) {

      options = _.extend( {
        color: new Color( 0, 0, 255 )
      }, options );

      const alertManager = GFLBAlertManager.getManager();

      const titleText = new Text( titleString, {
        font: new PhetFont( 18 ),
        maxWidth: MAX_TEXT_WIDTH,
        tandem: tandem.createTandem( 'titleText' )
      } );

      const numberPicker = new NumberPicker( valueProperty, new Property( massRange ), {
        font: new PhetFont( 20 ),
        scale: 1.5,
        tandem: tandem.createTandem( 'numberPicker' ),
        upFunction: function( mass ) { return mass + GFLBConstants.BILLION_MULTIPLIER; },
        downFunction: function( mass ) { return mass - GFLBConstants.BILLION_MULTIPLIER; },
        formatValue: function( value ) {
          return Util.toFixed( value / GFLBConstants.BILLION_MULTIPLIER, 0 );
        },

        // arrow options
        arrowHeight: 3,
        arrowYSpacing: 2,
        color: options.color,

        // a11y
        a11yPageValueDelta: GFLBConstants.BILLION_MULTIPLIER * 2,
        a11yValuePattern: massReadoutPatternString,
        labelContent: labelContent,
        a11yMapValue: value => value / GFLBConstants.BILLION_MULTIPLIER
      } );
      const numberPickerLabel = new Text( billionKgString, {
        font: new PhetFont( { size: 14 } ),
        maxWidth: MAX_TEXT_WIDTH,
        tandem: tandem.createTandem( 'numberPickerLabel' )
      } );

      // alert on focus
      numberPicker.addInputListener( {
        focus() {
          alertManager.alertMassControlFocused();
        }
      } );

      const numberPickerHBox = new HBox( {
        children: [ numberPicker, numberPickerLabel ],
        spacing: 10
      } );

      const panelVBox = new VBox( {
        children: [ titleText, numberPickerHBox ],
        spacing: 10
      } );

      super( panelVBox, {
        fill: '#f1f1f2',
        xMargin: 15,
        yMargin: 10,
        minWidth: MIN_PANEL_WIDTH,
        resize: false,
        align: 'center',
        tandem: tandem,

        // a11y
        tagName: 'li'
      } );
    }
  }

  return gravityForceLabBasics.register( 'GFLBMassControl', GFLBMassControl );
} );
