import Component from '@glimmer/component';
import { cached, tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { on } from '@ember/modifier';
import { hash } from '@ember/helper';
import { modifier } from 'ember-modifier';

const DEFAULT_CLASS = 'ember-tabs__tab';

export interface AriaTabSignature {
  Args: {
    /**
     * Defaults to `false`.
     *
     * Disable this tab which will make it not do anything when clicked. Also a disabled class name will be added (see `disabledClassName`)
     *
     * @argument disabled
     * @type Boolean
     * @default false
     */
    disabled?: boolean;

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
    disabledClassName?: string;
    focus?: boolean;
    panelIds?: string[];

    /**
     * Defaults to `"ember-tabs__tab--selected"`.
     *
     * > This option can also be set for all `<AriaTab />` components with the prop `disabledTabClassName` on `<AriaTabs />`.
     *
     * @argument selectedClassName
     * @type String
     * @default "ember-tabs__tab--selected"
     */
    selectedClassName?: string;
    selectedTabClassName?: string;
    disabledTabClassName?: string;
    selectedIndex?: number | null;
    tabIds?: string[];

    /**
     * Default to `"0"` if selected, `null` otherwise.
     *
     * Overrides the tabIndex to enabled tabbing between tabs.
     *
     * @argument tabIndex
     * @type String
     * @default "0"|null
     */
    tabIndex?: string;

    onClick?: (index: number, event: Event) => void;
    onKeyUp?: (index: number, event: KeyboardEvent) => void;
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
  @tracked elementId = guidFor(this);
  @tracked element: HTMLLIElement | undefined;

  @cached
  get disabledClassName() {
    return (
      this.args.disabledClassName ??
      this.args.disabledTabClassName ??
      `${DEFAULT_CLASS}--disabled`
    );
  }

  @cached
  get selectedClassName() {
    return (
      this.args.selectedClassName ??
      this.args.selectedTabClassName ??
      `${DEFAULT_CLASS}--selected`
    );
  }

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

  registerTab = modifier((element: HTMLLIElement) => {
    this.element = element;
    this.elementId = element.id;

    this.args.didInsertNode?.(this.elementId, element);

    return () => {
      this.args.willDestroyNode?.(this.elementId, element);
    };
  });

  checkFocus = modifier(
    (element: HTMLLIElement, [shouldFocus]: [boolean | undefined]) => {
      if (this.selected && shouldFocus) {
        this.element?.focus();
      }
    },
  );

  onClick = (event: Event) => {
    this.args.onClick?.(this.nodeIndex, event);
  };

  onKeyUp = (event: Event) => {
    this.args.onKeyUp?.(this.nodeIndex, event as KeyboardEvent);
  };

  <template>
    {{! template-lint-disable no-positive-tabindex }}
    <li
      aria-controls={{this.panelId}}
      aria-disabled={{if @disabled "true" "false"}}
      aria-selected={{if this.selected "true" "false"}}
      class={{this.classNames}}
      id={{this.elementId}}
      role="tab"
      tabindex={{this.tabIndex}}
      {{this.registerTab}}
      {{this.checkFocus @focus}}
      {{on "click" this.onClick}}
      {{on "keyup" this.onKeyUp}}
      ...attributes
    >
      {{yield (hash selected=this.selected)}}
    </li>
  </template>
}
