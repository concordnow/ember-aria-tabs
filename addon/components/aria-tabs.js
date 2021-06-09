import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { debounce } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import { isNone } from '@ember/utils';

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
export default class AriaTabsComponent extends Component {
  className = DEFAULT_CLASS;
  _tabIds = A([]);
  _panelIds = A([]);
  @tracked tabNodes = A([]);
  @tracked tabIds = A([]);
  @tracked panelNodes = A([]);
  @tracked panelIds = A([]);
  @tracked previousMode = null;
  @tracked selectedIndex = null;

  /**
   * Defaults to `false`.
   *
   * If set to `true` the tabs will be focused on initial render.
   * This allows immediate use of keyboard keys to switch tabs after the first render.
   *
   * @argument defaultFocus
   * @type Boolean
   * @default false
   */

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

  /**
   * Defaults to `"ember-tabs__tab--selected"`.
   *
   * Provide a custom class name for selected tabs.
   *
   * @argument selectedTabClassName
   * @type String
   * @default "ember-tabs__tab--selected"
   */
  get selectedTabClassName() {
    return this.args.selectedTabClassName ?? `${DEFAULT_CLASS}__tab--selected`;
  }

  /**
   * Defaults to `"ember-tabs__tab-panel--selected"`.
   *
   * Provide a custom class name for selected panels.
   *
   * @argument selectedTabPanelClassName
   * @type String
   * @default "ember-tabs__tab-panel--selected"
   */
  get selectedTabPanelClassName() {
    return (
      this.args.selectedTabPanelClassName ??
      `${DEFAULT_CLASS}__tab-panel--selected`
    );
  }

  /**
   * Defaults to `"ember-tabs__tab--disabled"`.
   *
   * Provide a custom class name for disabled tabs.
   *
   * @argument disabledTabClassName
   * @type String
   * @default "ember-tabs__tab--disabled"
   */

  get disabledTabClassName() {
    return this.args.disabledTabClassName ?? `${DEFAULT_CLASS}__tab--disabled`;
  }

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

  get isModeControlled() {
    return this.mode === MODE_CONTROLLED;
  }

  @cached
  get mode() {
    return isNone(this.args.selectedIndex)
      ? MODE_UNCONTROLLED
      : MODE_CONTROLLED;
  }

  // Ember 3.16
  // Need debounce to avoid double computation on the same loop
  updateTabIds() {
    this.tabIds = this._tabIds;
  }

  // Ember 3.16
  // Need debounce to avoid double computation on the same loop
  updatePanelIds() {
    this.panelIds = this._panelIds;
  }

  @action
  didInsertPanel(elementId, element) {
    this.panelNodes = A([...this.panelNodes, element]);
    this._panelIds = A([...this._panelIds, elementId]);
    debounce(this, this.updatePanelIds, 0);
  }

  @action
  willDestroyPanel(elementId, element) {
    this.panelNodes = A(this.panelNodes.without(element));
    this._panelIds = A(this._panelIds.without(elementId));
    debounce(this, this.updatePanelIds, 0);
  }

  @action
  didInsertTab(elementId, element) {
    this.tabNodes = A([...this.tabNodes, element]);
    this._tabIds = A([...this._tabIds, elementId]);
    debounce(this, this.updateTabIds, 0);
  }

  @action
  willDestroyTab(elementId, element) {
    this.tabNodes = A(this.tabNodes.without(element));
    this._tabIds = A(this._tabIds.without(elementId));
    debounce(this, this.updateTabIds, 0);
  }

  @action
  didUpsert() {
    if (!isNone(this.previousMode) && this.previousMode !== this.mode) {
      throw new Error(
        `Switching between controlled mode (by using \`selectedIndex\`) and uncontrolled mode is not supported in \`AriaTabs\`.
For more information about controlled and uncontrolled mode of ember-aria-tabs see the README.`
      );
    }
    if (this.mode === MODE_UNCONTROLLED) {
      const maxTabIndex = this.tabNodes.length - 1;
      let newSelectedIndex = null;

      if (this.selectedIndex != null) {
        newSelectedIndex = Math.min(this.selectedIndex, maxTabIndex);
      } else {
        newSelectedIndex = this.args.defaultIndex || 0;
      }
      this.selectedIndex = newSelectedIndex;
    } else {
      this.selectedIndex = this.args.selectedIndex;
    }

    this.previousMode = this.mode;
  }

  setSelected(index, event) {
    // Check index boundary
    if (index < 0 || (this.tabNodes && index >= this.tabNodes.length)) {
      return;
    }

    // Call change event handler
    if (typeof this.args.onSelect === 'function') {
      if (this.args.onSelect(index, this.selectedIndex, event) === false) {
        // Check if the change event handler cancels the tab change
        return;
      }
    }

    this.focus = event.type === 'keydown';

    if (this.mode === MODE_UNCONTROLLED) {
      this.selectedIndex = index;
    }
  }

  getNextTab(index) {
    const count = this.tabNodes.length;

    // Look for non-disabled tab from index to the last tab on the right
    for (let i = index + 1; i < count; i++) {
      if (!this.isTabDisabled(this.tabNodes[i])) {
        return i;
      }
    }

    // If no tab found, continue searching from first on left to index
    for (let i = 0; i < index; i++) {
      if (!this.isTabDisabled(this.tabNodes[i])) {
        return i;
      }
    }

    // No tabs are disabled, return index
    return index;
  }

  getPrevTab(index) {
    let i = index;

    // Look for non-disabled tab from index to first tab on the left
    while (i--) {
      if (!this.isTabDisabled(this.tabNodes[i])) {
        return i;
      }
    }

    // If no tab found, continue searching from last tab on right to index
    i = this.tabNodes.length;
    while (i-- > index) {
      if (!this.isTabDisabled(this.tabNodes[i])) {
        return i;
      }
    }

    // No tabs are disabled, return index
    return index;
  }

  getFirstTab() {
    const count = this.tabNodes.length;

    // Look for non disabled tab from the first tab
    for (let i = 0; i < count; i++) {
      if (!this.isTabDisabled(this.tabNodes[i])) {
        return i;
      }
    }

    return null;
  }

  getLastTab() {
    let i = this.tabNodes.length;

    // Look for non disabled tab from the last tab
    while (i--) {
      if (!this.isTabDisabled(this.tabNodes[i])) {
        return i;
      }
    }

    return null;
  }

  isTabDisabled(tabNode) {
    return tabNode.getAttribute('aria-disabled') === 'true';
  }

  @action
  handleClick(index, e) {
    if (this.isTabDisabled(this.tabNodes[index])) {
      return;
    }
    this.setSelected(index, e);
  }

  @action
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
