import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import { computed, get, set } from '@ember/object';

export default Component.extend({
  classNameBindings: ['onSelectClassNames'],
  attributeBindings: ['isSelected:aria-selected', 'isSelected:selected', 'style', 'data-test', 'data-role', 'data-tab'],

  style: null,

  'data-role': 'heading',
  'data-tab': 'true',

  selectClassNames: '',
  unselectClassNames: '',

  selectedTabId: null,
  tabId: null,

  isSelected: computed('selectedTabId', 'tabId', function() {
    return get(this, 'selectedTabId') === get(this, 'tabId');
  }),

  onSelectClassNames: computed('isSelected', 'selectClassNames', 'unselectClassNames', function() {
    return get(this, 'isSelected') ? get(this, 'selectClassNames') : get(this, 'unselectClassNames');
  }),

  init() {
    this._super(...arguments);

    let tabId = guidFor(this);
    set(this, 'tabId', tabId);
  },

  actionBeforeSelection: async function(func, tabId) {
    await func();

    this.attrs.onTabClick(tabId);
  },

  click() {
    if (this.attrs.tabAction) {
      return this.actionBeforeSelection(this.attrs.tabAction, this.tabId);
    }

    this.attrs.onTabClick(this.tabId);
  }
});
