// Copyright 2018-2020, University of Colorado Boulder

/**
 * This alert manager is responsible for all gravity-force-lab-basics specific aria-live alerts.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import GravityForceLabAlertManager from '../../../gravity-force-lab/js/view/GravityForceLabAlertManager.js';
import ISLCQueryParameters from '../../../inverse-square-law-common/js/ISLCQueryParameters.js';
import levelSpeakerModel from '../../../inverse-square-law-common/js/view/levelSpeakerModel.js';
import webSpeaker from '../../../inverse-square-law-common/js/view/webSpeaker.js';
import ActivationUtterance from '../../../utterance-queue/js/ActivationUtterance.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import gravityForceLabBasicsStrings from '../gravityForceLabBasicsStrings.js';
import cursorSpeakerModel from '../../../inverse-square-law-common/js/view/CursorSpeakerModel.js';

const distanceArrowVisibleString = gravityForceLabBasicsStrings.a11y.distanceArrowVisible;
const distanceArrowRemovedString = gravityForceLabBasicsStrings.a11y.distanceArrowRemoved;

const selfVoicingForceValuesShownString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.forceValuesShown;
const selfVoicingForceValuesHiddenString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.forceValuesHidden;
const selfVoicingDistanceShownString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.distanceShown;
const selfVoicingDistanceHiddenString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.distanceHidden;
const selfVoicingConstantSizeSetString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.constantSizeSet;
const selfVoicingConstantSizeOffString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.constantSizeOff;


class GFLBAlertManager extends GravityForceLabAlertManager {

  /**
   * @param {GFLBModel} model
   * @param {GFLBf} massDescriber
   * @param {GFLBForceDescriber} forceDescriber
   */
  constructor( model, massDescriber, forceDescriber ) {
    super( model, massDescriber, forceDescriber, {
      linkToForceValuesDisplayProperty: false, // opt out of REGULAR specific linking

      // by default the REGULAR version is different from this because of scientific notation
      showForceValuesListener: showValues => {
        this.alertShowForceValues( showValues );
      }
    } );

    // @private {Utterance}
    this.distanceVisibleUtterance = new ActivationUtterance();

    model.showDistanceProperty.lazyLink( showDistance => {
      this.alertDistanceVisible( showDistance );
    } );

    // PROTOTYPE SELF VOICING FEATURE - when these Properties change, alert change to the user
    if ( ISLCQueryParameters.selfVoicing === 'cursor' ) {
      model.showForceValuesProperty.lazyLink( showForceValues => {
        if ( cursorSpeakerModel.getInteractiveModeVerbose() ) {
          webSpeaker.speak( this.getShowForceValuesAlert( showForceValues ) );
        }
      } );

      model.showDistanceProperty.lazyLink( showDistance => {
        if ( cursorSpeakerModel.getInteractiveModeVerbose() ) {
          webSpeaker.speak( this.getDistanceVisibleAlert( showDistance ) );
        }
      } );

      model.constantRadiusProperty.lazyLink( constantRadius => {
        if ( cursorSpeakerModel.getInteractiveModeVerbose() ) {
          webSpeaker.speak( this.getConstantRadiusAlert( constantRadius ) );
        }
      } );
    }
    else if ( ISLCQueryParameters.selfVoicing === 'levels' || ISLCQueryParameters.selfVoicing === 'minimalLevels' ) {
      model.showForceValuesProperty.lazyLink( showForceValues => {
        if ( levelSpeakerModel.objectChangesProperty.get() ) {
          webSpeaker.speak( this.getSelfVoicingShowForceValuesAlert( showForceValues ) );
        }
      } );

      model.showDistanceProperty.lazyLink( showDistance => {
        if ( levelSpeakerModel.objectChangesProperty.get() ) {
          webSpeaker.speak( this.getSelfVoicingDistanceVisibleAlert( showDistance ) );
        }
      } );

      model.constantRadiusProperty.lazyLink( constantRadius => {
        if ( levelSpeakerModel.objectChangesProperty.get() ) {
          webSpeaker.speak( this.getSelfVoicingConstantRadiusAlert( constantRadius ) );
        }
      } );
    }
  }

  /**
   * @private
   * @param {boolean} showDistance
   */
  alertDistanceVisible( showDistance ) {
    this.distanceVisibleUtterance.alert = this.getDistanceVisibleAlert( showDistance );
    phet.joist.sim.utteranceQueue.addToBack( this.distanceVisibleUtterance );
  }

  /**
   * Get an alert that describes the changing visibility of the distance value.
   * @public
   *
   * @param {boolean} showDistance
   * @returns {string}
   */
  getDistanceVisibleAlert( showDistance ) {
    return showDistance ? distanceArrowVisibleString : distanceArrowRemovedString;
  }

  /**
   * Get a string for the self voicing prototype that describes the changing visibility of force values.
   * @private
   * @param {boolean} showForceValues
   * @returns {string}
   */
  getSelfVoicingShowForceValuesAlert( showForceValues ) {
    return showForceValues ? selfVoicingForceValuesShownString : selfVoicingForceValuesHiddenString;
  }

  /**
   * Get a string for the self voicing prototype that describes the changing visibility of distance.
   * @private
   * @param {boolean} showDistance
   * @returns {string}
   */
  getSelfVoicingDistanceVisibleAlert( showDistance ) {
    return showDistance ? selfVoicingDistanceShownString : selfVoicingDistanceHiddenString;
  }

  /**
   * Get a string for the self voicing prototype that describes the changing visibility of distance.
   * @private
   * @param {boolean} constantRadius
   * @returns {string}
   */
  getSelfVoicingConstantRadiusAlert( constantRadius ) {
    return constantRadius ? selfVoicingConstantSizeSetString : selfVoicingConstantSizeOffString;
  }
}

gravityForceLabBasics.register( 'GFLBAlertManager', GFLBAlertManager );
export default GFLBAlertManager;