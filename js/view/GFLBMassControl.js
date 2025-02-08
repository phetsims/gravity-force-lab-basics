// Copyright 2016-2025, University of Colorado Boulder

/**
 * Label with a number picker for setting mass.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import Utils from '../../../dot/js/Utils.js';
import merge from '../../../phet-core/js/merge.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import ReadingBlock from '../../../scenery/js/accessibility/voicing/ReadingBlock.js';
import HBox from '../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../scenery/js/nodes/Text.js';
import Color from '../../../scenery/js/util/Color.js';
import NumberPicker from '../../../sun/js/NumberPicker.js';
import Panel from '../../../sun/js/Panel.js';
import nullSoundPlayer from '../../../tambo/js/nullSoundPlayer.js';
import GFLBConstants from '../GFLBConstants.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import GravityForceLabBasicsStrings from '../GravityForceLabBasicsStrings.js';

const billionKgString = GravityForceLabBasicsStrings.billionKg;
const changeMassHintResponseString = GravityForceLabBasicsStrings.a11y.voicing.changeMassHintResponse;
const massControlReadingBlockPatternString = GravityForceLabBasicsStrings.a11y.voicing.massControlReadingBlockPattern;

// constants
const MIN_PANEL_WIDTH = 150;
const MAX_TEXT_WIDTH = 120; // i18n
const BILLION_MULTIPLIER = GFLBConstants.BILLION_MULTIPLIER;

class GFLBMassControl extends Panel {

  /**
   * @param {string} titleString
   * @param {Property.<number>} valueProperty
   * @param {Range} massRange
   * @param {String} labelContent - a11y, the content of the label for the mass control
   * @param {ISLCObjectEnum} thisObjectEnum
   * @param {GFLBAlertManager} alertManager
   * @param {GFLBMassDescriber} massDescriber
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( titleString, valueProperty, massRange, labelContent, thisObjectEnum, alertManager,
               massDescriber, tandem, options ) {

    options = merge( {
      color: new Color( 0, 0, 255 ),

      // {null|string} (voicing) custom content to guide the user to dragging with custom gesture
      changeMassHintString: null
    }, options );

    const titleText = new Text( titleString, {
      font: new PhetFont( 18 ),
      maxWidth: MAX_TEXT_WIDTH,
      tandem: tandem.createTandem( 'titleText' )
    } );

    // Keep track of the current mass between the start and end of an interaction to see if we should alert.
    let currentMass = valueProperty.value;

    const numberPicker = new NumberPicker( valueProperty, new Property( massRange ), {
      font: new PhetFont( 20 ),
      scale: 1.5,
      tandem: tandem.createTandem( 'numberPicker' ),
      incrementFunction: mass => mass + BILLION_MULTIPLIER,
      decrementFunction: mass => mass - BILLION_MULTIPLIER,
      formatValue: value => Utils.toFixed( value / BILLION_MULTIPLIER, 0 ),
      pdomMapPDOMValue: value => Utils.toFixedNumber( Math.ceil( value / BILLION_MULTIPLIER ), 0 ),

      // arrow options
      arrowHeight: 3,
      arrowYSpacing: 2,
      color: options.color,

      // sound
      valueChangedSoundPlayer: nullSoundPlayer,
      boundarySoundPlayer: nullSoundPlayer,

      pdomCreateAriaValueText: () => massDescriber.getMassAndUnit( thisObjectEnum ),

      // on end interaction, if alert a special alert if the mass started at the min/max and didnt' change.
      pdomCreateContextResponseAlert: () => {

        // no change and at max or min
        if ( currentMass === valueProperty.value && ( currentMass === massRange.max || currentMass === massRange.min ) ) {
          return alertManager.alertMassMinMaxEdge( thisObjectEnum );
        }
        return null; // regular mass changed alerts come from model changes
      },
      startInput: () => {
        currentMass = valueProperty.value;
      },

      // pdom
      pageKeyboardStep: BILLION_MULTIPLIER * 2,
      accessibleName: labelContent,

      // voicing
      voicingNameResponse: labelContent,
      voicingObjectResponse: () => massDescriber.getMassAndUnit( thisObjectEnum ),
      voicingContextResponse: alertManager.getMassValueChangedAlert( thisObjectEnum ).alert,
      voicingHintResponse: changeMassHintResponseString
    } );
    const numberPickerLabelText = new Text( billionKgString, {
      font: new PhetFont( { size: 14 } ),
      maxWidth: MAX_TEXT_WIDTH,
      tandem: tandem.createTandem( 'numberPickerLabelText' )
    } );

    const numberPickerHBox = new HBox( {
      children: [ numberPicker, numberPickerLabelText ],
      spacing: 10
    } );

    const panelVBox = new MassControlReadingBlock( {
      children: [ titleText, numberPickerHBox ],
      spacing: 10,

      // voicing
      readingBlockHintResponse: changeMassHintResponseString
    } );

    titleText.stringProperty.lazyLink( () => { titleText.centerX = panelVBox.centerX; } );

    super( panelVBox, {
      fill: '#f1f1f2',
      xMargin: 15,
      yMargin: 10,
      minWidth: MIN_PANEL_WIDTH,
      resize: false,
      align: 'center',
      tandem: tandem,

      // pdom
      tagName: 'div' // Though not necessary, it is helpful for the a11y view to display the valuetext within this div.
    } );

    // voicing - when the Property changes, update the ReadingBlock content
    valueProperty.link( value => {
      panelVBox.readingBlockNameResponse = StringUtils.fillIn( massControlReadingBlockPatternString, {
        label: labelContent,
        value: numberPicker.ariaValueText
      } );
    } );
  }
}

gravityForceLabBasics.register( 'GFLBMassControl', GFLBMassControl );

/**
 * An inner class for the mass contents surrounding the NumberPicker (title, readout) that can be activated
 * to get the current value and any other help content provided by Voicing.
 */
class MassControlReadingBlock extends ReadingBlock( VBox ) {

  /**
   * @mixes {ReadingBlock}
   * @param {Object} [options]
   */
  constructor( options ) {
    options = merge( {

      // voicing - This ReadingBlock should neither be focusable nor discoverable in the PDOM because its content
      // is provided in other responses. It was requested that it be removed from the focus order.
      readingBlockTagName: null
    }, options );

    super( options );
  }
}

export default GFLBMassControl;