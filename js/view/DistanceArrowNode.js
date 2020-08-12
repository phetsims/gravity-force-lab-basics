// Copyright 2017-2020, University of Colorado Boulder

/**
 * Double headed arrow that shows the distance between the two masses in gravity-force-lab-basics.  The arrow
 * goes from the center of one mass to the other.
 *
 * @author Steele Dalton (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import gravityForceLabStrings from '../../../gravity-force-lab/js/gravityForceLabStrings.js';
import inverseSquareLawCommonStrings from '../../../inverse-square-law-common/js/inverseSquareLawCommonStrings.js';
import ISLCQueryParameters from '../../../inverse-square-law-common/js/ISLCQueryParameters.js';
import cursorSpeakerModel from '../../../inverse-square-law-common/js/view/CursorSpeakerModel.js';
import levelSpeakerModel from '../../../inverse-square-law-common/js/view/levelSpeakerModel.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import ArrowNode from '../../../scenery-phet/js/ArrowNode.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import Node from '../../../scenery/js/nodes/Node.js';
import merge from '../../../phet-core/js/merge.js';
import Text from '../../../scenery/js/nodes/Text.js';
import gravityForceLabBasicsStrings from '../gravityForceLabBasicsStrings.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import webSpeaker from '../../../inverse-square-law-common/js/view/webSpeaker.js';

const distanceUnitsPatternString = gravityForceLabBasicsStrings.distanceUnitsPattern;
const verboseDistanceArrowDescriptionString = gravityForceLabBasicsStrings.a11y.selfVoicing.verboseDistanceArrowDescription;
const briefDistanceArrowDescriptionString = gravityForceLabBasicsStrings.a11y.selfVoicing.briefDistanceArrowDescription;
const selfVoicingLevelsDistanceArrowPatternString = gravityForceLabStrings.a11y.selfVoicing.levels.distanceArrowPattern;
const selfVoicingLevelsMoveSpheresHintString = inverseSquareLawCommonStrings.a11y.selfVoicing.levels.moveSpheresHintString;

// constants
const HEAD_WIDTH = 8;
const HEAD_HEIGHT = 8;

class DistanceArrowNode extends Node {

  /**
   * @param {GFLBModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @param {PositionDescriber} positionDescriber
   * @param {Object} [options]
   */
  constructor( model, modelViewTransform, positionDescriber, options ) {

    options = merge( {

      // {null|ShapeHitDetector} - a11y, to support prototype self-voicing feature set - if included, browser
      // will speak information about disatnce upon certain user input
      shapeHitDetector: null
    }, options );

    super( options );

    const arrowNode = new ArrowNode( model.object1.positionProperty.get(), 0,
      model.object2.positionProperty.get(), 0, {
        doubleHead: true,
        tailWidth: 0.5,
        headHeight: HEAD_HEIGHT,
        headWidth: HEAD_WIDTH,
        stroke: '#BFBFBF',
        fill: '#BFBFBF'
      } );
    this.addChild( arrowNode );

    // the label
    const labelText = new Text( StringUtils.fillIn( distanceUnitsPatternString, { distance: 0 } ), {
      font: new PhetFont( 12 ),
      bottom: arrowNode.top + ( 3 * HEAD_WIDTH / 4 ),
      tandem: options.tandem.createTandem( 'labelText' ),
      phetioComponentOptions: { textProperty: { phetioReadOnly: true } },
      phetioDocumentation: 'The distance as text between the two masses'
    } );
    this.addChild( labelText );

    if ( options.shapeHitDetector ) {
      if ( ISLCQueryParameters.selfVoicing === 'paradigm1' ) {
        options.shapeHitDetector.addNode( this );
        options.shapeHitDetector.hitShapeEmitter.addListener( hitTarget => {
          if ( hitTarget === this ) {
            if ( cursorSpeakerModel.exploreModeProperty.get() ) {
              const verboseMode = cursorSpeakerModel.exploreModeVerbosityProperty.get() === cursorSpeakerModel.Verbosity.VERBOSE;
              const patternString = verboseMode ? verboseDistanceArrowDescriptionString : briefDistanceArrowDescriptionString;

              webSpeaker.speak( StringUtils.fillIn( patternString, {
                distance: model.separationProperty.get() / 1000 // m to km
              } ) );
            }
          }
        } );
      }
      else if ( ISLCQueryParameters.selfVoicing === 'paradigm2' || ISLCQueryParameters.selfVoicing === 'paradigm3' ) {
        levelSpeakerModel.addHitDetectionForObjectResponsesAndHelpText( this, options.shapeHitDetector );
        if ( levelSpeakerModel.objectChangesProperty.get() ) {
          options.shapeHitDetector.downOnHittableEmitter.addListener( hitTarget => {
            if ( hitTarget === this ) {
              let objectResponse;
              if ( ISLCQueryParameters.selfVoicingVersion === 1 ) {
                objectResponse = StringUtils.fillIn( selfVoicingLevelsDistanceArrowPatternString, {
                  distance: model.separationProperty.get() / 1000 // m to km
                } );
              }
              else {
                objectResponse = positionDescriber.getCentersApartDistance();
              }

              const interactionHint = selfVoicingLevelsMoveSpheresHintString;
              levelSpeakerModel.speakAllResponses( objectResponse, null, interactionHint );
            }
          } );
        }
      }
    }

    // DistanceArrowNode exists for life of sim and does not need disposal
    Property.multilink( [ model.object1.positionProperty, model.object2.positionProperty ],
      ( position1, position2 ) => {

        // update the arrow node width
        const viewPosition1 = modelViewTransform.modelToViewX( position1 );
        const viewPosition2 = modelViewTransform.modelToViewX( position2 );
        arrowNode.setTailAndTip( viewPosition1, 0, viewPosition2, 0 );

        // update label text and center, distance in meters so divide by 1000 to read out in km
        labelText.setText( StringUtils.fillIn( distanceUnitsPatternString, {
          distance: model.separationProperty.get() / 1000 // m to km
        } ) );

        labelText.centerX = arrowNode.centerX;
      } );
  }
}

gravityForceLabBasics.register( 'DistanceArrowNode', DistanceArrowNode );
export default DistanceArrowNode;