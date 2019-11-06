// Copyright 2018-2019, University of Colorado Boulder

/**
 * This alert manager is responsible for all gravity-force-lab-basics specific aria-live alerts.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const ActivationUtterance = require( 'UTTERANCE_QUEUE/ActivationUtterance' );
  const GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBA11yStrings' );
  const GravityForceLabAlertManager = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabAlertManager' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );

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
        linkToScientificNotationProperty: false, // opt out of REGULAR specific linking

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
      phet.joist.sim.display.utteranceQueue.addToBack( this.distanceVisibleUtterance );
    }
  }

  return gravityForceLabBasics.register( 'GFLBAlertManager', GFLBAlertManager );
} );