// Copyright 2019, University of Colorado Boulder

/**
 * Responsible for MassDescriptionNode content specific to GFLB
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import MassDescriptionNode from '../../../gravity-force-lab/js/view/MassDescriptionNode.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';

class GFLBMassDescriptionNode extends MassDescriptionNode {

  /**
   * @param {GFLBModel} model
   * @param {ISLCObject} thisObject
   * @param {GFLBMassDescriber} massDescriber
   * @param {GFLBForceDescriber} forceDescriber
   * @param {GFLBPositionDescriber} positionDescriber
   * @param {Object} [options]
   */
  constructor( model, thisObject, massDescriber, forceDescriber, positionDescriber, options ) {
    super( model, thisObject, massDescriber, forceDescriber, positionDescriber, options );

    // Update on GFLB specific dependencies.
    model.showDistanceProperty.link( () => {
      this.updateMassAndPositionElement();
    } );
  }
}

gravityForceLabBasics.register( 'GFLBMassDescriptionNode', GFLBMassDescriptionNode );
export default GFLBMassDescriptionNode;