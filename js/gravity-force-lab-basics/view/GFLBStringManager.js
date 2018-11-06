// Copyright 2017-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GravityForceLabBasicsA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsA11yStrings' );
  const GravityForceLabBasicsConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsConstants' );
  const GravityForceLabStringManager = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabStringManager' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  const { MASS_RANGE, PULL_FORCE_RANGE } = GravityForceLabBasicsConstants;
  const massToIndex = new LinearFunction( MASS_RANGE.min, MASS_RANGE.max, 0, 6 );
  const forceToIndex = new LinearFunction( PULL_FORCE_RANGE.min, PULL_FORCE_RANGE.max * 0.6, 0, 6, true );
  const forceToPullIndex = new LinearFunction( PULL_FORCE_RANGE.min, PULL_FORCE_RANGE.max, 6, 0, true );

  const massesDistanceApartPatternString = GravityForceLabBasicsA11yStrings.massesDistanceApartPattern.value;
  const unitsNewtonsString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.newtons' );

  class GFLBStringManager extends GravityForceLabStringManager {

    constructor( model, object1Label, object2Label ) {
      super( model, object1Label, object2Label, {
        distanceUnits: 'kilometers',
        centerOffset: 4800,
        valueUnits: unitsNewtonsString,
        convertForceValue: value => `${Util.toFixedNumber( value, 1 )} newtons`,
        convertDistanceApart: distance => Util.toFixedNumber( distance / 1e3, 1 ),
        formatMassValue: mass => `${mass/1e9} billion`, // TODO: convert to proper string usage
        formatPositionUnitMark: position => {
          position = Util.toFixedNumber( position / 1e3, 1 );
          return StringUtils.fillIn( '{{position}} kilometer', { position } );
        }
      } );
    }

    static getMassesDistanceApart( distance ) {
      return StringUtils.fillIn( massesDistanceApartPatternString, { distance } );
    }

    // TODO: proper string usage
    getOnlyQualitativeObjectDistanceSummary() {
      const pattern = '{{mass1}} and {{mass2}} are {{qualitativeDistance}} each other.';
      return StringUtils.fillIn( pattern, { mass1: this.object1Label, mass2: this.object2Label, qualitativeDistance: this.getQualitativeDistance() } );
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