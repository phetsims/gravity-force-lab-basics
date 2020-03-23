// Copyright 2019-2020, University of Colorado Boulder

/**
 * This describer is responsible for all gravity-force-lab-basics specific string forming related to position.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import GravityForceLabPositionDescriber
  from '../../../../gravity-force-lab/js/view/describers/GravityForceLabPositionDescriber.js';
import gravityForceLabBasics from '../../gravityForceLabBasics.js';
import gravityForceLabBasicsStrings from '../../gravity-force-lab-basics-strings.js';

// strings
const kilometerString = gravityForceLabBasicsStrings.a11y.kilometer;
const kilometersString = gravityForceLabBasicsStrings.a11y.kilometers;

class GFLBPositionDescriber extends GravityForceLabPositionDescriber {

  /**
   * @param {GFLBModel} model
   * @param {string} object1Label
   * @param {string} object2Label
   */
  constructor( model, object1Label, object2Label ) {

    const options = {
      unit: kilometerString,
      units: kilometersString,
      formatDisplayDistance: distance => Utils.toFixedNumber( distance / 1e3, 1 )
    };

    super( model, object1Label, object2Label, options );

    // private
    this.showDistanceProperty = model.showDistanceProperty;

    // link GFLB property to whether or now we use quantitative distance for alerts and value text
    // the GFLBPositionDescriber persists for life of sim and does not require disposal
    model.showDistanceProperty.link( showDistance => {
      this.useQuantitativeDistance = showDistance;
    } );
  }

  /**
   * These empirically determined values were designed, see https://docs.google.com/document/d/1HdDG9ds2MdbCb21l9qk3cI8yBQxK6-wBWNXC4Tloji8/edit#heading=h.gnyv76vd5fvr
   * @protected
   * @param {number} distance
   * @param {number} numberOfRegions - for crosscheck
   * @returns {number}
   * @override
   */
  getDistanceIndex( distance, numberOfRegions ) {
    assert && assert( distance > 0, 'Distance between spheres should always be positive.' );
    assert && assert( numberOfRegions === 9, 'If numberOfRegions changes, this function should too.' );

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
}

gravityForceLabBasics.register( 'GFLBPositionDescriber', GFLBPositionDescriber );
export default GFLBPositionDescriber;