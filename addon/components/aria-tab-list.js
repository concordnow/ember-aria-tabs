import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/aria-tab-list';

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
export default Component.extend({
  layout,
  tagName: 'ul',
  classNames: ['ember-tabs__tab-list'],
  attributeBindings: [
    'role'
  ],

  role: computed({
    get() {
      return 'tablist';
    }
  }).readOnly(),
});
