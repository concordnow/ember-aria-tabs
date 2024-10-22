import Component from '@glimmer/component';
import { cached, tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { hash } from '@ember/helper';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import willDestroy from '@ember/render-modifiers/modifiers/will-destroy';

const DEFAULT_CLASS = 'ember-tabs__tab-panel';

export interface AriaTabPanelSignature {
  Args: {
    forceRender?: boolean;
    panelIds?: string[];
    selectedClassName?: string;
    selectedIndex?: number | null;
    tabIds?: string[];
    tabId?: string;
    selectedTabPanelClassName?: string;
    didInsertNode?: (elementId: string, element: HTMLDivElement) => void;
    willDestroyNode?: (elementId: string, element: HTMLDivElement) => void;
  };

  Blocks: {
    default: [
      {
        selected: boolean;
      },
    ];
  };

  Element: HTMLDivElement;
}

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
export default class AriaTabPanel extends Component<AriaTabPanelSignature> {
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
  @cached
  get selectedClassName() {
    return (
      this.args.selectedClassName ??
      this.args.selectedTabPanelClassName ??
      `${DEFAULT_CLASS}--selected`
    );
  }

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

  get shouldYield() {
    return this.selected || this.args.forceRender;
  }

  @tracked
  elementId = guidFor(this);

  @cached
  get nodeIndex() {
    return this.args.panelIds?.indexOf(this.elementId) || 0;
  }

  @cached
  get tabId() {
    return this.nodeIndex !== undefined
      ? this.args.tabIds?.[this.nodeIndex]
      : undefined;
  }

  @cached
  get selected() {
    return this.nodeIndex === this.args.selectedIndex;
  }

  @cached
  get classNames() {
    const classNames = [DEFAULT_CLASS];

    if (this.selected) {
      classNames.push(this.selectedClassName);
    }
    return classNames.join(' ');
  }

  didInsertNode = (element: HTMLDivElement) => {
    this.elementId = element.id;

    if (typeof this.args.didInsertNode === 'function') {
      this.args.didInsertNode(this.elementId, element);
    }
  };

  willDestroyNode = (element: HTMLDivElement) => {
    if (typeof this.args.willDestroyNode === 'function') {
      this.args.willDestroyNode(this.elementId, element);
    }
  };

  <template>
    <div
      aria-labelledby={{@tabId}}
      class={{this.classNames}}
      id={{this.elementId}}
      role="tabpanel"
      {{didInsert this.didInsertNode}}
      {{willDestroy this.willDestroyNode}}
      ...attributes
    >
      {{~#if this.shouldYield~}}
        {{yield (hash selected=this.selected)}}
      {{/if}}
    </div>
  </template>
}
