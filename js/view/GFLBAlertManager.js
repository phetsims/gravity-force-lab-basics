// Copyright 2018-2021, University of Colorado Boulder

/**
 * This alert manager is responsible for all gravity-force-lab-basics specific aria-live alerts.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import GravityForceLabAlertManager from '../../../gravity-force-lab/js/view/GravityForceLabAlertManager.js';
import ActivationUtterance from '../../../utterance-queue/js/ActivationUtterance.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import gravityForceLabBasicsStrings from '../gravityForceLabBasicsStrings.js';

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