// Copyright 2018-2020, University of Colorado Boulder

/**
 * This alert manager is responsible for all gravity-force-lab-basics specific aria-live alerts.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import GravityForceLabAlertManager from '../../../gravity-force-lab/js/view/GravityForceLabAlertManager.js';
import ISLCQueryParameters from '../../../inverse-square-law-common/js/ISLCQueryParameters.js';
import webSpeaker from '../../../inverse-square-law-common/js/view/webSpeaker.js';
import ActivationUtterance from '../../../utterance-queue/js/ActivationUtterance.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import gravityForceLabBasicsStrings from '../gravityForceLabBasicsStrings.js';

// a11y strings
const distanceArrowVisibleString = gravityForceLabBasicsStrings.a11y.distanceArrowVisible;
const distanceArrowRemovedString = gravityForceLabBasicsStrings.a11y.distanceArrowRemoved;

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

    // PROTOTYPE SELF VOICING FEATURE - when these Properties change, alert change to the user
    if ( ISLCQueryParameters.selfVoicing ) {
      model.showForceValuesProperty.lazyLink( showForceValues => {
        if ( webSpeaker.getExploreModeVerbose() ) {
          webSpeaker.speak( this.getShowForceValuesAlert( showForceValues ) );
        }
      } );

      model.showDistanceProperty.lazyLink( showDistance => {
        if ( webSpeaker.getExploreModeVerbose() ) {
          webSpeaker.speak( this.getDistanceVisibleAlert( showDistance ) );
        }
      } );

      model.constantRadiusProperty.lazyLink( constantRadius => {
        if ( webSpeaker.getExploreModeVerbose() ) {
          webSpeaker.speak( this.getConstantRadiusAlert( constantRadius ) );
        }
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
}

gravityForceLabBasics.register( 'GFLBAlertManager', GFLBAlertManager );
export default GFLBAlertManager;