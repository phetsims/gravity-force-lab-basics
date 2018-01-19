// Copyright 2016-2018, University of Colorado Boulder

/**
 * Main screen view for the simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var Color = require( 'SCENERY/util/Color' );
  var DistanceArrowNode = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/DistanceArrowNode' );
  var GFLBMassNode = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GFLBMassNode' );
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var GravityForceLabBasicsConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsConstants' );
  var GravityForceLabBasicsQueryParameters = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsQueryParameters' );
  var GridNode = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GridNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCCheckboxItem = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCCheckboxItem' );
  var ISLCCheckboxPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCCheckboxPanel' );
  var Line = require( 'SCENERY/nodes/Line' );
  var MassControl = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/MassControl' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Property = require( 'AXON/Property' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var MASS_CONTROLS_Y_POSITION = 385;
  var PANEL_SPACING = 50;
  var SHOW_GRID = GravityForceLabBasicsQueryParameters.showGrid;
  var SHOW_DRAG_BOUNDS = GravityForceLabBasicsQueryParameters.showDragBounds;

  // strings
  var constantRadiusString = require( 'string!INVERSE_SQUARE_LAW_COMMON/constantRadius' );
  var distanceString = require( 'string!GRAVITY_FORCE_LAB_BASICS/distance' );
  var mass1LabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass1Label' );
  var mass1String = require( 'string!INVERSE_SQUARE_LAW_COMMON/mass1' );
  var mass2LabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass2Label' );
  var mass2String = require( 'string!INVERSE_SQUARE_LAW_COMMON/mass2' );
  var showValuesString = require( 'string!GRAVITY_FORCE_LAB_BASICS/showValues' );

  /**
   * @param {GravityForceLabBasicsModel} model
   * @param {Tandem} tandem
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

    var checkboxItems = [
      new ISLCCheckboxItem( showValuesString, model.showValuesProperty, {
        tandem: tandem.createTandem( 'showValuesCheckbox' )
      } ),
      new ISLCCheckboxItem( distanceString, model.showDistanceProperty, {
        tandem: tandem.createTandem( 'distanceCheckbox' )
      } ),
      new ISLCCheckboxItem( constantRadiusString, model.constantRadiusProperty, {
        tandem: tandem.createTandem( 'constantRadiusCheckbox' )
      } )
    ];
    var parameterControlPanel = new ISLCCheckboxPanel( checkboxItems, {
      tandem: tandem.createTandem( 'parameterControlPanel' ),
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
      spacing: PANEL_SPACING
    } );
    this.addChild( massControlBox );

    // add the mass nodes to the screen
    var mass1Node = new GFLBMassNode( model, model.object1, this.layoutBounds, modelViewTransform, {
      label: mass1LabelString,
      otherObjectLabel: mass2LabelString,
      defaultDirection: 'left',
      arrowColor: '#66F',
      forceArrowHeight: 125,
      tandem: tandem.createTandem( 'mass1Node' )
    } );

    var mass2Node = new GFLBMassNode( model, model.object2, this.layoutBounds, modelViewTransform, {
      label: mass2LabelString,
      otherObjectLabel: mass1LabelString,
      defaultDirection: 'right',
      arrowColor: '#F66',
      forceArrowHeight: 175,
      tandem: tandem.createTandem( 'mass2Node' )
    } );

    this.addChild( mass1Node );
    this.addChild( mass2Node );

    // the arrow nodes and their labels should be on top of the masses, but under the rest of the control
    // panel
    this.addChild( mass1Node.arrowNode );
    this.addChild( mass2Node.arrowNode );

    // arrow that shows distance between the two masses
    var distanceArrowNode = new DistanceArrowNode( model, modelViewTransform, {
      tandem: tandem.createTandem( 'distanceArrowNode' ),
      y: 145
    } );
    model.showDistanceProperty.linkAttribute( distanceArrowNode, 'visible' );
    this.addChild( distanceArrowNode );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    // layout the view elements
    parameterControlPanel.right = this.layoutBounds.width - 15;
    parameterControlPanel.bottom = MASS_CONTROLS_Y_POSITION;

    massControlBox.right = parameterControlPanel.left - PANEL_SPACING;
    massControlBox.top = parameterControlPanel.top;

    // massControl2ConstantRadius.center = massControl2.center;
    resetAllButton.right = parameterControlPanel.right;
    resetAllButton.top = parameterControlPanel.bottom + 13.5;

    // a11y - TODO: could move to a common type for inverse square law common sims
    var objectProperties = [ model.object1.positionProperty, model.object1.radiusProperty, model.object2.positionProperty, model.object2.radiusProperty ];
    Property.multilink( objectProperties, function( position1, radius1, position2, radius2 ) {
      mass1Node.setAccessibleAttribute( 'min', model.getObjectMinPosition( model.object1 ) );
      mass1Node.setAccessibleAttribute( 'max', model.getObjectMaxPosition( model.object1 ) );
      mass2Node.setAccessibleAttribute( 'min', model.getObjectMinPosition( model.object2 ) );
      mass2Node.setAccessibleAttribute( 'max', model.getObjectMaxPosition( model.object2 ) );
    } );

    // a11y - specify the order of focus for things in the ScreenView
    this.accessibleOrder = [ mass1Node, mass2Node, massControlBox, parameterControlPanel, resetAllButton ];

    //------------------------------------------------
    // debugging
    //------------------------------------------------

    if ( SHOW_DRAG_BOUNDS ) {

      // Show the min/max locations for dragging the objects
      var verticalMin = this.layoutBounds.minY;
      var verticalMax = this.layoutBounds.height;
      var object1LineOptions = { stroke: 'blue', lineWidth: 2 };
      var object2LineOptions = { stroke: 'red', lineWidth: 2 };

      var object1MinLine = new Line( 0, verticalMin, 0, verticalMax, object1LineOptions );
      var object1MaxLine = new Line( 0, verticalMin, 0, verticalMax, object1LineOptions );
      var object2MinLine = new Line( 0, verticalMin, 0, verticalMax, object2LineOptions );
      var object2MaxLine = new Line( 0, verticalMin, 0, verticalMax, object2LineOptions );

      this.addChild( object1MinLine );
      this.addChild( object2MinLine );
      this.addChild( object1MaxLine );
      this.addChild( object2MaxLine );

      var object1MinX;
      var object1MaxX;
      var object2MinX;
      var object2MaxX;
      Property.multilink( objectProperties, function( position1, radius1, position2, radius2 ) {
        object1MinX = modelViewTransform.modelToViewX( model.getObjectMinPosition( model.object1 ) );
        object1MinLine.x1 = object1MinX;
        object1MinLine.x2 = object1MinX;

        object1MaxX = modelViewTransform.modelToViewX( model.getObjectMaxPosition( model.object1 ) );
        object1MaxLine.x1 = object1MaxX;
        object1MaxLine.x2 = object1MaxX;

        object2MinX = modelViewTransform.modelToViewX( model.getObjectMinPosition( model.object2 ) );
        object2MinLine.x1 = object2MinX;
        object2MinLine.x2 = object2MinX;

        object2MaxX = modelViewTransform.modelToViewX( model.getObjectMaxPosition( model.object2 ) );
        object2MaxLine.x1 = object2MaxX;
        object2MaxLine.x2 = object2MaxX;
      } );
    }

    if ( SHOW_GRID ) {
      this.addChild( new GridNode( this.layoutBounds, modelViewTransform ) );
    }
  }

  gravityForceLabBasics.register( 'GravityForceLabBasicsScreenView', GravityForceLabBasicsScreenView );

  return inherit( ScreenView, GravityForceLabBasicsScreenView );
} );