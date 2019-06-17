// Copyright 2017-2019, University of Colorado Boulder

/**
 * Mass object view for gravity-force-lab-basics.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const GFLBConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBConstants' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const ISLCObjectNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectNode' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RadialGradient = require( 'SCENERY/util/RadialGradient' );
  const Tandem = require( 'TANDEM/Tandem' );

  // constants
  const MASS_NODE_Y_POSITION = 215;

  class GFLBMassNode extends ISLCObjectNode {

    /**
     * @param {GFLBModel} model
     * @param {Mass} massModel
     * @param {Bounds2} layoutBounds
     * @param {ModelViewTransform2} modelViewTransform
     * @param {GFLBAlertManager} alertManager
     * @param {GFLBPositionDescriber} positionDescriber
     * @param {Object} [options]
     */
    constructor( model, massModel, layoutBounds, modelViewTransform, alertManager, positionDescriber, options ) {

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

        // {number} In meters, charges will snap to the nearest 0.1 meters in model coordinates
        snapToNearest: model.snapObjectsToNearest,
        stepSize: GFLBConstants.MASS_STEP_SIZE,

        // recompute the PDOM descriptions when show distance is toggled
        additionalA11yDependencies: [ model.showDistanceProperty ],
        tandem: Tandem.required
      }, options );

      super( model, massModel, layoutBounds, modelViewTransform, alertManager, positionDescriber, options );

      // @private
      this.modelViewTransform = modelViewTransform;
      this.objectModel = massModel;

      this.addInputListener( {
        focus: () => {
          positionDescriber.lastMoveCloser = null;
        }
      } );
    }

    /**
     * Redraws the white gradient on the mass objects with their radius.
     *
     * @param baseColor
     */
    updateGradient( baseColor ) {
      const radius = this.modelViewTransform.modelToViewDeltaX( this.objectModel.radiusProperty.get() );
      this.objectCircle.fill = new RadialGradient(
        -radius * 0.6, -radius * 0.6, 1, -radius * 0.6, -radius * 0.6, radius )
        .addColorStop( 0, baseColor.colorUtilsBrighter( 0.5 ).toCSS() )
        .addColorStop( 1, baseColor.toCSS() );
    }
  }

  return gravityForceLabBasics.register( 'GFLBMassNode', GFLBMassNode );
} );
