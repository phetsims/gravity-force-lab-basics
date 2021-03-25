// Copyright 2018-2020, University of Colorado Boulder

/**
 * This alert manager is responsible for all gravity-force-lab-basics specific aria-live alerts.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import GravityForceLabAlertManager from '../../../gravity-force-lab/js/view/GravityForceLabAlertManager.js';
import levelSpeakerModel from '../../../scenery-phet/js/accessibility/speaker/levelSpeakerModel.js';
import ActivationUtterance from '../../../utterance-queue/js/ActivationUtterance.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import gravityForceLabBasicsStrings from '../gravityForceLabBasicsStrings.js';

const distanceArrowVisibleString = gravityForceLabBasicsStrings.a11y.distanceArrowVisible;
const distanceArrowRemovedString = gravityForceLabBasicsStrings.a11y.distanceArrowRemoved;

const voicingForceValuesShownString = gravityForceLabBasicsStrings.a11y.voicing.levels.forceValuesShown;
const voicingForceValuesHiddenString = gravityForceLabBasicsStrings.a11y.voicing.levels.forceValuesHidden;
const voicingDistanceShownString = gravityForceLabBasicsStrings.a11y.voicing.levels.distanceShown;
const voicingDistanceHiddenString = gravityForceLabBasicsStrings.a11y.voicing.levels.distanceHidden;
const voicingConstantSizeSetString = gravityForceLabBasicsStrings.a11y.voicing.levels.constantSizeSet;
const voicingConstantSizeOffString = gravityForceLabBasicsStrings.a11y.voicing.levels.constantSizeOff;


class GFLBAlertManager extends GravityForceLabAlertManager {

  /**
   * @param {GFLBModel} model
   * @param {GFLBf} massDescriber
   * @param {GFLBForceDescriber} forceDescriber
   */
  constructor( model, massDescriber, forceDescriber ) {
    super( model, massDescriber, forceDescriber, {
      linkToForceValuesDisplayProperty: false, // opt out of REGULAR specific linking

      // by default the REGULAR version is different from this because of scientific notation
      showForceValuesListener: showValues => {
        this.alertShowForceValues( showValues );
      }
    } );

    // @private {Utterance}
    this.distanceVisibleUtterance = new ActivationUtterance();

    model.showDistanceProperty.lazyLink( showDistance => {
      this.alertDistanceVisible( showDistance );
    } );


    if ( phet.chipper.queryParameters.supportsVoicing ) {
      model.showForceValuesProperty.lazyLink( showForceValues => {
        const response = levelSpeakerModel.collectResponses( this.getVoicingShowForceValuesAlert( showForceValues ) );
        phet.joist.sim.voicingUtteranceQueue.addToBack( response );
      } );

      model.showDistanceProperty.lazyLink( showDistance => {
        const response = levelSpeakerModel.collectResponses( this.getVoicingDistanceVisibleAlert( showDistance ) );
        phet.joist.sim.voicingUtteranceQueue.addToBack( response );
      } );

      model.constantRadiusProperty.lazyLink( constantRadius => {
        const response = levelSpeakerModel.collectResponses( this.getVoicingConstantRadiusAlert( constantRadius ) );
        phet.joist.sim.voicingUtteranceQueue.addToBack( response );
      } );
    }
  }

  /**
   * @private
   * @param {boolean} showDistance
   */
  alertDistanceVisible( showDistance ) {
    this.distanceVisibleUtterance.alert = this.getDistanceVisibleAlert( showDistance );
    phet.joist.sim.utteranceQueue.addToBack( this.distanceVisibleUtterance );
  }

  /**
   * Get an alert that describes the changing visibility of the distance value.
   * @public
   *
   * @param {boolean} showDistance
   * @returns {string}
   */
  getDistanceVisibleAlert( showDistance ) {
    return showDistance ? distanceArrowVisibleString : distanceArrowRemovedString;
  }

  /**
   * Get a string for the self voicing prototype that describes the changing visibility of force values.
   * @private
   * @param {boolean} showForceValues
   * @returns {string}
   */
  getVoicingShowForceValuesAlert( showForceValues ) {
    return showForceValues ? voicingForceValuesShownString : voicingForceValuesHiddenString;
  }

  /**
   * Get a string for the self voicing prototype that describes the changing visibility of distance.
   * @private
   * @param {boolean} showDistance
   * @returns {string}
   */
  getVoicingDistanceVisibleAlert( showDistance ) {
    return showDistance ? voicingDistanceShownString : voicingDistanceHiddenString;
  }

  /**
   * Get a string for the self voicing prototype that describes the changing visibility of distance.
   * @private
   * @param {boolean} constantRadius
   * @returns {string}
   */
  getVoicingConstantRadiusAlert( constantRadius ) {
    return constantRadius ? voicingConstantSizeSetString : voicingConstantSizeOffString;
  }
}

gravityForceLabBasics.register( 'GFLBAlertManager', GFLBAlertManager );
export default GFLBAlertManager;