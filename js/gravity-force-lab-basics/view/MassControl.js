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
  var Spacer = require( 'SCENERY/nodes/Spacer' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Color = require( 'SCENERY/util/Color' );
  var Property = require( 'AXON/Property' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var Text = require( 'SCENERY/nodes/Text' );
  var AlignGroup = require( 'SCENERY/nodes/AlignGroup' );

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
   * @constructor
   */
  function MassControl( titleString, massProperty, massRange, tandem, options ) {

    options = _.extend( {
      color: new Color( 0, 0, 255 )
    }, options );

    var titleText = new Text( titleString, { font: new PhetFont( 16 ) } );

    var numberPicker = new NumberPicker( massProperty, new Property( massRange ), {
      font: new PhetFont( 20 ),
      color: options.color
    } );
    var numberPickerLabel = new Text( billionKGString, { font: new PhetFont( { size: 11, weight: 'bold' } ) } );
    var numberPickerSpacer = new Spacer( MIN_PANEL_WIDTH - numberPicker.width - numberPickerLabel.width - 10, 0 );

    var numberPickerHBox = new HBox( {
      children: [ numberPicker, numberPickerLabel, numberPickerSpacer ],
      spacing: 10
    } );

    // ensure that the number picker and title have the same width
    var controlAlignGroup = new AlignGroup( {
      matchVertical: false,
      matchHorizontal: true
    } );
    var titleBox = controlAlignGroup.createBox( titleText, { xAlign: 'center' } );
    var numberPickerBox = controlAlignGroup.createBox( numberPickerHBox, { xAlign: 'left' } );

    var panelVBox = new VBox( {
      children: [ titleBox, numberPickerBox ],
      spacing: 10
    } );

    Panel.call( this, panelVBox, {
      fill: '#f1f1f2',
      xMargin: 15,
      yMargin: 10,
      maxWidth: 224,
      minWidth: MIN_PANEL_WIDTH,
      resize: false,
      align: 'left',
      tandem: tandem
    } );

  }

  gravityForceLabBasics.register( 'MassControl', MassControl );

  return inherit( Panel, MassControl );
} );
