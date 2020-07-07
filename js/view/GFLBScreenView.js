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
import focusSpeaker from '../../../inverse-square-law-common/js/view/FocusSpeaker.js';
import ISLCDragBoundsNode from '../../../inverse-square-law-common/js/view/ISLCDragBoundsNode.js';
import ISLCGridNode from '../../../inverse-square-law-common/js/view/ISLCGridNode.js';
import ISLCObjectEnum from '../../../inverse-square-law-common/js/view/ISLCObjectEnum.js';
import levelSpeakerModel from '../../../inverse-square-law-common/js/view/levelSpeakerModel.js';
import webSpeaker from '../../../inverse-square-law-common/js/view/webSpeaker.js';
import ScreenView from '../../../joist/js/ScreenView.js';
import ModelViewTransform2 from '../../../phetcommon/js/view/ModelViewTransform2.js';
import ResetAllButton from '../../../scenery-phet/js/buttons/ResetAllButton.js';
import PDOMPeer from '../../../scenery/js/accessibility/pdom/PDOMPeer.js';
import HBox from '../../../scenery/js/nodes/HBox.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Color from '../../../scenery/js/util/Color.js';
import ContinuousPropertySoundGenerator from '../../../tambo/js/sound-generators/ContinuousPropertySoundGenerator.js';
import soundManager from '../../../tambo/js/soundManager.js';
import GFLBConstants from '../GFLBConstants.js';
import gravityForceLabBasicsStrings from '../gravityForceLabBasicsStrings.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import GFLBForceDescriber from './describers/GFLBForceDescriber.js';
import GFLBMassDescriber from './describers/GFLBMassDescriber.js';
import GFLBPositionDescriber from './describers/GFLBPositionDescriber.js';
import DistanceArrowNode from './DistanceArrowNode.js';
import GFLBAlertManager from './GFLBAlertManager.js';
import GFLBCheckboxPanel from './GFLBCheckboxPanel.js';
import GFLBMassControl from './GFLBMassControl.js';
import GFLBMassDescriptionNode from './GFLBMassDescriptionNode.js';
import GFLBMassNode from './GFLBMassNode.js';
import ShapeHitDetector from '../../../tappi/js/view/ShapeHitDetector.js';

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
const screenSummaryPlayAreaOverviewString = gravityForceLabBasicsStrings.a11y.screenSummary.playAreaOverview;
const screenSummaryPlayAreaControlsString = gravityForceLabBasicsStrings.a11y.screenSummary.playAreaControls;
const screenSummarySecondaryDescriptionString = gravityForceLabBasicsStrings.a11y.screenSummary.secondaryDescription;
const basicsSimStateLabelString = gravityForceLabBasicsStrings.a11y.screenSummary.basicsSimStateLabel;
const verboseCheckedForceValuesCheckboxInteractionHintString = gravityForceLabBasicsStrings.a11y.selfVoicing.verboseCheckedForceValuesCheckboxInteractionHint;
const verboseUncheckedForceValuesCheckboxInteractionHintString = gravityForceLabBasicsStrings.a11y.selfVoicing.verboseUncheckedForceValuesCheckboxInteractionHint;
const verboseUncheckedDistanceCheckboxInteractionHintString = gravityForceLabBasicsStrings.a11y.selfVoicing.verboseUncheckedDistanceCheckboxInteractionHint;
const verboseCheckedDistanceCheckboxInteractionHintString = gravityForceLabBasicsStrings.a11y.selfVoicing.verboseCheckedDistanceCheckboxInteractionHint;
const verboseCheckedConstantSizeCheckboxInteractionHintString = gravityForceLabBasicsStrings.a11y.selfVoicing.verboseCheckedConstantSizeCheckboxInteractionHint;
const verboseUncheckedConstantSizeCheckboxInteractionHintString = gravityForceLabBasicsStrings.a11y.selfVoicing.verboseUncheckedConstantSizeCheckboxInteractionHint;
const selfVoicingResetString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.resetAll;
const redColorString = gravityForceLabBasicsStrings.a11y.selfVoicing.redColor;
const blueColorString = gravityForceLabBasicsStrings.a11y.selfVoicing.blueColor;

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

    super( {
      layoutBounds: new Bounds2( 0, 0, 768, 464 ),
      screenSummaryContent: new GravityForceLabScreenSummaryNode( model, massDescriber, forceDescriber, positionDescriber, {
        screenSummaryPlayAreaOverview: screenSummaryPlayAreaOverviewString,
        screenSummaryPlayAreaControls: screenSummaryPlayAreaControlsString,
        secondaryDescriptionContent: screenSummarySecondaryDescriptionString,
        simStateLabel: basicsSimStateLabelString,
        additionalMassDistanceProperties: [ model.showDistanceProperty ]
      } )
    } );

    // @public - PROTOTYPE a11y code, detects if the pointer is over various Nodes and Shapes in the screen view, to
    // support self-voicing speech output.
    this.shapeHitDetector = new ShapeHitDetector( this, {

      // for self-voicing, we want to speek when the pointer is over elements, not down on them
      hitOnOver: true
    } );
    this.addInputListener( this.shapeHitDetector );

    // Create the model-view transform.  The primary units used in the model are meters, so significant zoom is used.
    // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model, which is
    // between the two masses.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2 ),
      .05
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
        shapeHitDetector: this.shapeHitDetector,
        objectColor: blueColorString,
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
        shapeHitDetector: this.shapeHitDetector,
        objectColor: redColorString,
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
        shapeHitDetector: this.shapeHitDetector
      } );
    const massControl2 = new GFLBMassControl( mass2String, model.object2.valueProperty,
      GFLBConstants.MASS_RANGE, mass2ControlLabelString, OBJECT_TWO, alertManager,
      massDescriber, tandem.createTandem( 'massControl2' ), {
        color: new Color( 255, 0, 0 ),
        shapeHitDetector: this.shapeHitDetector
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
      model.resetInProgressProperty,
      {
        initialOutputLevel: 0.2,
        playbackRateCenterOffset: 0.122 // this is about 2 semitone, and was necessary to match original sound design
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
      fill: '#f1f1f2',
      shapeHitDetector: this.shapeHitDetector
    } );

    // arrow that shows distance between the two masses
    const distanceArrowNode = new DistanceArrowNode( model, modelViewTransform, {
      tandem: tandem.createTandem( 'distanceArrowNode' ),
      y: 145,
      shapeHitDetector: this.shapeHitDetector
    } );
    model.showDistanceProperty.linkAttribute( distanceArrowNode, 'visible' );
    massPositionsNode.addChild( distanceArrowNode );

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: () => {

        // as the simulation resets, do no not speak about changes
        webSpeaker.enabled = false;

        model.reset();
        mass1Node.reset();
        mass2Node.reset();
        this.forceSoundGenerator.reset();

        webSpeaker.enabled = true;
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
    if ( ISLCQueryParameters.selfVoicing === 'paradigm2' || ISLCQueryParameters.selfVoicing === 'paradigm3' ) {

      // the 'levels' and 'minimalLevels' prototype behave the same, except that the distanceArrowNode is removed from
      // focus order in '
      this.shapeHitDetector.addNode( resetAllButton );
      levelSpeakerModel.setNodeInteractive( resetAllButton, true );
      this.shapeHitDetector.downOnHittableEmitter.addListener( hitTarget => {
        if ( levelSpeakerModel.objectChangesProperty.get() ) {
          if ( hitTarget === resetAllButton ) {
            webSpeaker.speak( selfVoicingResetString );
          }
        }
      } );

      // hit from the shape hit detector while it has keyboard focus, read name and value
      this.shapeHitDetector.hitShapeEmitter.addListener( hitTarget => {
        if ( hitTarget === resetAllButton && hitTarget.isFocused() ) {
          webSpeaker.speak( resetAllButton.innerContent );
        }
      } );

      // distance arrow node is not focusable in the 'minimal' levels prototype
      if ( ISLCQueryParameters.selfVoicing === 'paradigm2' ) {
        focusSpeaker.addNode( distanceArrowNode );
      }

      // in this mode, focus just goes from top to bottom
      massPositionsNode.accessibleOrder = [ mass2Node.arrowNode, mass1Node.arrowNode, distanceArrowNode, null ];
    }
  }

  /**
   * step the view
   * @param {number} dt
   * @public
   */
  step( dt ) {
    this.forceSoundGenerator.step( dt );
  }
}

gravityForceLabBasics.register( 'GFLBScreenView', GFLBScreenView );
export default GFLBScreenView;