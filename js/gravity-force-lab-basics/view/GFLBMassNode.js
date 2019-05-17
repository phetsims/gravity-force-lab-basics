// Copyright 2017-2019, University of Colorado Boulder

/**
 * Mass object view for gravity-force-lab-basics.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var GFLBConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBConstants' );
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCObjectNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var Tandem = require( 'TANDEM/Tandem' );

  // constants
  var MASS_NODE_Y_POSITION = 215;

  /**
   * @param {GFLBModel} model
   * @param {Mass} massModel
   * @param {Bounds2} layoutBounds
   * @param {ModelViewTransform2} modelViewTransform
   * @param {GFLBAlertManager} alertManager
   * @param {GFLBPositionDescriber} positionDescriber
   * @param {Object} [options]
   * @constructor
   */
  function GFLBMassNode( model, massModel, layoutBounds, modelViewTransform, alertManager, positionDescriber, options ) {

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
      stepSize: GFLBConstants.MASS_STEP_SIZE,
      tandem: Tandem.required
    }, options );

    // @private
    this.modelViewTransform = modelViewTransform;
    this.model = model;
    this.objectModel = massModel;

    var pullForceRange = GFLBConstants.PULL_FORCE_RANGE;

    ISLCObjectNode.call( this, model, massModel, layoutBounds, modelViewTransform, pullForceRange, alertManager, positionDescriber, options );

    // keep value text up to date when distances are toggled
    model.showDistanceProperty.lazyLink( () => {
      this.updateOnFocusAriaValueText();
    } );

    this.addInputListener( {
      focus: () => {
        positionDescriber.lastMoveCloser = null;
      }
    } );
  }

  gravityForceLabBasics.register( 'GFLBMassNode', GFLBMassNode );

  return inherit( ISLCObjectNode, GFLBMassNode, {

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
