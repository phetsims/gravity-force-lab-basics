// Copyright 2013-2015, University of Colorado Boulder

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
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  var distanceUnitsPatternString = require( 'string!GRAVITY_FORCE_LAB_BASICS/distanceUnitsPattern' );

  // constants
  var HEAD_WIDTH = 6;
  var HEAD_HEIGHT = 6;

  /**
   * @constructor
   * @param {Property} mass1PositionProperty
   * @param {Property} mass2PositionProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   * @param {Object} options
   */
  function DistanceArrowNode( mass1PositionProperty, mass2PositionProperty, modelViewTransform, tandem, options ) {

    Node.call( this, options );

    var arrowNode = new ArrowNode( mass1PositionProperty.get(), 0, mass2PositionProperty.get(), 0 , {
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
      bottom: arrowNode.top + ( 3 * HEAD_WIDTH / 4 )
    } );
    this.addChild( labelText );

    Property.multilink( [ mass1PositionProperty, mass2PositionProperty ], function( position1, position2 ) {

      // update the arrow node width
      var viewPosition1 = modelViewTransform.modelToViewX( position1 );
      var viewPosition2 = modelViewTransform.modelToViewX( position2 );
      arrowNode.setTailAndTip( viewPosition1, 0, viewPosition2, 0 );

      // update label text and center, distance in meters so divide by 1000 to read out in km
      labelText.setText( StringUtils.fillIn( distanceUnitsPatternString, { distance: ( position2 - position1 ) / 1000 } ) );

      labelText.centerX = arrowNode.centerX;
    } );
  }

  gravityForceLabBasics.register( 'DistanceArrowNode', DistanceArrowNode );

  return inherit( Node, DistanceArrowNode, {

  } );
} );
