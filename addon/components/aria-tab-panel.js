import Component from '@glimmer/component';
import { cached, tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

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
export default class AriaTabPanelComponent extends Component {
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
    return A(this.args.panelIds).indexOf(this.elementId);
  }

  @cached
  get tabId() {
    return A(this.args.tabIds)[this.nodeIndex];
  }

  @cached
  get selected() {
    return this.nodeIndex === this.args.selectedIndex;
  }

  @cached
  get classNames() {
    let classNames = [DEFAULT_CLASS];

    if (this.selected) {
      classNames.push(this.selectedClassName);
    }
    return classNames.join(' ');
  }

  @action
  didInsertNode(element) {
    this.elementId = element.id;
    if (typeof this.args.didInsertNode === 'function') {
      this.args.didInsertNode(this.elementId, ...arguments);
    }
  }

  @action
  willDestroyNode() {
    if (typeof this.args.willDestroyNode === 'function') {
      this.args.willDestroyNode(this.elementId, ...arguments);
    }
  }
}
