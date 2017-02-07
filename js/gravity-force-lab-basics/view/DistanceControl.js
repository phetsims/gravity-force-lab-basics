// Copyright 2017, University of Colorado Boulder

/**
 * A number control contained in a panel that controls the distance of the masses in this sim.  The distances are
 * limited to integer values between 1-10 km when changed with the slider, and limited to 0.1 km when changed
 * with the tweakers.
 *
 * TODO: Complete according to specification and bring up to standards.
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var Panel = require( 'SUN/Panel' );
  var Range = require( 'DOT/Range' );
  var Util = require( 'DOT/Util' );
  var NumberControl = require( 'SCENERY_PHET/NumberControl' );
  var Property = require( 'AXON/Property' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  /**
   * Constructor.
   * @param {number} mass1
   * @param {number} mass2
   */
  function DistanceControl( mass1, mass2 ) {

    // temp properties and values - replace with model values
    // and implement behavior of masses
    var tempProperty = new Property( 0 ); // in km
    var numberRange = new Range( 0, 10 ); // in km

    // major tick labels
    var minLabel = new Text( '1 km', { font: new PhetFont( 10 ) } );
    var maxLabel = new Text( '10 km', { font: new PhetFont( 10 ) } );

    var control = new NumberControl( 'Distance', tempProperty, numberRange, {
      // layout
      layoutFunction: NumberControl.createLayoutFunction3(),

      // arrow buttons
      arrowButtonScale: 0.55,
      delta: 0.1,

      // value
      valueAlign: 'center',
      decimalPlaces: 1,

      // slider
      trackSize: new Dimension2( 130, 1 ),
      thumbSize: new Dimension2( 15, 22 ),
      thumbFillEnabled: 'rgb(55,179,74)',
      thumbCenterLineStroke: 'black',
      thumbTouchAreaXDilation: 11,
      thumbTouchAreaYDilation: 11,
      thumbMouseAreaXDilation: 0,
      thumbMouseAreaYDilation: 0,
      majorTicks: [ { value: 0, label: minLabel }, { value: 10, label: maxLabel } ],
      minorTickSpacing: 1, // zero indicates no minor ticks
      majorTickLength: 10,
      minorTickLength: 5,
      constrainValue: function( value ) {
        return Util.roundSymmetric( value );
      }
    } );

    
    Panel.call( this, control, {
      resize: false
    } );
  }

  gravityForceLabBasics.register( 'DistanceControl', DistanceControl );

  return inherit( Panel, DistanceControl );

} );
