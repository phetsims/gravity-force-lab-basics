// Copyright 2017, University of Colorado Boulder

/**
 * Mass object view for gravity-force-lab-basics.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCObjectNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );
  var Tandem = require( 'TANDEM/Tandem' );

  // constants
  var MASS_NODE_Y_POSITION = 215;

  /**
   * @param {GravityForceLabBasicsModel} model
   * @param {Mass} massModel
   * @param {Bounds2} layoutBounds
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function GFLBMassNode( model, massModel, layoutBounds, modelViewTransform, options ) {
    options = _.extend( {
      arrowLabelFill: 'black',
      labelFill: '#F3F3F3',
      labelFont: new PhetFont( 25 ),
      labelMaxWidth: 35,
      forceReadoutDecimalPlaces: 1,
      arrowFill: 'black',
      arrowTailWidth: 2,

      // TODO: scale factor for the arrow so that it has requested size, calculate this if design team likes the feel,
      // see https://github.com/phetsims/inverse-square-law-common/issues/21
      maxArrowWidth: 100,
      labelShadowOffsetX: 0.9,
      labelShadowOffsetY: 0.9,
      y: MASS_NODE_Y_POSITION,
      snapToNearest: model.snapObjectsToNearest, // in meters, charges will snap to the nearest 0.1 meters in model coordinates

      tandem: Tandem.required
    }, options );

    // @private
    this.modelViewTransform = modelViewTransform;
    this.model = model;
    this.objectModel = massModel;

    // functions that determine scaling of the arrow readout and the correct image to represent
    var pullForceRange = new RangeWithValue( 35, 1070 ); // empirically determined for linear mapping of pull objects

    ISLCObjectNode.call( this, model, massModel, layoutBounds, modelViewTransform, pullForceRange, options );
  }

  gravityForceLabBasics.register( 'GFLBMassNode', GFLBMassNode );

  return inherit( ISLCObjectNode, GFLBMassNode, {

    /**
     * TODO: document me
     * @param baseColor
     */
    updateGradient: function( baseColor ) {
      var radius = this.modelViewTransform.modelToViewDeltaX( this.objectModel.radiusProperty.get() );
      this.objectCircle.fill = new RadialGradient( -radius * 0.6, -radius * 0.6, 1, -radius * 0.6, -radius * 0.6, radius )
        .addColorStop( 0, baseColor.colorUtilsBrighter( 0.5 ).toCSS() )
        .addColorStop( 1, baseColor.toCSS() );
    }
  } );
} );