// Copyright 2019, University of Colorado Boulder

/**
 * sound generator for changes to the force between two masses
 *
 * @author John Blanco (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const SoundClip = require( 'TAMBO/sound-generators/SoundClip' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GFLBConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBConstants' );
  const PhysicalConstants = require( 'PHET_CORE/PhysicalConstants' );

  // constants
  const MIN_FORCE = PhysicalConstants.GRAVITATIONAL_CONSTANT *
                    Math.pow( GFLBConstants.MASS_RANGE.min, 2 ) /
                    Math.pow( GFLBConstants.PULL_LOCATION_RANGE.getLength(), 2 );
  const MAX_FORCE = PhysicalConstants.GRAVITATIONAL_CONSTANT *
                    Math.pow( GFLBConstants.MASS_RANGE.max, 2 ) /
                    Math.pow( GFLBConstants.CONSTANT_RADIUS * 2 + GFLBConstants.MIN_DISTANCE_BETWEEN_MASSES, 2 );
  const FADE_START_DELAY = 0.2; // in seconds
  const FADE_TIME = 0.5; // proportion per second
  const PITCH_RANGE_IN_SEMI_TONES = 36;
  const PITCH_CENTER_OFFSET = 2;

  // sounds
  const forceSound = require( 'sound!GRAVITY_FORCE_LAB_BASICS/saturated-sine.mp3' );

  class ForceSoundGenerator extends SoundClip {

    /**
     * @param {NumberProperty} forceProperty
     * @param {BooleanProperty} resetInProgressProperty
     * @param {Object} [options]
     * @constructor
     */
    constructor( forceProperty, resetInProgressProperty, options ) {

      // parameter checking
      assert( !options || !options.loop || options.loop === true, 'must be a loop to work correctly' );

      options = _.extend( {
        initialOutputLevel: 0.7,
        loop: true
      }, options );

      super( forceSound, options );

      // @private {number} - the output level before fade out starts
      this.nonFadedOutputLevel = options.initialOutputLevel;

      // @private {number} - countdown time used for fade out
      this.fadeCountdownTime = 0;

      // function for starting the force sound or adjusting the volume
      const forceListener = force => {

        if ( !resetInProgressProperty.value ) {

          // calculate the playback rate based on the amount of force, , see the design document for detailed explanation
          const normalizedForce = Math.log( force / MIN_FORCE ) / Math.log( MAX_FORCE / MIN_FORCE );
          const centerForce = normalizedForce - 0.5;
          const midiNote = PITCH_RANGE_IN_SEMI_TONES / 2 * centerForce + PITCH_CENTER_OFFSET;
          const playbackRate = Math.pow( 2, midiNote / 12 );

          this.setPlaybackRate( playbackRate );
          this.setOutputLevel( this.nonFadedOutputLevel );
          if ( !this.playing ) {
            this.play();
          }

          // reset the fade countdown
          this.fadeCountdownTime = FADE_START_DELAY + FADE_TIME;
        }
      };
      forceProperty.lazyLink( forceListener );

      // @private {function}
      this.disposeForceSoundGenerator = () => { forceProperty.unlink( forceListener ); };
    }

    /**
     * @public
     */
    dispose() {
      this.disposeForceSoundGenerator();
      super.dispose();
    }

    /**
     * step this sound generator, used for fading out the sound in the absence of user interaction
     * @param dt
     */
    step( dt ) {
      if ( this.fadeCountdownTime > 0 ) {
        this.fadeCountdownTime = Math.max( this.fadeCountdownTime - dt, 0 );

        if ( this.fadeCountdownTime < FADE_TIME ) {
          this.setOutputLevel( this.fadeCountdownTime / FADE_TIME * this.nonFadedOutputLevel );
        }

        // fade out complete, stop playback
        if ( this.fadeCountdownTime === 0 ) {
          this.stop();
        }
      }
    }

    /**
     * stop any in-progress sound generation
     * @public
     */
    reset() {
      this.stop();
      this.fadeCountdownTime = 0;
    }
  }

  gravityForceLabBasics.register( 'ForceSoundGenerator', ForceSoundGenerator );

  return ForceSoundGenerator;
} );