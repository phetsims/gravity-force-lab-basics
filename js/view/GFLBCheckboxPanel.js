// Copyright 2019-2020, University of Colorado Boulder

/**
 * Panel with a vertical checkbox group, for display options.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  const ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  const ISLCPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCPanel' );
  const merge = require( 'PHET_CORE/merge' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VerticalCheckboxGroup = require( 'SUN/VerticalCheckboxGroup' );

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

      super( new VerticalCheckboxGroup( checkboxItems, options.checkboxGroupOptions ), options );
    }
  }

  return gravityForceLabBasics.register( 'GFLBCheckboxPanel', GFLBCheckboxPanel );
} );