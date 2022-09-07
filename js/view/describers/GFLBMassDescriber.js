// Copyright 2019-2022, University of Colorado Boulder

/**
 * This describer is responsible for all gravity-force-lab-basics specific string forming related to mass.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import MassDescriber from '../../../../gravity-force-lab/js/view/describers/MassDescriber.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import GFLBConstants from '../../GFLBConstants.js';
import gravityForceLabBasics from '../../gravityForceLabBasics.js';
import GravityForceLabBasicsStrings from '../../GravityForceLabBasicsStrings.js';

// string
const mass1LabelString = GravityForceLabBasicsStrings.mass1Label;
const mass2LabelString = GravityForceLabBasicsStrings.mass2Label;
const massBillionsPatternString = GravityForceLabBasicsStrings.a11y.massBillionsPattern;

class GFLBMassDescriber extends MassDescriber {

  /**
   * @param {GFLBModel} model
   * @param {ForceDescriber} forceDescriber
   */
  constructor( model, forceDescriber ) {

    const options = {
      object1Label: mass1LabelString,
      object2Label: mass2LabelString,
      convertMassValue: mass => mass / GFLBConstants.BILLION_MULTIPLIER,
      formatMassValue: mass => StringUtils.fillIn( massBillionsPatternString, { mass: mass } )
    };

    super( model, forceDescriber, options );
  }
}

gravityForceLabBasics.register( 'GFLBMassDescriber', GFLBMassDescriber );
export default GFLBMassDescriber;