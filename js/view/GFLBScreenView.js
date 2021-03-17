// Copyright 2016-2020, University of Colorado Boulder

/**
 * Main screen view for the simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../dot/js/Bounds2.js';
import Range from '../../../dot/js/Range.js';
import Vector2 from '../../../dot/js/Vector2.js';
import gravityForceLabStrings from '../../../gravity-force-lab/js/gravityForceLabStrings.js';
import GravityForceLabScreenSummaryNode from '../../../gravity-force-lab/js/view/GravityForceLabScreenSummaryNode.js';
import MassBoundarySoundGenerator from '../../../gravity-force-lab/js/view/MassBoundarySoundGenerator.js';
import MassSoundGenerator from '../../../gravity-force-lab/js/view/MassSoundGenerator.js';
import SpherePositionsDescriptionNode from '../../../gravity-force-lab/js/view/SpherePositionsDescriptionNode.js';
import forceSound from '../../../gravity-force-lab/sounds/saturated-sine-loop-trimmed_wav.js';
import inverseSquareLawCommonStrings from '../../../inverse-square-law-common/js/inverseSquareLawCommonStrings.js';
import ISLCQueryParameters from '../../../inverse-square-law-common/js/ISLCQueryParameters.js';
import DefaultDirection from '../../../inverse-square-law-common/js/view/DefaultDirection.js';
import ISLCDragBoundsNode from '../../../inverse-square-law-common/js/view/ISLCDragBoundsNode.js';
import ISLCGridNode from '../../../inverse-square-law-common/js/view/ISLCGridNode.js';
import ISLCObjectEnum from '../../../inverse-square-law-common/js/view/ISLCObjectEnum.js';
import ScreenView from '../../../joist/js/ScreenView.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import ModelViewTransform2 from '../../../phetcommon/js/view/ModelViewTransform2.js';
import levelSpeakerModel from '../../../scenery-phet/js/accessibility/speaker/levelSpeakerModel.js';
import SelfVoicingInputListener from '../../../scenery-phet/js/accessibility/speaker/SelfVoicingInputListener.js';
import SelfVoicingQuickControl from '../../../scenery-phet/js/accessibility/speaker/SelfVoicingQuickControl.js';
import speakerHighlighter from '../../../scenery-phet/js/accessibility/speaker/speakerHighlighter.js';
import ResetAllButton from '../../../scenery-phet/js/buttons/ResetAllButton.js';
import sceneryPhetStrings from '../../../scenery-phet/js/sceneryPhetStrings.js';
import PDOMPeer from '../../../scenery/js/accessibility/pdom/PDOMPeer.js';
import webSpeaker from '../../../scenery/js/accessibility/speaker/webSpeaker.js';
import SwipeListener from '../../../scenery/js/listeners/SwipeListener.js';
import HBox from '../../../scenery/js/nodes/HBox.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Color from '../../../scenery/js/util/Color.js';
import ContinuousPropertySoundGenerator from '../../../tambo/js/sound-generators/ContinuousPropertySoundGenerator.js';
import soundManager from '../../../tambo/js/soundManager.js';
import VibrationTestEvent from '../../../tappi/js/tracking/VibrationTestEvent.js';
import VibrationTestEventRecorder from '../../../tappi/js/tracking/VibrationTestEventRecorder.js';
import VibrationTestInputListener from '../../../tappi/js/tracking/VibrationTestInputListener.js';
import VibrationManageriOS from '../../../tappi/js/VibrationManageriOS.js';
import tappiDialogController from '../../../tappi/js/view/tappiDialogController.js';
import GFLBConstants from '../GFLBConstants.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import gravityForceLabBasicsStrings from '../gravityForceLabBasicsStrings.js';
import GFLBForceDescriber from './describers/GFLBForceDescriber.js';
import GFLBMassDescriber from './describers/GFLBMassDescriber.js';
import GFLBPositionDescriber from './describers/GFLBPositionDescriber.js';
import DistanceArrowNode from './DistanceArrowNode.js';
import GFLBAlertManager from './GFLBAlertManager.js';
import GFLBCheckboxPanel from './GFLBCheckboxPanel.js';
import GFLBMassControl from './GFLBMassControl.js';
import GFLBMassDescriptionNode from './GFLBMassDescriptionNode.js';
import GFLBMassNode from './GFLBMassNode.js';
import vibrationController from './vibrationController.js';

const constantSizeString = gravityForceLabStrings.constantSize;
const distanceString = gravityForceLabBasicsStrings.distance;
const forceValuesString = inverseSquareLawCommonStrings.forceValues;
const mass1LabelString = gravityForceLabBasicsStrings.mass1Label;
const mass1String = gravityForceLabStrings.mass1;
const mass2LabelString = gravityForceLabBasicsStrings.mass2Label;
const mass2String = gravityForceLabStrings.mass2;
const mass1ControlLabelString = gravityForceLabBasicsStrings.mass1ControlLabel;
const mass2ControlLabelString = gravityForceLabBasicsStrings.mass2ControlLabel;
const massControlsLabelString = gravityForceLabStrings.a11y.controls.massControlsLabel;
const massControlsHelpTextBillionsString = gravityForceLabBasicsStrings.a11y.massControlsHelpTextBillions;
const massControlsHelpTextDensityBillionsString = gravityForceLabBasicsStrings.a11y.massControlsHelpTextDensityBillions;
const forceValuesCheckboxHelpTextString = inverseSquareLawCommonStrings.a11y.forceValuesCheckboxHelpText;
const constantSizeCheckboxHelpTextString = gravityForceLabStrings.a11y.controls.constantSizeCheckboxHelpText;
const distanceCheckboxHelpTextString = gravityForceLabBasicsStrings.a11y.distanceCheckboxHelpText;
const screenSummaryPlayAreaControlsString = gravityForceLabBasicsStrings.a11y.screenSummary.playAreaControls;
const basicsSimStateLabelString = gravityForceLabBasicsStrings.a11y.screenSummary.basicsSimStateLabel;
const verboseCheckedForceValuesCheckboxInteractionHintString = gravityForceLabBasicsStrings.a11y.selfVoicing.verboseCheckedForceValuesCheckboxInteractionHint;
const verboseUncheckedForceValuesCheckboxInteractionHintString = gravityForceLabBasicsStrings.a11y.selfVoicing.verboseUncheckedForceValuesCheckboxInteractionHint;
const verboseUncheckedDistanceCheckboxInteractionHintString = gravityForceLabBasicsStrings.a11y.selfVoicing.verboseUncheckedDistanceCheckboxInteractionHint;
const verboseCheckedDistanceCheckboxInteractionHintString = gravityForceLabBasicsStrings.a11y.selfVoicing.verboseCheckedDistanceCheckboxInteractionHint;
const verboseCheckedConstantSizeCheckboxInteractionHintString = gravityForceLabBasicsStrings.a11y.selfVoicing.verboseCheckedConstantSizeCheckboxInteractionHint;
const verboseUncheckedConstantSizeCheckboxInteractionHintString = gravityForceLabBasicsStrings.a11y.selfVoicing.verboseUncheckedConstantSizeCheckboxInteractionHint;
const selfVoicingResetString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.resetAll;
const selfVoicingResetVerboseString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.resetAllVerbose;
const redColorString = gravityForceLabBasicsStrings.a11y.selfVoicing.redColor;
const blueColorString = gravityForceLabBasicsStrings.a11y.selfVoicing.blueColor;
const resetAllString = sceneryPhetStrings.a11y.resetAll.label;
const detailsPatternString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.detailsPattern;
const overviewPatternString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.overviewPattern;
const screenSummarySingleScreenIntroPatternString = sceneryPhetStrings.a11y.selfVoicing.simSection.screenSummary.singleScreenIntroPattern;
const summaryInteractionHintPatternString = inverseSquareLawCommonStrings.a11y.screenSummary.summaryInteractionHintPattern;
const massString = gravityForceLabStrings.a11y.mass;
const screenSummaryPlayAreaOverviewPatternString = gravityForceLabBasicsStrings.a11y.screenSummary.playAreaOverviewPattern;
const screenSummarySecondaryDescriptionPatternString = gravityForceLabBasicsStrings.a11y.screenSummary.secondaryDescriptionPattern;
const thePlayAreaHasString = gravityForceLabBasicsStrings.a11y.screenSummary.thePlayAreaHas;
const thereAreString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.thereAre;
const inTheControlAreaString = gravityForceLabBasicsStrings.a11y.screenSummary.inTheControlArea;
const inAdditionString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.inAddition;
const moveMass1HintString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.moveMass1Hint;
const moveMass2HintString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.moveMass2Hint;
const changeMass1HintString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.changeMass1Hint;
const changeMass2HintString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.changeMass2Hint;

// constants
const MASS_CONTROLS_Y_POSITION = 385;
const PANEL_SPACING = 50;
const SHOW_GRID = ISLCQueryParameters.showGrid;
const SHOW_DRAG_BOUNDS = ISLCQueryParameters.showDragBounds;
const OBJECT_ONE = ISLCObjectEnum.OBJECT_ONE;
const OBJECT_TWO = ISLCObjectEnum.OBJECT_TWO;
const BOUNDARY_SOUNDS_LEVEL = 1;

class GFLBScreenView extends ScreenView {

  /**
   * @param {GFLBModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    // initialize a11y describers and alert manager
    const positionDescriber = new GFLBPositionDescriber( model, mass1LabelString, mass2LabelString );
    const forceDescriber = new GFLBForceDescriber( model, mass1LabelString, mass2LabelString, positionDescriber );
    const massDescriber = new GFLBMassDescriber( model, forceDescriber );
    const alertManager = new GFLBAlertManager( model, massDescriber, forceDescriber );

    const playAreaOverviewString = StringUtils.fillIn( screenSummaryPlayAreaOverviewPatternString, {
      playArea: thePlayAreaHasString
    } );

    const secondaryOverviewString = StringUtils.fillIn( screenSummarySecondaryDescriptionPatternString, {
      controlArea: inTheControlAreaString
    } );

    super( {
      layoutBounds: new Bounds2( 0, 0, 768, 464 ),
      screenSummaryContent: new GravityForceLabScreenSummaryNode( model, massDescriber, forceDescriber, positionDescriber, {
        screenSummaryPlayAreaOverview: playAreaOverviewString,
        screenSummaryPlayAreaControls: screenSummaryPlayAreaControlsString,
        secondaryDescriptionContent: secondaryOverviewString,
        simStateLabel: basicsSimStateLabelString,
        additionalMassDistanceProperties: [ model.showDistanceProperty ]
      } ),
      tandem: tandem
    } );

    // Create the model-view transform.  The primary units used in the model are meters, so significant zoom is used.
    // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model, which is
    // between the two masses.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2 ),
      0.05
    );

    // add the mass nodes to the view
    const mass1Node = new GFLBMassNode( model, model.object1, this.layoutBounds, modelViewTransform, alertManager,
      forceDescriber,
      positionDescriber, {
        label: mass1LabelString,
        otherObjectLabel: mass2LabelString,
        defaultDirection: DefaultDirection.LEFT,
        arrowColor: '#66F',
        forceArrowHeight: 125,
        objectColor: blueColorString,
        grabHintLabel: moveMass1HintString,
        tandem: tandem.createTandem( 'mass1Node' )
      } );

    const mass2Node = new GFLBMassNode( model, model.object2, this.layoutBounds, modelViewTransform, alertManager,
      forceDescriber,
      positionDescriber, {
        label: mass2LabelString,
        otherObjectLabel: mass1LabelString,
        defaultDirection: DefaultDirection.RIGHT,
        arrowColor: '#F66',
        forceArrowHeight: 175,
        objectColor: redColorString,
        grabHintLabel: moveMass2HintString,
        tandem: tandem.createTandem( 'mass2Node' )
      } );

    const massDescriptionNodeOptions = {
      object1Label: mass1LabelString,
      object2Label: mass2LabelString
    };

    // PDOM descriptions for each mass - the masses themselves leverage AccessibleValueHandler, but these
    // form descriptive summaries for the state of each mass
    const objectOneMassDescriptionNode = new GFLBMassDescriptionNode( model, model.object1, massDescriber, forceDescriber,
      positionDescriber, massDescriptionNodeOptions );
    const objectTwoMassDescriptionNode = new GFLBMassDescriptionNode( model, model.object2, massDescriber, forceDescriber,
      positionDescriber, massDescriptionNodeOptions );

    const massPositionsNode = new SpherePositionsDescriptionNode( model, positionDescriber, {
      additionalDescriptionDependencies: [ model.showDistanceProperty ]
    } );

    massPositionsNode.addChild( mass1Node );
    massPositionsNode.addChild( mass2Node );

    // the arrow nodes and their labels should be on top of the masses, but under the rest of the control panel
    massPositionsNode.addChild( mass1Node.arrowNode );
    massPositionsNode.addChild( mass2Node.arrowNode );

    // mass controls
    const massControl1 = new GFLBMassControl( mass1String, model.object1.valueProperty,
      GFLBConstants.MASS_RANGE, mass1ControlLabelString, OBJECT_ONE, alertManager,
      massDescriber, tandem.createTandem( 'massControl1' ), {
        changeMassHintString: changeMass1HintString
      } );
    const massControl2 = new GFLBMassControl( mass2String, model.object2.valueProperty,
      GFLBConstants.MASS_RANGE, mass2ControlLabelString, OBJECT_TWO, alertManager,
      massDescriber, tandem.createTandem( 'massControl2' ), {
        color: new Color( 255, 0, 0 ),
        changeMassHintString: changeMass2HintString
      } );

    const massControlsNode = new Node( {
      labelTagName: 'h3',
      labelContent: massControlsLabelString,
      tagName: 'div',
      descriptionContent: massControlsHelpTextBillionsString
    } );

    // The list of mass controls is aria-labelledby the its label sibling, see https://github.com/phetsims/gravity-force-lab/issues/132
    massControlsNode.addAriaLabelledbyAssociation( {
      otherNode: massControlsNode,
      otherElementName: PDOMPeer.LABEL_SIBLING,
      thisElementName: PDOMPeer.PRIMARY_SIBLING
    } );

    // place mass controls in an HBox
    const massControlBox = new HBox( {
      children: [ massControl1, massControl2 ],
      center: this.layoutBounds.center,
      spacing: PANEL_SPACING
    } );
    massControlsNode.addChild( massControlBox );

    model.constantRadiusProperty.link( constantRadius => {
      massControlsNode.descriptionContent = constantRadius ?
                                            massControlsHelpTextDensityBillionsString :
                                            massControlsHelpTextBillionsString;
    } );

    // sound generation for the mass values
    soundManager.addSoundGenerator( new MassSoundGenerator(
      model.object1.valueProperty,
      GFLBConstants.MASS_RANGE,
      model.resetInProgressProperty,
      { initialOutputLevel: 0.7 }
    ) );
    soundManager.addSoundGenerator( new MassSoundGenerator(
      model.object2.valueProperty,
      GFLBConstants.MASS_RANGE,
      model.resetInProgressProperty,
      { initialOutputLevel: 0.7 }
    ) );

    // @private - sound generation for the force sound
    this.forceSoundGenerator = new ContinuousPropertySoundGenerator(
      model.forceProperty,
      forceSound,
      new Range( model.getMinForce(), model.getMaxForce() ),
      {
        initialOutputLevel: 0.2,
        playbackRateCenterOffset: 0.122, // this is about 2 semitone, and was necessary to match original sound design
        resetInProgressProperty: model.resetInProgressProperty,
        trimSilence: false // a very precise sound file is used, so make sure it doesn't get changed
      }
    );
    soundManager.addSoundGenerator( this.forceSoundGenerator );

    // sound generation for masses reaching the inner or outer motion boundaries
    soundManager.addSoundGenerator( new MassBoundarySoundGenerator( model.object1, model, 'left', {
      initialOutputLevel: BOUNDARY_SOUNDS_LEVEL
    } ) );
    soundManager.addSoundGenerator( new MassBoundarySoundGenerator( model.object2, model, 'right', {
      initialOutputLevel: BOUNDARY_SOUNDS_LEVEL
    } ) );

    const checkboxItems = [
      {
        label: forceValuesString, property: model.showForceValuesProperty,
        checkedInteractionHint: verboseCheckedForceValuesCheckboxInteractionHintString,
        uncheckedInteractionHint: verboseUncheckedForceValuesCheckboxInteractionHintString,
        tandem: tandem.createTandem( 'forceValuesCheckbox' ),
        options: {
          accessibleName: forceValuesString,
          descriptionContent: forceValuesCheckboxHelpTextString
        }
      },
      {
        label: distanceString, property: model.showDistanceProperty,
        checkedInteractionHint: verboseCheckedDistanceCheckboxInteractionHintString,
        uncheckedInteractionHint: verboseUncheckedDistanceCheckboxInteractionHintString,
        tandem: tandem.createTandem( 'distanceCheckbox' ),
        options: {
          accessibleName: distanceString,
          descriptionContent: distanceCheckboxHelpTextString
        }
      },
      {
        label: constantSizeString, property: model.constantRadiusProperty,
        checkedInteractionHint: verboseCheckedConstantSizeCheckboxInteractionHintString,
        uncheckedInteractionHint: verboseUncheckedConstantSizeCheckboxInteractionHintString,
        tandem: tandem.createTandem( 'constantSizeCheckbox' ),
        options: {
          accessibleName: constantSizeString,
          descriptionContent: constantSizeCheckboxHelpTextString
        }
      }
    ];
    const parameterControlPanel = new GFLBCheckboxPanel( checkboxItems, {
      tandem: tandem.createTandem( 'parameterControlPanel' ),
      fill: '#f1f1f2'
    } );

    // arrow that shows distance between the two masses
    const distanceArrowNode = new DistanceArrowNode( model, modelViewTransform, positionDescriber, {
      tandem: tandem.createTandem( 'distanceArrowNode' ),
      y: 145
    } );
    model.showDistanceProperty.linkAttribute( distanceArrowNode, 'visible' );
    massPositionsNode.addChild( distanceArrowNode );

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: () => {

        if ( phet.chipper.queryParameters.supportsSelfVoicing ) {

          // as the simulation resets, do no not speak about changes
          phet.joist.sim.voicingUtteranceQueue.enabled = false;
        }

        model.reset();
        mass1Node.reset();
        mass2Node.reset();
        this.forceSoundGenerator.reset();

        if ( phet.chipper.queryParameters.supportsSelfVoicing ) {
          phet.joist.sim.voicingUtteranceQueue.enabled = true;

          if ( ISLCQueryParameters.selfVoicingVersion === 1 ) {
            webSpeaker.speak( selfVoicingResetString );
          }
          else {
            webSpeaker.speak( selfVoicingResetVerboseString );
          }
        }
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    // children
    this.pdomPlayAreaNode.children = [
      objectOneMassDescriptionNode,
      objectTwoMassDescriptionNode,
      massPositionsNode,
      massControlsNode
    ];

    this.pdomControlAreaNode.children = [
      parameterControlPanel,
      resetAllButton
    ];

    // layout the view elements
    parameterControlPanel.right = this.layoutBounds.width - 15;
    parameterControlPanel.bottom = MASS_CONTROLS_Y_POSITION;

    massControlBox.right = parameterControlPanel.left - PANEL_SPACING;
    massControlBox.top = parameterControlPanel.top;

    resetAllButton.right = parameterControlPanel.right;
    resetAllButton.top = parameterControlPanel.bottom + 13.5;

    //------------------------------------------------
    // debugging
    //------------------------------------------------

    if ( SHOW_DRAG_BOUNDS ) {
      this.addChild( new ISLCDragBoundsNode( model, this.layoutBounds, modelViewTransform ) );
    }

    if ( SHOW_GRID ) {
      const gridNode = new ISLCGridNode(
        model.snapObjectsToNearest,
        this.layoutBounds,
        modelViewTransform,
        { stroke: 'rgba( 250, 100, 100, 0.6 )' }
      );
      this.addChild( gridNode );
    }

    //------------------------------------------------
    // self-voicing prototype
    //------------------------------------------------
    if ( phet.chipper.queryParameters.supportsSelfVoicing ) {
      webSpeaker.initialize();
      speakerHighlighter.initialize();

      // add the swipe listener
      const swipeListener = new SwipeListener( phet.joist.display._input );
      levelSpeakerModel.gestureControlProperty.link( gestureControl => {
        swipeListener.enabled = gestureControl;
      } );

      // extra controls to speak about various things in the sim or quickly disable
      // the feature
      const selfVoicingQuickControl = new SelfVoicingQuickControl( webSpeaker, {
        createHintContent: () => {
          return StringUtils.fillIn(
            summaryInteractionHintPatternString,
            { massOrCharge: massString }
          );
        },
        createDetailsContent: () => {
          const simStateText = basicsSimStateLabelString;
          const summaryText = forceDescriber.getForceVectorsSummaryText();
          const distanceText = positionDescriber.getObjectDistanceSummary();
          const massText = massDescriber.getMassValuesSummaryText();
          const robotText = forceDescriber.getRobotEffortSummaryText();

          return StringUtils.fillIn( detailsPatternString, {
            simState: simStateText,
            summary: summaryText,
            distance: distanceText,
            mass: massText,
            robot: robotText
          } );
        },
        createOverviewContent: () => {
          const simDescriptionString = StringUtils.fillIn( screenSummarySingleScreenIntroPatternString, {
            sim: phet.joist.sim.simNameProperty.get()
          } );

          const playAreaDescriptionString = StringUtils.fillIn( screenSummaryPlayAreaOverviewPatternString, {
            playArea: thereAreString
          } );

          const controlsDescriptionString = StringUtils.fillIn( screenSummarySecondaryDescriptionPatternString, {
            controlArea: inAdditionString
          } );

          return StringUtils.fillIn( overviewPatternString, {
            simDescription: simDescriptionString,
            playArea: playAreaDescriptionString,
            spheres: screenSummaryPlayAreaControlsString,
            controls: controlsDescriptionString
          } );
        },
        leftBottom: this.layoutBounds.leftBottom.minusXY( -8, 8 )
      } );
      this.addChild( selfVoicingQuickControl );

      resetAllButton.addInputListener( new SelfVoicingInputListener( {
        onFocusIn: () => {

          // on focus, speak the name of the reset all button
          phet.joist.sim.voicingUtteranceQueue.addToBack( levelSpeakerModel.collectResponses( resetAllString ) );
        },
        highlightTarget: resetAllButton
      } ) );

      this.addChild( mass1Node.selfVoicingWrapper );
      this.addChild( mass2Node.selfVoicingWrapper );
      this.addChild( distanceArrowNode.selfVoicingWrapper );

      // in this mode, focus just goes from top to bottom, but starting with the quick control
      // to guide the user to hear details about the simulation first
      massPositionsNode.pdomOrder = [ selfVoicingQuickControl, mass2Node.selfVoicingWrapper, mass1Node.selfVoicingWrapper, distanceArrowNode.selfVoicingWrapper, null ];

      // dialogs to enable the feature and introduce custom gestures
      tappiDialogController.initialize( selfVoicingQuickControl );
    }

    if ( phet.chipper.queryParameters.vibrationParadigm ) {

      // sends messages to the containing Swift app
      const vibrationManager = new VibrationManageriOS();

      // the vibration controller for this simulation
      vibrationController.initialize( vibrationManager, model );

      // collection of input and simulation events that will be recorded during user interaction
      this.eventRecorder = new VibrationTestEventRecorder( vibrationManager );

      // listener that watches finger/touch input and saves to the event recorder
      this.vibrationTestInputListener = new VibrationTestInputListener( this.eventRecorder );
      phet.joist.display.addInputListener( this.vibrationTestInputListener );

      // sim specific events that we want to record
      model.object1.valueProperty.lazyLink( value => {
        this.eventRecorder.addTestEvent( new VibrationTestEvent( value, null, this.vibrationTestInputListener.elapsedTime, 'Mass 1 Value' ) );
      } );

      model.object2.valueProperty.lazyLink( value => {
        this.eventRecorder.addTestEvent( new VibrationTestEvent( value, null, this.vibrationTestInputListener.elapsedTime, 'Mass 2 Value' ) );
      } );

      model.object1.positionProperty.lazyLink( value => {
        this.eventRecorder.addTestEvent( new VibrationTestEvent( value, null, this.vibrationTestInputListener.elapsedTime, 'Moving Mass 1' ) );
      } );

      model.object2.positionProperty.lazyLink( value => {
        this.eventRecorder.addTestEvent( new VibrationTestEvent( value, null, this.vibrationTestInputListener.elapsedTime, 'Moving Mass 2' ) );
      } );

      model.constantRadiusProperty.lazyLink( constantRadius => {
        this.eventRecorder.addTestEvent( new VibrationTestEvent( constantRadius, null, this.vibrationTestInputListener.elapsedTime, 'Constant Radius' ) );
      } );

      model.showDistanceProperty.lazyLink( showDistance => {
        this.eventRecorder.addTestEvent( new VibrationTestEvent( showDistance, null, this.vibrationTestInputListener.elapsedTime, 'Show Distance' ) );
      } );

      model.showForceValuesProperty.lazyLink( showForceValues => {
        this.eventRecorder.addTestEvent( new VibrationTestEvent( showForceValues, null, this.vibrationTestInputListener.elapsedTime, 'Show Force Values' ) );
      } );

      model.resetInProgressProperty.lazyLink( inProgress => {
        this.eventRecorder.addTestEvent( new VibrationTestEvent( null, null, this.vibrationTestInputListener.elapsedTime, 'Reset All' ) );
      } );
    }
  }

  /**
   * step the view
   * @param {number} dt
   * @public
   */
  step( dt ) {
    this.forceSoundGenerator.step( dt );

    if ( this.vibrationTestInputListener ) {
      this.vibrationTestInputListener.setElapsedTime( this.vibrationTestInputListener.elapsedTime + dt );
    }
  }
}

gravityForceLabBasics.register( 'GFLBScreenView', GFLBScreenView );
export default GFLBScreenView;