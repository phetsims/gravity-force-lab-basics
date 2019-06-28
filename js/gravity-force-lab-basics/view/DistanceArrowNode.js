// Copyright 2017-2019, University of Colorado Boulder

/**
 * Double headed arrow that shows the distance between the two masses in gravity-force-lab-basics.  The arrow
 * goes from the center of one mass to the other.
 *
 * @author Steele Dalton (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const distanceUnitsPatternString = require( 'string!GRAVITY_FORCE_LAB_BASICS/distanceUnitsPattern' );

  // constants
  const HEAD_WIDTH = 6;
  const HEAD_HEIGHT = 6;

  class DistanceArrowNode extends Node {

    /**
     * @param {GFLBModel} model
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Object} [options]
     */
    constructor( model, modelViewTransform, options ) {
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
        tandem: options.tandem.createTandem( 'labelNode' )
      } );
      this.addChild( labelText );

      // DistanceArrowNode exists for life of sim and does not need disposal
      Property.multilink( [ model.object1.positionProperty, model.object2.positionProperty ],
        ( position1, position2 ) => {

          // update the arrow node width
          const viewPosition1 = modelViewTransform.modelToViewX( position1 );
          const viewPosition2 = modelViewTransform.modelToViewX( position2 );
          arrowNode.setTailAndTip( viewPosition1, 0, viewPosition2, 0 );

          // update label text and center, distance in meters so divide by 1000 to read out in km
          labelText.setText( StringUtils.fillIn( distanceUnitsPatternString, {
            distance: model.distanceProperty.get()
          } ) );

          labelText.centerX = arrowNode.centerX;
        } );
    }
  }

  return gravityForceLabBasics.register( 'DistanceArrowNode', DistanceArrowNode );
} );