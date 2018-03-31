// Copyright 2016-2018, University of Colorado Boulder

/**
 * Label with a number picker for setting mass.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var GravityForceLabBasicsA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsA11yStrings' );
  var GravityForceLabBasicsConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsConstants' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var billionKgString = require( 'string!GRAVITY_FORCE_LAB_BASICS/billionKg' );

  // a11y strings
  var massReadoutPatternString = GravityForceLabBasicsA11yStrings.massReadoutPattern.value;

  // constants
  var MIN_PANEL_WIDTH = 150;

  /**
   * @param {string} titleString
   * @param {Property.<number>} valueProperty
   * @param {Range} massRange
   * @param {String} labelContent - a11y, the content of the label for the mass control
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function MassControl( titleString, valueProperty, massRange, labelContent, tandem, options ) {

    options = _.extend( {
      color: new Color( 0, 0, 255 )
    }, options );

    var titleText = new Text( titleString, {
      font: new PhetFont( 18 ),
      tandem: tandem.createTandem( 'titleText' )
    } );

    var numberPicker = new NumberPicker( valueProperty, new Property( massRange ), {
      font: new PhetFont( 20 ),
      scale: 1.5,
      tandem: tandem.createTandem( 'numberPicker' ),
      upFunction: function( mass ) { return mass + GravityForceLabBasicsConstants.BILLION_MULTIPLIER; },
      downFunction: function( mass ) { return mass - GravityForceLabBasicsConstants.BILLION_MULTIPLIER; },
      formatValue: function( value ) {
        return Util.toFixed( value / GravityForceLabBasicsConstants.BILLION_MULTIPLIER, 0 );
      },

      // arrow options
      arrowHeight: 3,
      arrowYSpacing: 2,
      color: options.color,

      // a11y
      a11yPageValueDelta: GravityForceLabBasicsConstants.BILLION_MULTIPLIER * 2,
      a11yValuePattern: massReadoutPatternString,
      labelContent: labelContent,
      a11yFormatValue: function( value ) {
        return Util.toFixed( value / GravityForceLabBasicsConstants.BILLION_MULTIPLIER, 0 );
      }
    } );
    var numberPickerLabel = new Text( billionKgString, {
      font: new PhetFont( { size: 14 } ),
      tandem: tandem.createTandem( 'numberPickerLabel' )
    } );

    var numberPickerHBox = new HBox( {
      children: [ numberPicker, numberPickerLabel ],
      spacing: 10
    } );

    var panelVBox = new VBox( {
      children: [ titleText, numberPickerHBox ],
      spacing: 10
    } );

    Panel.call( this, panelVBox, {
      fill: '#f1f1f2',
      xMargin: 15,
      yMargin: 10,
      maxWidth: 224,
      minWidth: MIN_PANEL_WIDTH,
      resize: false,
      align: 'center',
      tandem: tandem
    } );
  }

  gravityForceLabBasics.register( 'MassControl', MassControl );

  return inherit( Panel, MassControl );
} );
