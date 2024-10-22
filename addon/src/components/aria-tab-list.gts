import Component from '@glimmer/component';
import { hash } from '@ember/helper';

import AriaTab from './aria-tab.gts';

import type { WithBoundArgs } from '@glint/template';

const DEFAULT_CLASS = 'ember-tabs__tab-list';

export interface AriaTabListSignature {
  Args: {
    disabledTabClassName?: string;
    focus?: boolean;
    panelIds?: string[];
    selectedTabClassName?: string;
    selectedIndex?: number | null;
    tabIds?: string[];
    didInsertNode?: (elementId: string, element: HTMLLIElement) => void;
    willDestroyNode?: (elementId: string, element: HTMLLIElement) => void;
    onClick?: (index: number, event: Event) => void;
    onKeyUp?: (index: number, event: KeyboardEvent) => void;
  };

  Blocks: {
    default: [
      {
        tab: WithBoundArgs<
          typeof AriaTab,
          | 'didInsertNode'
          | 'disabledTabClassName'
          | 'focus'
          | 'onClick'
          | 'onKeyUp'
          | 'panelIds'
          | 'selectedTabClassName'
          | 'selectedIndex'
          | 'tabIds'
          | 'willDestroyNode'
        >;
      },
    ];
  };

  Element: HTMLUListElement;
}

/**
 * List of all tabs component rendered as `<ul />` .
 *
 * If you specify additional props on the `<AriaTabList />` component they will be forwarded to the rendered `<ul />`.
 *
 * Default CSS class: `ember-tabs__tab-list`
 *
 * @class AriaTabList
 * @public
 */
export default class AriaTabList extends Component<AriaTabListSignature> {
  className = DEFAULT_CLASS;

  <template>
    <ul class={{this.className}} role="tablist" ...attributes>
      {{yield
        (hash
          tab=(component
            AriaTab
            didInsertNode=@didInsertNode
            disabledTabClassName=@disabledTabClassName
            focus=@focus
            onClick=@onClick
            onKeyUp=@onKeyUp
            panelIds=@panelIds
            selectedTabClassName=@selectedTabClassName
            selectedIndex=@selectedIndex
            tabIds=@tabIds
            willDestroyNode=@willDestroyNode
          )
        )
      }}
    </ul>
  </template>
}
