// Copyright 2019, University of Colorado Boulder

/**
 * This describer is responsible for all gravity-force-lab-basics specific string forming related to force.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const ForceDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ForceDescriber' );
  const GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBA11yStrings' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const Util = require( 'DOT/Util' );

  // a11y strings
  const forceArrowsCapitalizedString = GFLBA11yStrings.forceArrowsCapitalized.value;
  const forceArrowsString = GFLBA11yStrings.forceArrows.value;
  const arrowsString = GFLBA11yStrings.arrows.value;
  const basicsForceAndVectorPatternString = GFLBA11yStrings.basicsForceAndVectorPattern.value;
  const basicsForceVectorMagnitudeUnitsPatternString = GFLBA11yStrings.basicsForceVectorMagnitudeUnitsPattern.value;

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
     * These empirically determined values were designed, see https://docs.google.com/document/d/1HdDG9ds2MdbCb21l9qk3cI8yBQxK6-wBWNXC4Tloji8/edit#heading=h.gnyv76vd5fvr
     * @param {number} force in newtons
     * @param {number} numberOfRegions - for crosscheck
     * @returns {number}
     * @override
     */
    getForceVectorIndex( force, numberOfRegions ) {
      assert && assert( force >= .7, `unrecognized force value, smaller than expected: ${force}` );
      assert && assert( numberOfRegions === 7, 'If numberOfRegions changes, this function should too.' );

      if ( force <= 40.6 ) {
        return 0;
      }
      if ( force <= 250.3 ) {
        return 1;
      }
      if ( force <= 544.8 ) {
        return 2;
      }
      if ( force <= 888.6 ) {
        return 3;
      }
      if ( force <= 1261.6 ) {
        return 4;
      }
      if ( force <= 2059.9 ) {
        return 5;
      }
      if ( force <= 3949.2 ) {
        return 6;
      }
      assert && assert( false, `unexpected force: ${force}` );
    }
  }

  return gravityForceLabBasics.register( 'GFLBForceDescriber', GFLBForceDescriber );
} );