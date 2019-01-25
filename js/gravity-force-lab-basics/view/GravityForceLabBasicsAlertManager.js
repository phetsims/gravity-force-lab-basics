// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBA11yStrings' );
  // const GFLBForceDescriber = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/describers/GFLBForceDescriber' );
  const GFLBMassDescriber = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/describers/GFLBMassDescriber' );
  const GFLBPositionDescriber = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/describers/GFLBPositionDescriber' );
  const ISLCAlertManager = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCAlertManager' );
  // const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Utterance = require( 'SCENERY_PHET/accessibility/Utterance' );
  const utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );

  // strings
  const constantRadiusThinkDensityString = GravityForceLabA11yStrings.constantRadiusThinkDensity.value;
  const distanceArrowVisibleString = GFLBA11yStrings.distanceArrowVisible.value;
  const distanceArrowRemovedString = GFLBA11yStrings.distanceArrowRemoved.value;
  const massAndForceClausesPatternString = GravityForceLabA11yStrings.massAndForceClausesPattern.value;
  const massSizeRelativeSizePatternString = GravityForceLabA11yStrings.massSizeRelativeSizePattern.value;
  // const regionForceClausePatternString = ISLCA11yStrings.regionForceClausePattern.value;

  // constants
  const { OBJECT_ONE, OBJECT_TWO } = ISLCObjectEnum;

  class GravityForceLabBasicsAlertManager extends ISLCAlertManager {
    constructor( model ) {
      super( model );

      this.massDescriber = GFLBMassDescriber.getDescriber();
      // this.forceDescriber = GFLBForceDescriber.getDescriber();

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
      const alert = constantRadius ? constantRadiusThinkDensityString : this.massDescriber.getM1RelativeSize();
      const utterance = new Utterance( { alert, uniqueGroupId: 'constantRadius' } );
      utteranceQueue.addToBack( utterance );
    }

    alertDistanceVisible( showDistance ) {
      const alert = showDistance ? distanceArrowVisibleString : distanceArrowRemovedString;
      const utterance = new Utterance( { alert, uniqueGroupId: 'distanceVisible' } );
      utteranceQueue.addToBack( utterance );
    }

    alertMassControlFocus( objectEnum ) {
      const alert = this.getMassControlFocusAlertText( objectEnum );
      utteranceQueue.addToBack( alert );
    }

    alertMassValueChanged( objectEnum, value, oldValue ) {
      const alert = this.getMassValueChangedAlertText( objectEnum, value, oldValue );
      const utterance = new Utterance( { alert, uniqueGroupId: 'massChanged' } );
      utteranceQueue.addToBack( utterance );
    }

    alertPositionSliderFocused() {
      const alert = this.forceDescriber.getForceVectorSizeText();
      const utterance = new Utterance( { alert, uniqueGroupId: 'position' } );
      utteranceQueue.addToBack( utterance );
    }

    // alertPositionChanged( endAtEdge ) {
    //   const alert = this.getPositionChangedAlertText( endAtEdge );
    //   const utterance = new Utterance( { alert, uniqueGroupId: 'position' } );
    //   utteranceQueue.addToBack( utterance );
    // }
    //
    // alertPositionUnchanged() {
    //   const alert = this.getPositionUnchangedAlertText();
    //   const utterance = new Utterance( { alert, uniqueGroupId: 'position' } );
    //   utteranceQueue.addToBack( utterance );
    // }

    /**
     * Returns the filled-in string, '{{massValue}} kilograms, {{size}}, {{relativeSize}} {{otherObjectLabel}}'
     *
     * @param  {ISLCObjectEnum} objectEnum
     * @returns {string}
     */
    getMassControlFocusAlertText( objectEnum ) {
      const thisObjectMass = this.massDescriber.getObjectFromEnum( objectEnum ).valueProperty.get();
      const massValue = this.massDescriber.getFormattedMass( thisObjectMass );
      const size = this.massDescriber.getMassSize( thisObjectMass );
      const relativeSize = this.massDescriber.getMassRelativeSize( objectEnum );
      const otherObjectLabel = this.massDescriber.getOtherObjectLabelFromEnum( objectEnum );
      return StringUtils.fillIn( massSizeRelativeSizePatternString, { massValue, size, relativeSize, otherObjectLabel } );
    }

    getMassValueChangedAlertText( objectEnum, newMass, oldMass ) {
      const positionDescriber = GFLBPositionDescriber.getDescriber();

      let massClause = this.massDescriber.getMassChangeClause( objectEnum );

      if ( positionDescriber.massPushed ) {
        massClause = this.massDescriber.getMassChangesAndMovesClause( objectEnum, positionDescriber.pushedMassEnum );
      }

      let forceClause = this.forceDescriber.getVectorChangeClause();

      if ( this.model.forceValuesProperty.get() ) {
        forceClause = this.forceDescriber.getVectorChangeForcesNowClause();
      }

      return StringUtils.fillIn( massAndForceClausesPatternString, { massClause, forceClause } );
    }

    // getPositionChangedAlertText( endAtEdge ) {
    //   let alertText = this.forceDescriber.getVectorChangeText();
    //   let edgeAlertText = this.forceDescriber.getVectorSizeText();
    //
    //   if ( this.model.forceValuesProperty.get() ) {
    //     alertText = this.forceDescriber.getVectorChangeForcesNowText();
    //     edgeAlertText = this.forceDescriber.getVectorSizeForceValueText();
    //   }
    //
    //   return endAtEdge ? edgeAlertText : alertText;
    // }
    //
    // getPositionUnchangedAlertText() {
    //   const positionDescriber = GFLBPositionDescriber.getDescriber();
    //   const forceClause = this.forceDescriber.getVectorsAndForcesClause();
    //   const region = positionDescriber.qualitativeDistance;
    //   return StringUtils.fillIn( regionForceClausePatternString, { region, forceClause } );
    // }

    static getManager() {
      return ISLCAlertManager.getManager();
    }

    static initialize( model ) {
      const manager = new GravityForceLabBasicsAlertManager( model );
      return ISLCAlertManager.initialize( manager );
    }
  }

  return gravityForceLabBasics.register( 'GravityForceLabBasicsAlertManager', GravityForceLabBasicsAlertManager );
} );