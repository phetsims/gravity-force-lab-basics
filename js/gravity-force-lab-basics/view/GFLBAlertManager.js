// Copyright 2018-2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBA11yStrings' );
  const GFLBMassDescriber = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/describers/GFLBMassDescriber' );
  const ISLCAlertManager = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCAlertManager' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Utterance = require( 'SCENERY_PHET/accessibility/Utterance' );
  const utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );

  // strings
  const mass1LabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass1Label' );
  const mass2LabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass2Label' );

  // a11y strings
  const constantRadiusThinkDensityPatternString = GravityForceLabA11yStrings.constantRadiusThinkDensityPattern.value;
  const distanceArrowVisibleString = GFLBA11yStrings.distanceArrowVisible.value;
  const distanceArrowRemovedString = GFLBA11yStrings.distanceArrowRemoved.value;
  const massAndForceClausesPatternString = GravityForceLabA11yStrings.massAndForceClausesPattern.value;

  // constants
  const { OBJECT_ONE, OBJECT_TWO } = ISLCObjectEnum;
  const CONSTANT_RADIUS_ALERT = StringUtils.fillIn( constantRadiusThinkDensityPatternString, {
    mass1: mass1LabelString,
    mass2: mass2LabelString
  } );

  class GFLBAlertManager extends ISLCAlertManager {
    constructor( model ) {
      super( model );

      this.massDescriber = GFLBMassDescriber.getDescriber();

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
        this.alertMassValueChanged( OBJECT_ONE, value, newValue );
      } );

      model.object2.valueProperty.lazyLink( ( value, newValue ) => {
        this.alertMassValueChanged( OBJECT_TWO, value, newValue );
      } );
    }

    alertConstantRadius( constantRadius ) {
      const alert = constantRadius ? CONSTANT_RADIUS_ALERT : this.massDescriber.getM1RelativeSize();
      const utterance = new Utterance( { alert: alert, uniqueGroupId: 'constantRadius' } );
      utteranceQueue.addToBack( utterance );
    }

    alertDistanceVisible( showDistance ) {
      const alert = showDistance ? distanceArrowVisibleString : distanceArrowRemovedString;
      const utterance = new Utterance( { alert: alert, uniqueGroupId: 'distanceVisible' } );
      utteranceQueue.addToBack( utterance );
    }

    alertMassValueChanged( objectEnum, value, oldValue ) {
      const alert = this.getMassValueChangedAlertText( objectEnum, value, oldValue );
      const utterance = new Utterance( { alert: alert, uniqueGroupId: 'massChanged' } );
      utteranceQueue.addToBack( utterance );
    }

    alertPositionSliderFocused() {
      const alert = this.forceDescriber.getForceVectorSizeText();
      const utterance = new Utterance( { alert: alert, uniqueGroupId: 'position' } );
      utteranceQueue.addToBack( utterance );
    }

    /**
     * When mass control is focused, produce the same alert as when the position slider is focused
     */
    alertMassControlFocused() {
      this.alertPositionSliderFocused();
    }

    getMassValueChangedAlertText( objectEnum ) {

      let massClause = this.massDescriber.getMassChangeClause( objectEnum );

      // if changing the mass of an object caused one of the masses to move position
      if ( this.model.massWasPushed() ) {
        massClause = this.massDescriber.getMassChangesAndMovesClause( objectEnum );
        if ( this.model.pushedObjectEnumProperty.value !== objectEnum ) {
          massClause = this.massDescriber.getMassChangesAndMovesOtherClause( objectEnum );
        }
      }

      let forceClause = this.forceDescriber.getVectorChangeClause();

      if ( this.model.forceValuesProperty.get() ) {
        forceClause = this.forceDescriber.getVectorChangeForcesNowClause();
      }

      return StringUtils.fillIn( massAndForceClausesPatternString, {
        massClause: massClause,
        forceClause: forceClause
      } );
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