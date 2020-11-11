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
// extreme values for for the vibration pattern representing force value - in seconds
const LOW_FORCE_INTENSITY = 0.35;
const HIGH_FORCE_INTENSITY = 1;

// extreme values for the intensity of vibration pattern representing mass
const LOW_MASS_INTENSITY = 0.4;
const HIGH_MASS_INTENSITY = 1;

// extreme intervals for the sharpness of vibration pattern representing mass
const LOW_MASS_SHARPNESS = 1;
const HIGH_MASS_SHARPNESS = 1;

// the pattern for vibration indicating mass - pattern is static, the intensity and sharpness
// change with mass value - itervals in seconds
const LOW_MASS_INTERVAL = 0.030;
const HIGH_MASS_INTERVAL = 0.180;

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

    const minForce = model.getMinForceMagnitude();
    const maxForce = model.getMaxForce();

    if ( paradigmChoice === '1' ) {

      // maps force to the vibration pattern that will represent its value
      const forceIntensityFunction = new LinearFunction( minForce, maxForce, LOW_FORCE_INTENSITY, HIGH_FORCE_INTENSITY );

      let forceIntensityValue = null;
      model.forceProperty.link( force => {
        forceIntensityValue = forceIntensityFunction( force );
        console.log( forceIntensityValue );
        vibrationManageriOS.setVibrationIntensity( forceIntensityValue );
      } );

      Property.multilink( [ model.object1.isDraggingProperty, model.object2.isDraggingProperty ], ( object1Dragging, object2Dragging ) => {
        if ( object1Dragging || object2Dragging ) {
          this.massVibrationController.stop();
          vibrationManageriOS.vibrateContinuous();
          vibrationManageriOS.setVibrationIntensity( forceIntensityValue );
        }
        else {
          vibrationManageriOS.stop();
        }
      } );
    }
    else if ( paradigmChoice === '2' ) {

      // In this vibration paradigm, we indicate changing force with user interaction,
      // rather than mapping vibration properties to the value directly - the range
      // of forces in this sim is so large that it is difficult to feel changes in force
      // unless you are at extreme values. As it turns out, this means that vibration
      // is tied to mass position
      const positionIntensityFunction = new LinearFunction( 10000, 1300, LOW_FORCE_INTENSITY, HIGH_FORCE_INTENSITY, true );

      let intensityValue;
      model.separationProperty.link( separation => {
        intensityValue = positionIntensityFunction( separation );
        vibrationManageriOS.setVibrationIntensity( intensityValue );
      } );

      Property.multilink( [ model.object1.isDraggingProperty, model.object2.isDraggingProperty ], ( object1Dragging, object2Dragging ) => {
        if ( object1Dragging || object2Dragging ) {
          this.massVibrationController.stop();
          vibrationManageriOS.vibrateContinuous();
          vibrationManageriOS.setVibrationIntensity( intensityValue );
        }
        else {
          vibrationManageriOS.stop();
        }
      } );
    }

    // maps the mass value to the intensity of vibration
    const massIntensityFunction = new LinearFunction( minMass, maxMass, LOW_MASS_INTENSITY, HIGH_MASS_INTENSITY );

    // maps the mass value to the sharpness of vibration
    const massSharpnessFunction = new LinearFunction( minMass, maxMass, LOW_MASS_SHARPNESS, HIGH_MASS_SHARPNESS );

    // maps the mass value to the interval of vibration
    const massIntervalFunction = new LinearFunction( minMass, maxMass, LOW_MASS_INTERVAL, HIGH_MASS_INTERVAL, true );

    this.massVibrationController = new ContinuousPatternVibrationController( {
      repeat: false
    } );

    const massVibrationListener = mass => {
      const massInterval = massIntervalFunction( mass );
      this.massVibrationController.setPattern( [ massInterval, massInterval, massInterval, massInterval ] );

      this.massVibrationController.setIntensity( massIntensityFunction( mass ) );
      this.massVibrationController.setSharpness( massSharpnessFunction( mass ) );

      this.massVibrationController.start();
    };
    model.object1.valueProperty.lazyLink( massVibrationListener );
    model.object2.valueProperty.lazyLink( massVibrationListener );
  }

  /**
   * @public
   * @param {number} dt - in seconds
   */
  step( dt ) {
    // this.forcePatternManager.step( dt );
    this.massVibrationController.step( dt );
  }
}

const vibrationController = new VibrationController();

gravityForceLabBasics.register( 'VibrationController', VibrationController );
export default vibrationController;