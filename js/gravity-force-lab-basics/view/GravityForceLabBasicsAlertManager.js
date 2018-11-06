// Copyright 2017-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  // const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCAlertManager = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCAlertManager' );
  const Utterance = require( 'SCENERY_PHET/accessibility/Utterance' );
  const utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );

  // strings
  const constantRadiusThinkDensityString = GravityForceLabA11yStrings.constantRadiusThinkDensity.value;
  const massesDifferentSizesString = GravityForceLabA11yStrings.massesDifferentSizes.value;

  class GravityForceLabBasicsAlertManager extends ISLCAlertManager {
    constructor( model ) {
      super( model, {} );

      model.constantRadiusProperty.lazyLink( constantRadius => {
        this.alertConstantRadius( constantRadius );
      } );

      model.showDistanceProperty.lazyLink( showDistance => {
        this.alertDistanceVisible( showDistance );
      } );
    }

    alertConstantRadius( constantRadius ) {
      const alert = constantRadius ? constantRadiusThinkDensityString : massesDifferentSizesString;
      const utterance = new Utterance( { alert, uniqueGroupId: 'constantRadius' } );
      utteranceQueue.addToBack( utterance );
    }
    // TODO: proper string usage - wait until content is finalized
    alertDistanceVisible( showDistance ) {
      const alert = showDistance ? 'Distance arrow visible.' : 'Distance arrow removed.';
      const utterance = new Utterance( { alert, uniqueGroupId: 'distanceVisible' } );
      utteranceQueue.addToBack( utterance );
    }
  }

  return gravityForceLabBasics.register( 'GravityForceLabBasicsAlertManager', GravityForceLabBasicsAlertManager );
} );