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
  const MassNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassNode' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Tandem = require( 'TANDEM/Tandem' );

  // constants
  const MASS_NODE_Y_POSITION = 215;

  class GFLBMassNode extends MassNode {

    /**
     * @param {GFLBModel} model
     * @param {Mass} mass
     * @param {Bounds2} layoutBounds
     * @param {ModelViewTransform2} modelViewTransform
     * @param {GFLBAlertManager} alertManager
     * @param {GFLBForceDescriber} forceDescriber
     * @param {GFLBPositionDescriber} positionDescriber
     * @param {Object} [options]
     */
    constructor( model, mass, layoutBounds, modelViewTransform, alertManager, forceDescriber, positionDescriber, options ) {

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

        finishWiringListeners: _.noop,

        // phet-io
        tandem: Tandem.required,

        // a11y recompute the PDOM descriptions when show distance is toggled
        additionalA11yDependencies: [ model.showDistanceProperty ]
      }, options );

      super( model, mass, layoutBounds, modelViewTransform, alertManager, forceDescriber, positionDescriber, options );
    }
  }

  return gravityForceLabBasics.register( 'GFLBMassNode', GFLBMassNode );
} );
