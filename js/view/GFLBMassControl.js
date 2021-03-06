// Copyright 2016-2021, University of Colorado Boulder

/**
 * Label with a number picker for setting mass.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import Utils from '../../../dot/js/Utils.js';
import merge from '../../../phet-core/js/merge.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import NumberPicker from '../../../scenery-phet/js/NumberPicker.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import ReadingBlock from '../../../scenery/js/accessibility/voicing/ReadingBlock.js';
import Voicing from '../../../scenery/js/accessibility/voicing/Voicing.js';
import HBox from '../../../scenery/js/nodes/HBox.js';
import Text from '../../../scenery/js/nodes/Text.js';
import VBox from '../../../scenery/js/nodes/VBox.js';
import Color from '../../../scenery/js/util/Color.js';
import Panel from '../../../sun/js/Panel.js';
import Playable from '../../../tambo/js/Playable.js';
import GFLBConstants from '../GFLBConstants.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import gravityForceLabBasicsStrings from '../gravityForceLabBasicsStrings.js';

const billionKgString = gravityForceLabBasicsStrings.billionKg;
const changeMassHintResponseString = gravityForceLabBasicsStrings.a11y.voicing.changeMassHintResponse;
const massControlReadingBlockPatternString = gravityForceLabBasicsStrings.a11y.voicing.massControlReadingBlockPattern;

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

    const numberPicker = new VoicingNumberPicker( valueProperty, new Property( massRange ), {
      font: new PhetFont( 20 ),
      scale: 1.5,
      tandem: tandem.createTandem( 'numberPicker' ),
      incrementFunction: mass => mass + BILLION_MULTIPLIER,
      decrementFunction: mass => mass - BILLION_MULTIPLIER,
      formatValue: value => Utils.toFixed( value / BILLION_MULTIPLIER, 0 ),
      a11yMapPDOMValue: value => Utils.toFixedNumber( Math.ceil( value / BILLION_MULTIPLIER ), 0 ),

      // arrow options
      arrowHeight: 3,
      arrowYSpacing: 2,
      color: options.color,

      // sound
      valueChangedSoundPlayer: Playable.NO_SOUND,
      boundarySoundPlayer: Playable.NO_SOUND,

      a11yCreateAriaValueText: () => massDescriber.getMassAndUnit( thisObjectEnum ),

      // on end interaction, if alert a special alert if the mass started at the min/max and didnt' change.
      a11yCreateContextResponseAlert: () => {

        // no change and at max or min
        if ( currentMass === valueProperty.value && ( currentMass === massRange.max || currentMass === massRange.min ) ) {
          return alertManager.alertMassMinMaxEdge( thisObjectEnum );
        }
        return null; // regular mass changed alerts come from model changes
      },
      startChange: () => {
        currentMass = valueProperty.value;
      },

      // pdom
      pageKeyboardStep: BILLION_MULTIPLIER * 2,
      accessibleName: labelContent,

      // voicing
      voicingNameResponse: labelContent
    } );
    const numberPickerLabel = new Text( billionKgString, {
      font: new PhetFont( { size: 14 } ),
      maxWidth: MAX_TEXT_WIDTH,
      tandem: tandem.createTandem( 'numberPickerLabel' )
    } );

    const numberPickerHBox = new HBox( {
      children: [ numberPicker, numberPickerLabel ],
      spacing: 10
    } );

    const panelVBox = new MassControlReadingBlock( {
      children: [ titleText, numberPickerHBox ],
      spacing: 10,

      // voicing
      readingBlockHintResponse: changeMassHintResponseString
    } );

    titleText.textProperty.lazyLink( () => { titleText.centerX = panelVBox.centerX; } );

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
      panelVBox.readingBlockContent = StringUtils.fillIn( massControlReadingBlockPatternString, {
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
class MassControlReadingBlock extends VBox {

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
    this.initializeReadingBlock( options );
  }
}

ReadingBlock.compose( MassControlReadingBlock );


/**
 * An inner class that implements the Voicing for the NumberPicker. Eventually this could be moved to NumberPicker,
 * but it is unclear how much of this feature will persist.
 */
class VoicingNumberPicker extends NumberPicker {

  /**
   * @mixes {Voicing}
   * @param {Property} valueProperty
   * @param {Property.<Range>} rangeProperty
   * @param {Object} [options]
   */
  constructor( valueProperty, rangeProperty, options ) {
    options = merge( {

      voicingNameResponse: null,
      voicingHintResponse: changeMassHintResponseString

    }, options );
    super( valueProperty, rangeProperty, options );

    this.initializeVoicing( options );

    valueProperty.link( value => {

      // voicing - NumberPicker has aria-valuetext through AccessibleValueHandler, the "object response" for voicing
      // is the same as the aria-valuetext
      this.voicingObjectResponse = this.ariaValueText;
    } );
  }
}

Voicing.compose( VoicingNumberPicker );

export default GFLBMassControl;