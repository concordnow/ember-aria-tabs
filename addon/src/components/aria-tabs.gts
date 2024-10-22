import Component from '@glimmer/component';
import { cached, tracked } from '@glimmer/tracking';
import { TrackedArray } from 'tracked-built-ins';
import { isNone } from '@ember/utils';
import { hash } from '@ember/helper';
import { runTask } from 'ember-lifeline';

import AriaTabList from './aria-tab-list.gts';
import AriaTabPanel from './aria-tab-panel.gts';

import type { WithBoundArgs } from '@glint/template';

const MODE_CONTROLLED = 0;
const MODE_UNCONTROLLED = 1;

const DEFAULT_CLASS = 'ember-tabs';

export interface AriaTabsSignature {
  Args: {
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
    defaultFocus?: boolean;

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
    defaultIndex?: number;

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
    forceRenderTabPanel?: boolean;

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
    selectedIndex?: number | null;

    /**
     * Defaults to `"ember-tabs__tab--selected"`.
     *
     * Provide a custom class name for selected tabs.
     *
     * @argument selectedTabClassName
     * @type String
     * @default "ember-tabs__tab--selected"
     */
    selectedTabClassName?: string;

    /**
     * Defaults to `"ember-tabs__tab-panel--selected"`.
     *
     * Provide a custom class name for selected panels.
     *
     * @argument selectedTabPanelClassName
     * @type String
     * @default "ember-tabs__tab-panel--selected"
     */
    selectedTabPanelClassName?: string;

    /**
     * Defaults to `"ember-tabs__tab--disabled"`.
     *
     * Provide a custom class name for disabled tabs.
     *
     * @argument disabledTabClassName
     * @type String
     * @default "ember-tabs__tab--disabled"
     */
    disabledTabClassName?: string;

    /**
     * Defaults to `null`.
     *
     * This event handler is called every time a tab is about to change.
     * It will be called with the `index` that it will be changed to, the `lastIndex` which was selected before and the underlying `event` which is usually either a `keyup` or `click` event.
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
    onSelect?: (
      index: number,
      lastIndex: number | null,
      event: Event,
    ) => void | boolean;
  };

  Blocks: {
    default: [
      {
        tabList: WithBoundArgs<
          typeof AriaTabList,
          | 'didInsertNode'
          | 'disabledTabClassName'
          | 'focus'
          | 'onClick'
          | 'onKeyUp'
          | 'panelIds'
          | 'selectedIndex'
          | 'selectedTabClassName'
          | 'tabIds'
          | 'willDestroyNode'
        >;
        tabPanel: WithBoundArgs<
          typeof AriaTabPanel,
          | 'didInsertNode'
          | 'forceRender'
          | 'panelIds'
          | 'selectedIndex'
          | 'selectedTabPanelClassName'
          | 'tabIds'
          | 'willDestroyNode'
        >;
      },
    ];
  };

  Element: HTMLDivElement;
}

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
export default class AriaTabs extends Component<AriaTabsSignature> {
  className = DEFAULT_CLASS;

  @tracked tabNodes = new TrackedArray<HTMLLIElement>();
  @tracked tabIds = new TrackedArray<string>();
  @tracked panelNodes = new TrackedArray<HTMLDivElement>();
  @tracked panelIds = new TrackedArray<string>();

  @tracked previousMode: 0 | 1 | null = null;
  @tracked selectedIndex: number | null = null;
  @tracked focus: boolean | undefined;

  get selectedTabClassName() {
    return this.args.selectedTabClassName ?? `${DEFAULT_CLASS}__tab--selected`;
  }

  get selectedTabPanelClassName() {
    return (
      this.args.selectedTabPanelClassName ??
      `${DEFAULT_CLASS}__tab-panel--selected`
    );
  }

  get disabledTabClassName() {
    return this.args.disabledTabClassName ?? `${DEFAULT_CLASS}__tab--disabled`;
  }

  get isModeControlled() {
    return this.mode === MODE_CONTROLLED;
  }

  @cached
  get mode() {
    return this.args?.selectedIndex ? MODE_CONTROLLED : MODE_UNCONTROLLED;
  }

  didInsertPanel = (elementId: string, element: HTMLDivElement) => {
    runTask(this, () => {
      this.panelNodes.push(element);
      this.panelIds.push(elementId);

      this.didUpsert();
    });
  };

  willDestroyPanel = (elementId: string, element: HTMLDivElement) => {
    runTask(this, () => {
      const filteredPanelNodes = this.panelNodes.filter((el) => el !== element);
      this.panelNodes.splice(0, this.panelNodes.length, ...filteredPanelNodes);

      const filteredPanelIds = this.panelIds.filter((el) => el !== elementId);
      this.panelIds.splice(0, this.panelIds.length, ...filteredPanelIds);

      this.didUpsert();
    });
  };

  didInsertTab = (elementId: string, element: HTMLLIElement) => {
    runTask(this, () => {
      this.tabNodes.push(element);
      this.tabIds.push(elementId);

      this.didUpsert();
    });
  };

  willDestroyTab = (elementId: string, element: HTMLLIElement) => {
    runTask(this, () => {
      const filteredTabNodes = this.tabNodes.filter((el) => el !== element);
      this.tabNodes.splice(0, this.tabNodes.length, ...filteredTabNodes);

      const filteredTabIds = this.tabIds.filter((el) => el !== elementId);
      this.tabIds.splice(0, this.tabIds.length, ...filteredTabIds);

      this.didUpsert();
    });
  };

  didUpsert() {
    if (!isNone(this.previousMode) && this.previousMode !== this.mode) {
      throw new Error(
        `Switching between controlled mode (by using \`selectedIndex\`) and uncontrolled mode is not supported in \`AriaTabs\`.
For more information about controlled and uncontrolled mode of ember-aria-tabs see the README.`,
      );
    }
    if (this.mode === MODE_UNCONTROLLED) {
      const maxTabIndex = this.tabNodes.length - 1;
      let newSelectedIndex = null;

      if (this.selectedIndex !== null) {
        newSelectedIndex = Math.min(this.selectedIndex, maxTabIndex);
      } else {
        newSelectedIndex = this.args.defaultIndex || 0;
      }

      this.selectedIndex = newSelectedIndex;
    } else {
      this.selectedIndex = this.args.selectedIndex ?? 0;
    }

    this.previousMode = this.mode;
  }

  setSelected(index: number, event: Event) {
    // Check index boundary
    if (index < 0 || (this.tabNodes && index >= this.tabNodes.length)) {
      return;
    }

    // Call change event handler
    if (this.args.onSelect?.(index, this.selectedIndex, event) === false) {
      // Check if the change event handler cancels the tab change
      return;
    }

    this.focus = event.type === 'keyup';

    if (this.mode === MODE_UNCONTROLLED) {
      this.selectedIndex = index;
    }
  }

  getNextTab(index: number) {
    const count = this.tabNodes.length;

    // Look for non-disabled tab from index to the last tab on the right
    for (let i = index + 1; i < count; i++) {
      const tabNode = this.tabNodes[i];
      if (tabNode && !this.isTabDisabled(tabNode)) {
        return i;
      }
    }

    // If no tab found, continue searching from first on left to index
    for (let i = 0; i < index; i++) {
      const tabNode = this.tabNodes[i];
      if (tabNode && !this.isTabDisabled(tabNode)) {
        return i;
      }
    }

    // No tabs are disabled, return index
    return index;
  }

  getPrevTab(index: number) {
    let i = index;

    // Look for non-disabled tab from index to first tab on the left
    while (i--) {
      const tabNode = this.tabNodes[i];
      if (tabNode && !this.isTabDisabled(tabNode)) {
        return i;
      }
    }

    // If no tab found, continue searching from last tab on right to index
    i = this.tabNodes.length;
    while (i-- > index) {
      const tabNode = this.tabNodes[i];
      if (tabNode && !this.isTabDisabled(tabNode)) {
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
      const tabNode = this.tabNodes[i];
      if (tabNode && !this.isTabDisabled(tabNode)) {
        return i;
      }
    }

    return null;
  }

  getLastTab() {
    let i = this.tabNodes.length;

    // Look for non disabled tab from the last tab
    while (i--) {
      const tabNode = this.tabNodes[i];
      if (tabNode && !this.isTabDisabled(tabNode)) {
        return i;
      }
    }

    return null;
  }

  isTabDisabled(tabNode: HTMLLIElement) {
    return tabNode.getAttribute('aria-disabled') === 'true';
  }

  handleClick = (index: number, e: Event) => {
    if (this.tabNodes[index] && this.isTabDisabled(this.tabNodes[index])) {
      return;
    }

    this.setSelected(index, e);
  };

  handleKeyUp = (index: number, e: KeyboardEvent) => {
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
      index = this.getLastTab() ?? index;
      preventDefault = true;
      useSelectedIndex = true;
    } else if (e.keyCode === 36) {
      // Select first tab (Home key)
      index = this.getFirstTab() ?? index;
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
  };

  <template>
    <div class={{this.className}} ...attributes>
      {{yield
        (hash
          tabList=(component
            AriaTabList
            didInsertNode=this.didInsertTab
            disabledTabClassName=this.disabledTabClassName
            focus=this.focus
            onClick=this.handleClick
            onKeyUp=this.handleKeyUp
            panelIds=this.panelIds
            selectedIndex=(if
              this.isModeControlled @selectedIndex this.selectedIndex
            )
            selectedTabClassName=this.selectedTabClassName
            tabIds=this.tabIds
            willDestroyNode=this.willDestroyTab
          )
          tabPanel=(component
            AriaTabPanel
            didInsertNode=this.didInsertPanel
            forceRender=@forceRenderTabPanel
            panelIds=this.panelIds
            selectedIndex=(if
              this.isModeControlled @selectedIndex this.selectedIndex
            )
            selectedTabPanelClassName=this.selectedTabPanelClassName
            tabIds=this.tabIds
            willDestroyNode=this.willDestroyPanel
          )
        )
      }}
    </div>
  </template>
}
