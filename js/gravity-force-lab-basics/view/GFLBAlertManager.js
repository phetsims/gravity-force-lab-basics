// Copyright 2018-2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBA11yStrings' );
  const GravityForceLabAlertManager = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabAlertManager' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const Utterance = require( 'SCENERY_PHET/accessibility/Utterance' );
  const utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );

  // a11y strings
  const distanceArrowVisibleString = GFLBA11yStrings.distanceArrowVisible.value;
  const distanceArrowRemovedString = GFLBA11yStrings.distanceArrowRemoved.value;

  class GFLBAlertManager extends GravityForceLabAlertManager {

    /**
     * @param {GFLBModel} model
     */
    constructor( model ) {
      super( model, {
        linkToScientificNotationProperty: false, // opt out of REGULAR specific linking

        // by default the REGULAR version is different from this because of scientific notation
        forceValuesListener: showValues => {
          this.alertForceValues( showValues );
        }
      } );

      // @private {Utterance}
      this.distanceVisibleUtterance = new Utterance();

      model.showDistanceProperty.lazyLink( showDistance => {
        this.alertDistanceVisible( showDistance );
      } );
    }

    /**
     * @private
     * @param {boolean} showDistance
     */
    alertDistanceVisible( showDistance ) {
      const alert = showDistance ? distanceArrowVisibleString : distanceArrowRemovedString;
      this.distanceVisibleUtterance.alert = alert;
      utteranceQueue.addToBack( this.distanceVisibleUtterance );
    }
  }

  return gravityForceLabBasics.register( 'GFLBAlertManager', GFLBAlertManager );
} );