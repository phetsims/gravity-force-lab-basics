// Copyright 2016-2020, University of Colorado Boulder

/**
 * Label with a number picker for setting mass.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import Utils from '../../../dot/js/Utils.js';
import Shape from '../../../kite/js/Shape.js';
import merge from '../../../phet-core/js/merge.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import levelSpeakerModel from '../../../scenery-phet/js/accessibility/speaker/levelSpeakerModel.js';
import SelfVoicingInputListener from '../../../scenery-phet/js/accessibility/speaker/SelfVoicingInputListener.js';
import SelfVoicingWrapperNode from '../../../scenery-phet/js/accessibility/speaker/SelfVoicingWrapperNode.js';
import NumberPicker from '../../../scenery-phet/js/NumberPicker.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import sceneryPhetStrings from '../../../scenery-phet/js/sceneryPhetStrings.js';
import HBox from '../../../scenery/js/nodes/HBox.js';
import Path from '../../../scenery/js/nodes/Path.js';
import Text from '../../../scenery/js/nodes/Text.js';
import VBox from '../../../scenery/js/nodes/VBox.js';
import Color from '../../../scenery/js/util/Color.js';
import Panel from '../../../sun/js/Panel.js';
import Playable from '../../../tambo/js/Playable.js';
import SelfVoicingUtterance from '../../../utterance-queue/js/SelfVoicingUtterance.js';
import GFLBConstants from '../GFLBConstants.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import gravityForceLabBasicsStrings from '../gravityForceLabBasicsStrings.js';

const billionKgString = gravityForceLabBasicsStrings.billionKg;
const briefChangeMassHintPatternString = gravityForceLabBasicsStrings.a11y.selfVoicing.briefChangeMassHintPattern;
const massControlsHelpTextBillionsString = gravityForceLabBasicsStrings.a11y.massControlsHelpTextBillions;
const massControlsHelpTextDensityBillionsString = gravityForceLabBasicsStrings.a11y.massControlsHelpTextDensityBillions;
const draggableAlertString = sceneryPhetStrings.a11y.selfVoicing.draggableAlert;
const releasedString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.released;
const grabDragHintPatternString = sceneryPhetStrings.a11y.selfVoicing.grabDragHintPattern;

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
      shapeHitDetector: null,

      // {null|string} (self-voicing) custom content to guide the user to dragging with custom gesture
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
      a11yMapPDOMValue: value => Utils.toFixedNumber( Math.ceil( value / BILLION_MULTIPLIER ), 0 ),

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
      a11yCreateContextResponseAlert: () => {

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
    if ( phet.chipper.queryParameters.supportsSelfVoicing ) {
      options.shapeHitDetector.addNode( numberPicker );

      // create a hit shape that will capture events on the panel and also exclude hits on the picker when
      // pointer is over the panel. Ideally, the ShapeHitDetector will be smart enough to exclude children when
      // necessary, but this was pretty difficult because listeners on the NumberPicker don't attach
      // to the pointer and the vBox has infinite self bounds so it cannot be used itself. This is a temp solution,
      // but there is likely a more general solution in the future - this is the only case of this in this prototype
      // so far.
      const panelHitShape = Shape.bounds( panelVBox.bounds ).shapeDifference( Shape.bounds( panelVBox.globalToParentBounds( numberPicker.globalBounds ).dilated( 15 ) ) );
      const panelHitPath = new Path( panelHitShape );

      const panelWrapper = new SelfVoicingWrapperNode( panelHitPath, {
        customNode: panelHitPath,
        focusable: false,
        listenerOptions: {
          onPress: () => {
            speakValueAndHelpText();
          },
          onFocusIn: () => {
            speakValueAndHelpText();
          }
        }
      } );
      this.addChild( panelWrapper );

      // prepare and speak value text and help text for the control - spoken with mouse input on the containing
      // panel, and on keyboard focus of the actual number picker
      const speakValueAndHelpText = () => {
        const objectResponse = StringUtils.fillIn( briefChangeMassHintPatternString, {
          labelContent: labelContent,
          valueText: numberPicker.ariaValueText
        } );
        const helpText = alertManager.model.constantRadiusProperty.get() ? massControlsHelpTextDensityBillionsString :
                         massControlsHelpTextBillionsString;

        const alertContent = levelSpeakerModel.collectResponses( objectResponse, null, helpText );
        phet.joist.sim.selfVoicingUtteranceQueue.addToBack( alertContent );
      };

      numberPicker.addInputListener( new SelfVoicingInputListener( {
        onFocusIn: () => {
          speakValueAndHelpText();
        },
        highlightTarget: numberPicker
      } ) );

      // swipe gestures control mass, see SwipeListener. The SwipeListener assumes that
      // these functions are implemented on the focused node - perhaps a better
      // way to do this would be to create new SceneryEvents, which you could directly
      // add listeners to
      let swipePositionOnValueChange = null;
      numberPicker.swipeStart = ( event, listener ) => {
        swipePositionOnValueChange = event.pointer.point;

        const response = levelSpeakerModel.collectResponses( draggableAlertString );
        phet.joist.sim.selfVoicingUtteranceQueue.addToBack( response );
      };

      numberPicker.swipeEnd = ( event, listener ) => {
        const releasedUtterance = new SelfVoicingUtterance( {
          alert: releasedString,
          cancelOther: false
        } );
        phet.joist.sim.selfVoicingUtteranceQueue.addToBack( releasedUtterance );
      };

      numberPicker.swipeMove = ( event, listener ) => {
        const delta = event.pointer.point.minus( swipePositionOnValueChange );
        const distance = event.pointer.point.distance( swipePositionOnValueChange );

        if ( distance > 50 ) {

          let increment;
          if ( Math.abs( delta.x ) > 25 ) {

            // likely horizontal swipe
            increment = delta.x > 0;
          }
          else if ( Math.abs( delta.y ) > 25 ) {

            // more likely a vertical swipe
            increment = delta.y < 0;
          }

          const valueChange = increment ? BILLION_MULTIPLIER : -BILLION_MULTIPLIER;
          valueProperty.set( massRange.constrainValue( valueProperty.get() + valueChange ) );
          swipePositionOnValueChange = event.pointer.point;
        }
      };

      if ( phet.chipper.queryParameters.supportsSelfVoicing ) {

        // when we receive a click event from a 'double tap', describe to the
        // user how to drag the appendage
        this.addInputListener( {
          click: event => {
            const hint = StringUtils.fillIn( grabDragHintPatternString, {
              manipulation: options.changeMassHintString
            } );

            const response = levelSpeakerModel.collectResponses( hint );
            phet.joist.sim.selfVoicingUtteranceQueue.addToBack( response );
          }
        } );
      }

      // read new value - note that this gets overridden by a different alert in GravityForceLabAlertManager
      // if the change in value pushes the other object away, with the positionChangedFromSecondarySourceEmitter
      const selfVoicingUtterance = new SelfVoicingUtterance();

      valueProperty.lazyLink( ( value, oldValue ) => {
        const valueText = numberPicker.ariaValueText;
        const massChangedUtterance = alertManager.getMassValueChangedAlert( thisObjectEnum );
        selfVoicingUtterance.alert = levelSpeakerModel.collectResponses( valueText, massChangedUtterance.alert );
        phet.joist.sim.selfVoicingUtteranceQueue.addToBack( selfVoicingUtterance );
      } );
    }
  }
}

gravityForceLabBasics.register( 'GFLBMassControl', GFLBMassControl );
export default GFLBMassControl;