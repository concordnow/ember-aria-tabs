import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import { setProperties, get, set } from '@ember/object';

export default Component.extend({
  attributeBindings: ['style', 'data-test'],

  style: null,

  activeTabIndexOnRender: 0,
  selectedPanelId: null,
  selectedTabId: null,
  tabsId: null,

  init() {
    this._super(...arguments);

    let tabsId = guidFor(this);
    set(this, 'tabsId', tabsId);
  },

  didInsertElement() {
    this._super(...arguments);

    this.linkPanels();
    this.selectTab();
  },

  didUpdateAttrs() {
    let {
      tabId: selectedTabId
    } = get(this, 'panels')[this.activeTabIndexOnRender];

    this.selectTab(selectedTabId);
  },

  linkPanels() {
    let tabs = this.getAllTabs();
    let panels = [];

    tabs.forEach((tab) => {
      let panel = tab.nextElementSibling;
      if (!panel.getAttribute('data-panel')) {
        throw new Error(`Tab #${tab.id} is not a sibling of a div[data-panel]`);
      }

      let tabPanel = {
        tabId: tab.id,
        panelId: panel.id
      };

      panels.push(tabPanel);

      tab.setAttribute('aria-controls', panel.id);
      panel.setAttribute('aria-labelledby', tab.id);
    });

    set(this, 'panels', panels);
  },

  selectTab(tabId) {
    let selectedPanelId = this.panels[this.activeTabIndexOnRender].panelId;
    let selectedTabId = this.panels[this.activeTabIndexOnRender].tabId;

    if (tabId) {
      let selectedPanel = this.panels.find((obj) => obj.tabId === tabId);
      selectedTabId = selectedPanel.tabId;
      selectedPanelId = selectedPanel.panelId;
      this.activeTabIndexOnRender = this.panels.indexOf(selectedPanel);
    }

    let tab = document.getElementById(selectedTabId);
    let panel = document.getElementById(selectedPanelId);

    if (panel.id !== tab.getAttribute('aria-controls')) {
      throw new Error(`No panel with id ${tab.getAttribute('aria-controls')}`);
    }

    setProperties(this, {
      selectedPanelId,
      selectedTabId
    });

    tab.focus();
  },

  getAllTabs() {
    let tabsId = get(this, 'tabsId');
    let element = document.getElementById(tabsId);

    return Array.from(element.querySelectorAll(`#${tabsId} > div[data-tab]`));
  },

  actions: {
    onTabClick(tabId) {
      this.selectTab(tabId);
    }
  }
});
