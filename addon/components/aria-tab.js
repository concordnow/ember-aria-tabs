import Component from '@ember/component';
import { computed, get, getProperties, setProperties } from '@ember/object';
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
    let {
      element,
      tabNodes
    } = getProperties(this, [
      'element',
      'tabNodes'
    ]);
    return tabNodes.indexOf(element);
  }),

  panelId: computed('nodeIndex', 'panelNodes.[]', function() {
    let {
      nodeIndex,
      panelNodes
    } = getProperties(this, [
      'nodeIndex',
      'panelNodes'
    ]);
    let panel = panelNodes[nodeIndex];
    return panel? panel.id : null;
  }),

  selected: computed('nodeIndex', 'selectedIndex', function() {
    let {
      nodeIndex,
      selectedIndex
    } = getProperties(this, [
      'nodeIndex',
      'selectedIndex'
    ]);
    return nodeIndex === selectedIndex;
  }),

  _selected: computed('selected', function() {
    return get(this, 'selected') ? 'true' : 'false';
  }),

  _selectedClassName: computed('selected', 'selectedTabClassName', 'selectedClassName', function() {
    let {
      selected,
      selectedTabClassName,
      selectedClassName
    } = getProperties(this, [
      'selected',
      'selectedTabClassName',
      'selectedClassName'
    ]);
    return selected ? (selectedClassName || selectedTabClassName || `${DEFAULT_CLASS}--selected`) : '';
  }),

  _disabled: computed('disabled', function() {
    return get(this, 'disabled') ? 'true' : 'false';
  }),

  _disabledClassName: computed('disabled', 'disabledTabClassName', 'disabledClassName', function() {
    let {
      disabled,
      disabledTabClassName,
      disabledClassName
    } = getProperties(this, [
      'disabled',
      'disabledTabClassName',
      'disabledClassName'
    ]);
    return disabled ? (disabledClassName || disabledTabClassName || `${DEFAULT_CLASS}--disabled`) : '';
  }),

  _tabIndex: computed('tabIndex', 'selected', function() {
    let {
      tabIndex,
      selected
    } = getProperties(this, ['tabIndex', 'selected']);
    return tabIndex || (selected ? '0' : null);
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
    let {
      onClick,
      nodeIndex
    } = getProperties(this, [
      'onClick',
      'nodeIndex'
    ]);
    if (onClick) {
      onClick(nodeIndex, e);
    }
  },

  keyDown(e) {
    let {
      onKeyDown,
      nodeIndex
    } = getProperties(this, [
      'onKeyDown',
      'nodeIndex'
    ]);
    if (onKeyDown) {
      onKeyDown(nodeIndex, e);
    }
  },

  checkFocus() {
    let {
      element,
      focus,
      selected
    } = getProperties(this, ['element', 'focus', 'selected']);
    if (selected && focus) {
      // We need to wait the selected rendering state
      next(() => {
        element.focus();
      });
    }
  }
});
