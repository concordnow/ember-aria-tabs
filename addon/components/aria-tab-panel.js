import Component from '@ember/component';
import { computed, getProperties, setProperties } from '@ember/object';
import layout from '../templates/components/aria-tab-panel';

const DEFAULT_CLASS = 'ember-tabs__tab-panel';

/**
 * A tab panel component rendered as `<div />`.
 *
 * If you specify additional props on the `<AriaTabPanel />` component they will be forwarded to the rendered `<div />`.
 *
 * Default CSS class: `ember-tabs__tab-panel`
 *
 * @class AriaTabPanel
 * @public
 */
export default Component.extend({
  layout,
  classNames: [DEFAULT_CLASS],
  classNameBindings: [
    '_selectedClassName',
  ],
  attributeBindings: [
    'tabId:aria-labelledby',
    'parentGuid:data-parent-guid',
    'role'
  ],

  /**
   * Defaults to `false`.
   *
   * By default the tab content will only be rendered when the tab is active. If set to `true` the tab will also be rendered if inactive.
   *
   * > This can also be enabled for all `<AriaTabPanel />` components with the prop `forceRenderTabPanel` on `<AriaTabs />`.
   *
   * @argument forceRender
   * @type Boolean
   * @default false
   */
  forceRender: false,

  /**
   * Defaults to `"ember-tabs__tab-panel--selected"`.
   *
   * Provide a custom class name for the active tab panel.
   *
   * > This option can also be set for all `<AriaTabPanel />` components with the prop `selectedTabPanelClassName` on `<AriaTabs />`.
   *
   * @argument selectedClassName
   * @type String
   * @default "ember-tabs__tab-panel--selected"
   */
  selectedClassName: null,

  role: computed({
    get() {
      return 'tabpanel';
    }
  }).readOnly(),

  nodeIndex: computed('element', 'panelNodes.[]', function() {
    let {
      element,
      panelNodes
    } = getProperties(this, [
      'element',
      'panelNodes'
    ]);
    return panelNodes.indexOf(element);
  }),

  tabId: computed('nodeIndex', 'tabNodes.[]', function() {
    let {
      nodeIndex,
      tabNodes
    } = getProperties(this, [
      'nodeIndex',
      'tabNodes'
    ]);
    let tab = tabNodes[nodeIndex];
    return tab ? tab.id : null;
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

  _selectedClassName: computed('selected', 'selectedTabPanelClassName', 'selectedClassName', function() {
    let {
      selected,
      selectedTabPanelClassName,
      selectedClassName
    } = getProperties(this, [
      'selected',
      'selectedTabPanelClassName',
      'selectedClassName'
    ]);
    return selected ? (selectedClassName || selectedTabPanelClassName || `${DEFAULT_CLASS}--selected`) : '';
  }),

  shouldYield: computed('selected', 'forceRender', function() {
    let {
      selected,
      forceRender
    } = getProperties(this, ['selected', 'forceRender']);
    return selected || forceRender;
  }),

  init() {
    this._super(...arguments);
    // Set defaults
    setProperties(this, {
      tabNodes: [],
      panelNodes: []
    });
  }
});
