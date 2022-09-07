// Copyright 2019-2020, University of Colorado Boulder

/**
 * This describer is responsible for all gravity-force-lab-basics specific string forming related to force.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import ForceDescriber from '../../../../inverse-square-law-common/js/view/describers/ForceDescriber.js';
import gravityForceLabBasics from '../../gravityForceLabBasics.js';
import GravityForceLabBasicsStrings from '../../GravityForceLabBasicsStrings.js';

const forceArrowsCapitalizedString = GravityForceLabBasicsStrings.a11y.forceArrowsCapitalized;
const forceArrowsString = GravityForceLabBasicsStrings.a11y.forceArrows;
const arrowsString = GravityForceLabBasicsStrings.a11y.arrows;
const forceArrowCapitalizedString = GravityForceLabBasicsStrings.a11y.forceArrowCapitalized;
const sizeOfForceString = GravityForceLabBasicsStrings.a11y.sizeOfForce;

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
   * @protected
   * @override
   */
  getForceVectorIndex( force, numberOfRegions ) {
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