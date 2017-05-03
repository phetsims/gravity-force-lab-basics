// Copyright 2013-2015, University of Colorado Boulder

/**
 * Label with a number picker for setting mass.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Color = require( 'SCENERY/util/Color' );
  var Property = require( 'AXON/Property' );
  var GravityForceLabBasicsConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsConstants' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var billionKGString = 'billion kg'; // TODO: use string pattern

  // constants
  var MIN_PANEL_WIDTH = 130;

  /**
   * @param {string} titleString
   * @param {Property.<number>} massProperty
   * @param {Range} massRange
   * @param {Color} thumbColor
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function MassControl( titleString, massProperty, massRange, tandem, options ) {

    options = _.extend( {
      color: new Color( 0, 0, 255 )
    }, options );

    var titleText = new Text( titleString, { font: new PhetFont( 14 ) } );

    var numberPicker = new NumberPicker( massProperty, new Property( massRange ), {
      font: new PhetFont( 20 ),
      upFunction: function( mass ) { return mass + GravityForceLabBasicsConstants.BILLION_MULTIPLIER; },
      downFunction: function( mass ) { return mass - GravityForceLabBasicsConstants.BILLION_MULTIPLIER; },
      formatText: function( text ) {
        var value = parseInt( text, 10 );
        return value / GravityForceLabBasicsConstants.BILLION_MULTIPLIER;
      },

      // arrow options
      arrowHeight: 3,
      arrowYSpacing: 2,
      color: options.color,
    } );
    var numberPickerLabel = new Text( billionKGString, { font: new PhetFont( { size: 11, weight: 'bold' } ) } );

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
