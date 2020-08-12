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
import DynamicProperty from '../../../axon/js/DynamicProperty.js';
import Property from '../../../axon/js/Property.js';
import AlignGroup from '../../../scenery/js/nodes/AlignGroup.js';
import Image from '../../../scenery/js/nodes/Image.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../scenery/js/nodes/Rectangle.js';
import Spacer from '../../../scenery/js/nodes/Spacer.js';
import Text from '../../../scenery/js/nodes/Text.js';
import VBox from '../../../scenery/js/nodes/VBox.js';
import BooleanRectangularStickyToggleButton from '../../../sun/js/buttons/BooleanRectangularStickyToggleButton.js';
import RectangularPushButton from '../../../sun/js/buttons/RectangularPushButton.js';
import ExpandCollapseButton from '../../../sun/js/ExpandCollapseButton.js';
import Panel from '../../../sun/js/Panel.js';
import selfVoicingIconImage from '../../images/self-voicing-icon_png.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';

class SelfVoicingQuickControl extends Node {

  /**
   * @param {WebSpeaker} webSpeaker
   * @param options
   */
  constructor( webSpeaker, options ) {
    super();

    // a placeholder icon until we get a more thorough design
    const iconImage = new Image( selfVoicingIconImage, {
      scale: 0.18
    } );

    // the ion contained in a rectangle grey rectangle
    const rectangleDimension = Math.max( iconImage.width, iconImage.height ) + 5;
    const iconRectangle = new Rectangle( 0, 0, rectangleDimension, rectangleDimension, 5, 5, {
      fill: 'rgba(99,99,99,1)'
    } );
    iconImage.center = iconRectangle.center;
    iconRectangle.addChild( iconImage );

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

    // the webSpeaker uses enabledProperty, the push button uses "muted" terminology -
    // dynamic Property maps between the two so that the button can be pressed when
    // it it is actually not enabled
    const dynamicProperty = new DynamicProperty( new Property( webSpeaker.enabledProperty ), {
      bidirectional: true,
      map: enabled => !enabled,
      inverseMap: muted => !muted
    } );

    const hintButton = createSpeechButton( hintButtonContent, () => {} );
    const overviewButton = createSpeechButton( simOverviewContent, () => {} );
    const detailsButton = createSpeechButton( detailsContent, () => {} );
    const muteSpeechButton = new BooleanRectangularStickyToggleButton( dynamicProperty, {
      content: stopSpeechContent
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