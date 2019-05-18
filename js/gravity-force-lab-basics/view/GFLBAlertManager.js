// Copyright 2018-2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const ActivationUtterance = require( 'SCENERY_PHET/accessibility/ActivationUtterance' );
  const GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBA11yStrings' );
  const GravityForceLabAlertManager = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabAlertManager' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );

  // a11y strings
  const distanceArrowVisibleString = GFLBA11yStrings.distanceArrowVisible.value;
  const distanceArrowRemovedString = GFLBA11yStrings.distanceArrowRemoved.value;

  class GFLBAlertManager extends GravityForceLabAlertManager {

    /**
     * @param {GFLBModel} model
     * @param {GFLBMassDescriber} massDescriber
     * @param {GFLBForceDescriber} forceDescriber
     * @param {GFLBPositionDescriber} positionDescriber
     */
    constructor( model, massDescriber, forceDescriber, positionDescriber ) {
      super( model, massDescriber, forceDescriber, positionDescriber, {
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
      utteranceQueue.addToBack( this.distanceVisibleUtterance );
    }
  }

  return gravityForceLabBasics.register( 'GFLBAlertManager', GFLBAlertManager );
} );