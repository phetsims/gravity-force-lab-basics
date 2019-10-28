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
  const CheckboxSoundGenerator = require( 'TAMBO/sound-generators/CheckboxSoundGenerator' );
  const Color = require( 'SCENERY/util/Color' );
  const DefaultDirection = require( 'INVERSE_SQUARE_LAW_COMMON/view/DefaultDirection' );
  const DistanceArrowNode = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/DistanceArrowNode' );
  const ForceSoundGenerator = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/ForceSoundGenerator' );
  const GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBA11yStrings' );
  const GFLBAlertManager = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GFLBAlertManager' );
  const GFLBConstants = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/GFLBConstants' );
  const GFLBForceDescriber = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/describers/GFLBForceDescriber' );
  const GFLBMassControl = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GFLBMassControl' );
  const GFLBMassDescriber = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/describers/GFLBMassDescriber' );
  const GFLBMassNode = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GFLBMassNode' );
  const GFLBMassPDOMNode = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/GFLBMassPDOMNode' );
  const GFLBPositionDescriber = require( 'GRAVITY_FORCE_LAB_BASICS/gravity-force-lab-basics/view/describers/GFLBPositionDescriber' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const GravityForceLabScreenSummaryNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabScreenSummaryNode' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCCheckboxPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCCheckboxPanel' );
  const ISLCDragBoundsNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCDragBoundsNode' );
  const ISLCGridNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCGridNode' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const ISLCQueryParameters = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCQueryParameters' );
  const MassSoundGenerator = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassSoundGenerator' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ResetAllSoundGenerator = require( 'TAMBO/sound-generators/ResetAllSoundGenerator' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const SoundClip = require( 'TAMBO/sound-generators/SoundClip' );
  const soundManager = require( 'TAMBO/soundManager' );
  const SpherePositionsPDOMNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/SpherePositionsPDOMNode' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const MASS_CONTROLS_Y_POSITION = 385;
  const PANEL_SPACING = 50;
  const SHOW_GRID = ISLCQueryParameters.showGrid;
  const SHOW_DRAG_BOUNDS = ISLCQueryParameters.showDragBounds;
  const OBJECT_ONE = ISLCObjectEnum.OBJECT_ONE;
  const OBJECT_TWO = ISLCObjectEnum.OBJECT_TWO;

  // strings
  const constantSizeString = require( 'string!GRAVITY_FORCE_LAB/constantSize' );
  const distanceString = require( 'string!GRAVITY_FORCE_LAB_BASICS/distance' );
  const forceValuesString = require( 'string!INVERSE_SQUARE_LAW_COMMON/forceValues' );
  const mass1LabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass1Label' );
  const mass1String = require( 'string!GRAVITY_FORCE_LAB/mass1' );
  const mass2LabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass2Label' );
  const mass2String = require( 'string!GRAVITY_FORCE_LAB/mass2' );

  // a11y strings
  const mass1ControlLabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass1ControlLabel' );
  const mass2ControlLabelString = require( 'string!GRAVITY_FORCE_LAB_BASICS/mass2ControlLabel' );
  const massControlsLabelString = GravityForceLabA11yStrings.massControlsLabel.value;
  const massControlsHelpTextBillionsString = GFLBA11yStrings.massControlsHelpTextBillions.value;
  const massControlsHelpTextDensityBillionsString = GFLBA11yStrings.massControlsHelpTextDensityBillions.value;
  const forceValuesCheckboxHelpTextString = ISLCA11yStrings.forceValuesCheckboxHelpText.value;
  const constantSizeCheckboxHelpTextString = GravityForceLabA11yStrings.constantSizeCheckboxHelpText.value;
  const distanceCheckboxHelpTextString = GFLBA11yStrings.distanceCheckboxHelpText.value;
  const screenSummaryMainDescriptionString = GFLBA11yStrings.screenSummaryMainDescription.value;
  const screenSummarySecondaryDescriptionString = GFLBA11yStrings.screenSummarySecondaryDescription.value;
  const basicsSimStateLabelString = GFLBA11yStrings.basicsSimStateLabel.value;

  // sounds
  const innerBoundarySound = require( 'sound!GRAVITY_FORCE_LAB/scrunched-mass-collision-sonic-womp.mp3' );
  const outerBoundarySound = require( 'sound!TAMBO/boundary-reached.mp3' );

  class GFLBScreenView extends ScreenView {

    /**
     * @param {GFLBModel} model
     * @param {Tandem} tandem
     */
    constructor( model, tandem ) {

      // initialize a11y describers and alert manager
      const positionDescriber = new GFLBPositionDescriber( model, mass1LabelString, mass2LabelString );
      const forceDescriber = new GFLBForceDescriber( model, mass1LabelString, mass2LabelString, positionDescriber );
      const massDescriber = new GFLBMassDescriber( model );
      const alertManager = new GFLBAlertManager( model, massDescriber, forceDescriber );

      super( {
        layoutBounds: new Bounds2( 0, 0, 768, 464 ),
        screenSummaryContent: new GravityForceLabScreenSummaryNode( model, massDescriber, forceDescriber, positionDescriber, {
          mainDescriptionContent: screenSummaryMainDescriptionString,
          secondaryDescriptionContent: screenSummarySecondaryDescriptionString,
          simStateLabel: basicsSimStateLabelString,
          additionalMassDistanceProperties: [ model.showDistanceProperty ]
        } )
      } );

      // Create the model-view transform.  The primary units used in the model are meters, so significant zoom is used.
      // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model, which is
      // between the two masses.
      const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
        Vector2.ZERO,
        new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2 ),
        .05
      );

      // add the mass nodes to the view
      const mass1Node = new GFLBMassNode( model, model.object1, this.layoutBounds, modelViewTransform, alertManager,
        forceDescriber,
        positionDescriber, {
          label: mass1LabelString,
          otherObjectLabel: mass2LabelString,
          defaultDirection: DefaultDirection.LEFT,
          arrowColor: '#66F',
          forceArrowHeight: 125,
          tandem: tandem.createTandem( 'mass1Node' )
        } );

      const mass2Node = new GFLBMassNode( model, model.object2, this.layoutBounds, modelViewTransform, alertManager,
        forceDescriber,
        positionDescriber, {
          label: mass2LabelString,
          otherObjectLabel: mass1LabelString,
          defaultDirection: DefaultDirection.RIGHT,
          arrowColor: '#F66',
          forceArrowHeight: 175,
          tandem: tandem.createTandem( 'mass2Node' )
        } );

      const massPDOMNodeOptions = {
        object1Label: mass1LabelString,
        object2Label: mass2LabelString
      };

      // PDOM descriptions for each mass - the masses themselves leverage AccessibleValueHandler, but these
      // form descriptive summaries for the state of each mass
      const objectOneMassPDOMNode = new GFLBMassPDOMNode( model, model.object1, massDescriber, forceDescriber,
        positionDescriber, massPDOMNodeOptions );
      const objectTwoMassPDOMNode = new GFLBMassPDOMNode( model, model.object2, massDescriber, forceDescriber,
        positionDescriber, massPDOMNodeOptions );

      const massPositionsNode = new SpherePositionsPDOMNode();

      massPositionsNode.addChild( mass1Node );
      massPositionsNode.addChild( mass2Node );

      // the arrow nodes and their labels should be on top of the masses, but under the rest of the control panel
      massPositionsNode.addChild( mass1Node.arrowNode );
      massPositionsNode.addChild( mass2Node.arrowNode );

      Property.multilink( [

          // Linking to `model.separationProperty` caused the same bug as in GFLB#103, so we are linking to
          // both objects' positionProperty instead.
          model.object1.positionProperty,
          model.object2.positionProperty,
          model.showDistanceProperty ],
        () => massPositionsNode.setDescription( positionDescriber.getSpherePositionsHelpText() ) );

      // mass controls
      const massControl1 = new GFLBMassControl( mass1String, model.object1.valueProperty,
        GFLBConstants.MASS_RANGE, mass1ControlLabelString, OBJECT_ONE,
        massDescriber, tandem.createTandem( 'massControl1' ) );
      const massControl2 = new GFLBMassControl( mass2String, model.object2.valueProperty,
        GFLBConstants.MASS_RANGE, mass2ControlLabelString, OBJECT_TWO,
        massDescriber, tandem.createTandem( 'massControl2' ), {
          color: new Color( 255, 0, 0 )
        } );

      const massControlsNode = new Node( {
        labelTagName: 'h3',
        labelContent: massControlsLabelString,
        tagName: 'div',
        descriptionContent: massControlsHelpTextBillionsString
      } );

      // The list of mass controls is aria-labelledby the its label sibling, see https://github.com/phetsims/gravity-force-lab/issues/132
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
        massControlsNode.descriptionContent = constantRadius ?
                                              massControlsHelpTextDensityBillionsString :
                                              massControlsHelpTextBillionsString;
      } );

      // sound generation for the mass values
      soundManager.addSoundGenerator( new MassSoundGenerator(
        model.object1.valueProperty,
        GFLBConstants.MASS_RANGE,
        model.resetInProgressProperty,
        { initialOutputLevel: 0.7 }
      ) );
      soundManager.addSoundGenerator( new MassSoundGenerator(
        model.object2.valueProperty,
        GFLBConstants.MASS_RANGE,
        model.resetInProgressProperty,
        { initialOutputLevel: 0.7 }
      ) );

      // @private - sound generation for the force sound
      this.forceSoundGenerator = new ForceSoundGenerator( model, { initialOutputLevel: 0.2 } );
      soundManager.addSoundGenerator( this.forceSoundGenerator );

      // sound generation for outer mass dragging limit
      const outerBoundarySoundClip = new SoundClip( outerBoundarySound, { initialOutputLevel: 1 } );
      soundManager.addSoundGenerator( outerBoundarySoundClip );
      model.object1.positionProperty.link( position => {
        if ( position === GFLBConstants.PULL_LOCATION_RANGE.min ) {
          outerBoundarySoundClip.play();
        }
      } );
      model.object2.positionProperty.link( position => {
        if ( position === GFLBConstants.PULL_LOCATION_RANGE.max ) {
          outerBoundarySoundClip.play();
        }
      } );

      // sound generation for masses (almost) colliding with one another
      const innerBoundarySoundClip = new SoundClip( innerBoundarySound, { initialOutputLevel: 0.5 } );
      soundManager.addSoundGenerator( innerBoundarySoundClip );
      model.separationProperty.lazyLink( ( distance, previousDistance ) => {
        if ( distance < previousDistance ) {

          // the distance value from the ISLC model is rounded to 100s of meters, so we do the same thing here
          const minDistance = model.object1.radiusProperty.value + model.object2.radiusProperty.value +
                              GFLBConstants.MIN_DISTANCE_BETWEEN_MASSES;
          const roundedMinDistance = Util.roundToInterval( minDistance, 100 );
          if ( distance === roundedMinDistance ) {
            innerBoundarySoundClip.play();
          }
        }
      } );

      const checkboxItems = [
        {
          label: forceValuesString, property: model.showForceValuesProperty,
          tandem: tandem.createTandem( 'forceValuesCheckbox' ),
          options: {
            accessibleName: forceValuesString,
            descriptionContent: forceValuesCheckboxHelpTextString
          }
        },
        {
          label: distanceString, property: model.showDistanceProperty,
          tandem: tandem.createTandem( 'distanceCheckbox' ),
          options: {
            accessibleName: distanceString,
            descriptionContent: distanceCheckboxHelpTextString
          }
        },
        {
          label: constantSizeString, property: model.constantRadiusProperty,
          tandem: tandem.createTandem( 'constantRadiusCheckbox' ),
          options: {
            accessibleName: constantSizeString,
            descriptionContent: constantSizeCheckboxHelpTextString
          }
        }
      ];
      const parameterControlPanel = new ISLCCheckboxPanel( checkboxItems, {
        tandem: tandem.createTandem( 'parameterControlPanel' ),
        fill: '#f1f1f2'
      } );

      // sound generation for check box items
      checkboxItems.forEach( checkboxItem => {
        soundManager.addSoundGenerator( new CheckboxSoundGenerator(
          checkboxItem.property,
          model.resetInProgressProperty
        ) );
      } );

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
          mass1Node.reset();
          mass2Node.reset();
          this.forceSoundGenerator.reset();
        },
        right: this.layoutBounds.maxX - 10,
        bottom: this.layoutBounds.maxY - 10,
        tandem: tandem.createTandem( 'resetAllButton' )
      } );

      soundManager.addSoundGenerator( new ResetAllSoundGenerator( model.resetInProgressProperty, {
        initialOutputLevel: 0.7
      } ) );

      // children
      this.playAreaNode.children = [
        objectOneMassPDOMNode,
        objectTwoMassPDOMNode,
        massPositionsNode,
        massControlsNode
      ];

      this.controlAreaNode.children = [
        parameterControlPanel,
        resetAllButton
      ];

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

    /**
     * step the view
     * @param {number} dt
     * @public
     */
    step( dt ) {
      this.forceSoundGenerator.step( dt );
    }
  }

  return gravityForceLabBasics.register( 'GFLBScreenView', GFLBScreenView );
} );
