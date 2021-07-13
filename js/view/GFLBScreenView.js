// Copyright 2016-2021, University of Colorado Boulder

/**
 * Main screen view for the simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
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
import ResetAllButton from '../../../scenery-phet/js/buttons/ResetAllButton.js';
import PDOMPeer from '../../../scenery/js/accessibility/pdom/PDOMPeer.js';
import HBox from '../../../scenery/js/nodes/HBox.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Color from '../../../scenery/js/util/Color.js';
import ContinuousPropertySoundGenerator from '../../../tambo/js/sound-generators/ContinuousPropertySoundGenerator.js';
import soundManager from '../../../tambo/js/soundManager.js';
import VibrationTestEvent from '../../../tappi/js/tracking/VibrationTestEvent.js';
import VibrationTestEventRecorder from '../../../tappi/js/tracking/VibrationTestEventRecorder.js';
import VibrationTestInputListener from '../../../tappi/js/tracking/VibrationTestInputListener.js';
import VibrationManageriOS from '../../../tappi/js/VibrationManageriOS.js';
import GFLBConstants from '../GFLBConstants.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import gravityForceLabBasicsStrings from '../gravityForceLabBasicsStrings.js';
import GFLBForceDescriber from './describers/GFLBForceDescriber.js';
import GFLBMassDescriber from './describers/GFLBMassDescriber.js';
import GFLBPositionDescriber from './describers/GFLBPositionDescriber.js';
import GFLBVoicingSummaryDescriber from './describers/GFLBVoicingSummaryDescriber.js';
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
const screenSummaryPlayAreaOverviewPatternString = gravityForceLabBasicsStrings.a11y.screenSummary.playAreaOverviewPattern;
const screenSummarySecondaryDescriptionPatternString = gravityForceLabBasicsStrings.a11y.screenSummary.secondaryDescriptionPattern;
const thePlayAreaHasString = gravityForceLabBasicsStrings.a11y.screenSummary.thePlayAreaHas;
const inTheControlAreaString = gravityForceLabBasicsStrings.a11y.screenSummary.inTheControlArea;

const forceValuesHintResponseString = gravityForceLabBasicsStrings.a11y.voicing.forceValuesHintResponse;
const distanceHintResponseString = gravityForceLabBasicsStrings.a11y.voicing.distanceHintResponse;
const constantSizeHintResponseString = gravityForceLabBasicsStrings.a11y.voicing.constantSizeHintResponse;

const forceValuesShownResponseString = gravityForceLabBasicsStrings.a11y.voicing.forceValuesShownResponse;
const forceValuesHiddenResponseString = gravityForceLabBasicsStrings.a11y.voicing.forceValuesHiddenResponse;
const distanceShownResponseString = gravityForceLabBasicsStrings.a11y.voicing.distanceShownResponse;
const distanceHiddenResponseString = gravityForceLabBasicsStrings.a11y.voicing.distanceHiddenResponse;
const constantSizeSetResponseString = gravityForceLabBasicsStrings.a11y.voicing.constantSizeSetResponse;
const constantSizeNotSetResponseString = gravityForceLabBasicsStrings.a11y.voicing.constantSizeNotSetResponse;

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

    // @private {GFLBVoicingSummaryDescriber} - Generates alerts for the Voicing feature from buttons in the Sim
    // Toolbar.
    this.voicingSummaryDescriber = new GFLBVoicingSummaryDescriber( forceDescriber, positionDescriber, massDescriber );

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
        tandem: tandem.createTandem( 'mass2Node' )
      } );

    const massDescriptionNodeOptions = {
      object1Label: mass1LabelString,
      object2Label: mass2LabelString
    };

    // pdom descriptions for each mass - the masses themselves leverage AccessibleValueHandler, but these
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
      massDescriber, tandem.createTandem( 'massControl1' ) );
    const massControl2 = new GFLBMassControl( mass2String, model.object2.valueProperty,
      GFLBConstants.MASS_RANGE, mass2ControlLabelString, OBJECT_TWO, alertManager,
      massDescriber, tandem.createTandem( 'massControl2' ), {
        color: new Color( 255, 0, 0 )
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
        options: {

          //phet-io
          tandem: tandem.createTandem( 'forceValuesCheckbox' ),

          accessibleName: forceValuesString,
          descriptionContent: forceValuesCheckboxHelpTextString,

          // voicing
          voicingNameResponse: forceValuesString,
          voicingHintResponse: forceValuesHintResponseString,
          voicingCheckedContextResponse: forceValuesShownResponseString,
          voicingUncheckedContextResponse: forceValuesHiddenResponseString
        }
      },
      {
        label: distanceString, property: model.showDistanceProperty,
        options: {

          // phet-io
          tandem: tandem.createTandem( 'distanceCheckbox' ),

          accessibleName: distanceString,
          descriptionContent: distanceCheckboxHelpTextString,

          // voicing
          voicingNameResponse: distanceString,
          voicingHintResponse: distanceHintResponseString,
          voicingCheckedContextResponse: distanceShownResponseString,
          voicingUncheckedContextResponse: distanceHiddenResponseString
        }
      },
      {
        label: constantSizeString, property: model.constantRadiusProperty,
        options: {

          // phet-io
          tandem: tandem.createTandem( 'constantSizeCheckbox' ),

          accessibleName: constantSizeString,
          descriptionContent: constantSizeCheckboxHelpTextString,

          // voicing
          voicingNameResponse: constantSizeString,
          voicingHintResponse: constantSizeHintResponseString,
          voicingCheckedContextResponse: constantSizeSetResponseString,
          voicingUncheckedContextResponse: constantSizeNotSetResponseString
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

        model.reset();
        mass1Node.reset();
        mass2Node.reset();
        this.forceSoundGenerator.reset();
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

    // voicing - when ReadingBlocks for the arrows are enabled, they should come before everything else, where top
    // most component vertically comes first
    massPositionsNode.pdomOrder = [
      mass2Node.arrowNode,
      mass1Node.arrowNode,
      mass1Node,
      mass2Node
    ];

    // layout the view elements
    parameterControlPanel.right = this.layoutBounds.width - 15;
    parameterControlPanel.bottom = MASS_CONTROLS_Y_POSITION;

    massControlBox.right = parameterControlPanel.left - PANEL_SPACING;
    massControlBox.top = parameterControlPanel.top;

    resetAllButton.right = parameterControlPanel.right;
    resetAllButton.top = parameterControlPanel.bottom + 13.5;

    // voicing - Update the voicingObjectResponse for each mass when any Property changes that would update the object
    // response
    Property.multilink( [ model.object1.positionProperty, model.object2.positionProperty, model.showDistanceProperty ], () => {
      mass1Node.voicingObjectResponse = mass1Node.ariaValueText;
      mass2Node.voicingObjectResponse = mass2Node.ariaValueText;
    } );

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
    // vibration prototype
    //------------------------------------------------
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

  /**
   * Returns the string to use for the "Overview" button of the simulation Toolbar when
   * this screen is active.
   * @public
   * @returns {string}
   */
  getVoicingOverviewContent() {
    return this.voicingSummaryDescriber.createOverviewAlert();
  }

  /**
   * Returns the string to speak when the "Details" button of the simulation Toolbar
   * is pressed when this screen is active.
   * @public
   * @returns {string}
   */
  getVoicingDetailsContent() {
    return this.voicingSummaryDescriber.createDetailsAlert();
  }

  /**
   * Returns the string to speak whe the "Hints" button of the simulation Toolbar
   * is pressed when this screen is active.
   * @public
   * @returns {string}
   */
  getVoicingHintContent() {
    return this.voicingSummaryDescriber.createHintAlert();
  }
}

gravityForceLabBasics.register( 'GFLBScreenView', GFLBScreenView );
export default GFLBScreenView;