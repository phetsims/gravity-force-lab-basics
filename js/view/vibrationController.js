// Copyright 2020, University of Colorado Boulder

/**
 * Manages vibration for gravity-force-lab-basics.
 *
 * @author Jesse Greenberg
 */

import Property from '../../../axon/js/Property.js';
import LinearFunction from '../../../dot/js/LinearFunction.js';
import Utils from '../../../dot/js/Utils.js';
import ContinuousPatternVibrationController from '../../../tappi/js/ContinuousPatternVibrationController.js';
import GFLBConstants from '../GFLBConstants.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';

// constants
// extreme values for the intensity of vibration pattern representing mass
const LOW_MASS_INTENSITY = 0.3;
const HIGH_MASS_INTENSITY = 1;

// extreme intervals for the sharpness of vibration pattern representing mass
const LOW_MASS_SHARPNESS = 1;
const HIGH_MASS_SHARPNESS = 1;

// the pattern for vibration indicating mass - pattern is static, the intensity and sharpness
// change with mass value - itervals in seconds
const LOW_MASS_INTERVAL = 0.030;
const HIGH_MASS_INTERVAL = 0.120;

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
    else if ( paradigmChoice === '7' ) {

      // in this paradigm we are trying to convey the inverse square law and still have vibration
      // detectable for the full range of motion. So rather than map intensity/sharpness directly
      // to force, intensity is mapped like 1/r^2 with distance, and sharpness is mapped linearly
      // to the mass

      // intensity increases exponentially with distance
      // using distance at max mass, so that changes can be felt clearly without requiring "constant
      // size" to be checked
      const minIntensity = 0.4;
      const maxIntensity = 1;
      forceIntensityMap = force => {
        const minSeparation = model.getSumRadiusWithSeparation() / 1000;
        const separation = (model.object2.positionProperty.get() - model.object1.positionProperty.get()) / 1000;

        // an offset for the inverse square function such that the intensity is 1 when separation
        // is at minimum for the given sphere radii
        const xOffset = Math.pow( 1 / ( maxIntensity - minIntensity ), 0.5 ) - minSeparation;
        const intensity = 1 / Math.pow( separation + xOffset, 2 ) + minIntensity;
        return Utils.clamp( intensity, minIntensity, maxIntensity );
      };

      // sharpness increases linearly with mass
      const massSharpnessMap = new LinearFunction( 2 * minMass, 2 * maxMass, 0.2, 1 );
      forceSharpnessMap = mass => {
        const sharpness = massSharpnessMap( model.object1.valueProperty.value + model.object2.valueProperty.value );
        return sharpness;
      };
    }

    let forceIntensityValue = null;
    let forceSharpnessValue = null;
    model.forceProperty.link( force => {

      // only change intensity of vibration while a mass is being dragged
      if ( model.object1.isDraggingProperty.value || model.object2.isDraggingProperty.value ) {
        forceIntensityValue = forceIntensityMap( force );
        forceSharpnessValue = forceSharpnessMap( force );
        vibrationManageriOS.setVibrationIntensity( forceIntensityValue );
        vibrationManageriOS.setVibrationSharpness( forceSharpnessValue );
      }
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

    this.forceVibrationController = new ContinuousPatternVibrationController( {
      repeat: false
    } );

    if ( paradigmChoice === '6' ) {
      const forceOnMassChangeVibrationListener = () => {
        const force = model.forceProperty.value;

        // the way to vibrate for 0.1 seconds (for now) - by setting the pattern,
        // we let the current one play and start when ready
        this.forceVibrationController.setPattern( [ 0.2, 0 ] );
        this.forceVibrationController.setIntensity( forceIntensityMap( force ) );
        this.forceVibrationController.setSharpness( forceSharpnessMap( force ) );

        if ( !this.forceVibrationController.runningPattern ) {
          this.forceVibrationController.start();
        }
      };
      model.object1.valueProperty.lazyLink( forceOnMassChangeVibrationListener );
      model.object2.valueProperty.lazyLink( forceOnMassChangeVibrationListener );
    }
    else {

      // one way to convey this - a single pulse per mass change, with dynamic intensity
      const clickingMassVibrationListener = mass => {
        vibrationManageriOS.vibrateContinuous( {
          duration: 0.030,
          intensity: massIntensityFunction( mass )
        } );
      };

      // another way to convey mass - two pulses with dynamic length, intensity and sharpness
      const patternMassVibrationListener = mass => {
        const massInterval = massIntervalFunction( mass );
        this.massVibrationController.setPattern( [ massInterval, 0.025, massInterval, 0.025 ] );
        this.massVibrationController.stop();

        this.massVibrationController.setIntensity( massIntensityFunction( mass ) );
        this.massVibrationController.setSharpness( massSharpnessFunction( mass ) );

        this.massVibrationController.start();
      };
      model.object1.valueProperty.lazyLink( clickingMassVibrationListener );
      model.object2.valueProperty.lazyLink( patternMassVibrationListener );
    }
  }

  /**
   * @public
   * @param {number} dt - in seconds
   */
  step( dt ) {
    this.massVibrationController.step( dt );
    this.forceVibrationController.step( dt );
  }
}

const vibrationController = new VibrationController();

gravityForceLabBasics.register( 'VibrationController', VibrationController );
export default vibrationController;