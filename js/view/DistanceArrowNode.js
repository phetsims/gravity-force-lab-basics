// Copyright 2017-2022, University of Colorado Boulder

/**
 * Double headed arrow that shows the distance between the two masses in gravity-force-lab-basics.  The arrow
 * goes from the center of one mass to the other.
 *
 * @author Steele Dalton (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import merge from '../../../phet-core/js/merge.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import ArrowNode from '../../../scenery-phet/js/ArrowNode.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import { Node, ReadingBlock, Text } from '../../../scenery/js/imports.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import gravityForceLabBasicsStrings from '../gravityForceLabBasicsStrings.js';

const distanceUnitsPatternString = gravityForceLabBasicsStrings.distanceUnitsPattern;
const distanceKilometersPatternString = gravityForceLabBasicsStrings.a11y.voicing.distanceKilometersPattern;
const distanceArrowReadingBlockContentString = gravityForceLabBasicsStrings.a11y.voicing.distanceArrowReadingBlockContent;

// constants
const HEAD_WIDTH = 8;
const HEAD_HEIGHT = 8;

class DistanceArrowNode extends ReadingBlock( Node ) {

  /**
   * @mixes {ReadingBlock}
   * @param {GFLBModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @param {PositionDescriber} positionDescriber
   * @param {Object} [options]
   */
  constructor( model, modelViewTransform, positionDescriber, options ) {

    options = merge( {
      readingBlockHintResponse: distanceArrowReadingBlockContentString,

      // the content of this ReadingBlock is generally provided with other interaction and so it should not
      // add any content in the PDOM or be added to the navigation order, but it is still available for mouse and touch
      readingBlockTagName: null
    }, options );

    super();

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
      textPropertyOptions: { phetioReadOnly: true },
      phetioDocumentation: 'The distance as text between the two masses'
    } );
    this.addChild( labelText );

    // DistanceArrowNode exists for life of sim and does not need disposal
    Property.multilink( [ model.object1.positionProperty, model.object2.positionProperty ],
      ( position1, position2 ) => {

        // update the arrow node width
        const viewPosition1 = modelViewTransform.modelToViewX( position1 );
        const viewPosition2 = modelViewTransform.modelToViewX( position2 );
        arrowNode.setTailAndTip( viewPosition1, 0, viewPosition2, 0 );

        const distanceInKm = model.separationProperty.get() / 1000; // m to km

        // update label text and center, distance in meters so divide by 1000 to read out in km
        labelText.setText( StringUtils.fillIn( distanceUnitsPatternString, {
          distance: distanceInKm
        } ) );

        // voicing - update the ReadingBlock content
        this.readingBlockContent = StringUtils.fillIn( distanceKilometersPatternString, {
          distance: distanceInKm
        } );

        labelText.centerX = arrowNode.centerX;
      } );

    this.mutate( options );
  }
}

gravityForceLabBasics.register( 'DistanceArrowNode', DistanceArrowNode );
export default DistanceArrowNode;