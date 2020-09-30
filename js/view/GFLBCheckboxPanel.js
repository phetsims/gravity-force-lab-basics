// Copyright 2019-2020, University of Colorado Boulder

/**
 * Panel with a vertical checkbox group, for display options.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import gravityForceLabStrings from '../../../gravity-force-lab/js/gravityForceLabStrings.js';
import inverseSquareLawCommonStrings from '../../../inverse-square-law-common/js/inverseSquareLawCommonStrings.js';
import ISLCConstants from '../../../inverse-square-law-common/js/ISLCConstants.js';
import ISLCPanel from '../../../inverse-square-law-common/js/view/ISLCPanel.js';
import merge from '../../../phet-core/js/merge.js';
import levelSpeakerModel from '../../../scenery-phet/js/accessibility/speaker/levelSpeakerModel.js';
import SelfVoicingInputListener from '../../../scenery-phet/js/accessibility/speaker/SelfVoicingInputListener.js';
import Text from '../../../scenery/js/nodes/Text.js';
import VerticalCheckboxGroup from '../../../sun/js/VerticalCheckboxGroup.js';
import Tandem from '../../../tandem/js/Tandem.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import gravityForceLabBasicsStrings from '../gravityForceLabBasicsStrings.js';

const forceValuesCheckboxHelpTextString = inverseSquareLawCommonStrings.a11y.forceValuesCheckboxHelpText;
const distanceCheckboxHelpTextString = gravityForceLabBasicsStrings.a11y.distanceCheckboxHelpText;
const constantSizeCheckboxHelpTextString = gravityForceLabStrings.a11y.controls.constantSizeCheckboxHelpText;

class GFLBCheckboxPanel extends ISLCPanel {

  /**
   * @param {Object} checkboxItems - see VerticalCheckboxGroup for doc, note that this Type sets the `node`, and
   *    expects a `label` {string} property that is used to create the Node
   * @param {Object} [options]
   */
  constructor( checkboxItems, options ) {

    options = merge( {
      checkboxGroupOptions: {
        checkboxOptions: ISLCConstants.CHECKBOX_OPTIONS
      },
      fill: '#FDF498',
      xMargin: 10,
      yMargin: 10,
      minWidth: 170,

      // {null|ShapeHitDetector} - a11y, to support prototype self-voicing feature set - if included browser
      // will speak information about check boxes upon certain user input
      shapeHitDetector: null,

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    // Given a string as a label, convert it to a Text Node.
    checkboxItems = checkboxItems.map( item => {
      assert && assert( item.tandem );
      item.node = new Text( item.label, merge( {}, ISLCConstants.UI_TEXT_OPTIONS, {
        tandem: item.tandem.createTandem( 'labelText' )
      } ) );
      return item;
    } );

    const checkboxGroup = new VerticalCheckboxGroup( checkboxItems, options.checkboxGroupOptions );
    super( checkboxGroup, options );

    // PROTOTYPE a11y code, for the self-voicing feature set
    if ( phet.chipper.queryParameters.supportsSelfVoicing ) {
      // list of interaction hints to be read upon focus, in the order of checkboxes. Pretty rough, but better
      // than looking inside of CheckboxItem for this. IF we want to invest more in this feature we can
      // make this more robust
      const itemHintList = [
        forceValuesCheckboxHelpTextString,
        distanceCheckboxHelpTextString,
        constantSizeCheckboxHelpTextString
      ];

      checkboxGroup.children.forEach( ( child, i ) => {
        child.addInputListener( new SelfVoicingInputListener( {
          onFocusIn: () => {
            const objectContent = checkboxItems[ i ].label;
            const hintContent = itemHintList[ i ];

            levelSpeakerModel.speakAllResponses( objectContent, null, hintContent );
          },
          highlightTarget: child
        } ) );
      } );
    }
  }
}

gravityForceLabBasics.register( 'GFLBCheckboxPanel', GFLBCheckboxPanel );
export default GFLBCheckboxPanel;