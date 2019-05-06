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
  const forceArrowsCapitalizedString = GFLBA11yStrings.forceArrowsCapitalized.value;
  const forceArrowsString = GFLBA11yStrings.forceArrows.value;
  const arrowsString = GFLBA11yStrings.arrows.value;
  const basicsForceAndVectorPatternString = GFLBA11yStrings.basicsForceAndVectorPattern.value;
  const basicsForceVectorMagnitudeUnitsPatternString = GFLBA11yStrings.basicsForceVectorMagnitudeUnitsPattern.value;

  // constants
  const { PULL_FORCE_RANGE } = GFLBConstants;
  const forceToPullIndex = new LinearFunction( PULL_FORCE_RANGE.min, PULL_FORCE_RANGE.max, 6, 0, true );

  class GFLBForceDescriber extends ForceDescriber {

    /**
     * @param {GFLBModel} model
     * @param {string} object1Label
     * @param {string} object2Label
     * @param {PositionDescriber} positionDescriber
     */
    constructor( model, object1Label, object2Label, positionDescriber ) {
      const options = {
        convertForce: force => {
          return Util.toFixedNumber( force, 1 );
        },

        forceAndVectorPatternString: basicsForceAndVectorPatternString,
        forceVectorMagnitudeUnitsPatternString: basicsForceVectorMagnitudeUnitsPatternString,

        forceVectorsCapitalizedString: forceArrowsCapitalizedString,
        forceVectorsString: forceArrowsString,
        vectorsString: arrowsString,
        vectorsCapitalizedString: forceArrowsCapitalizedString
      };
      super( model, object1Label, object2Label, positionDescriber, options );
    }

    /**
     * @param {number} force in newtons
     * @returns {number}
     * @override
     */
    getForceVectorIndex( force ) {
      assert && assert( force >= .7, `unrecognized force value, smaller than expected: ${force}` );
      if ( force <= 85.4 ) {
        return 0;
      }
      if ( force <= 181.6 ) {
        return 1;
      }
      if ( force <= 278.1 ) {
        return 2;
      }
      if ( force <= 386.1 ) {
        return 3;
      }
      if ( force <= 486.1 ) {
        return 4;
      }
      if ( force <= 576.6 ) {
        return 5;
      }
      return 6;
    }

    // @override
    getEffortIndex( force ) {
      return Util.roundSymmetric( forceToPullIndex( force ) );
    }
  }

  return gravityForceLabBasics.register( 'GFLBForceDescriber', GFLBForceDescriber );
} );