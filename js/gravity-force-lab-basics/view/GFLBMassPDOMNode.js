// Copyright 2019, University of Colorado Boulder

/**
 * Responsible for MassPDOMNode content specific to GFLB
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const MassPDOMNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassPDOMNode' );

  class GFLBMassPDOMNode extends MassPDOMNode {

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

  return gravityForceLabBasics.register( 'GFLBMassPDOMNode', GFLBMassPDOMNode );
} );