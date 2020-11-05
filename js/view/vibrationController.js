// Copyright 2020, University of Colorado Boulder

/**
 * Manages vibration for gravity-force-lab-basics.
 *
 * @author Jesse Greenberg
 */

import Property from '../../../axon/js/Property.js';
import LinearFunction from '../../../dot/js/LinearFunction.js';
import ContinuousPatternVibrationController from '../../../tappi/js/ContinuousPatternVibrationController.js';
import GFLBConstants from '../GFLBConstants.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';

// constants
// extreme intervals for the vibration pattern representing force value - in seconds
const LOW_FORCE_PATTERN = .200;
const HIGH_FORCE_PATTERN = .050;

// extreme intervals for the intensity of vibration pattern representing mass
const LOW_MASS_INTENSITY = 0.4;
const HIGH_MASS_INTENSITY = 1;

// extreme intervals for the sharpness of vibration pattern representing mass
const LOW_MASS_SHARPNESS = 0.5;
const HIGH_MASS_SHARPNESS = 1;

// the pattern for vibration indicating mass - pattern is static, the intensity and sharpness
// change with mass value - itervals in seconds
const MASS_CHANGE_PATTERN = [ 0.015, 0.015, 0.010, 0.020 ];

const minMass = GFLBConstants.MASS_RANGE.min;
const maxMass = GFLBConstants.MASS_RANGE.max;

class VibrationController {
  constructor() {}

  /**
   * @public
   * @param vibrationManageriOS
   * @param model
   */
  initialize( vibrationManageriOS, model ) {
    const paradigmChoice = phet.chipper.queryParameters.vibrationParadigm;

    // @private {ContinuousPatternVibrationController}
    this.forcePatternManager = new ContinuousPatternVibrationController();

    const minForce = model.getMinForceMagnitude();
    const maxForce = model.getMaxForce();

    if ( paradigmChoice === '1' ) {

      // maps force to the vibration pattern that will represent its value
      const forcePatternFunction = new LinearFunction( minForce, maxForce, LOW_FORCE_PATTERN, HIGH_FORCE_PATTERN );

      model.forceProperty.link( force => {
        const forcePatternValue = forcePatternFunction( force );
        this.forcePatternManager.setPattern( [ forcePatternValue, forcePatternValue ] );
      } );

      Property.multilink( [ model.object1.isDraggingProperty, model.object2.isDraggingProperty ], ( object1Dragging, object2Dragging ) => {
        if ( object1Dragging || object2Dragging ) {
          this.forcePatternManager.start();
        }
        else {
          this.forcePatternManager.stop();
        }
      } );
    }
    else if ( paradigmChoice === '2' ) {

      // In this vibration paradigm, we indicate changing force with user interaction,
      // rather than mapping vibration properties to the value directly - the range
      // of forces in this sim is so large that it is difficult to feel changes in force
      // unless you are at extreme values. As it turns out, this means that vibration
      // is tied to mass position
      const positionPatternFunction = new LinearFunction( 10000, 1300, LOW_FORCE_PATTERN, HIGH_FORCE_PATTERN, true );

      model.separationProperty.link( separation=> {
        const forcePatternValue = positionPatternFunction( separation);
        this.forcePatternManager.setPattern( [ forcePatternValue, forcePatternValue ] );
      } );

      Property.multilink( [ model.object1.isDraggingProperty, model.object2.isDraggingProperty ], ( object1Dragging, object2Dragging ) => {
        if ( object1Dragging || object2Dragging ) {
          this.forcePatternManager.start();
        }
        else {
          this.forcePatternManager.stop();
        }
      } );
    }

    // maps the mass value to the intensity of vibration
    const massIntensityFunction = new LinearFunction( minMass, maxMass, LOW_MASS_INTENSITY, HIGH_MASS_INTENSITY );

    // maps the mass value to the sharpness of vibration
    const massSharpnessFunction = new LinearFunction( minMass, maxMass, LOW_MASS_SHARPNESS, HIGH_MASS_SHARPNESS );

    const massVibrationListener = mass => {
      vibrationManageriOS.vibrateContinuous( {
        pattern: MASS_CHANGE_PATTERN,
        duration: _.sum( MASS_CHANGE_PATTERN ),
        intensity: massIntensityFunction( mass ),
        sharpness: massSharpnessFunction( mass )
      } );
    };
    model.object1.valueProperty.lazyLink( massVibrationListener );
    model.object2.valueProperty.lazyLink( massVibrationListener );
  }

  /**
   * @public
   * @param {number} dt - in seconds
   */
  step( dt ) {
    this.forcePatternManager.step( dt );
  }
}

const vibrationController = new VibrationController();

gravityForceLabBasics.register( 'VibrationController', VibrationController );
export default vibrationController;