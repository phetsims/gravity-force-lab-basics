// Copyright 2017-2018, University of Colorado Boulder

/**
 * Double headed arrow that shows the distance between the two masses in gravity-force-lab-basics.  The arrow
 * goes from the center of one mass to the other.
 *
 * @author Steele Dalton (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var distanceUnitsPatternString = require( 'string!GRAVITY_FORCE_LAB_BASICS/distanceUnitsPattern' );

  // constants
  var HEAD_WIDTH = 6;
  var HEAD_HEIGHT = 6;

  /**
   * @param {GFLBModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function DistanceArrowNode( model, modelViewTransform, options ) {

    Node.call( this, options );

    var arrowNode = new ArrowNode( model.object1.positionProperty.get(), 0, model.object2.positionProperty.get(), 0, {
      doubleHead: true,
      tailWidth: 0.5,
      headHeight: HEAD_HEIGHT,
      headWidth: HEAD_WIDTH,
      stroke: '#BFBFBF',
      fill: '#BFBFBF'
    } );
    this.addChild( arrowNode );

    // the label
    var labelText = new Text( StringUtils.fillIn( distanceUnitsPatternString, { distance: 0 } ), {
      font: new PhetFont( 12 ),
      bottom: arrowNode.top + ( 3 * HEAD_WIDTH / 4 ),
      tandem: options.tandem.createTandem( 'labelNode' )
    } );
    this.addChild( labelText );

    Property.multilink( [ model.object1.positionProperty, model.object2.positionProperty ], function( position1, position2 ) {

      // update the arrow node width
      var viewPosition1 = modelViewTransform.modelToViewX( position1 );
      var viewPosition2 = modelViewTransform.modelToViewX( position2 );
      arrowNode.setTailAndTip( viewPosition1, 0, viewPosition2, 0 );

      // update label text and center, distance in meters so divide by 1000 to read out in km
      labelText.setText( StringUtils.fillIn( distanceUnitsPatternString, { distance: model.distanceProperty.get() } ) );

      labelText.centerX = arrowNode.centerX;
    } );
  }

  gravityForceLabBasics.register( 'DistanceArrowNode', DistanceArrowNode );

  return inherit( Node, DistanceArrowNode );
} );