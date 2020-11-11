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

    let forceIntensityMap;
    let forceSharpnessMap;

    if ( paradigmChoice === '1' ) {

      // intensity locked at 0.6, sharpness should increase as force increases
      forceIntensityMap = new LinearFunction( minForce, maxForce, 0.6, 0.6 );
      forceSharpnessMap = new LinearFunction( minForce, maxForce, 0.0, 1 );
    }
    else if ( paradigmChoice === '2' ) {

      // intensity locked at 0.6, sharpness should decrease as force increases
      forceIntensityMap = new LinearFunction( minForce, maxForce, 0.6, 0.6 );
      forceSharpnessMap = new LinearFunction( minForce, maxForce, 1, 0 );
    }
    else if ( paradigmChoice === '3' ) {

      // intensity locked at 0.3, sharpness should increase as force increases
      forceIntensityMap = new LinearFunction( minForce, maxForce, 0.3, 0.3 );
      forceSharpnessMap = new LinearFunction( minForce, maxForce, 0, 1 );
    }
    else if ( paradigmChoice === '4' ) {

      // intensity should increase as force increases, sharpness should increase as force increases
      forceIntensityMap = new LinearFunction( minForce, maxForce, 0.4, 1 );
      forceSharpnessMap = new LinearFunction( minForce, maxForce, 0, 1 );
    }
    else if ( paradigmChoice === '5' ) {

      // intensity should increase as force increases, sharpness should decrease as force increases
      forceIntensityMap = new LinearFunction( minForce, maxForce, 0.4, 1 );
      forceSharpnessMap = new LinearFunction( minForce, maxForce, 1, 0 );
    }
    else if ( paradigmChoice === '6' ) {

      // intensity increases as force increases, sharpness constant at 1 - however, this applies to mass
      // spinners as well
      forceIntensityMap = new LinearFunction( minForce, maxForce, 0.2, 1 );
      forceSharpnessMap = new LinearFunction( minForce, maxForce, 1, 1 );
    }

    let forceIntensityValue = null;
    let forceSharpnessValue = null;
    model.forceProperty.link( force => {
      forceIntensityValue = forceIntensityMap( force );
      forceSharpnessValue = forceSharpnessMap( force );
      console.log( forceSharpnessValue );
      vibrationManageriOS.setVibrationIntensity( forceIntensityValue );
      vibrationManageriOS.setVibrationSharpness( forceSharpnessValue );
    } );

    Property.multilink( [ model.object1.isDraggingProperty, model.object2.isDraggingProperty ], ( object1Dragging, object2Dragging ) => {
      if ( object1Dragging || object2Dragging ) {
        this.massVibrationController.stop();
        vibrationManageriOS.vibrateContinuous();
        vibrationManageriOS.setVibrationIntensity( forceIntensityValue );
        vibrationManageriOS.setVibrationSharpness( forceSharpnessValue );
      }
      else {
        vibrationManageriOS.stop();
      }
    } );

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