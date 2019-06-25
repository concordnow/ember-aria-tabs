import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import { computed, get, set } from '@ember/object';

export default Component.extend({
  classNameBindings: ['onSelectClassNames'],
  attributeBindings: ['isPanelHidden:hidden', 'style', 'data-test', 'data-role', 'data-panel'],

  style: null,

  'data-role': 'region',
  'data-panel': 'true',

  selectClassNames: '',
  unselectClassNames: '',

  selectedPanelId: null,
  panelId: null,

  isPanelVisible: computed.not('isPanelHidden'),
  isPanelHidden: computed('selectedPanelId', 'panelId', function() {
    return get(this, 'selectedPanelId') !== get(this, 'panelId');
  }),

  onSelectClassNames: computed('isPanelVisible', 'selectClassNames', 'unselectClassNames', function() {
    return get(this, 'isPanelVisible') ? get(this, 'selectClassNames') : get(this, 'unselectClassNames');
  }),

  init() {
    this._super(...arguments);

    let panelId = guidFor(this);
    set(this, 'panelId', panelId);
  }
});
