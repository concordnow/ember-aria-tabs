import Component from '@glimmer/component';
import { cached, tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { next } from '@ember/runloop';
import { on } from '@ember/modifier';
import { hash } from '@ember/helper';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import willDestroy from '@ember/render-modifiers/modifiers/will-destroy';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import didUpdate from '@ember/render-modifiers/modifiers/did-update';

const DEFAULT_CLASS = 'ember-tabs__tab';

export interface AriaTabSignature {
  Args: {
    disabled?: boolean;
    disabledClassName?: string;
    focus?: boolean;
    onClick?: (index: number, event: Event) => void;
    onKeyUp?: (index: number, event: KeyboardEvent) => void;
    panelIds?: string[];
    selectedClassName?: string;
    selectedTabClassName?: string;
    disabledTabClassName?: string;
    selectedIndex?: number | null;
    tabIds?: string[];
    tabIndex?: string;
    didInsertNode?: (nodeId: string, node: HTMLLIElement) => void;
    willDestroyNode?: (nodeId: string, node: HTMLLIElement) => void;
  };

  Blocks: {
    default: [
      {
        selected: boolean;
      },
    ];
  };

  Element: HTMLLIElement;
}

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
export default class AriaTab extends Component<AriaTabSignature> {
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

  @tracked elementId = guidFor(this);
  @tracked element: HTMLLIElement | undefined;

  @cached
  get classNames() {
    const classNames = [DEFAULT_CLASS];
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
    return this.args.tabIds?.indexOf(this.elementId) || 0;
  }

  @cached
  get panelId() {
    return this.args.panelIds?.[this.nodeIndex];
  }

  @cached
  get selected() {
    return this.nodeIndex === this.args.selectedIndex;
  }

  get tabIndex() {
    return this.args.tabIndex ?? (this.selected ? '0' : undefined);
  }

  checkFocus = () => {
    if (this.selected && this.args.focus) {
      // We need to wait the selected rendering state
      // eslint-disable-next-line ember/no-runloop
      next(() => {
        this.element?.focus();
      });
    }
  };

  didInsertNode = (element: HTMLLIElement) => {
    this.element = element;
    this.elementId = element.id;

    if (typeof this.args.didInsertNode === 'function') {
      this.args.didInsertNode(this.elementId, element);
    }
  };

  willDestroyNode = (element: HTMLLIElement) => {
    if (typeof this.args.willDestroyNode === 'function') {
      this.args.willDestroyNode(this.elementId, element);
    }
  };

  onClick = (event: Event) => {
    if (typeof this.args.onClick === 'function' && this.nodeIndex) {
      this.args.onClick(this.nodeIndex, event);
    }
  };

  onKeyUp = (event: Event) => {
    if (typeof this.args.onKeyUp === 'function' && this.nodeIndex) {
      this.args.onKeyUp(this.nodeIndex, event as KeyboardEvent);
    }
  };

  <template>
    {{! template-lint-disable no-positive-tabindex }}
    <li
      aria-controls={{this.panelId}}
      aria-disabled={{if @disabled "true" "false"}}
      aria-selected={{if this.selected "true" "false"}}
      class={{this.classNames}}
      disabled={{@disabled}}
      id={{this.elementId}}
      role="tab"
      tabindex={{this.tabIndex}}
      {{didInsert this.didInsertNode}}
      {{willDestroy this.willDestroyNode}}
      {{didInsert this.checkFocus}}
      {{didUpdate this.checkFocus}}
      {{on "click" this.onClick}}
      {{on "keyup" this.onKeyUp}}
      ...attributes
    >
      {{yield (hash selected=this.selected)}}
    </li>
  </template>
}
