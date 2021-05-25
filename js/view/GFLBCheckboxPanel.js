// Copyright 2019-2021, University of Colorado Boulder

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
import VerticalCheckboxGroup from '../../../sun/js/VerticalCheckboxGroup.js';
import Tandem from '../../../tandem/js/Tandem.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';

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
  }
}

gravityForceLabBasics.register( 'GFLBCheckboxPanel', GFLBCheckboxPanel );
export default GFLBCheckboxPanel;