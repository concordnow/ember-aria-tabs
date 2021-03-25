import Component from '@glimmer/component';

const DEFAULT_CLASS = 'ember-tabs__tab-list';

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
export default class AriaTabListComponent extends Component {
  className = DEFAULT_CLASS;
}
