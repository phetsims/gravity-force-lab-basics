// Copyright 2021-2025, University of Colorado Boulder

/**
 * Generates the content that is read by the Toolbar when the "Details", "Overview" and "Hint"
 * buttons are pressed. Generally very similar content to the GFLBScreenSummaryNode, and uses
 * the exact same content where possible.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import GravityForceLabStrings from '../../../../gravity-force-lab/js/GravityForceLabStrings.js';
import InverseSquareLawCommonStrings from '../../../../inverse-square-law-common/js/InverseSquareLawCommonStrings.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import SceneryPhetStrings from '../../../../scenery-phet/js/SceneryPhetStrings.js';
import gravityForceLabBasics from '../../gravityForceLabBasics.js';
import GravityForceLabBasicsStrings from '../../GravityForceLabBasicsStrings.js';

// constants
const singleScreenIntroPatternStringProperty = SceneryPhetStrings.a11y.voicing.simSection.screenSummary.singleScreenIntroPatternStringProperty;
const overviewPatternString = GravityForceLabBasicsStrings.a11y.voicing.voicingToolbar.overviewPattern;
const thereAreString = GravityForceLabBasicsStrings.a11y.voicing.voicingToolbar.thereAre;
const playAreaOverviewPatternString = GravityForceLabBasicsStrings.a11y.screenSummary.playAreaOverviewPattern;
const playAreaControlsString = GravityForceLabBasicsStrings.a11y.screenSummary.playAreaControls;
const inAdditionString = GravityForceLabBasicsStrings.a11y.voicing.voicingToolbar.inAddition;
const secondaryDescriptionPatternString = GravityForceLabBasicsStrings.a11y.screenSummary.secondaryDescriptionPattern;
const detailsPatternString = GravityForceLabBasicsStrings.a11y.voicing.voicingToolbar.detailsPattern;
const basicsSimStateLabelString = GravityForceLabBasicsStrings.a11y.screenSummary.basicsSimStateLabel;
const summaryInteractionHintPatternString = InverseSquareLawCommonStrings.a11y.screenSummary.summaryInteractionHintPattern;
const massString = GravityForceLabStrings.a11y.mass;

class GFLBVoicingSummaryDescriber {

  /**
   * @param {ForceDescriber} forceDescriber
   * @param {PositionDescriber} positionDescriber
   * @param {MassDescriber} massDescriber
   */
  constructor( forceDescriber, positionDescriber, massDescriber ) {

    // @private - Describers that generate up to date descriptions about the forces, masses,
    // and robot positions
    this.forceDescriber = forceDescriber;
    this.positionDescriber = positionDescriber;
    this.massDescriber = massDescriber;
  }

  /**
   * Creates the overview alert when the "Overview" button is pressed in the Sim Toolbar.
   * @public
   *
   * @returns {string}
   */

  createOverviewAlert() {
    const simDescriptionString = StringUtils.fillIn( singleScreenIntroPatternStringProperty, {
      sim: GravityForceLabBasicsStrings[ 'gravity-force-lab-basics' ].titleStringProperty
    } );
    const playAreaString = StringUtils.fillIn( playAreaOverviewPatternString, {
      playArea: thereAreString
    } );
    const spheresString = playAreaControlsString;
    const controlsString = StringUtils.fillIn( secondaryDescriptionPatternString, {
      controlArea: inAdditionString
    } );
    return StringUtils.fillIn( overviewPatternString, {
      simDescription: simDescriptionString,
      playArea: playAreaString,
      spheres: spheresString,
      controls: controlsString
    } );
  }

  /**
   * Create the Details content for when the details button is pressed in the Simulation Toolbar.
   * @public
   *
   * @returns {string}
   */
  createDetailsAlert() {
    const simStateString = basicsSimStateLabelString;
    const forceItem = this.forceDescriber.getForceVectorsSummaryText();
    const distanceItem = this.positionDescriber.getObjectDistanceSummary();
    const massItem = this.massDescriber.getMassValuesSummaryText();
    const robotItem = this.forceDescriber.getRobotEffortSummaryText();
    return StringUtils.fillIn( detailsPatternString, {
      simState: simStateString,
      force: forceItem,
      distance: distanceItem,
      mass: massItem,
      robot: robotItem
    } );
  }

  /**
   * Create the content for when the hint button is pressed in the Toolbar.
   * @public
   *
   * @returns {string}
   */
  createHintAlert() {
    return StringUtils.fillIn( summaryInteractionHintPatternString, {
      massOrCharge: massString
    } );
  }
}

gravityForceLabBasics.register( 'GFLBVoicingSummaryDescriber', GFLBVoicingSummaryDescriber );
export default GFLBVoicingSummaryDescriber;