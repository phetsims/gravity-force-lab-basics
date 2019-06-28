// Copyright 2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBA11yStrings' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GFLBConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBConstants' );
  const MassDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/MassDescriber' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // string
  const mass1LabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass1Label' );
  const mass2LabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass2Label' );
  const massBillionsPatternString = GFLBA11yStrings.massBillionsPattern.value;

  class GFLBMassDescriber extends MassDescriber {

    /**
     * @param {GFLBModel} model
     */
    constructor( model ) {

      const options = {
        object1Label: mass1LabelString,
        object2Label: mass2LabelString,
        convertMassValue: mass => mass / GFLBConstants.BILLION_MULTIPLIER,
        formatMassValue: mass => StringUtils.fillIn( massBillionsPatternString, { mass: mass } )
      };

      super( model, options );
    }
  }

  return gravityForceLabBasics.register( 'GFLBMassDescriber', GFLBMassDescriber );
} );