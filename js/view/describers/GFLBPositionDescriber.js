// Copyright 2019-2021, University of Colorado Boulder

/**
 * This describer is responsible for all gravity-force-lab-basics specific string forming related to position.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import GravityForceLabPositionDescriber from '../../../../gravity-force-lab/js/view/describers/GravityForceLabPositionDescriber.js';
import gravityForceLabBasics from '../../gravityForceLabBasics.js';
import GravityForceLabBasicsStrings from '../../GravityForceLabBasicsStrings.js';

// strings
const kilometerString = GravityForceLabBasicsStrings.a11y.kilometer;
const kilometersString = GravityForceLabBasicsStrings.a11y.kilometers;

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
}

gravityForceLabBasics.register( 'GFLBPositionDescriber', GFLBPositionDescriber );
export default GFLBPositionDescriber;