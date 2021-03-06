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
import VBox from '../../../scenery/js/nodes/VBox.js';
import Checkbox from '../../../sun/js/Checkbox.js';
import Tandem from '../../../tandem/js/Tandem.js';
import gravityForceLabBasics from '../gravityForceLabBasics.js';

class GFLBCheckboxPanel extends ISLCPanel {

  /**
   * @param {*[]} checkboxItems - Array of Objects with content for each checkbox. Each entry should look like
   *                            {
   *                              label: {string},
   *                              property: Property.<boolean>,
   *                              options: {Object} - options for the GFLBCheckbox, see inner class
   *                            }
   * @param {Object} [options]
   */
  constructor( checkboxItems, options ) {

    options = merge( {

      // {Object} options passed to ALL checkboxes, for options that are unique to each checkbox,
      // use GFLBCheckbox options, and provide through checkboxItems `options`
      checkboxOptions: ISLCConstants.CHECKBOX_OPTIONS,

      // ISLCPanel options
      fill: '#FDF498',
      xMargin: 10,
      yMargin: 10,
      minWidth: 170,

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    const checkboxes = [];

    checkboxItems.forEach( ( item, index ) => {
      const contentNode = new Text( item.label, merge( {}, ISLCConstants.UI_TEXT_OPTIONS, {
        tandem: item.options.tandem.createTandem( 'labelText' )
      } ) );

      checkboxes.push( new GFLBCheckbox( contentNode, item.property, merge( {}, item.options, options.checkboxOptions ) ) );
    } );

    const panelContent = new VBox( {
      children: checkboxes,
      align: 'left',
      spacing: 10
    } );

    super( panelContent, options );
  }
}

/**
 * Inner class for the GFLBCheckboxPanel, the Checkbox itself that implements Voicing responses.
 */
class GFLBCheckbox extends Checkbox {

  /**
   * @param {Node} content
   * @param {Property} property
   * @param options
   */
  constructor( content, property, options ) {
    options = merge( {

      // {string} - voicing: responses for when the checkbox becomes checked/unchecked
      voicingCheckedContextResponse: null,
      voicingUncheckedContextResponse: null,

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    property.lazyLink( checked => {
      this.voicingContextResponse = checked ? options.voicingCheckedContextResponse : options.voicingUncheckedContextResponse;
      this.voicingSpeakFullResponse();
    } );

    super( content, property, options );
  }
}

gravityForceLabBasics.register( 'GFLBCheckboxPanel', GFLBCheckboxPanel );
export default GFLBCheckboxPanel;