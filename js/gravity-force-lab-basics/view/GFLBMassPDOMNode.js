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
     * @param {ISLCObjectEnum} objectEnum
     * @param {Object} [options]
     */
    constructor( model, objectEnum, options ) {
      super( model, objectEnum, options );

      // update the list items' PDOM content
      const listener = () => {

        // if distance is showing, use quantitative distance descriptions.
        this.massAndPositionNode.innerContent =
          this.nodeDescriber.getSizeAndDistanceClause( model.showDistanceProperty.value );
      };
      this.linkToForceProperty( listener );
      this.model.showDistanceProperty.link( listener );
    }
  }

  return gravityForceLabBasics.register( 'GFLBMassPDOMNode', GFLBMassPDOMNode );
} );