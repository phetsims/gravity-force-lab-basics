// Copyright 2016-2019, University of Colorado Boulder

/**
 * Main screen view for the simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const AccessiblePeer = require( 'SCENERY/accessibility/AccessiblePeer' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const Color = require( 'SCENERY/util/Color' );
  const ControlAreaNode = require( 'SCENERY_PHET/accessibility/nodes/ControlAreaNode' );
  const DistanceArrowNode = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/DistanceArrowNode' );
  const GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBA11yStrings' );
  const GFLBAlertManager = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GFLBAlertManager' );
  const GFLBConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBConstants' );
  const GFLBForceDescriber = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/describers/GFLBForceDescriber' );
  const GFLBMassDescriber = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/describers/GFLBMassDescriber' );
  const GFLBMassNode = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GFLBMassNode' );
  const GFLBMassPDOMNode = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GFLBMassPDOMNode' );
  const GFLBPositionDescriber = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/describers/GFLBPositionDescriber' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GravityForceLabScreenSummaryNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabScreenSummaryNode' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCCheckboxItem = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCCheckboxItem' );
  const ISLCCheckboxPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCCheckboxPanel' );
  const ISLCDragBoundsNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCDragBoundsNode' );
  const ISLCGridNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCGridNode' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const ISLCQueryParameters = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCQueryParameters' );
  const GFLBMassControl = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GFLBMassControl' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PlayAreaNode = require( 'SCENERY_PHET/accessibility/nodes/PlayAreaNode' );
  const Property = require( 'AXON/Property' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const SpherePositionsPDOMNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/SpherePositionsPDOMNode' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const MASS_CONTROLS_Y_POSITION = 385;
  const PANEL_SPACING = 50;
  const SHOW_GRID = ISLCQueryParameters.showGrid;
  const SHOW_DRAG_BOUNDS = ISLCQueryParameters.showDragBounds;
  const OBJECT_ONE = ISLCObjectEnum.OBJECT_ONE;
  const OBJECT_TWO = ISLCObjectEnum.OBJECT_TWO;

  // strings
  // const distanceUnitsPatternString = require( 'string!GRAVITY_FORCE_LAB_BASICS/distanceUnitsPattern' );
  const constantSizeString = require( 'string!INVERSE_SQUARE_LAW_COMMON/constantSize' );
  const distanceString = require( 'string!GRAVITY_FORCE_LAB_BASICS/distance' );
  const forceValuesString = require( 'string!INVERSE_SQUARE_LAW_COMMON/forceValues' );
  const mass1LabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass1Label' );
  const mass1String = require( 'string!INVERSE_SQUARE_LAW_COMMON/mass1' );
  const mass2LabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass2Label' );
  const mass2String = require( 'string!INVERSE_SQUARE_LAW_COMMON/mass2' );

  // a11y strings
  const mass1ControlLabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass1ControlLabel' );
  const mass2ControlLabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass2ControlLabel' );
  const massControlsLabelString = GravityForceLabA11yStrings.massControlsLabel.value;
  const massControlsHelpTextBillionsString = GravityForceLabA11yStrings.massControlsHelpTextBillions.value;
  const massControlsHelpTextDensityBillionsString = GravityForceLabA11yStrings.massControlsHelpTextDensityBillions.value;
  const forceValuesCheckboxHelpTextString = ISLCA11yStrings.forceValuesCheckboxHelpText.value;
  const constantSizeCheckboxHelpTextString = GravityForceLabA11yStrings.constantSizeCheckboxHelpText.value;
  const distanceCheckboxHelpTextString = GFLBA11yStrings.distanceCheckboxHelpText.value;
  const screenSummaryMainDescriptionString = GFLBA11yStrings.screenSummaryMainDescription.value;
  const screenSummarySecondaryDescriptionString = GFLBA11yStrings.screenSummarySecondaryDescription.value;
  const basicsSimStateLabelString = GFLBA11yStrings.basicsSimStateLabel.value;

  class GFLBScreenView extends ScreenView {

    /**
     * @param {GFLBModel} model
     * @param {Tandem} tandem
     */
    constructor( model, tandem ) {
      super( {
        layoutBounds: new Bounds2( 0, 0, 768, 464 ),
        addScreenSummaryNode: true
      } );

      // we don't need to keep references for all of them, just need to initialize
      GFLBForceDescriber.initialize( model, mass1LabelString, mass2LabelString );
      const massDescriber = new GFLBMassDescriber( model );
      const alertManager = new GFLBAlertManager( model, massDescriber );
      const positionDescriber = GFLBPositionDescriber.initialize( model, mass1LabelString, mass2LabelString );

      // Main
      const summaryNode = new GravityForceLabScreenSummaryNode( model, massDescriber, {
        mainDescriptionContent: screenSummaryMainDescriptionString,
        secondaryDescriptionContent: screenSummarySecondaryDescriptionString,
        simStateLabel: basicsSimStateLabelString,
        additionalMassDistanceProperties: [ model.showDistanceProperty ]
      } );
      const playAreaNode = new PlayAreaNode();
      const controlAreaNode = new ControlAreaNode();
      this.screenSummaryNode.addChild( summaryNode );
      this.addChild( playAreaNode );
      this.addChild( controlAreaNode );

      // Create the model-view transform.  The primary units used in the model are meters, so significant zoom is used.
      // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model, which is
      // between the two masses.
      const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
        Vector2.ZERO,
        new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2 ),
        .05
      );

      // add the mass nodes to the view
      const mass1Node = new GFLBMassNode( model, model.object1, this.layoutBounds, modelViewTransform, alertManager, {
        label: mass1LabelString,
        otherObjectLabel: mass2LabelString,
        defaultDirection: 'left',
        arrowColor: '#66F',
        forceArrowHeight: 125,
        tandem: tandem.createTandem( 'mass1Node' )
      } );

      const mass2Node = new GFLBMassNode( model, model.object2, this.layoutBounds, modelViewTransform, alertManager, {
        label: mass2LabelString,
        otherObjectLabel: mass1LabelString,
        defaultDirection: 'right',
        arrowColor: '#F66',
        forceArrowHeight: 175,
        tandem: tandem.createTandem( 'mass2Node' )
      } );

      const massPDOMNodeOptions = {
        object1Label: mass1LabelString,
        object2Label: mass2LabelString
      };
      playAreaNode.addChild( new GFLBMassPDOMNode( model, OBJECT_ONE, massDescriber, massPDOMNodeOptions ) );
      playAreaNode.addChild( new GFLBMassPDOMNode( model, OBJECT_TWO, massDescriber, massPDOMNodeOptions ) );

      const massPositionsNode = new SpherePositionsPDOMNode();
      Property.multilink( [

        // for some reason, linking to `model.distanceProperty` caused the same bug as in GFLB#103, so we are linking to
        // both objects' positionProperty instead.
        model.object1.positionProperty,
        model.object2.positionProperty,
        model.showDistanceProperty ], () => {
        massPositionsNode.descriptionContent = positionDescriber.getSpherePositionsHelpText();
      } );

      playAreaNode.addChild( massPositionsNode );
      massPositionsNode.addChild( mass1Node );
      massPositionsNode.addChild( mass2Node );

      // the arrow nodes and their labels should be on top of the masses, but under the rest of the control panel
      massPositionsNode.addChild( mass1Node.arrowNode );
      massPositionsNode.addChild( mass2Node.arrowNode );

      // a list of Properties to that, when changed, should trigger an update in descriptions in the MassControl
      const propertiesToMonitorForDescriptionChanges = [ model.forceProperty, model.constantRadiusProperty ];

      // mass controls
      const massControl1 = new GFLBMassControl( mass1String, model.object1.valueProperty,
        GFLBConstants.MASS_RANGE, mass1ControlLabelString, OBJECT_ONE, propertiesToMonitorForDescriptionChanges,
        alertManager, massDescriber, tandem.createTandem( 'massControl1' ) );
      const massControl2 = new GFLBMassControl( mass2String, model.object2.valueProperty,
        GFLBConstants.MASS_RANGE, mass2ControlLabelString, OBJECT_TWO, propertiesToMonitorForDescriptionChanges,
        alertManager, massDescriber, tandem.createTandem( 'massControl2' ), {
          color: new Color( 255, 0, 0 )
        } );

      const massControlsNode = new Node( {
        labelTagName: 'h3',
        labelContent: massControlsLabelString,
        tagName: 'ul',
        descriptionContent: massControlsHelpTextBillionsString
      } );
      playAreaNode.addChild( massControlsNode );

      // the list of mass controls is aria-labelledby the its label sibling, see https://github.com/phetsims/gravity-force-lab/issues/132
      massControlsNode.addAriaLabelledbyAssociation( {
        otherNode: massControlsNode,
        otherElementName: AccessiblePeer.LABEL_SIBLING,
        thisElementName: AccessiblePeer.PRIMARY_SIBLING
      } );

      // place mass controls in an HBox
      const massControlBox = new HBox( {
        children: [ massControl1, massControl2 ],
        center: this.layoutBounds.center,
        spacing: PANEL_SPACING
      } );
      massControlsNode.addChild( massControlBox );

      model.constantRadiusProperty.link( constantRadius => {
        massControlsNode.descriptionContent = constantRadius ? massControlsHelpTextDensityBillionsString : massControlsHelpTextBillionsString;
      } );

      const checkboxItems = [
        new ISLCCheckboxItem( forceValuesString, model.forceValuesProperty, {
          accessibleName: 'Force Values',
          descriptionContent: forceValuesCheckboxHelpTextString,
          tandem: tandem.createTandem( 'forceValuesCheckbox' )
        } ),
        new ISLCCheckboxItem( distanceString, model.showDistanceProperty, {
          accessibleName: 'Distance',
          descriptionContent: distanceCheckboxHelpTextString,
          tandem: tandem.createTandem( 'distanceCheckbox' )
        } ),
        new ISLCCheckboxItem( constantSizeString, model.constantRadiusProperty, {
          accessibleName: 'Constant Size',
          descriptionContent: constantSizeCheckboxHelpTextString,
          tandem: tandem.createTandem( 'constantRadiusCheckbox' )
        } )
      ];
      const parameterControlPanel = new ISLCCheckboxPanel( checkboxItems, {
        tandem: tandem.createTandem( 'parameterControlPanel' ),
        fill: '#f1f1f2'
      } );
      controlAreaNode.addChild( parameterControlPanel );

      // arrow that shows distance between the two masses
      const distanceArrowNode = new DistanceArrowNode( model, modelViewTransform, {
        tandem: tandem.createTandem( 'distanceArrowNode' ),
        y: 145
      } );
      model.showDistanceProperty.linkAttribute( distanceArrowNode, 'visible' );
      massPositionsNode.addChild( distanceArrowNode );

      // Reset All button
      const resetAllButton = new ResetAllButton( {
        listener: () => {
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

      //------------------------------------------------
      // debugging
      //------------------------------------------------

      if ( SHOW_DRAG_BOUNDS ) {
        this.addChild( new ISLCDragBoundsNode( model, this.layoutBounds, modelViewTransform ) );
      }

      if ( SHOW_GRID ) {
        const gridNode = new ISLCGridNode(
          model.snapObjectsToNearest,
          this.layoutBounds,
          modelViewTransform,
          { stroke: 'rgba( 250, 100, 100, 0.6 )' }
        );
        this.addChild( gridNode );
      }
    }
  }

  return gravityForceLabBasics.register( 'GFLBScreenView', GFLBScreenView );
} );
