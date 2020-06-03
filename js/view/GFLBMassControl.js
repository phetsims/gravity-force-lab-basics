// Copyright 2016-2020, University of Colorado Boulder

/**
 * Label with a number picker for setting mass.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import Utils from '../../../dot/js/Utils.js';
import ISLCQueryParameters from '../../../inverse-square-law-common/js/ISLCQueryParameters.js';
import cursorSpeakerModel from '../../../inverse-square-law-common/js/view/CursorSpeakerModel.js';
import merge from '../../../phet-core/js/merge.js';
import NumberPicker from '../../../scenery-phet/js/NumberPicker.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../scenery/js/nodes/HBox.js';
import Text from '../../../scenery/js/nodes/Text.js';
import VBox from '../../../scenery/js/nodes/VBox.js';
import Color from '../../../scenery/js/util/Color.js';
import Panel from '../../../sun/js/Panel.js';
import GFLBConstants from '../GFLBConstants.js';
import gravityForceLabBasicsStrings from '../gravityForceLabBasicsStrings.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import webSpeaker from '../../../inverse-square-law-common/js/view/webSpeaker.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';

const billionKgString = gravityForceLabBasicsStrings.billionKg;
const massChangeInteractionPatternString = gravityForceLabBasicsStrings.a11y.selfVoicing.massChangeInteractionPattern;
const verboseChangeMassHintPatternString = gravityForceLabBasicsStrings.a11y.selfVoicing.verboseChangeMassHintPattern;
const briefChangeMassHintPatternString = gravityForceLabBasicsStrings.a11y.selfVoicing.briefChangeMassHintPattern;

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

      // {null|ShapeHitDetector} - a11y, to support prototype self-voicing feature set. If included browser
      // will speak informatioon about the GFLBMassControl on certain user input
      shapeHitDetector: null
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
      upFunction: mass => mass + BILLION_MULTIPLIER,
      downFunction: mass => mass - BILLION_MULTIPLIER,
      formatValue: value => Utils.toFixed( value / BILLION_MULTIPLIER, 0 ),
      a11yMapValue: value => Utils.toFixedNumber( Math.ceil( value / BILLION_MULTIPLIER ), 0 ),

      // arrow options
      arrowHeight: 3,
      arrowYSpacing: 2,
      color: options.color,

      // pdom
      pageKeyboardStep: BILLION_MULTIPLIER * 2,
      accessibleName: labelContent,
      a11yCreateAriaValueText: () => massDescriber.getMassAndUnit( thisObjectEnum ),

      // on end interaction, if alert a special alert if the mass started at the min/max and didnt' change.
      a11yCreateValueChangeAlert: () => {

        // no change and at max or min
        if ( currentMass === valueProperty.value && ( currentMass === massRange.max || currentMass === massRange.min ) ) {
          return alertManager.alertMassMinMaxEdge( thisObjectEnum );
        }
        return null; // regular mass changed alerts come from model changes
      },
      startChange: () => {
        currentMass = valueProperty.value;
      }
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

    const panelVBox = new VBox( {
      children: [ titleText, numberPickerHBox ],
      spacing: 10
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

    // PROTOTYPE a11y code, for the self-voicing feature set
    if ( options.shapeHitDetector ) {
      // explore mode, speak information about the control
      options.shapeHitDetector.addNode( panelVBox );

      if ( ISLCQueryParameters.selfVoicing === 'cursor' ) {
        options.shapeHitDetector.hitShapeEmitter.addListener( hitTarget => {
          if ( hitTarget === panelVBox ) {
            if ( cursorSpeakerModel.exploreModeProperty.get() ) {
              const patternString = cursorSpeakerModel.getExploreModeVerbose() ? verboseChangeMassHintPatternString : briefChangeMassHintPatternString;
              webSpeaker.speak( StringUtils.fillIn( patternString, {
                labelContent: labelContent,
                valueText: numberPicker.ariaValueText
              } ) );
            }
          }
        } );

        // interaction mode, speak information about the change due to input
        valueProperty.lazyLink( ( value, oldValue ) => {
          const valueText = numberPicker.ariaValueText;

          if ( cursorSpeakerModel.getInteractiveModeVerbose() ) {
            const massChangedUtterance = alertManager.getMassValueChangedAlert( thisObjectEnum );

            webSpeaker.speak( StringUtils.fillIn( massChangeInteractionPatternString, {
              valueText: valueText,
              massAlert: massChangedUtterance.alert
            } ) );
          }
          else if ( cursorSpeakerModel.getInteractiveModeBrief() ) {
            const otherObjectLabel = massDescriber.getOtherObjectLabelFromEnum( thisObjectEnum );
            const content = alertManager.getSelfVoicingForceChangeFromMassAlert( thisObjectEnum, value, oldValue, otherObjectLabel );
            webSpeaker.speak( StringUtils.fillIn( massChangeInteractionPatternString, {
              valueText: valueText,
              massAlert: content
            } ) );
          }
        } );
      }
      else if ( ISLCQueryParameters.selfVoicing === 'levels' ) {
        options.shapeHitDetector.downOnHittableEmitter.addListener( hitTarget => {
          if ( hitTarget === panelVBox ) {
            webSpeaker.speak( StringUtils.fillIn( briefChangeMassHintPatternString, {
              labelContent: labelContent,
              valueText: numberPicker.ariaValueText
            } ) );
          }
        } );
      }
    }
  }
}

gravityForceLabBasics.register( 'GFLBMassControl', GFLBMassControl );
export default GFLBMassControl;