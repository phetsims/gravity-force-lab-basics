// Copyright 2019-2020, University of Colorado Boulder

/**
 * Panel with a vertical checkbox group, for display options.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import ISLCConstants from '../../../inverse-square-law-common/js/ISLCConstants.js';
import ISLCPanel from '../../../inverse-square-law-common/js/view/ISLCPanel.js';
import merge from '../../../phet-core/js/merge.js';
import Text from '../../../scenery/js/nodes/Text.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import VerticalCheckboxGroup from '../../../sun/js/VerticalCheckboxGroup.js';
import Tandem from '../../../tandem/js/Tandem.js';
import webSpeaker from '../../../inverse-square-law-common/js/view/webSpeaker.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';
import gravityForceLabBasicsStrings from '../gravity-force-lab-basics-strings.js';

const verboseCheckboxPatternString = gravityForceLabBasicsStrings.a11y.verboseCheckboxPattern;
const briefCheckboxPatternString = gravityForceLabBasicsStrings.a11y.briefCheckboxPattern;
const checkedString = gravityForceLabBasicsStrings.a11y.checked;
const uncheckedString = gravityForceLabBasicsStrings.a11y.unchecked;

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
    if ( options.shapeHitDetector ) {
      checkboxGroup.children.forEach( ( child, i ) => {
        options.shapeHitDetector.addNode( child );
        options.shapeHitDetector.hitShapeEmitter.addListener( node => {
          if ( node === child ) {
            if ( webSpeaker.exploreModeProperty.get() ) {
              const checkboxItem = checkboxItems[ i ];
              const checked = checkboxItem.property.value;

              if ( webSpeaker.getExploreModeVerbose() ) {
                webSpeaker.speak( StringUtils.fillIn( verboseCheckboxPatternString, {
                  accessibleName: checkboxItem.label,
                  interactionHint: checked ? checkboxItem.checkedInteractionHint : checkboxItem.uncheckedInteractionHint
                } ) );
              }
              else {
                const stateString = checked ? checkedString : uncheckedString;
                webSpeaker.speak( StringUtils.fillIn( briefCheckboxPatternString, {
                  accessibleName: checkboxItem.label,
                  checkedState: stateString
                } ) );
              }
            }
          }
        } );
      } );
    }
  }
}

gravityForceLabBasics.register( 'GFLBCheckboxPanel', GFLBCheckboxPanel );
export default GFLBCheckboxPanel;