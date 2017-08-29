// Copyright 2013-2015, University of Colorado Boulder

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
  var RangeWithValue = require('DOT/RangeWithValue'); 
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ISLCObjectNode = require('INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectNode');

  /**
   * @param {CoulombsLawbModel} model
   * @param {ChargeModel} massMode
   * @param {Bounds2} layoutBounds
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function GFLBMassNode( model, massModel, layoutBounds, modelViewTransform, tandem, options ) {

    options = _.extend( {
      arrowLabelFill: 'black',
      labelFill: '#F3F3F3',
      labelFont: new PhetFont( 25 ),
      labelMaxWidth: 35,
      forceReadoutDecimalPlaces: 1,
      arrowFill: 'black',
      arrowTailWidth: 2,
      maxArrowWidth: 15,
      labelShadowOffsetX: 0.9,
      labelShadowOffsetY: 0.9,
      snapToNearest: model.snapObjectsToNearest // in meters, charges will snap to the nearest 0.1 meters in model coordinates
    }, options );

    // @private
    this.modelViewTransform = modelViewTransform;
    this.model = model;
    this.objectModel = massModel;

    // functions that determine scaling of the arrow readout and the correct image to represent
    var pullForceRange = new RangeWithValue( ( 0.7 ), ( 1070 ) ); // empirically determined for linear mapping of pull objects
    
    ISLCObjectNode.call( this, model, massModel, layoutBounds, modelViewTransform, pullForceRange, tandem.createTandem( 'chargeNode1' ), options );
  }

  gravityForceLabBasics.register( 'GFLBMassNode', GFLBMassNode );

  // TODO: Inherit from InverseSquareISLCObjectNode
  return inherit( ISLCObjectNode, GFLBMassNode, {

    updateGradient: function( baseColor ) {
      var radius = this.modelViewTransform.modelToViewDeltaX( this.objectModel.radiusProperty.get() );
      this.objectCircle.fill = new RadialGradient( -radius * 0.6, -radius * 0.6, 1, -radius * 0.6, -radius * 0.6, radius )
        .addColorStop( 0, baseColor.colorUtilsBrighter( 0.5 ).toCSS() )
        .addColorStop( 1, baseColor.toCSS() );
    }
  } );
} );
