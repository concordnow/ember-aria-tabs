// Easily allow apps, which are not yet using strict mode templates, to consume your Glint types, by importing this file.
// Add all your components, helpers and modifiers to the template registry here, so apps don't have to do this.
// See https://typed-ember.gitbook.io/glint/environments/ember/authoring-addons

// import type MyComponent from './components/my-component';

import AriaTabs from './components/aria-tabs.gts';
import AriaTabPanel from './components/aria-tab-panel.gts';
import AriaTabList from './components/aria-tab-list.gts';
import AriaTab from './components/aria-tab.gts';

export default interface EmberAriaTabsRegistry {
  AriaTabs: typeof AriaTabs;
  AriaTabPanel: typeof AriaTabPanel;
  AriaTabList: typeof AriaTabList;
  AriaTab: typeof AriaTab;
}
