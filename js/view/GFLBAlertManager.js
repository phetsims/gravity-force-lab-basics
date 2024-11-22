// Copyright 2018-2022, University of Colorado Boulder

/**
 * This alert manager is responsible for all gravity-force-lab-basics specific aria-live alerts.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import GravityForceLabAlertManager from '../../../gravity-force-lab/js/view/GravityForceLabAlertManager.js';
import merge from '../../../phet-core/js/merge.js';
import ActivationUtterance from '../../../utterance-queue/js/ActivationUtterance.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import GravityForceLabBasicsFluentMessages from '../GravityForceLabBasicsFluentMessages.js';
import GravityForceLabBasicsStrings from '../GravityForceLabBasicsStrings.js';

const distanceArrowVisibleString = GravityForceLabBasicsFluentMessages.distanceArrowVisibleMessageProperty;
const distanceArrowRemovedString = GravityForceLabBasicsFluentMessages.distanceArrowRemovedMessageProperty;

class GFLBAlertManager extends GravityForceLabAlertManager {

  /**
   * @param {GFLBModel} model
   * @param {GFLBForceDescriber} massDescriber
   * @param {GFLBForceDescriber} forceDescriber
   * @param {Object} [options]
   */
  constructor( model, massDescriber, forceDescriber, options ) {
    options = merge( {
      linkToForceValuesDisplayProperty: false, // opt out of REGULAR specific linking

      // by default the REGULAR version is different from this because of scientific notation
      showForceValuesListener: showValues => {
        this.alertShowForceValues( showValues );
      }
    }, options );
    super( model, massDescriber, forceDescriber, options );

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
    this.alertDescriptionUtterance( this.distanceVisibleUtterance );
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