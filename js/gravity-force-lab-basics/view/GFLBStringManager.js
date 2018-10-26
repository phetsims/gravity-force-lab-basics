// Copyright 2017-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GravityForceLabBasicsConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsConstants' );
  const GravityForceLabStringManager = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabStringManager' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const Util = require( 'DOT/Util' );

  const { MASS_RANGE, PULL_FORCE_RANGE } = GravityForceLabBasicsConstants;
  const massToIndex = new LinearFunction( MASS_RANGE.min, MASS_RANGE.max, 0, 6 );
  const forceToIndex = new LinearFunction( PULL_FORCE_RANGE.min, PULL_FORCE_RANGE.max * 0.6, 0, 6, true );
  const forceToPullIndex = new LinearFunction( PULL_FORCE_RANGE.min, PULL_FORCE_RANGE.max, 6, 0, true );

  class GFLBStringManager extends GravityForceLabStringManager {

    constructor( model, object1Label, object2Label ) {
      super( model, object1Label, object2Label, {} );
    }

    // @override
    getDistanceIndex( distance ) {
      distance /= 1000;
      return super.getDistanceIndex( distance );
    }

    // @override
    getMassSizeIndex( mass ) {
      return Util.roundSymmetric( massToIndex( mass ) );
    }

    // @override
    getForceVectorIndex( force ) {
      return Util.roundSymmetric( forceToIndex( force ) );
    }

    // @override
    getEffortIndex( force ) {
      return Util.roundSymmetric( forceToPullIndex( force ) );
    }
  }

  return gravityForceLabBasics.register( 'GFLBStringManager', GFLBStringManager );
} );