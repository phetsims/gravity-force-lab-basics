// Copyright 2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBA11yStrings' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GravityForceLabPositionDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/GravityForceLabPositionDescriber' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  // strings
  const kilometerString = GFLBA11yStrings.kilometer.value;
  const kilometersString = GFLBA11yStrings.kilometers.value;

  // a11y strings
  const massesDistanceApartPatternString = GFLBA11yStrings.massesDistanceApartPattern.value;
  const spherePositionsDescriptionPatternString = GFLBA11yStrings.spherePositionsDescriptionPattern.value;
  const spherePositionHelpTextString = ISLCA11yStrings.spherePositionHelpText.value;

  class GFLBPositionDescriber extends GravityForceLabPositionDescriber {

    constructor( model, object1Label, object2Label ) {

      const options = {
        unit: kilometerString,
        units: kilometersString,
        centerOffset: 4800,
        convertDistanceMetric: distance => Util.toFixedNumber( distance / 1e3, 1 )
      };

      super( model, object1Label, object2Label, options );

      // link GFLB property to whether or now we use quantitative distance for alerts and value text
      model.showDistanceProperty.link( showDistance => {
        this.useQuantitativeDistance = showDistance;
      } );
    }

    /**
     * @public
     * @returns {string} - the help text for the sphere positions heading/container node
     */
    getSpherePositionsHelpText() {
      const quantitativeDistance = StringUtils.fillIn( massesDistanceApartPatternString, {
        distanceAndUnits: this.getDistanceAndUnits()
      } );

      return StringUtils.fillIn( spherePositionsDescriptionPatternString, {
        spherePositionsHelpText: spherePositionHelpTextString,
        distanceApart: this.useQuantitativeDistance ? quantitativeDistance : this.getQualitativeDistanceFromEachOther()
      } );
    }

    // @override
    getDistanceIndex( distance ) {
      assert && assert( distance > 0, 'Distance between spheres should always be positive.' );

      if ( distance === 9.6 ) {
        return 0;
      }
      if ( distance >= 9.0 ) {
        return 1;
      }
      if ( distance >= 7.6 ) {
        return 2;
      }
      if ( distance >= 6.1 ) {
        return 3;
      }
      if ( distance >= 4.6 ) {
        return 4;
      }
      if ( distance >= 3.1 ) {
        return 5;
      }
      if ( distance >= 2.0 ) {
        return 6;
      }
      if ( distance >= 1.4 ) {
        return 7;
      }

      // This is less than, because while fuzzing the distance can somehow go to 1.2, not sure how.
      if ( distance <= 1.3 ) {
        return 8;
      }
      assert && assert( false, `Invalid distance value: ${distance}` );
    }

    /**
     * Uses the singleton pattern to keep one instance of this describer for the entire lifetime of the sim.
     * @returns {GFLBPositionDescriber}
     */
    static getDescriber() {
      // assert && assert( describer, 'describer has not yet been initialized' );
      return GravityForceLabPositionDescriber.getDescriber();
    }

    /**
     * Initialize the describer singleton
     * @throws Error
     * @returns {GFLBPositionDescriber}
     */
    static initialize( model, object1Label, object2Label ) {
      // assert && assert( describer === null, 'cannot call initialize more than once per ForceDescriber instance' );
      const describer = new GFLBPositionDescriber( model, object1Label, object2Label );
      return GravityForceLabPositionDescriber.initialize( describer );
    }
  }

  return gravityForceLabBasics.register( 'GFLBPositionDescriber', GFLBPositionDescriber );
} );