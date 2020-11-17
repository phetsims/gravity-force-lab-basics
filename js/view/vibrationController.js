// Copyright 2020, University of Colorado Boulder

/**
 * Manages vibration for gravity-force-lab-basics.
 *
 * @author Jesse Greenberg
 */

import Property from '../../../axon/js/Property.js';
import LinearFunction from '../../../dot/js/LinearFunction.js';
import Utils from '../../../dot/js/Utils.js';
import VibrationPatterns from '../../../tappi/js/VibrationPatterns.js';
import GFLBConstants from '../GFLBConstants.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';

// constants
// extreme values for the intensity of vibration pattern representing mass
const LOW_MASS_INTENSITY = 0.3;
const HIGH_MASS_INTENSITY = 1;

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

    let forceIntensityMap;
    let forceSharpnessMap;

    if ( paradigmChoice === '1' ) {

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
        const separation = ( model.object2.positionProperty.get() - model.object1.positionProperty.get() ) / 1000;

        // an offset for the inverse square function such that the intensity is 1 when separation
        // is at minimum for the given sphere radii
        const xOffset = Math.pow( 1 / ( maxIntensity - minIntensity ), 0.5 ) - minSeparation;
        const intensity = 1 / Math.pow( separation + xOffset, 2 ) + minIntensity;
        return Utils.clamp( intensity, minIntensity, maxIntensity );
      };

      // sharpness increases linearly with mass
      const massSharpnessMap = new LinearFunction( 2 * minMass, 2 * maxMass, 0.4, 1 );
      forceSharpnessMap = mass => {
        return massSharpnessMap( model.object1.valueProperty.value + model.object2.valueProperty.value );
      };
    }

    let forceIntensityValue = forceIntensityMap( model.forceProperty.get() );
    let forceSharpnessValue = forceSharpnessMap( model.forceProperty.get() );
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

    // a single pulse per mass change, with dynamic intensity
    const clickingMassVibrationListener = mass => {
      vibrationManageriOS.vibrateContinuous( {
        duration: 0.030,
        intensity: massIntensityFunction( mass )
      } );
    };

    model.object1.valueProperty.lazyLink( clickingMassVibrationListener );
    model.object2.valueProperty.lazyLink( clickingMassVibrationListener );

    // after resetting or activating a checkbox, request the interactionSuccess pattern
    model.resetInProgressProperty.lazyLink( inProgress => {
      if ( !inProgress ) {
        VibrationPatterns.interactionSuccess();
      }
    } );
    model.showForceValuesProperty.lazyLink( showForceValues => {
      VibrationPatterns.interactionSuccess();
    } );
    model.showDistanceProperty.lazyLink( showDistance => {
      VibrationPatterns.interactionSuccess();
    } );
    model.constantRadiusProperty.lazyLink( constantRadius => {
      VibrationPatterns.interactionSuccess();
    } );
  }
}

const vibrationController = new VibrationController();

gravityForceLabBasics.register( 'VibrationController', VibrationController );
export default vibrationController;