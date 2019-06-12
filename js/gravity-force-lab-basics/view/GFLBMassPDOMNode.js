// Copyright 2019, University of Colorado Boulder

/**
 * Responsible for MassPDOMNode content specific to GFLB
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const MassPDOMNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassPDOMNode' );
  const Property = require( 'AXON/Property' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // a11y strings
  const sizePatternString = GravityForceLabA11yStrings.sizePattern.value;
  const sizeAndDistancePatternString = GravityForceLabA11yStrings.sizeAndDistancePattern.value;

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

      super( model, thisObject, massDescriber, forceDescriber, positionDescriber, _.extend( {

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

            // The mass/position description in the PDOM differs between GFLB and REGULAR
            this.massAndPositionNode.innerContent = this.getMassAndPositionSentence();
          } );
        }
      }, options ) );
    }

    /**
     * @returns {string}
     * @private
     */
    getMassAndPositionSentence() {
      const sizeText = StringUtils.fillIn( sizePatternString, {
        thisObjectLabel: this.massLabel,
        massValue: this.getMassValue(),
        unit: this.massDescriber.unit
      } );

      return StringUtils.fillIn( sizeAndDistancePatternString, {
        size: sizeText,
        distance: this.positionDescriber.getDistanceClause( this.objectEnum ),
        relativeSize: this.massDescriber.getRelativeSizeOrDensity( this.objectEnum ),
        otherObjectLabel: this.massDescriber.getOtherObjectLabelFromEnum( this.objectEnum )
      } );
    }
  }

  return gravityForceLabBasics.register( 'GFLBMassPDOMNode', GFLBMassPDOMNode );
} );