// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const ForceDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ForceDescriber' );
  const GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBA11yStrings' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GravityForceLabBasicsConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsConstants' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const Util = require( 'DOT/Util' );

  // a11y strings
  const forceArrowsString = GFLBA11yStrings.forceArrows.value;
  const arrowsString = GFLBA11yStrings.arrows.value;

  // constants
  const { PULL_FORCE_RANGE } = GravityForceLabBasicsConstants;
  const forceToIndex = new LinearFunction( PULL_FORCE_RANGE.min, PULL_FORCE_RANGE.max * 0.6, 0, 6, true );
  const forceToPullIndex = new LinearFunction( PULL_FORCE_RANGE.min, PULL_FORCE_RANGE.max, 6, 0, true );

  class GFLBForceDescriber extends ForceDescriber {

    constructor( model, object1Label, object2Label ) {
      const options = {
        convertForce: force => {
          return Util.toFixedNumber( force, 1 );
        },

        forceArrowsString: forceArrowsString,
        vectorsString: arrowsString
      };
      super( model, object1Label, object2Label, options );

    }

    // @override
    getForceVectorIndex( force ) {
      return Util.roundSymmetric( forceToIndex( force ) );
    }

    // @override
    getEffortIndex( force ) {
      return Util.roundSymmetric( forceToPullIndex( force ) );
    }

    /**
     * Uses the singleton pattern to keep one instance of this describer for the entire lifetime of the sim.
     * @returns {GFLBForceDescriber}
     */
    static getDescriber() {
      // assert && assert( describer, 'describer has not yet been initialized' );
      return ForceDescriber.getDescriber();
    }

    /**
     * Initialize the describer singleton
     * @throws Error
     */
    static initialize( model, object1Label, object2Label ) {
      // assert && assert( describer === null, 'initialize may only be called once per describer instance' );
      const describer = new GFLBForceDescriber( model, object1Label, object2Label );
      return ForceDescriber.initialize( describer );
    }
  }

  return gravityForceLabBasics.register( 'GFLBForceDescriber', GFLBForceDescriber );
} );