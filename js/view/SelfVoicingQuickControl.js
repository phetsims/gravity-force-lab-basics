// Copyright 2020, University of Colorado Boulder

/**
 * Controls that appear if self-voicing content is enabled. Allows user to mute all speech.
 * Also has buttons to read other content.
 *
 * This is a prototype, and is still under active design and development.
 *
 * @author Jesse Greenberg
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import AlignGroup from '../../../scenery/js/nodes/AlignGroup.js';
import Rectangle from '../../../scenery/js/nodes/Rectangle.js';
import Spacer from '../../../scenery/js/nodes/Spacer.js';
import Text from '../../../scenery/js/nodes/Text.js';
import VBox from '../../../scenery/js/nodes/VBox.js';
import BooleanRectangularStickyToggleButton from '../../../sun/js/buttons/BooleanRectangularStickyToggleButton.js';
import FontAwesomeNode from '../../../sun/js/FontAwesomeNode.js';
import Panel from '../../../sun/js/Panel.js';
import RectangularPushButton from '../../../sun/js/buttons/RectangularPushButton.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import Node from '../../../scenery/js/nodes/Node.js';
import ExpandCollapseButton from '../../../sun/js/ExpandCollapseButton.js';

class SelfVoicingQuickControl extends Node {
  constructor( speechMutedProperty, options ) {
    super();

    // The icon for the rectangular box indicating this is for
    // self-voicing features
    const tIconText = new Text( 'T', {
      font: new PhetFont( { size: 30, family: 'Times' } ),
      fill: 'white'
    } );
    const commentIcon = new FontAwesomeNode( 'comment', {
      leftBottom: tIconText.rightTop,
      fill: 'white',
      scale: 0.50
    } );
    const iconNode = new Node( { children: [ tIconText, commentIcon ] } );

    // the ion contained in a rectangle grey rectangle
    const rectangleDimension = Math.max( iconNode.width, iconNode.height ) + 5;
    const iconRectangle = new Rectangle( 0, 0, rectangleDimension, rectangleDimension, 5, 5, {
      fill: 'rgba(99,99,99,1)'
    } );
    iconNode.center = iconRectangle.center;
    iconRectangle.addChild( iconNode );

    // the button expands/collapses the controls
    const openProperty = new BooleanProperty( false );
    const expandCollapseButton = new ExpandCollapseButton( openProperty, {
      sideLength: 20
    } );

    // creates content for each button and puts it into an AlignGroup so that
    // all buttons can have the same dimensions
    const alignGroup = new AlignGroup();
    const createSpeechButtonContent = buttonString => {
      return alignGroup.createBox( new Text( buttonString ) );
    };

    const hintButtonContent = createSpeechButtonContent( 'Hint Please!' );
    const simOverviewContent = createSpeechButtonContent( 'Sim Overview' );
    const detailsContent = createSpeechButtonContent( 'Current Details' );
    const stopSpeechContent = createSpeechButtonContent( 'Stop Speech' );

    // creates the actual button with provided content and behavior
    const createSpeechButton = ( buttonContent, listener ) => {
      return new RectangularPushButton( {
        content: buttonContent,
        listener: listener
      } );
    };

    const hintButton = createSpeechButton( hintButtonContent, () => {} );
    const overviewButton = createSpeechButton( simOverviewContent, () => {} );
    const detailsButton = createSpeechButton( detailsContent, () => {} );
    const muteSpeechButton = new BooleanRectangularStickyToggleButton( speechMutedProperty, {
      content: stopSpeechContent,
      listener: () => {}
    } );

    // spacer is required to make room for the ExpandCollapseButton in the panel
    const spacer = new Spacer( 0, expandCollapseButton.height );
    const buttonGroup = new VBox( {
      children: [
        hintButton,
        overviewButton,
        detailsButton,
        muteSpeechButton,
        spacer
      ],
      spacing: 5
    } );
    const buttonsPanel = new Panel( buttonGroup, {
      backgroundPickable: true
    } );

    openProperty.link( open => buttonsPanel.setVisible( open ) );

    // layout - panel "opens upward" from the button - its bounds are not included
    // in layout so that this Node can be positioned relative to the always-visible
    // content, the panel can occlude other things
    this.excludeInvisibleChildrenFromBounds = true;
    expandCollapseButton.leftTop = iconRectangle.rightTop.plusXY( 6, 0 );
    buttonsPanel.leftBottom = expandCollapseButton.leftBottom.plusXY( -4, 4 );

    this.children = [
      iconRectangle,
      buttonsPanel,
      expandCollapseButton
    ];

    // mutate with options after Node has been assembled
    this.mutate( options );
  }
}

gravityForceLabBasics.register( 'SelfVoicingQuickControl', SelfVoicingQuickControl );
export default SelfVoicingQuickControl;