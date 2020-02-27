// Copyright 2017-2019, University of Colorado Boulder

/**
 * Mass object view for gravity-force-lab-basics.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import MassNode from '../../../gravity-force-lab/js/view/MassNode.js';
import merge from '../../../phet-core/js/merge.js';
import Tandem from '../../../tandem/js/Tandem.js';
import GFLBConstants from '../GFLBConstants.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';

// constants
const MASS_NODE_Y_POSITION = 215;

class GFLBMassNode extends MassNode {

  /**
   * @param {GFLBModel} model
   * @param {Mass} mass
   * @param {Bounds2} layoutBounds
   * @param {ModelViewTransform2} modelViewTransform
   * @param {GFLBAlertManager} alertManager
   * @param {GFLBForceDescriber} forceDescriber
   * @param {GFLBPositionDescriber} positionDescriber
   * @param {Object} [options]
   */
  constructor( model, mass, layoutBounds, modelViewTransform, alertManager, forceDescriber, positionDescriber, options ) {

    options = merge( {
      arrowNodeOptions: {
        forceReadoutDecimalPlaces: 1,
        arrowFill: 'black',
        arrowLabelFill: 'black',
        maxArrowWidth: 400,
        forceThresholdPercent: 7 * Math.pow( 10, -4 ),
        backgroundFill: GFLBConstants.BACKGROUND_COLOR_PROPERTY
      },
      y: MASS_NODE_Y_POSITION,

      // {number} In meters, charges will snap to the nearest 0.1 meters in model coordinates
      snapToNearest: model.snapObjectsToNearest,
      stepSize: GFLBConstants.MASS_STEP_SIZE,

      finishWiringListeners: _.noop,

      // phet-io
      tandem: Tandem.REQUIRED,

      // a11y recompute the PDOM descriptions when show distance is toggled
      additionalA11yDependencies: [ model.showDistanceProperty ]
    }, options );

    super( model, mass, layoutBounds, modelViewTransform, alertManager, forceDescriber, positionDescriber, options );
  }
}

gravityForceLabBasics.register( 'GFLBMassNode', GFLBMassNode );
export default GFLBMassNode;