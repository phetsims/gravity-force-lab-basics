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
  var GravityForceLabBasicsConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsConstants' );
  var GridNode = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GridNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var GravityForceLabBasicsQueryParameters = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsQueryParameters' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Color = require( 'SCENERY/util/Color' );
  var MassNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassNode' );
  var HSlider = require( 'SUN/HSlider' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var ParameterControlPanel = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/ParameterControlPanel' );
  var MassControl = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/MassControl' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var MASS_CONTROLS_Y_POSITION = 345;
  var MASS_NODE_Y_POSITION = 215;
  var SHOW_GRID = GravityForceLabBasicsQueryParameters.showGrid;

  // strings
  var mass1String = require( 'string!GRAVITY_FORCE_LAB/mass1' );
  var mass2String = require( 'string!GRAVITY_FORCE_LAB/mass2' );
  var mass1AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass1Abbreviated' );
  var mass2AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass2Abbreviated' );

  // images
  var backgroundImage = require( 'image!GRAVITY_FORCE_LAB_BASICS/background.png' );

  /**
   * @param {GravityForceLabBasicsModel} model
   * @constructor
   */
  function GravityForceLabBasicsScreenView( model, tandem ) {
    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 768, 464 ) } );

    // Create the model-view transform.  The primary units used in the model are meters, so significant zoom is used.
    // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model, which is
    // between the two masses.
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2 ),
      .05
    );

    // view parameter controls
    var parameterControlPanel = new ParameterControlPanel( model, tandem.createTandem( 'parameterControlPanel' ), {
      fill: '#f1f1f2'
    } );
    this.addChild( parameterControlPanel );

    // mass controls
    var massControl1 = new MassControl( mass1String, model.object1.valueProperty, GravityForceLabBasicsConstants.MASS_RANGE, tandem.createTandem( 'massControl1' ) );
    var massControl2 = new MassControl( mass2String, model.object2.valueProperty, GravityForceLabBasicsConstants.MASS_RANGE, tandem.createTandem( 'massControl2' ), {
      color: new Color( 255, 0, 0 )
    } );

    // place mass controls in an HBox
    var massControlBox = new HBox( {
      children: [ massControl1, massControl2 ],
      center: this.layoutBounds.center,
      spacing: 50
    } );
    this.addChild( massControlBox );

    // add the mass nodes to the screen
    this.addChild( new MassNode(
      model,
      model.object1,
      this.layoutBounds,
      modelViewTransform,
      tandem.createTandem( 'mass1Node' ),
      {
        label: mass1AbbreviatedString,
        otherMassLabel: mass2AbbreviatedString,
        direction: 'left',
        arrowColor: '#66f',
        y: MASS_NODE_Y_POSITION,
        forceArrowHeight: 125,
        forceReadoutDecimalPlaces: 1,
        snapToNearest: GravityForceLabBasicsConstants.MASS_POSITION_DELTA
      }
    ) );

    this.addChild( new MassNode(
      model,
      model.object2,
      this.layoutBounds,
      modelViewTransform,
      tandem.createTandem( 'mass2Node' ),
      {
        label: mass2AbbreviatedString,
        otherMassLabel: mass1AbbreviatedString,
        direction: 'right',
        arrowColor: '#f66',
        y: MASS_NODE_Y_POSITION,
        forceArrowHeight: 175,
        forceReadoutDecimalPlaces: 1,
        snapToNearest: GravityForceLabBasicsConstants.MASS_POSITION_DELTA
      }
    ) );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( resetAllButton );

    // layout the view elements
    parameterControlPanel.right = this.layoutBounds.width - 15;
    parameterControlPanel.bottom = MASS_CONTROLS_Y_POSITION;

    massControlBox.right = parameterControlPanel.left - 45;
    massControlBox.top = parameterControlPanel.top;

    // massControl1ConstantRadius.center = massControl1.center;
    // massControl2ConstantRadius.center = massControl2.center;
    resetAllButton.right = parameterControlPanel.right;
    resetAllButton.top = parameterControlPanel.bottom + 13.5;

    //------------------------------------------------
    // debugging
    //------------------------------------------------

    //Show the mock-up and a slider to change its transparency
    var mockupOpacityProperty = new Property( 0.00 );
    var mockImage = new Image( backgroundImage, { pickable: false } );
    mockImage.scale( this.layoutBounds.width / mockImage.width, this.layoutBounds.height / mockImage.height );
    mockupOpacityProperty.linkAttribute( mockImage, 'opacity' );
    this.addChild( mockImage );
    this.addChild( new HSlider( mockupOpacityProperty, { min: 0, max: 1 }, { top: 10, left: 10 } ) );

    if ( SHOW_GRID ) {
      this.addChild( new GridNode( this.layoutBounds, modelViewTransform ) );
    }
  }

  gravityForceLabBasics.register( 'GravityForceLabBasicsScreenView', GravityForceLabBasicsScreenView );

  return inherit( ScreenView, GravityForceLabBasicsScreenView );
} );