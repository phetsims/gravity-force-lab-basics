// Copyright 2020, University of Colorado Boulder

/**
 * Controls that appear if self-voicing content is enabled. Allows user to mute all speech.
 * Also has buttons to read other content.
 *
 * This is a prototype, and is still under active design and development.
 *
 * @author Jesse Greenberg
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import DynamicProperty from '../../../axon/js/DynamicProperty.js';
import Property from '../../../axon/js/Property.js';
import gravityForceLabStrings from '../../../gravity-force-lab/js/gravityForceLabStrings.js';
import inverseSquareLawCommonStrings from '../../../inverse-square-law-common/js/inverseSquareLawCommonStrings.js';
import webSpeaker from '../../../inverse-square-law-common/js/view/webSpeaker.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import sceneryPhetStrings from '../../../scenery-phet/js/sceneryPhetStrings.js';
import AlignGroup from '../../../scenery/js/nodes/AlignGroup.js';
import Image from '../../../scenery/js/nodes/Image.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../scenery/js/nodes/Rectangle.js';
import Spacer from '../../../scenery/js/nodes/Spacer.js';
import Text from '../../../scenery/js/nodes/Text.js';
import VBox from '../../../scenery/js/nodes/VBox.js';
import BooleanRectangularStickyToggleButton from '../../../sun/js/buttons/BooleanRectangularStickyToggleButton.js';
import RectangularPushButton from '../../../sun/js/buttons/RectangularPushButton.js';
import ExpandCollapseButton from '../../../sun/js/ExpandCollapseButton.js';
import Panel from '../../../sun/js/Panel.js';
import selfVoicingIconImage from '../../images/self-voicing-icon_png.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import gravityForceLabBasicsStrings from '../gravityForceLabBasicsStrings.js';

const basicsSimStateLabelString = gravityForceLabBasicsStrings.a11y.screenSummary.basicsSimStateLabel;

const massString = gravityForceLabStrings.a11y.mass;
const summaryInteractionHintPatternString = inverseSquareLawCommonStrings.a11y.screenSummary.summaryInteractionHintPattern;
const screenSummarySingleScreenIntroPatternString = sceneryPhetStrings.a11y.simSection.screenSummary.singleScreenIntroPattern;
const screenSummaryPlayAreaOverviewString = gravityForceLabBasicsStrings.a11y.screenSummary.playAreaOverview;
const screenSummaryPlayAreaControlsString = gravityForceLabBasicsStrings.a11y.screenSummary.playAreaControls;
const screenSummarySecondaryDescriptionString = gravityForceLabBasicsStrings.a11y.screenSummary.secondaryDescription;
const detailsPatternString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.detailsPattern;
const overviewPatternString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.overviewPattern;

class SelfVoicingQuickControl extends Node {

  /**
   * @param {WebSpeaker} webSpeaker
   * @param {ForceDescriber} forceDescriber
   * @param {MassDescriber} massDescriber
   * @param {PositionDescriber} positionDescriber
   * @param options
   */
  constructor( webSpeaker, forceDescriber, massDescriber, positionDescriber, options ) {
    super();

    this.forceDescriber = forceDescriber;
    this.massDescriber = massDescriber;
    this.positionDescriber = positionDescriber;

    // a placeholder icon until we get a more thorough design
    const iconImage = new Image( selfVoicingIconImage, {
      scale: 0.18
    } );

    // the ion contained in a rectangle grey rectangle
    const rectangleDimension = Math.max( iconImage.width, iconImage.height ) + 5;
    const iconRectangle = new Rectangle( 0, 0, rectangleDimension, rectangleDimension, 5, 5, {
      fill: 'rgba(99,99,99,1)'
    } );
    iconImage.center = iconRectangle.center;
    iconRectangle.addChild( iconImage );

    // the button expands/collapses the controls
    const openProperty = new BooleanProperty( false );
    const expandCollapseButton = new ExpandCollapseButton( openProperty, {
      sideLength: 20
    } );

    // creates content for each button and puts it into an AlignGroup so that
    // all buttons can have the same dimensions
    const alignGroup = new AlignGroup();
    const createSpeechButtonContent = buttonString => {
      return alignGroup.createBox( new Text( buttonString ) );
    };

    const hintButtonContent = createSpeechButtonContent( 'Hint Please!' );
    const simOverviewContent = createSpeechButtonContent( 'Sim Overview' );
    const detailsContent = createSpeechButtonContent( 'Current Details' );
    const stopSpeechContent = createSpeechButtonContent( 'Stop Speech' );

    // creates the actual button with provided content and behavior
    const createSpeechButton = ( buttonContent, listener ) => {
      return new RectangularPushButton( {
        content: buttonContent,
        listener: listener
      } );
    };

    // the webSpeaker uses enabledProperty, the push button uses "muted" terminology -
    // dynamic Property maps between the two so that the button can be pressed when
    // it it is actually not enabled
    const dynamicProperty = new DynamicProperty( new Property( webSpeaker.enabledProperty ), {
      bidirectional: true,
      map: enabled => !enabled,
      inverseMap: muted => !muted
    } );

    const hintButton = createSpeechButton( hintButtonContent, this.speakHintContent );
    const overviewButton = createSpeechButton( simOverviewContent, this.speakOverviewContent );
    const detailsButton = createSpeechButton( detailsContent, this.speakDetailsContent.bind( this ) );
    const muteSpeechButton = new BooleanRectangularStickyToggleButton( dynamicProperty, {
      content: stopSpeechContent
    } );

    // spacer is required to make room for the ExpandCollapseButton in the panel
    const spacer = new Spacer( 0, expandCollapseButton.height );
    const buttonGroup = new VBox( {
      children: [
        hintButton,
        overviewButton,
        detailsButton,
        muteSpeechButton,
        spacer
      ],
      spacing: 5
    } );
    const buttonsPanel = new Panel( buttonGroup, {
      backgroundPickable: true
    } );

    openProperty.link( open => buttonsPanel.setVisible( open ) );

    // layout - panel "opens upward" from the button - its bounds are not included
    // in layout so that this Node can be positioned relative to the always-visible
    // content, the panel can occlude other things
    this.excludeInvisibleChildrenFromBounds = true;
    expandCollapseButton.leftTop = iconRectangle.rightTop.plusXY( 6, 0 );
    buttonsPanel.leftBottom = expandCollapseButton.leftBottom.plusXY( -4, 4 );

    this.children = [
      iconRectangle,
      buttonsPanel,
      expandCollapseButton
    ];

    // mutate with options after Node has been assembled
    this.mutate( options );
  }

  // @private
  speakHintContent() {
    const hintContent = StringUtils.fillIn(
      summaryInteractionHintPatternString,
      { massOrCharge: massString }
    );

    webSpeaker.speak( hintContent );
  }

  // speak an overview summary - this is the content
  /**
   * Speak an overview summary for the sim, generally the content from GravityForceLabScreenSummaryNode
   * @private
   */
  speakOverviewContent() {
    const simDescriptionString = StringUtils.fillIn( screenSummarySingleScreenIntroPatternString, {
      sim: phet.joist.sim.simNameProperty.get()
    } );

    const playAreaDescriptionString = screenSummaryPlayAreaOverviewString;
    const controlsDescriptionString = screenSummaryPlayAreaControlsString;
    const controlAreaDescriptionString = screenSummarySecondaryDescriptionString;

    const overviewContent = StringUtils.fillIn( overviewPatternString, {
      simDescription: simDescriptionString,
      playArea: playAreaDescriptionString,
      controls: controlsDescriptionString,
      controlArea: controlAreaDescriptionString
    } );

    webSpeaker.speak( overviewContent );
  }

  /**
   * Speak details about the current state of the simulation. Pulls content that is used
   * in the screen summary and puts them together in a single paragraph.
   * @private
   */
  speakDetailsContent() {
    const simStateText = basicsSimStateLabelString;
    const summaryText = this.forceDescriber.getForceVectorsSummaryText();
    const distanceText = this.positionDescriber.getObjectDistanceSummary();
    const massText = this.massDescriber.getMassValuesSummaryText();
    const robotText = this.forceDescriber.getRobotEffortSummaryText();

    const detailsContent = StringUtils.fillIn( detailsPatternString,{
      simState: simStateText,
      summary: summaryText,
      distance: distanceText,
      mass: massText,
      robot: robotText
    } );

    webSpeaker.speak( detailsContent );
  }
}

gravityForceLabBasics.register( 'SelfVoicingQuickControl', SelfVoicingQuickControl );
export default SelfVoicingQuickControl;