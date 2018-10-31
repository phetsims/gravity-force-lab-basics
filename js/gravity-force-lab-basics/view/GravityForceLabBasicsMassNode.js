// Copyright 2017-2018, University of Colorado Boulder

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
  var GravityForceLabBasicsConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsConstants' );
  var GFLBStringManager = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GFLBStringManager' );
  var ISLCObjectNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
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
  function GravityForceLabBasicsMassNode( model, massModel, layoutBounds, modelViewTransform, options ) {

    options = _.extend( {
      arrowLabelFill: 'black',
      labelFill: '#F3F3F3',
      labelFont: new PhetFont( 25 ),
      labelMaxWidth: 35,
      forceReadoutDecimalPlaces: 1,
      arrowFill: 'black',
      arrowTailWidth: 2,
      maxArrowWidth: 100,
      labelShadowOffsetX: 0.9,
      labelShadowOffsetY: 0.9,
      y: MASS_NODE_Y_POSITION,
      snapToNearest: model.snapObjectsToNearest, // in meters, charges will snap to the nearest 0.1 meters in model coordinates

      tandem: Tandem.required,

      // a11y
      createAriaValueText: function( formattedValue, previousValue ) {
        formattedValue += 4800;
        return GFLBStringManager.getPositionMeterMarkText( formattedValue );
      }
    }, options );

    // @private
    this.modelViewTransform = modelViewTransform;
    this.model = model;
    this.objectModel = massModel;

    var pullForceRange = GravityForceLabBasicsConstants.PULL_FORCE_RANGE;

    ISLCObjectNode.call( this, model, massModel, layoutBounds, modelViewTransform, pullForceRange, options );
  }

  gravityForceLabBasics.register( 'GravityForceLabBasicsMassNode', GravityForceLabBasicsMassNode );

  return inherit( ISLCObjectNode, GravityForceLabBasicsMassNode, {

    /**
     * Redraws the white gradient on the mass objects with their radius.
     *
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
