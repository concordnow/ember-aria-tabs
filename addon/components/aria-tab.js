import Component from '@ember/component';
import { computed, setProperties } from '@ember/object';
import { next } from '@ember/runloop';
import layout from '../templates/components/aria-tab';

const DEFAULT_CLASS = 'ember-tabs__tab';

/**
 * A tab component rendered as `<li />`.
 *
 * If you specify additional props on the `<AriaTab />` component they will be forwarded to the rendered `<li />`.
 *
 * Default CSS class: `ember-tabs__tab`
 *
 * @class AriaTab
 * @public
 */
export default Component.extend({
  layout,
  tagName: 'li',
  classNames: [DEFAULT_CLASS],
  classNameBindings: [
    '_selectedClassName',
    '_disabledClassName'
  ],
  attributeBindings: [
    '_selected:aria-selected',
    '_disabled:aria-disabled',
    'disabled',
    'panelId:aria-controls',
    '_tabIndex:tabindex',
    'parentGuid:data-parent-guid',
    'role'
  ],

  /**
   * Defaults to `false`.
   *
   * Disable this tab which will make it not do anything when clicked. Also a disabled class name will be added (see `disabledClassName`)
   *
   * @argument disabled
   * @type Boolean
   * @default false
   */
  disabled: false,

  /**
   * Defaults to `"ember-tabs__tab--disabled"`.
   *
   * Provide a custom class name for disabled tabs.
   *
   * > This option can also be set for all `<AriaTab />` components with the prop `disabledTabClassName` on `<AriaTabs />`.
   *
   * @argument disabledClassName
   * @type String
   * @default "ember-tabs__tab--disabled"
   */
  disabledClassName: null,

  /**
   * Defaults to `"ember-tabs__tab--selected"`.
   *
   * > This option can also be set for all `<AriaTab />` components with the prop `disabledTabClassName` on `<AriaTabs />`.
   *
   * @argument selectedClassName
   * @type String
   * @default "ember-tabs__tab--selected"
   */
  selectedClassName: null,

  focus: false,

  /**
   * > default: if selected `"0"` otherwise `null`
   *
   * Overrides the tabIndex to enabled tabbing between tabs.
   *
   * @argument tabIndex
   * @type String
   * @default "0"|null
   **/
  tabIndex: null,

  role: computed({
    get() {
      return 'tab';
    }
  }).readOnly(),

  nodeIndex: computed('element', 'tabNodes.[]', function() {
    return this.tabNodes.indexOf(this.element);
  }),

  panelId: computed('nodeIndex', 'panelNodes.[]', function() {
    let panel = this.panelNodes[this.nodeIndex];
    return panel? panel.id : null;
  }),

  selected: computed('nodeIndex', 'selectedIndex', function() {
    return this.nodeIndex === this.selectedIndex;
  }),

  _selected: computed('selected', function() {
    return this.selected ? 'true' : 'false';
  }),

  _selectedClassName: computed('selected', 'selectedTabClassName', 'selectedClassName', function() {
    return this.selected ? (this.selectedClassName || this.selectedTabClassName || `${DEFAULT_CLASS}--selected`) : '';
  }),

  _disabled: computed('disabled', function() {
    return this.disabled ? 'true' : 'false';
  }),

  _disabledClassName: computed('disabled', 'disabledTabClassName', 'disabledClassName', function() {
    return this.disabled ? (this.disabledClassName || this.disabledTabClassName || `${DEFAULT_CLASS}--disabled`) : '';
  }),

  _tabIndex: computed('tabIndex', 'selected', function() {
    return this.tabIndex || (this.selected ? '0' : null);
  }),

  init() {
    this._super(...arguments);
    // Set defaults
    setProperties(this, {
      tabNodes: [],
      panelNodes: []
    });
  },

  didInsertElement() {
    this._super(...arguments);
    this.checkFocus();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.checkFocus();
  },

  click(e) {
    if (this.onClick) {
      this.onClick(this.nodeIndex, e);
    }
  },

  keyDown(e) {
    if (this.onKeyDown) {
      this.onKeyDown(this.nodeIndex, e);
    }
  },

  checkFocus() {
    if (this.selected && this.focus) {
      // We need to wait the selected rendering state
      next(() => {
        this.element.focus();
      });
    }
  }
});
