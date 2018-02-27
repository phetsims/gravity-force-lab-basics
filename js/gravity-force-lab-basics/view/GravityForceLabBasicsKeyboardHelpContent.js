// Copyright 2017, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowKeyNode = require( 'SCENERY_PHET/keyboard/ArrowKeyNode' );
  var EndKeyNode = require( 'SCENERY_PHET/keyboard/EndKeyNode' );
  var GeneralNavigationHelpContent = require( 'SCENERY_PHET/keyboard/help/GeneralNavigationHelpContent' );
  var GFLBA11yStrings = require( 'GRAVITY_FORCE_LAB_BASICS/GFLBA11yStrings' );
  var gravityForceLabBasics = require( 'GRAVITY_FORCE_LAB_BASICS/gravityForceLabBasics' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HelpContent = require( 'SCENERY_PHET/keyboard/help/HelpContent' );
  var inherit = require( 'PHET_CORE/inherit' );
  var HomeKeyNode = require( 'SCENERY_PHET/keyboard/HomeKeyNode' );
  var Panel = require( 'SUN/Panel' );
  var RichText = require( 'SCENERY/nodes/RichText' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var moveMassHeadingString = GFLBA11yStrings.moveMassHeadingString;
  var moveMassLabelString = GFLBA11yStrings.moveMassLabelString;
  var changeMassHeadingString = GFLBA11yStrings.changeMassHeadingString;
  var moveInLargerStepsString = GFLBA11yStrings.moveInLargerStepsString;
  var jumpToLeftString = GFLBA11yStrings.jumpToLeftString;
  var jumpToRightString = GFLBA11yStrings.jumpToRightString;
  var increaseMassString = GFLBA11yStrings.increaseMassString;
  var decreaseMassString = GFLBA11yStrings.decreaseMassString;
  var changeMassInLargerStepsString = GFLBA11yStrings.changeMassInLargerStepsString;
  var jumpToMaximumMassString = GFLBA11yStrings.jumpToMaximumMassString;
  var jumpToMinimumMassString = GFLBA11yStrings.jumpToMinimumMassString;

  // constants
  var DEFAULT_LABEL_OPTIONS = {
    font: HelpContent.DEFAULT_LABEL_FONT,
    maxWidth: HelpContent.DEFAULT_TEXT_MAX_WIDTH
  };

  var ICON_OPTIONS = {
    home: function () {
      return new HomeKeyNode();
    },
    end: function() {
      return new EndKeyNode();
    },
    leftRight: function() {
      return HelpContent.leftRightArrowKeysRowIcon();
    },
    downOrLeft: function() {
      return HelpContent.iconOrIcon( new ArrowKeyNode( 'down' ), new ArrowKeyNode( 'left' ) );
    },
    upOrRight: function() {
      return HelpContent.iconOrIcon( new ArrowKeyNode( 'up' ), new ArrowKeyNode( 'right' ) );
    },
    pageUpPageDown: function() {
      return HelpContent.pageUpPageDownRowIcon();
    }
  };

  /**
   * Constructor.
   *
   * @param {Tandem} tandem
   * @constructor
   */
  function GravityForceLabBasicsKeyboardHelpContent( tandem ) {

    // Mass movement help dialog section
    // move mass content
    var moveMassRow = this.constructRow( moveMassLabelString, 'leftRight' );

    // 'move in larger steps' content
    var moveLargeStepsRow = this.constructRow( moveInLargerStepsString, 'pageUpPageDown' );

    // 'jump to left' content
    var jumpLeftRow = this.constructRow( jumpToLeftString, 'home' );

    // 'jump to right' content
    var jumpRightRow = this.constructRow( jumpToRightString, 'end' );

    var moveMassRows = [ moveMassRow, moveLargeStepsRow, jumpLeftRow, jumpRightRow ];
    var moveMassHelpContent = new HelpContent( moveMassHeadingString, moveMassRows );

    // Mass adjustment help section
    var increaseMassRow = this.constructRow( increaseMassString, 'upOrRight' );
    var decreaseMassRow = this.constructRow( decreaseMassString, 'downOrLeft' );
    var changeMassLargeStepsRow = this.constructRow( changeMassInLargerStepsString, 'pageUpPageDown' );
    var jumpToMinMassRow = this.constructRow( jumpToMinimumMassString, 'home' );
    var jumpToMaxMassRow = this. constructRow( jumpToMaximumMassString, 'end' );

    var adjustMassRows = [ increaseMassRow, decreaseMassRow, changeMassLargeStepsRow, jumpToMinMassRow, jumpToMaxMassRow ];
    var adjustMassHelpContent = new HelpContent( changeMassHeadingString, adjustMassRows );

    // align icons for the mass movement and adjustment sections
    HelpContent.alignHelpContentIcons( [ moveMassHelpContent, adjustMassHelpContent ] );

    var generalNavigationHelpContent = new GeneralNavigationHelpContent();

    var leftContent = new VBox( {
      children: [ moveMassHelpContent, adjustMassHelpContent ],
      align: 'top',
      spacing: 30
    } );

    var rightContent = new VBox( {
      children: [ generalNavigationHelpContent ],
      align: 'top',
      spacing: 30
    } );

    var content = new HBox( {
      children: [ leftContent, rightContent ],
      align: 'top',
      spacing: 30
    } );

    Panel.call( this, content, {
      stroke: null,
      fill: 'rgb( 214, 237, 249 )',
      tandem: tandem
    } );
  }

  gravityForceLabBasics.register( 'GravityForceLabBasicsKeyboardHelpContent', GravityForceLabBasicsKeyboardHelpContent );

  return inherit( Panel, GravityForceLabBasicsKeyboardHelpContent, {

    /**
     * Works like this.constructRow( 'jump to the end', 'end' );
     * @param  {[type]} labelString [description]
     * @param  {[type]} iconOption  [description]
     * @return {[type]}             [description]
     */
    constructRow: function( labelString, iconOption ) {
      var labelNode = new RichText( labelString, DEFAULT_LABEL_OPTIONS );

      var iconNode = ICON_OPTIONS[ iconOption ]();

      return HelpContent.labelWithIcon( labelNode, iconNode );
    }
  } );
} );
