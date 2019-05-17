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
  const Property = require( 'AXON/Property' );

  class GFLBMassPDOMNode extends MassPDOMNode {

    /**
     * @param {GFLBModel} model
     * @param {ISLCObjectEnum} objectEnum
     * @param {GFLBMassDescriber} massDescriber
     * @param {GFLBForceDescriber} forceDescriber
     * @param {GFLBPositionDescriber} positionDescriber
     * @param {Object} [options]
     */
    constructor( model, objectEnum, massDescriber, forceDescriber, positionDescriber, options ) {

      super( model, objectEnum, massDescriber, forceDescriber, positionDescriber, _.extend( {

        // The only difference in basics is how the mass/position bullet is updated for this Mass.
        wireUpMassAndPositionUpdates() {
          Property.multilink( [
            this.model.forceProperty,
            this.model.showDistanceProperty,
            this.model.constantRadiusProperty,

            // We need to link to these in addition to the forceProperty because of a listener order of ops issue found
            // in https://github.com/phetsims/gravity-force-lab-basics/issues/103
            this.model.object1.positionProperty,
            this.model.object2.positionProperty
          ], () => {
            this.massAndPositionNode.innerContent =
              this.nodeDescriber.getMassAndPositionSentence();
          } );
        }
      }, options ) );
    }
  }

  return gravityForceLabBasics.register( 'GFLBMassPDOMNode', GFLBMassPDOMNode );
} );