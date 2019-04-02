// Copyright 2018-2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBA11yStrings' );
  const GravityForceLabAlertManager = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabAlertManager' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const ISLCAlertManager = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCAlertManager' );
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
          ISLCAlertManager.alertForceValues( showValues );
        }

      } );

      model.showDistanceProperty.lazyLink( showDistance => {
        GFLBAlertManager.alertDistanceVisible( showDistance );
      } );
    }

    /**
     * @private
     * @param {boolean} showDistance
     */
    static alertDistanceVisible( showDistance ) {
      const alert = showDistance ? distanceArrowVisibleString : distanceArrowRemovedString;
      const utterance = new Utterance( { alert: alert, uniqueGroupId: 'distanceVisible' } );
      utteranceQueue.addToBack( utterance );
    }

    static getManager() {
      return ISLCAlertManager.getManager();
    }

    static initialize( model ) {
      const manager = new GFLBAlertManager( model );
      return ISLCAlertManager.initialize( manager );
    }
  }

  return gravityForceLabBasics.register( 'GFLBAlertManager', GFLBAlertManager );
} );