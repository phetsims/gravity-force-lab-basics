// Copyright 2018-2020, University of Colorado Boulder

/**
 * This alert manager is responsible for all gravity-force-lab-basics specific aria-live alerts.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import GravityForceLabAlertManager from '../../../gravity-force-lab/js/view/GravityForceLabAlertManager.js';
import ActivationUtterance from '../../../utterance-queue/js/ActivationUtterance.js';
import GFLBA11yStrings from '../GFLBA11yStrings.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';

// a11y strings
const distanceArrowVisibleString = GFLBA11yStrings.distanceArrowVisible.value;
const distanceArrowRemovedString = GFLBA11yStrings.distanceArrowRemoved.value;

class GFLBAlertManager extends GravityForceLabAlertManager {

  /**
   * @param {GFLBModel} model
   * @param {GFLBMassDescriber} massDescriber
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
  }

  /**
   * @private
   * @param {boolean} showDistance
   */
  alertDistanceVisible( showDistance ) {
    this.distanceVisibleUtterance.alert = showDistance ? distanceArrowVisibleString : distanceArrowRemovedString;
    phet.joist.sim.utteranceQueue.addToBack( this.distanceVisibleUtterance );
  }
}

gravityForceLabBasics.register( 'GFLBAlertManager', GFLBAlertManager );
export default GFLBAlertManager;