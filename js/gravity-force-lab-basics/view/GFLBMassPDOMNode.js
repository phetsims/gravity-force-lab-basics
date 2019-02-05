// Copyright 2019, University of Colorado Boulder

/**
 * Responsible for MassPDOMNode content specific to GFLB
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  const Node = require( 'SCENERY/nodes/Node' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const MassPDOMNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassPDOMNode' );

  class GFLBMassPDOMNode extends MassPDOMNode {

    /**
     * @param {GravityForceLabBasicsModel} model
     * @param {ISLCObjectEnum} objectEnum
     * @param {Object} [options]
     */
    constructor( model, objectEnum, options ) {
      super( model, objectEnum, options );

      // @private
      this.massSizeNode = new Node( { tagName: 'li' } );
      this.addChild( this.massSizeNode );
      this.massPositionNode = new Node( { tagName: 'li' } );
      this.addChild( this.massPositionNode );

      // update the list items' PDOM content
      const listener = () => {
        this.massSizeNode.innerContent = this.nodeDescriber.getSizeItemText();
        this.massPositionNode.innerContent = this.nodeDescriber.getPositionItemText();
      };
      this.linkToForceProperty( listener );
      this.model.showDistanceProperty.link( listener );
    }
  }

  return gravityForceLabBasics.register( 'GFLBMassPDOMNode', GFLBMassPDOMNode );
} );