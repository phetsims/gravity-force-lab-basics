// Copyright 2013-2015, University of Colorado Boulder

/**
 * Double headed arrow that shows the distance between the two masses in gravity-force-lab-basics.  The arrow
 * goes from the center of one mass to the other.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Steele Dalton (PhET Interactive Simulations)
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
  var distanceString = require( 'string!GRAVITY_FORCE_LAB_BASICS/distance' );
  var distanceUnitsPatternString = require( 'string!GRAVITY_FORCE_LAB_BASICS/distanceUnitsPattern' );

  /**
   * 
   * @constructor
   */
  function DistanceArrowNode( mass1PositionProperty, mass2PositionProperty, showValuesProperty, modelViewTransform, tandem, options ) {

    Node.call( this, options );

    var arrowNode = new ArrowNode( mass1PositionProperty.get(), 0, mass2PositionProperty.get(), 0 , {
      doubleHead: true,
      tailWidth: 1,
      headHeight: 4,
      headWidth: 4
    } );
    this.addChild( arrowNode );

    var labelText = new Text( StringUtils.fillIn( distanceUnitsPatternString, { distance: 0 } ), {
      font: new PhetFont( 12 ),
      bottom: arrowNode.top - 5
    } );
    this.addChild( labelText );

    showValuesProperty.link( function( showValues ) {
      if ( !showValues ) {
        labelText.setText( distanceString );
      }
    } );

    Property.multilink( [ mass1PositionProperty, mass2PositionProperty, showValuesProperty ], function( position1, position2, showValues ) {

      // update the arrow node
      var viewPosition1 = modelViewTransform.modelToViewX( position1 );
      var viewPosition2 = modelViewTransform.modelToViewX( position2 );
      arrowNode.setTailAndTip( viewPosition1, 0, viewPosition2, 0 );

      // center the label
      labelText.centerX = arrowNode.centerX;

      if ( showValues ) {

        // update label
        var distance = position2 - position1;
        var labelString = StringUtils.fillIn( distanceUnitsPatternString, { distance: distance } );
        labelText.setText( labelString );
      }
    } );
  }

  gravityForceLabBasics.register( 'DistanceArrowNode', DistanceArrowNode );

  return inherit( Node, DistanceArrowNode, {

  } );
} );
