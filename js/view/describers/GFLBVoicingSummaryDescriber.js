// Copyright 2021, University of Colorado Boulder

/**
 * Generates the content that is read by the Toolbar when the "Details", "Overview" and "Hint"
 * buttons are pressed. Generally very similar content to the GFLBScreenSummaryNode, and uses
 * the exact same content where possible.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import gravityForceLabStrings from '../../../../gravity-force-lab/js/gravityForceLabStrings.js';
import inverseSquareLawCommonStrings from '../../../../inverse-square-law-common/js/inverseSquareLawCommonStrings.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import sceneryPhetStrings from '../../../../scenery-phet/js/sceneryPhetStrings.js';
import gravityForceLabBasics from '../../gravityForceLabBasics.js';
import gravityForceLabBasicsStrings from '../../gravityForceLabBasicsStrings.js';

// constants
const singleScreenIntroPatternString = sceneryPhetStrings.a11y.voicing.simSection.screenSummary.singleScreenIntroPattern;
const overviewPatternString = gravityForceLabBasicsStrings.a11y.voicing.toolbar.overviewPattern;
const thereAreString = gravityForceLabBasicsStrings.a11y.voicing.toolbar.thereAre;
const playAreaOverviewPatternString = gravityForceLabBasicsStrings.a11y.screenSummary.playAreaOverviewPattern;
const playAreaControlsString = gravityForceLabBasicsStrings.a11y.screenSummary.playAreaControls;
const inAdditionString = gravityForceLabBasicsStrings.a11y.voicing.toolbar.inAddition;
const secondaryDescriptionPatternString = gravityForceLabBasicsStrings.a11y.screenSummary.secondaryDescriptionPattern;
const detailsPatternString = gravityForceLabBasicsStrings.a11y.voicing.toolbar.detailsPattern;
const basicsSimStateLabelString = gravityForceLabBasicsStrings.a11y.screenSummary.basicsSimStateLabel;
const summaryInteractionHintPatternString = inverseSquareLawCommonStrings.a11y.screenSummary.summaryInteractionHintPattern;
const massString = gravityForceLabStrings.a11y.mass;

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
  const simDescriptionString = StringUtils.fillIn( singleScreenIntroPatternString, {
      sim: gravityForceLabBasicsStrings[ 'gravity-force-lab-basics' ].title
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