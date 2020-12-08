import Component from '@ember/component';
import { set, setProperties } from '@ember/object';
import { isNone } from '@ember/utils';
import layout from '../templates/components/aria-tabs';

const MODE_CONTROLLED = 0;
const MODE_UNCONTROLLED = 1;

const DEFAULT_CLASS = 'ember-tabs';

/**
 * The outer `<div />` of the tabs.
 *
 * If you specify additional props on the `<AriaTabs />` component they will be forwarded to the rendered `<div />`.
 *
 * Default CSS class: `ember-tabs`
 *
 * @class AriaTabs
 * @public
 */
export default Component.extend({
  layout,
  classNames: [`${DEFAULT_CLASS}`],

  /**
   * Defaults to `false`.
   *
   * If set to `true` the tabs will be focused on initial render.
   * This allows immediate use of keyboard keys to switch tabs after the first render.
   *
   * @argument defaultFocus
   * @type Boolean
   * @default true
   */
  defaultFocus: false,

  /**
   * Defaults to `0`.
   *
   * This allows changing the tab that should be open on initial render.
   * This is a zero-based index, so first tab is `0`, second tab is `1`, ...
   *
   * > This can only be used in uncontrolled mode when react-tabs handles the current selected tab internally and for this reason cannot be used together with `selectedIndex`.
   * > See `controlled vs uncontrolled mode` for more info on modes.
   *
   * @argument defaultIndex
   * @type Number
   * @default 0
   */
  defaultIndex: 0,

  /**
   * Defaults to `null`.
   *
   * This event handler is called every time a tab is about to change.
   * It will be called with the `index` that it will be changed to, the `lastIndex` which was selected before and the underlying `event` which is usually either a `keydown` or `click` event.
   * When `index` and `lastIndex` are equal it means the user clicked on the currently active tab.
   *
   * The callback can optionally return `false` to cancel the change to the new tab.
   *
   * > Returning `false` when the change to the new tab should be canceled is also important in controlled mode, as ember-aria-tabs still internally handles the focus of the tabs.
   *
   * > In controlled mode the `onSelect` handler is a required prop.
   *
   * @argument onSelect
   * @type Function
   * @default null
   */
  onSelect: null,

  /**
   * Defaults to `null`.
   *
   * Set the currently selected tab. This is a zero-based index, so first tab is `0`, second tab is `1`, ...
   *
   * This enables controlled mode, which also requires `onSelect` to be set.
   * See `controlled vs uncontrolled mode` for more info on modes.
   *
   * @argument selectedIndex
   * @type Number
   * @default null
   */
  selectedIndex: null,

  /**
   * Defaults to `"ember-tabs__tab--selected"`.
   *
   * Provide a custom class name for selected tabs.
   *
   * @argument selectedTabClassName
   * @type String
   * @default "ember-tabs__tab--selected"
   */
  selectedTabClassName: `${DEFAULT_CLASS}__tab--selected`,

  /**
   * Defaults to `"ember-tabs__tab-panel--selected"`.
   *
   * Provide a custom class name for selected panels.
   *
   * @argument selectedTabPanelClassName
   * @type String
   * @default "ember-tabs__tab-panel--selected"
   */
  selectedTabPanelClassName: `${DEFAULT_CLASS}__tab-panel--selected`,

  /**
    * Defaults to `"ember-tabs__tab--disabled"`.
    *
    * Provide a custom class name for disabled tabs.
    *
    * @argument disabledTabClassName
    * @type String
    * @default "ember-tabs__tab--disabled"
    */
  disabledTabClassName: `${DEFAULT_CLASS}__tab--disabled`,

  /**
   * Defaults to `false`.
   *
   * By default only the current active tab will be rendered to DOM.
   * If set to `true` all tabs will be rendered to the DOM always.
   *
   * > This can also be enabled for each individual `<AriaTabPanel />` component with its prop `forceRender`.
   *
   * @argument forceRenderTabPanel
   * @type Boolean
   * @default false
   */
  forceRenderTabPanel: false,

  init() {
    this._super(...arguments);

    setProperties(this, {
      tabNodes: [],
      panelNodes: [],
      focus: this.defaultFocus
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let mode = this.mode;
    let newMode = this.getMode();

    if (!isNone(mode) && mode !== newMode) {
      throw new Error(
        `Switching between controlled mode (by using \`selectedIndex\`) and uncontrolled mode is not supported in \`AriaTabs\`.
For more information about controlled and uncontrolled mode of ember-aria-tabs see the README.`,
      );
    }

    set(this, 'mode', newMode);
  },

  getMode() {
    return this.selectedIndex === null ? MODE_UNCONTROLLED : MODE_CONTROLLED;
  },

  didRender() {
    this._super(...arguments);

    let tabNodes = (typeof FastBoot === "undefined") ? Array.from(this.element.querySelectorAll(`[role="tab"][data-parent-guid="${this.elementId}"]`)) : null;
    let panelNodes = (typeof FastBoot === "undefined") ? Array.from(this.element.querySelectorAll(`[role="tabpanel"][data-parent-guid="${this.elementId}"]`)) : null;

    // Avoid infinite loop
    if (!this.nodesEquals('tabNodes', tabNodes) && !this.nodesEquals('panelNodes', panelNodes)) {
      setProperties(this, {
        tabNodes,
        panelNodes
      });
    }

    if (this.mode === MODE_UNCONTROLLED) {
      const maxTabIndex = tabNodes.length - 1;
      let newSelectedIndex = null;

      if (this.selectedIndex != null) {
        newSelectedIndex = Math.min(this.selectedIndex, maxTabIndex);
      } else {
        newSelectedIndex = this.defaultIndex || 0;
      }
      set(this, 'selectedIndex', newSelectedIndex);
    }
  },

  nodesEquals(propName, nodeList) {
    let previousNodes = this[propName];
    if (previousNodes.length !== nodeList.length) {
      return false;
    }
    let nodeIds = nodeList.map((node) => node.id);
    let previousNodeIds = previousNodes.map((node) => node.id);
    return previousNodeIds.every((prevNodeId) => nodeIds.includes(prevNodeId));
  },

  setSelected(index, event) {
    // Check index boundary
    if (index < 0 || (this.tabsNodes && index >= this.tabsNodes.length)) {
      return;
    }

    // Call change event handler
    if (typeof this.onSelect === 'function') {
      if (this.onSelect(index, this.selectedIndex, event) === false) {
        // Check if the change event handler cancels the tab change
        return;
      }
    }

    set(this, 'focus', event.type === 'keydown');

    if (this.mode === MODE_UNCONTROLLED) {
      set(this, 'selectedIndex', index);
    }
  },

  getNextTab(index) {
    let tabsNodes = this.tabNodes;
    const count = tabsNodes.length;

    // Look for non-disabled tab from index to the last tab on the right
    for (let i = index + 1; i < count; i++) {
      if (!this.isTabDisabled(tabsNodes[i])) {
        return i;
      }
    }

    // If no tab found, continue searching from first on left to index
    for (let i = 0; i < index; i++) {
      if (!this.isTabDisabled(tabsNodes[i])) {
        return i;
      }
    }

    // No tabs are disabled, return index
    return index;
  },

  getPrevTab(index) {
    let tabsNodes = this.tabNodes;
    let i = index;

    // Look for non-disabled tab from index to first tab on the left
    while (i--) {
      if (!this.isTabDisabled(tabsNodes[i])) {
        return i;
      }
    }

    // If no tab found, continue searching from last tab on right to index
    i = tabsNodes.length;
    while (i-- > index) {
      if (!this.isTabDisabled(tabsNodes[i])) {
        return i;
      }
    }

    // No tabs are disabled, return index
    return index;
  },

  getFirstTab() {
    let tabsNodes = this.tabNodes;
    const count = tabsNodes.length;

    // Look for non disabled tab from the first tab
    for (let i = 0; i < count; i++) {
      if (!this.isTabDisabled(tabsNodes[i])) {
        return i;
      }
    }

    return null;
  },

  getLastTab() {
    let tabsNodes = this.tabNodes;
    let i = tabsNodes.length;

    // Look for non disabled tab from the last tab
    while (i--) {
      if (!this.isTabDisabled(tabsNodes[i])) {
        return i;
      }
    }

    return null;
  },

  isTabDisabled(tabNode) {
    return tabNode.getAttribute('aria-disabled') === 'true';
  },

  actions: {
    handleClick(index, e) {
      let tabsNodes = this.tabNodes;
      if (this.isTabDisabled(tabsNodes[index])) {
        return;
      }
      this.setSelected(index, e);
    },

    handleKeyDown(index, e) {
      let preventDefault = false;
      let useSelectedIndex = false;

      if (e.keyCode === 32 || e.keyCode === 13) {
        preventDefault = true;
        useSelectedIndex = false;
        this.setSelected(index, e);
      }

      if (e.keyCode === 37 || e.keyCode === 38) {
        // Select next tab to the left
        index = this.getPrevTab(index);
        preventDefault = true;
        useSelectedIndex = true;
      } else if (e.keyCode === 39 || e.keyCode === 40) {
        // Select next tab to the right
        index = this.getNextTab(index);
        preventDefault = true;
        useSelectedIndex = true;
      } else if (e.keyCode === 35) {
        // Select last tab (End key)
        index = this.getLastTab();
        preventDefault = true;
        useSelectedIndex = true;
      } else if (e.keyCode === 36) {
        // Select first tab (Home key)
        index = this.getFirstTab();
        preventDefault = true;
        useSelectedIndex = true;
      }

      // This prevents scrollbars from moving around
      if (preventDefault) {
        e.preventDefault();
        e.stopPropagation();
      }

      // Only use the selected index in the state if we're not using the tabbed index
      if (useSelectedIndex) {
        this.setSelected(index, e);
      }
    }
  }
});
