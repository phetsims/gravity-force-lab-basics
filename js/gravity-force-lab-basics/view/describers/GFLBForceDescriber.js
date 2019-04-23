// Copyright 2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const ForceDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ForceDescriber' );
  const GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBA11yStrings' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GFLBConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBConstants' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const Util = require( 'DOT/Util' );

  // a11y strings
  const forceArrowsString = GFLBA11yStrings.forceArrows.value;
  const forceArrowsLowerString = GFLBA11yStrings.forceArrowsLower.value;
  const arrowsString = GFLBA11yStrings.arrows.value;
  const basicsForceAndVectorPatternString = GFLBA11yStrings.basicsForceAndVectorPattern.value;
  const basicsForceVectorMagnitudeUnitsPatternString = GFLBA11yStrings.basicsForceVectorMagnitudeUnitsPattern.value;

  // constants
  const { PULL_FORCE_RANGE } = GFLBConstants;
  const forceToIndex = new LinearFunction( PULL_FORCE_RANGE.min, PULL_FORCE_RANGE.max * 0.6, 0, 6, true );
  const forceToPullIndex = new LinearFunction( PULL_FORCE_RANGE.min, PULL_FORCE_RANGE.max, 6, 0, true );

  class GFLBForceDescriber extends ForceDescriber {

    constructor( model, object1Label, object2Label ) {
      const options = {
        convertForce: force => {
          return Util.toFixedNumber( force, 1 );
        },

        forceAndVectorPatternString: basicsForceAndVectorPatternString,
        forceVectorMagnitudeUnitsPatternString: basicsForceVectorMagnitudeUnitsPatternString,

        forceArrowsString: forceArrowsString,
        forceArrowsLower: forceArrowsLowerString,
        vectorsString: arrowsString,
        vectorsCapitalizedString: forceArrowsString
      };
      super( model, object1Label, object2Label, options );

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

  return gravityForceLabBasics.register( 'GFLBForceDescriber', GFLBForceDescriber );
} );