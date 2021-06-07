import Component from '@glimmer/component';
import { cached, tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { next } from '@ember/runloop';

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
export default class AriaTabComponent extends Component {
  /**
   * Defaults to `false`.
   *
   * Disable this tab which will make it not do anything when clicked. Also a disabled class name will be added (see `disabledClassName`)
   *
   * @argument disabled
   * @type Boolean
   * @default false
   */

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
  @cached
  get disabledClassName() {
    return (
      this.args.disabledClassName ??
      this.args.disabledTabClassName ??
      `${DEFAULT_CLASS}--disabled`
    );
  }

  /**
   * Defaults to `"ember-tabs__tab--selected"`.
   *
   * > This option can also be set for all `<AriaTab />` components with the prop `disabledTabClassName` on `<AriaTabs />`.
   *
   * @argument selectedClassName
   * @type String
   * @default "ember-tabs__tab--selected"
   */
  @cached
  get selectedClassName() {
    return (
      this.args.selectedClassName ??
      this.args.selectedTabClassName ??
      `${DEFAULT_CLASS}--selected`
    );
  }

  /**
   * Default to `"0"` if selected, `null` otherwise.
   *
   * Overrides the tabIndex to enabled tabbing between tabs.
   *
   * @argument tabIndex
   * @type String
   * @default "0"|null
   **/

  @tracked
  elementId = guidFor(this);

  @cached
  get classNames() {
    let classNames = [DEFAULT_CLASS];
    if (this.selected) {
      classNames.push(this.selectedClassName);
    }
    if (this.args.disabled) {
      classNames.push(this.disabledClassName);
    }
    return classNames.join(' ');
  }

  @cached
  get nodeIndex() {
    return A(this.args.tabIds).indexOf(this.elementId);
  }

  @cached
  get panelId() {
    return A(this.args.panelIds)[this.nodeIndex];
  }

  @cached
  get selected() {
    return this.nodeIndex === this.args.selectedIndex;
  }

  get tabIndex() {
    return this.args.tabIndex ?? (this.selected ? '0' : undefined);
  }

  @action
  checkFocus() {
    if (this.selected && this.args.focus) {
      // We need to wait the selected rendering state
      next(() => {
        this.element.focus();
      });
    }
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

  @action
  onClick() {
    if (typeof this.args.onClick === 'function') {
      this.args.onClick(this.nodeIndex, ...arguments);
    }
  }

  @action
  onKeyDown() {
    if (typeof this.args.onKeyDown === 'function') {
      this.args.onKeyDown(this.nodeIndex, ...arguments);
    }
  }
}
