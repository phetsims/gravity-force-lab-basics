// Copyright 2017-2020, University of Colorado Boulder

/**
 * Mass object view for gravity-force-lab-basics.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import MassNode from '../../../gravity-force-lab/js/view/MassNode.js';
import merge from '../../../phet-core/js/merge.js';
import levelSpeakerModel from '../../../scenery-phet/js/accessibility/speaker/levelSpeakerModel.js';
import Tandem from '../../../tandem/js/Tandem.js';
import SelfVoicingUtterance from '../../../utterance-queue/js/SelfVoicingUtterance.js';
import GFLBConstants from '../GFLBConstants.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import gravityForceLabBasicsStrings from '../gravityForceLabBasicsStrings.js';

// constants
const MASS_NODE_Y_POSITION = 215;

const dragHintString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.dragHint;
const grabbedString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.grabbed;
const releasedString = gravityForceLabBasicsStrings.a11y.selfVoicing.levels.released;

class GFLBMassNode extends MassNode {

  /**
   * @param {GFLBModel} model
   * @param {Mass} mass
   * @param {Bounds2} layoutBounds
   * @param {ModelViewTransform2} modelViewTransform
   * @param {GFLBAlertManager} alertManager
   * @param {GFLBForceDescriber} forceDescriber
   * @param {GFLBPositionDescriber} positionDescriber
   * @param {Object} [options]
   */
  constructor( model, mass, layoutBounds, modelViewTransform, alertManager, forceDescriber, positionDescriber, options ) {

    options = merge( {
      arrowNodeOptions: {
        forceReadoutDecimalPlaces: 1,
        arrowFill: 'black',
        arrowLabelFill: 'black',
        maxArrowWidth: 400,
        forceThresholdPercent: 7 * Math.pow( 10, -4 ),
        backgroundFill: GFLBConstants.BACKGROUND_COLOR_PROPERTY
      },
      y: MASS_NODE_Y_POSITION,

      // {number} In meters, charges will snap to the nearest 0.1 meters in model coordinates
      snapToNearest: model.snapObjectsToNearest,
      stepSize: GFLBConstants.MASS_STEP_SIZE,

      finishWiringListeners: _.noop,

      // phet-io
      tandem: Tandem.REQUIRED,

      // pdom recompute the PDOM descriptions when show distance is toggled
      additionalA11yDependencies: [ model.showDistanceProperty ]
    }, options );

    super( model, mass, layoutBounds, modelViewTransform, alertManager, forceDescriber, positionDescriber, options );

    if ( phet.chipper.queryParameters.supportsSelfVoicing ) {

      // when we receive a click event from a 'double tap', describe to the
      // user how to drag the appendage
      this.addInputListener( {
        click: event => {
          const response = levelSpeakerModel.collectResponses( dragHintString );
          phet.joist.sim.selfVoicingUtteranceQueue.addToBack( response );
        }
      } );
    }
  }

  /**
   * Forward the beginning of a press and hold swipe gesture to the drag listener, as
   * this indicates that the focused node should be dragged from wherever the pointer
   * is.
   * @public (called by scenery)
   *
   * @param event
   * @param listener
   */
  swipeStart( event, listener ) {
    const response = levelSpeakerModel.collectResponses( grabbedString );
    phet.joist.sim.selfVoicingUtteranceQueue.addToBack( response );

    // we are going to forward the event to the dragListener rather than continuing
    // with swipe gestures detach the listener that is observing press and hold
    // gestures
    listener.detachPointerListener();

    // forward the event to the drag listener
    this.dragListener.press( event, this );
  }

  /**
   * Part of the self-voicing prototype. User has ended a drag of the appendage.
   * @public (called by SwipeListener)
   *
   * @param {SceneryEvent} event
   */
  swipeEnd( event ) {
    const releasedUtterance = new SelfVoicingUtterance( {
      alert: releasedString,
      cancelOther: false
    } );
    phet.joist.sim.selfVoicingUtteranceQueue.addToFront( releasedUtterance );
  }
}

gravityForceLabBasics.register( 'GFLBMassNode', GFLBMassNode );
export default GFLBMassNode;