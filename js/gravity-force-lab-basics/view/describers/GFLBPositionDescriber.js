// Copyright 2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBA11yStrings' );
  const GravityForceLabPositionDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/GravityForceLabPositionDescriber' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  // strings
  const kilometerString = GFLBA11yStrings.kilometer.value;
  const kilometersString = GFLBA11yStrings.kilometers.value;

  const massesDistanceApartPatternString = GFLBA11yStrings.massesDistanceApartPattern.value;
  const mass1Mass2QualitativeDistancePatternString = GFLBA11yStrings.mass1Mass2QualitativeDistancePattern.value;

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

    getOnlyQualitativeObjectDistanceSummary() {
      const pattern = mass1Mass2QualitativeDistancePatternString;
      return StringUtils.fillIn( pattern, {
        mass1: this.object1Label,
        mass2: this.object2Label,
        qualitativeDistance: this.qualitativeDistance
      } );
    }

    static getMassesDistanceApart( distance ) {
      return StringUtils.fillIn( massesDistanceApartPatternString, { distance: distance } );
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