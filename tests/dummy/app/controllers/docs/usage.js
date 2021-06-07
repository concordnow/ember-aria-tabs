import Controller from '@ember/controller';

export default class DocsUsageController extends Controller {
  uncontrolledMode = `
<AriaTabs @defaultIndex={{1}} @onSelect={{action onSelect}} as |at|>
  <at.tabList as |tl|>
    <tl.tab>Title 1</tl.tab>
    <tl.tab>Title 2</tl.tab>
  </at.tabList>
  <at.tabPanel></at.tabPanel>
  <at.tabPanel></at.tabPanel>
</AriaTabs>
`;
  controlledMode = `
<AriaTabs @selectedIndex={{this.tabIndex}} @onSelect={{action (mut this.tabIndex)}} as |at|>
  <at.tabList as |tl|>
    <tl.tab>Title 1</tl.tab>
    <tl.tab>Title 2</tl.tab>
  </at.tabList>
  <at.tabPanel></at.tabPanel>
  <at.tabPanel></at.tabPanel>
</AriaTabs>
`;
}
