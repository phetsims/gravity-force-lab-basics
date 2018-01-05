// Copyright 2017, University of Colorado Boulder

/**
 * Grid that shows the possible locations of where the masses can be in the play area.
 * This node should only be used for debugging and will be hidden behind query parameter "showGrid".
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var GravityForceLabBasicsConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {Bounds2} layoutBounds
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function GridNode( layoutBounds, modelViewTransform ) {

    // grid parameters in model coordinates
    var deltaX = GravityForceLabBasicsConstants.MASS_POSITION_DELTA;
    var maxX = GravityForceLabBasicsConstants.RIGHT_MASS_BOUNDARY;
    var minX = GravityForceLabBasicsConstants.LEFT_MASS_BOUNDARY;

    var gridShape = new Shape();

    var gridPosition = minX;
    while ( gridPosition <= maxX ) {

      // grid position in view coords
      var viewPosition = modelViewTransform.modelToViewX( gridPosition );

      // draw the grid line
      gridShape.moveTo( viewPosition, layoutBounds.top );
      gridShape.lineTo( viewPosition, layoutBounds.bottom );

      // move to the next location
      gridPosition += deltaX;
    }

    Path.call( this, gridShape, {
      stroke: 'rgba( 0, 0, 0, 0.6 )',
      lineWidth: 1
    } );
  }

  gravityForceLabBasics.register( 'GridNode', GridNode );

  return inherit( Path, GridNode );
} );