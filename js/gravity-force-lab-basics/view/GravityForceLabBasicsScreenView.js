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
  var ControlAreaNode = require( 'SCENERY_PHET/accessibility/nodes/ControlAreaNode' );
  var DistanceArrowNode = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/DistanceArrowNode' );
  var GFLBStringManager = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GFLBStringManager' );
  var GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var GravityForceLabBasicsConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GravityForceLabBasicsConstants' );
  var GravityForceLabBasicsMassNode = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GravityForceLabBasicsMassNode' );
  var GravityForceLabScreenSummaryNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabScreenSummaryNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  var ISLCCheckboxItem = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCCheckboxItem' );
  var ISLCCheckboxPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCCheckboxPanel' );
  var ISLCDragBoundsNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCDragBoundsNode' );
  var ISLCGridNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCGridNode' );
  var ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  var ISLCQueryParameters = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCQueryParameters' );
  var MassControl = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/MassControl' );
  var MassPDOMNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassPDOMNode' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PlayAreaNode = require( 'SCENERY_PHET/accessibility/nodes/PlayAreaNode' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var MASS_CONTROLS_Y_POSITION = 385;
  var PANEL_SPACING = 50;
  var SHOW_GRID = ISLCQueryParameters.showGrid;
  var SHOW_DRAG_BOUNDS = ISLCQueryParameters.showDragBounds;
  var OBJECT_ONE = ISLCObjectEnum.OBJECT_ONE;
  var OBJECT_TWO = ISLCObjectEnum.OBJECT_TWO;

  // strings
  // var distanceUnitsPatternString = require( 'string!GRAVITY_FORCE_LAB_BASICS/distanceUnitsPattern' );
  var constantSizeString = require( 'string!INVERSE_SQUARE_LAW_COMMON/constantSize' );
  var distanceString = require( 'string!GRAVITY_FORCE_LAB_BASICS/distance' );
  var forceValuesString = require( 'string!INVERSE_SQUARE_LAW_COMMON/forceValues' );
  var mass1LabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass1Label' );
  var mass1String = require( 'string!INVERSE_SQUARE_LAW_COMMON/mass1' );
  var mass2LabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass2Label' );
  var mass2String = require( 'string!INVERSE_SQUARE_LAW_COMMON/mass2' );

  // a11y strings
  var mass1ControlLabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass1ControlLabel' );
  var mass2ControlLabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass2ControlLabel' );
  var spherePositionsString = ISLCA11yStrings.spherePositions.value;
  var spherePositionHelpTextString = ISLCA11yStrings.spherePositionHelpText.value;
  var massControlsLabelString = GravityForceLabA11yStrings.massControlsLabel.value;

  /**
   * @param {GravityForceLabBasicsModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function GravityForceLabBasicsScreenView( model, tandem ) {
    ScreenView.call( this, {
      layoutBounds: new Bounds2( 0, 0, 768, 464 ),
      addScreenSummaryNode: true
    } );

    var stringManager = new GFLBStringManager( model, mass1LabelString, mass2LabelString );
    var summaryNode = new GravityForceLabScreenSummaryNode( model, stringManager );
    var playAreaNode = new PlayAreaNode();
    var controlAreaNode = new ControlAreaNode();
    this.screenSummaryNode.addChild( summaryNode );
    this.addChild( playAreaNode );
    this.addChild( controlAreaNode );

    // Create the model-view transform.  The primary units used in the model are meters, so significant zoom is used.
    // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model, which is
    // between the two masses.
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2 ),
      .05
    );

    // add the mass nodes to the view
    var mass1Node = new GravityForceLabBasicsMassNode( model, model.object1, this.layoutBounds, modelViewTransform, {
      label: mass1LabelString,
      otherObjectLabel: mass2LabelString,
      defaultDirection: 'left',
      arrowColor: '#66F',
      forceArrowHeight: 125,
      tandem: tandem.createTandem( 'mass1Node' )
    } );

    var mass2Node = new GravityForceLabBasicsMassNode( model, model.object2, this.layoutBounds, modelViewTransform, {
      label: mass2LabelString,
      otherObjectLabel: mass1LabelString,
      defaultDirection: 'right',
      arrowColor: '#F66',
      forceArrowHeight: 175,
      tandem: tandem.createTandem( 'mass2Node' )
    } );

    playAreaNode.addChild( new MassPDOMNode( model, OBJECT_ONE, stringManager, {
      thisObjectLabel: mass1LabelString,
      otherObjectLabel: mass2LabelString
    } ) );
    playAreaNode.addChild( new MassPDOMNode( model, OBJECT_TWO, stringManager, {
      thisObjectLabel: mass2LabelString,
      otherObjectLabel: mass1LabelString
    } ) );

    var massPositionsNode = new Node( {
      tagName: 'ul',
      labelTagName: 'h3',
      labelContent: spherePositionsString,
      descriptionContent: spherePositionHelpTextString
    } );

    playAreaNode.addChild( massPositionsNode );
    massPositionsNode.addChild( mass1Node );
    massPositionsNode.addChild( mass2Node );

    // the arrow nodes and their labels should be on top of the masses, but under the rest of the control
    // panel
    massPositionsNode.addChild( mass1Node.arrowNode );
    massPositionsNode.addChild( mass2Node.arrowNode );

    // mass controls
    var massControl1 = new MassControl( mass1String, model.object1.valueProperty, GravityForceLabBasicsConstants.MASS_RANGE, mass1ControlLabelString, tandem.createTandem( 'massControl1' ) );
    var massControl2 = new MassControl( mass2String, model.object2.valueProperty, GravityForceLabBasicsConstants.MASS_RANGE, mass2ControlLabelString, tandem.createTandem( 'massControl2' ), {
      color: new Color( 255, 0, 0 )
    } );

    var massControlsNode = new Node( {
      labelTagName: 'h3',
      labelContent: massControlsLabelString,
      tagName: 'ul'
    } );
    playAreaNode.addChild( massControlsNode );

    // place mass controls in an HBox
    var massControlBox = new HBox( {
      children: [ massControl1, massControl2 ],
      center: this.layoutBounds.center,
      spacing: PANEL_SPACING
    } );
    massControlsNode.addChild( massControlBox );


    var checkboxItems = [
      new ISLCCheckboxItem( forceValuesString, model.forceValuesProperty, {
        accessibleName: 'Force Values',
        tandem: tandem.createTandem( 'forceValuesCheckbox' )
      } ),
      new ISLCCheckboxItem( distanceString, model.showDistanceProperty, {
        accessibleName: 'Distance',
        tandem: tandem.createTandem( 'distanceCheckbox' )
      } ),
      new ISLCCheckboxItem( constantSizeString, model.constantRadiusProperty, {
        accessibleName: 'Constant Size',
        tandem: tandem.createTandem( 'constantRadiusCheckbox' )
      } )
    ];
    var parameterControlPanel = new ISLCCheckboxPanel( checkboxItems, {
      tandem: tandem.createTandem( 'parameterControlPanel' ),
      fill: '#f1f1f2'
    } );
    controlAreaNode.addChild( parameterControlPanel );

    // arrow that shows distance between the two masses
    var distanceArrowNode = new DistanceArrowNode( model, modelViewTransform, {
      tandem: tandem.createTandem( 'distanceArrowNode' ),
      y: 145,
      tagName: 'p'
    } );
    model.showDistanceProperty.linkAttribute( distanceArrowNode, 'visible' );
    model.distanceProperty.link( function( distance ) {
      distanceArrowNode.innerContent = GFLBStringManager.getMassesDistanceApart( distance );
    } );
    massPositionsNode.addChild( distanceArrowNode );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    controlAreaNode.addChild( resetAllButton );

    // layout the view elements
    parameterControlPanel.right = this.layoutBounds.width - 15;
    parameterControlPanel.bottom = MASS_CONTROLS_Y_POSITION;

    massControlBox.right = parameterControlPanel.left - PANEL_SPACING;
    massControlBox.top = parameterControlPanel.top;

    resetAllButton.right = parameterControlPanel.right;
    resetAllButton.top = parameterControlPanel.bottom + 13.5;

    // a11y - specify the order of focus for things in the ScreenView
    // this.accessibleOrder = [ mass1Node, mass2Node, massControlBox, parameterControlPanel, resetAllButton ];

    //------------------------------------------------
    // debugging
    //------------------------------------------------

    if ( SHOW_DRAG_BOUNDS ) {
      this.addChild( new ISLCDragBoundsNode( model, this.layoutBounds, modelViewTransform ) );
    }

    if ( SHOW_GRID ) {
      var gridNode = new ISLCGridNode(
        model.snapObjectsToNearest,
        this.layoutBounds,
        modelViewTransform,
        { stroke: 'rgba( 250, 100, 100, 0.6 )' }
      );
      this.addChild( gridNode );
    }
  }

  gravityForceLabBasics.register( 'GravityForceLabBasicsScreenView', GravityForceLabBasicsScreenView );

  return inherit( ScreenView, GravityForceLabBasicsScreenView );
} );
