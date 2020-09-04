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
import focusSpeaker from '../../../inverse-square-law-common/js/view/FocusSpeaker.js';
import levelSpeakerModel from '../../../scenery-phet/js/accessibility/speaker/levelSpeakerModel.js';
import webSpeaker from '../../../scenery/js/accessibility/speaker/webSpeaker.js';
import Shape from '../../../kite/js/Shape.js';
import Path from '../../../scenery/js/nodes/Path.js';
import merge from '../../../phet-core/js/merge.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import NumberPicker from '../../../scenery-phet/js/NumberPicker.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
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
const massChangeInteractionPatternString = gravityForceLabBasicsStrings.a11y.selfVoicing.massChangeInteractionPattern;
const verboseChangeMassHintPatternString = gravityForceLabBasicsStrings.a11y.selfVoicing.verboseChangeMassHintPattern;
const briefChangeMassHintPatternString = gravityForceLabBasicsStrings.a11y.selfVoicing.briefChangeMassHintPattern;
const massControlsHelpTextBillionsString = gravityForceLabBasicsStrings.a11y.massControlsHelpTextBillions;
const massControlsHelpTextDensityBillionsString = gravityForceLabBasicsStrings.a11y.massControlsHelpTextDensityBillions;

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

      // sound
      valueChangedSoundPlayer: Playable.NO_SOUND,
      boundarySoundPlayer: Playable.NO_SOUND,

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
      options.shapeHitDetector.addNode( numberPicker );

      if ( ISLCQueryParameters.selfVoicing === 'paradigm1' ) {

        // explore mode, speak information about the control
        options.shapeHitDetector.addNode( panelVBox );

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
      else if ( ISLCQueryParameters.selfVoicing === 'paradigm2' || ISLCQueryParameters.selfVoicing === 'paradigm3' ) {

        // create a hit shape that will capture events on the panel and also exclude hits on the picker when
        // pointer is over the panel. Ideally, the ShapeHitDetector will be smart enough to exclude children when
        // necessary, but this was pretty difficult because listeners on the NumberPicker don't attach
        // to the pointer and the vBox has infinite self bounds so it cannot be used itself. This is a temp solution,
        // but there is likely a more general solution in the future - this is the only case of this in this prototype
        // so far.
        const panelHitShape = Shape.bounds( panelVBox.bounds ).shapeDifference( Shape.bounds( panelVBox.globalToParentBounds( numberPicker.globalBounds ).dilated( 15 ) ) );
        const panelHitPath = new Path( panelHitShape, { pickable: true } );
        this.addChild( panelHitPath );

        levelSpeakerModel.addHitDetectionForObjectResponsesAndHelpText( panelHitPath, options.shapeHitDetector, {
          useHitTest: true
        } );

        levelSpeakerModel.setNodeInteractive( numberPicker, true );

        // in the 'minimalLevels' prototype, this component is not added to the navigation order
        if ( ISLCQueryParameters.selfVoicing === 'paradigm2' ) {
          focusSpeaker.addNode( panelHitPath );
        }

        // prepare and speak value text and help text for the control - spoken with mouse input on the containing
        // panel, and on keyboard focus of the actual number picker
        const speakValueAndHelpText = () => {
          const objectResponse = StringUtils.fillIn( briefChangeMassHintPatternString, {
            labelContent: labelContent,
            valueText: numberPicker.ariaValueText
          } );
          const helpText = alertManager.model.constantRadiusProperty.get() ? massControlsHelpTextDensityBillionsString :
                           massControlsHelpTextBillionsString;

          levelSpeakerModel.speakAllResponses( objectResponse, null, helpText );
        };

        const panelHitListener = hitTarget => {
          if ( hitTarget === panelHitPath ) {
            speakValueAndHelpText();
          }
        };
        options.shapeHitDetector.downOnHittableEmitter.addListener( panelHitListener );
        options.shapeHitDetector.focusHitEmitter.addListener( panelHitListener );

        // hit from the shape hit detector while it has keyboard focus, read name and value
        options.shapeHitDetector.focusHitEmitter.addListener( hitTarget => {
          if ( hitTarget === numberPicker ) {
            speakValueAndHelpText();
          }
        } );

        // read new value - note that this gets overridden by a different alert in GravityForceLabAlertManager
        // if the change in value pushes the other object away, with the positionChangedFromSecondarySourceEmitter
        valueProperty.lazyLink( ( value, oldValue ) => {
          const valueText = numberPicker.ariaValueText;
          const massChangedUtterance = alertManager.getMassValueChangedAlert( thisObjectEnum );
          levelSpeakerModel.speakAllResponses( valueText, massChangedUtterance.alert );
        } );
      }
    }
  }
}

gravityForceLabBasics.register( 'GFLBMassControl', GFLBMassControl );
export default GFLBMassControl;