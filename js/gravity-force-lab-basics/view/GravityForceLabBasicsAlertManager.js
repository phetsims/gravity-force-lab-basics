// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBA11yStrings' );
  const ISLCAlertManager = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCAlertManager' );
  const Utterance = require( 'SCENERY_PHET/accessibility/Utterance' );
  const utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );

  // strings
  const constantRadiusThinkDensityString = GravityForceLabA11yStrings.constantRadiusThinkDensity.value;
  const distanceArrowVisibleString = GFLBA11yStrings.distanceArrowVisible.value;
  const distanceArrowRemovedString = GFLBA11yStrings.distanceArrowRemoved.value;

  class GravityForceLabBasicsAlertManager extends ISLCAlertManager {
    constructor( model, stringManager ) {
      super( model, {} );

      this.stringManager = stringManager;

      model.constantRadiusProperty.lazyLink( constantRadius => {
        this.alertConstantRadius( constantRadius );
      } );

      model.showDistanceProperty.lazyLink( showDistance => {
        this.alertDistanceVisible( showDistance );
      } );

      model.forceValuesProperty.lazyLink( showValues => {
        ISLCAlertManager.alertForceValues( showValues );
      } );

      model.object1.valueProperty.lazyLink( ( value, newValue ) => {
        this.alertMassValueChanged( value, newValue );
      } );

      model.object2.valueProperty.lazyLink( ( value, newValue ) => {
        this.alertMassValueChanged( value, newValue );
      } );
    }

    alertConstantRadius( constantRadius ) {
      const alert = constantRadius ? constantRadiusThinkDensityString : this.stringManager.getM1RelativeSize();
      const utterance = new Utterance( { alert, uniqueGroupId: 'constantRadius' } );
      utteranceQueue.addToBack( utterance );
    }

    alertDistanceVisible( showDistance ) {
      const alert = showDistance ? distanceArrowVisibleString : distanceArrowRemovedString;
      const utterance = new Utterance( { alert, uniqueGroupId: 'distanceVisible' } );
      utteranceQueue.addToBack( utterance );
    }

    alertMassValueChanged( value, oldValue ) {
      const alert = this.stringManager.getMassValueChangedAlertText( value, oldValue );
      const utterance = new Utterance( { alert, uniqueGroupId: 'massChanged' } );
      utteranceQueue.addToBack( utterance );
    }

    alertPositionSliderFocused() {
      const alert = this.stringManager.getPositionFocusAlertText();
      const utterance = new Utterance( { alert, uniqueGroupId: 'positionSliderFocused' } );
      utteranceQueue.addToBack( utterance );
    }
  }

  return gravityForceLabBasics.register( 'GravityForceLabBasicsAlertManager', GravityForceLabBasicsAlertManager );
} );