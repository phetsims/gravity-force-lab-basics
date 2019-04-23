// Copyright 2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBA11yStrings' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GFLBConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBConstants' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const MassDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/MassDescriber' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  // string
  const mass1LabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass1Label' );
  const mass2LabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass2Label' );
  const massBillionsPatternString = GFLBA11yStrings.massBillionsPattern.value;

  // constants
  const { MASS_RANGE } = GFLBConstants;
  const massToIndex = new LinearFunction( MASS_RANGE.min, MASS_RANGE.max, 0, 6 );

  class GFLBMassDescriber extends MassDescriber {

    constructor( model ) {

      const options = {
        object1Label: mass1LabelString,
        object2Label: mass2LabelString,
        convertMassValue: mass => mass / GFLBConstants.BILLION_MULTIPLIER,
        formatMassValue: mass => StringUtils.fillIn( massBillionsPatternString, { mass: mass } )
      };

      super( model, options );
    }

    // @override
    getMassSizeIndex( mass ) {
      return Util.roundSymmetric( massToIndex( mass ) );
    }
  }

  return gravityForceLabBasics.register( 'GFLBMassDescriber', GFLBMassDescriber );
} );