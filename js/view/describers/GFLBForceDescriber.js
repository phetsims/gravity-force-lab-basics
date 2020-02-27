// Copyright 2019, University of Colorado Boulder

/**
 * This describer is responsible for all gravity-force-lab-basics specific string forming related to force.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import ForceDescriber from '../../../../inverse-square-law-common/js/view/describers/ForceDescriber.js';
import GFLBA11yStrings from '../../GFLBA11yStrings.js';
import gravityForceLabBasics from '../../gravityForceLabBasics.js';

// a11y strings
const forceArrowsCapitalizedString = GFLBA11yStrings.forceArrowsCapitalized.value;
const forceArrowsString = GFLBA11yStrings.forceArrows.value;
const arrowsString = GFLBA11yStrings.arrows.value;
const forceArrowCapitalizedString = GFLBA11yStrings.forceArrowCapitalized.value;
const sizeOfForceString = GFLBA11yStrings.sizeOfForce.value;

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
        return Utils.toFixedNumber( force, 1 );
      },

      forceVectorCapitalizedString: forceArrowCapitalizedString,
      forceMagnitudeString: sizeOfForceString,
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
    return 6;
  }
}

gravityForceLabBasics.register( 'GFLBForceDescriber', GFLBForceDescriber );
export default GFLBForceDescriber;