// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var Image = require( 'SCENERY/nodes/Image' );
  var HSlider = require( 'SUN/HSlider' );
  var Property = require( 'AXON/Property' );

  // images
  var backgroundImage = require( 'image!GRAVITY_FORCE_LAB_BASICS/background.png' );

  /**
   * @param {GravityForceLabBasicsModel} gravityForceLabBasicsModel
   * @constructor
   */
  function GravityForceLabBasicsScreenView( gravityForceLabBasicsModel, tandem ) {
    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 768, 464 ) } );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        gravityForceLabBasicsModel.reset();
      },
      right:  this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( resetAllButton );

    //Show the mock-up and a slider to change its transparency
    var mockupOpacityProperty = new Property( 0.00 );
    var mockImage = new Image( backgroundImage, { pickable: false } );
    mockImage.scale( this.layoutBounds.width / mockImage.width, this.layoutBounds.height / mockImage.height );
    mockupOpacityProperty.linkAttribute( mockImage, 'opacity' );
    this.addChild( mockImage );
    this.addChild( new HSlider( mockupOpacityProperty, { min: 0, max: 1 }, { top: 10, left: 10 } ) );
  }

  gravityForceLabBasics.register( 'GravityForceLabBasicsScreenView', GravityForceLabBasicsScreenView );

  return inherit( ScreenView, GravityForceLabBasicsScreenView );
} );