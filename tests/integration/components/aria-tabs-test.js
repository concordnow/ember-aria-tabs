import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, click, render, focus, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function createTabs() {
  return render(hbs`
      <AriaTabs as |at|>
        <at.tabList as |tl|>
          <tl.tab>Foo</tl.tab>
          <tl.tab>Bar</tl.tab>
          <tl.tab>
            <a href="a">Baz</a>
          </tl.tab>
          <tl.tab @disabled={{true}}>Qux</tl.tab>
        </at.tabList>
        <at.tabPanel>Hello Foo</at.tabPanel>
        <at.tabPanel>Hello Bar</at.tabPanel>
        <at.tabPanel>Hello Baz</at.tabPanel>
        <at.tabPanel>Hello Qux</at.tabPanel>
      </AriaTabs>
    `);
}

function assertTabSelected(assert, index) {
  const tab = findAll('[role="tab"]')[index];
  const panel = findAll('[role="tabpanel"]')[index];

  assert.equal(tab.getAttribute('aria-selected'), 'true');
  assert.notEqual(panel.textContent, '');
}

module('Integration | Component | aria-tabs', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with sane default', async function(assert) {
    await createTabs();

    let tabList = findAll('[role="tablist"]');
    let tabs = findAll('[role="tab"]');
    let tabPanels = findAll('[role="tabpanel"]');
    let disabledTab = findAll('[role="tab"][aria-disabled="true"]');
    assert.equal(tabList.length, 1);
    assert.equal(tabs.length, 4);
    assert.equal(tabPanels.length, 4);
    assert.equal(disabledTab.length, 1);
    assert.equal(disabledTab[0].textContent.trim(), 'Qux');

    assert.equal(tabPanels[0].textContent.trim(), 'Hello Foo');
    assert.equal(tabPanels[1].textContent.trim(), '');
    assert.equal(tabPanels[2].textContent.trim(), '');
    assert.equal(tabPanels[3].textContent.trim(), '');
  }),

  test('it renders with positive defaultIndex prop', async function(assert) {
    await render(hbs`
      <AriaTabs @defaultIndex={{1}} as |at|>
        <at.tabList as |tl|>
          <tl.tab>Foo</tl.tab>
          <tl.tab>Bar</tl.tab>
          <tl.tab>
            <a href="a">Baz</a>
          </tl.tab>
          <tl.tab @disabled={{true}}>Qux</tl.tab>
        </at.tabList>
        <at.tabPanel>Hello Foo</at.tabPanel>
        <at.tabPanel>Hello Bar</at.tabPanel>
        <at.tabPanel>Hello Baz</at.tabPanel>
        <at.tabPanel>Hello Qux</at.tabPanel>
      </AriaTabs>
    `);

    let selectedTab = findAll('[role="tab"][aria-selected="true"]');
    let tabPanels = findAll('[role="tabpanel"]');

    assert.equal(selectedTab.length, 1);
    assert.equal(selectedTab[0].textContent, 'Bar');
    assert.equal(tabPanels[0].textContent.trim(), '');
    assert.equal(tabPanels[1].textContent.trim(), 'Hello Bar');
    assert.equal(tabPanels[2].textContent.trim(), '');
    assert.equal(tabPanels[3].textContent.trim(), '');
  });

  test('it renders with negative defaultIndex prop', async function(assert) {
    await render(hbs`
      <AriaTabs @defaultIndex={{-1}} as |at|>
        <at.tabList as |tl|>
          <tl.tab>Foo</tl.tab>
          <tl.tab>Bar</tl.tab>
          <tl.tab>
            <a href="a">Baz</a>
          </tl.tab>
          <tl.tab @disabled={{true}}>Qux</tl.tab>
        </at.tabList>
        <at.tabPanel>Hello Foo</at.tabPanel>
        <at.tabPanel>Hello Bar</at.tabPanel>
        <at.tabPanel>Hello Baz</at.tabPanel>
        <at.tabPanel>Hello Qux</at.tabPanel>
      </AriaTabs>
    `);

    let selectedTab = findAll('[role="tab"][aria-selected="true"]');
    let tabPanels = findAll('[role="tabpanel"]');

    assert.equal(selectedTab.length, 0);

    assert.equal(tabPanels[0].textContent.trim(), '');
    assert.equal(tabPanels[1].textContent.trim(), '');
    assert.equal(tabPanels[2].textContent.trim(), '');
    assert.equal(tabPanels[3].textContent.trim(), '');
  });

  test('it calls onSelect when selection changes', async function(assert) {
    let called = { index: -1, last: -1 };
    this.set('onSelect', (index, last) => {
      called.index = index;
      called.last = last;
    });

    await render(hbs`
      <AriaTabs @onSelect={{action onSelect}} as |at|>
        <at.tabList as |tl|>
          <tl.tab>Foo</tl.tab>
          <tl.tab>Bar</tl.tab>
          <tl.tab>
            <a href="a">Baz</a>
          </tl.tab>
          <tl.tab @disabled={{true}}>Qux</tl.tab>
        </at.tabList>
        <at.tabPanel>Hello Foo</at.tabPanel>
        <at.tabPanel>Hello Bar</at.tabPanel>
        <at.tabPanel>Hello Baz</at.tabPanel>
        <at.tabPanel>Hello Qux</at.tabPanel>
      </AriaTabs>
    `);

    await click(findAll('[role="tab"]')[1]);

    assert.equal(called.index, 1);
    assert.equal(called.last, 0);
  });

  test('it renders with class names', async function(assert) {
    await render(hbs`
      <AriaTabs class="foobar" as |at|>
        <at.tabList as |tl|>
          <tl.tab>Foo</tl.tab>
          <tl.tab>Bar</tl.tab>
          <tl.tab>
            <a href="a">Baz</a>
          </tl.tab>
          <tl.tab @disabled={{true}}>Qux</tl.tab>
        </at.tabList>
        <at.tabPanel>Hello Foo</at.tabPanel>
        <at.tabPanel>Hello Bar</at.tabPanel>
        <at.tabPanel>Hello Baz</at.tabPanel>
        <at.tabPanel>Hello Qux</at.tabPanel>
      </AriaTabs>
    `);

    assert.equal(this.element.children[0].classList.contains('foobar'), true);
  });


  test('it updates selectedIndex when clicked', async function(assert) {
    await createTabs();

    await click(findAll('[role="tab"]')[1]);

    assertTabSelected(assert, 1);
  });

  test('it updates selectedIndex when tab child is clicked', async function(assert) {
    await render(hbs`
      <AriaTabs as |at|>
        <at.tabList as |tl|>
          <tl.tab>Foo</tl.tab>
          <tl.tab>Bar</tl.tab>
          <tl.tab>
            <button class="foobar">Baz</button>
          </tl.tab>
          <tl.tab @disabled={{true}}>Qux</tl.tab>
        </at.tabList>
        <at.tabPanel>Hello Foo</at.tabPanel>
        <at.tabPanel>Hello Bar</at.tabPanel>
        <at.tabPanel>Hello Baz</at.tabPanel>
        <at.tabPanel>Hello Qux</at.tabPanel>
      </AriaTabs>
    `);

    await click('.foobar');

    assertTabSelected(assert, 2);
  });

  test('it does not change selectedIndex when clicking a disabled tab', async function(assert) {
    await createTabs();

    await click(findAll('[role="tab"]')[3]);

    assertTabSelected(assert, 0);
  });

  test('it updates selectedIndex when arrow right key pressed', async function(assert) {
    await createTabs();

    let target = findAll('[role="tab"]')[1];

    await click(target);
    await focus(target);
    await triggerKeyEvent(target, 'keydown', 'ArrowRight');

    assertTabSelected(assert, 2);
  });

  test('it does not not change selectedIndex when arrow left key pressed on a disabled tab', async function(assert) {
    await createTabs();

    let target = findAll('[role="tab"]')[0];

    await click(target);
    await focus(target);
    await triggerKeyEvent(target, 'keydown', 'ArrowLeft');

    assertTabSelected(assert, 2);
  });

  test('it only renders the selected tab', async function(assert) {
    await createTabs();

    let tabPanels = findAll('[role="tabpanel"]');
    assert.equal(tabPanels[0].textContent.trim(), 'Hello Foo');
    assert.equal(tabPanels[1].textContent.trim(), '');
    assert.equal(tabPanels[2].textContent.trim(), '');

    await click(findAll('[role="tab"]')[1]);

    assert.equal(tabPanels[0].textContent.trim(), '');
    assert.equal(tabPanels[1].textContent.trim(), 'Hello Bar');
    assert.equal(tabPanels[2].textContent.trim(), '');

    await click(findAll('[role="tab"]')[2]);

    assert.equal(tabPanels[0].textContent.trim(), '');
    assert.equal(tabPanels[1].textContent.trim(), '');
    assert.equal(tabPanels[2].textContent.trim(), 'Hello Baz');
  });

  test('it renders all tabs if forceRenderTabPanel is true', async function(assert) {
    await render(hbs`
      <AriaTabs @forceRenderTabPanel={{true}} as |at|>
        <at.tabList as |tl|>
          <tl.tab>Foo</tl.tab>
          <tl.tab>Bar</tl.tab>
          <tl.tab>
            <a href="a">Baz</a>
          </tl.tab>
          <tl.tab @disabled={{true}}>Qux</tl.tab>
        </at.tabList>
        <at.tabPanel>Hello Foo</at.tabPanel>
        <at.tabPanel>Hello Bar</at.tabPanel>
        <at.tabPanel>Hello Baz</at.tabPanel>
        <at.tabPanel>Hello Qux</at.tabPanel>
      </AriaTabs>
    `);

    let tabPanels = findAll('[role="tabpanel"]');
    assert.equal(tabPanels[0].textContent.trim(), 'Hello Foo');
    assert.equal(tabPanels[1].textContent.trim(), 'Hello Bar');
    assert.equal(tabPanels[2].textContent.trim(), 'Hello Baz');
    assert.equal(tabPanels[3].textContent.trim(), 'Hello Qux');
  });

  test('it renders all tabs if forceRenderTabPanel is true', async function(assert) {
    await render(hbs`
      <AriaTabs @forceRenderTabPanel={{true}} as |at|>
        <at.tabList as |tl|>
          <tl.tab>Foo</tl.tab>
          <tl.tab>Bar</tl.tab>
          <tl.tab>
            <a href="a">Baz</a>
          </tl.tab>
          <tl.tab @disabled={{true}}>Qux</tl.tab>
        </at.tabList>
        <at.tabPanel>Hello Foo</at.tabPanel>
        <at.tabPanel>Hello Bar</at.tabPanel>
        <at.tabPanel>Hello Baz</at.tabPanel>
        <at.tabPanel>Hello Qux</at.tabPanel>
      </AriaTabs>
    `);

    let tabPanels = findAll('[role="tabpanel"]');
    assert.equal(tabPanels[0].textContent.trim(), 'Hello Foo');
    assert.equal(tabPanels[1].textContent.trim(), 'Hello Bar');
    assert.equal(tabPanels[2].textContent.trim(), 'Hello Baz');
    assert.equal(tabPanels[3].textContent.trim(), 'Hello Qux');
  });

  test('it renders without children', async function(assert) {
    await render(hbs`<AriaTabs />`);
    assert.equal(this.element.textContent.trim(), '');
  });

  test('it renders with just tabList', async function(assert) {
    await render(hbs`
      <AriaTabs as |at|>
        <at.tabList />
      </AriaTabs>
    `);
    assert.equal(this.element.textContent.trim(), '');
  });

  test('it renders conditionally', async function(assert) {
    await render(hbs`
      <AriaTabs as |at|>
        <at.tabList as |tl|>
          <tl.tab>Foo</tl.tab>
          {{#if false}}
            <tl.tab>Bar</tl.tab>
          {{/if}}
        </at.tabList>
        <at.tabPanel>Hello Foo</at.tabPanel>
        {{#if false}}
          <at.tabPanel>Hello Bar</at.tabPanel>
        {{/if}}
      </AriaTabs>
    `);

    let tabs = findAll('[role="tab"]');
    let tabPanels = findAll('[role="tabpanel"]');
    assert.equal(tabs.length, 1);
    assert.equal(tabPanels.length, 1);
  });

  test('it supports nested tabs', async function(assert) {
    await render(hbs`
      <AriaTabs class="first" as |at|>
        <at.tabList as |tl|>
          <tl.tab>Foo</tl.tab>
          <tl.tab>Bar</tl.tab>
        </at.tabList>
        <at.tabPanel>
          <AriaTabs class="second" as |at2|>
            <at2.tabList as |tl2|>
              <tl2.tab />
              <tl2.tab />
            </at2.tabList>
            <at2.tabPanel />
            <at2.tabPanel />
          </AriaTabs>
        </at.tabPanel>
        <at.tabPanel />
      </AriaTabs>
    `);

    await click(findAll('.second > [role="tablist"] > [role="tab"]')[1]);

    const tab = findAll('.first > [role="tablist"] > [role="tab"]')[0];
    assert.equal(tab.getAttribute('aria-selected'), 'true');

    const tab2 = findAll('.second > [role="tablist"] > [role="tab"]')[1];
    assert.equal(tab2.getAttribute('aria-selected'), 'true');
  });

  test('it allows other DOM nodes', async function(assert) {
    await render(hbs`
      <AriaTabs as |at|>
        <div id="tabs-nav-wrapper">
          <button type="button">Left</button>
          <div class="tabs-container">
            <at.tabList as |tl|>
              <tl.tab />
              <tl.tab />
            </at.tabList>
          </div>
          <button type="button">Right</button>
        </div>
        <div class="tab-panels">
          <at.tabPanel />
          <at.tabPanel />
        </div>
      </AriaTabs>
    `);

    const buttons = findAll('#tabs-nav-wrapper button');
    assert.equal(buttons.length, 2);
    assert.equal(buttons[0].textContent, 'Left');
    assert.equal(buttons[1].textContent, 'Right');

    let tabList = findAll('.tabs-container [role="tablist"]');
    let tabs = findAll('.tabs-container [role="tab"]');
    let tabPanels = findAll('.tab-panels [role="tabpanel"]');
    assert.equal(tabList.length, 1);
    assert.equal(tabs.length, 2);
    assert.equal(tabPanels.length, 2);
  });

  test('it cancels if event handler returns false', async function(assert) {
    this.set('onSelect', () => false);

    await render(hbs`
      <AriaTabs @onSelect={{action onSelect}} as |at|>
        <at.tabList as |tl|>
          <tl.tab>Foo</tl.tab>
          <tl.tab>Bar</tl.tab>
          <tl.tab>
            <a href="a">Baz</a>
          </tl.tab>
          <tl.tab @disabled={{true}}>Qux</tl.tab>
        </at.tabList>
        <at.tabPanel>Hello Foo</at.tabPanel>
        <at.tabPanel>Hello Bar</at.tabPanel>
        <at.tabPanel>Hello Baz</at.tabPanel>
        <at.tabPanel>Hello Qux</at.tabPanel>
      </AriaTabs>
    `);

    assertTabSelected(assert, 0);

    await click(findAll('[role="tab"]')[1]);

    assertTabSelected(assert, 0);

    await click(findAll('[role="tab"]')[2]);

    assertTabSelected(assert, 0);
  });

  test('it trigger onSelect handler when clicking', async function(assert) {
    let wasClicked = false;
    this.set('onSelect', () => {
      wasClicked = true;
    });

    await render(hbs`
      <AriaTabs @onSelect={{action onSelect}} as |at|>
        <at.tabList as |tl|>
          <tl.tab>Foo</tl.tab>
          <tl.tab>Bar</tl.tab>
          <tl.tab>
            <a href="a">Baz</a>
          </tl.tab>
          <tl.tab @disabled={{true}}>Qux</tl.tab>
        </at.tabList>
        <at.tabPanel>Hello Foo</at.tabPanel>
        <at.tabPanel>Hello Bar</at.tabPanel>
        <at.tabPanel>Hello Baz</at.tabPanel>
        <at.tabPanel>Hello Qux</at.tabPanel>
      </AriaTabs>
    `);

    assertTabSelected(assert, 0);

    await click(findAll('[role="tab"]')[1]);

    assertTabSelected(assert, 1);

    assert.equal(wasClicked, true);
  });

  test('it trigger onSelect handler when clicking on open tab', async function(assert) {
    let wasClicked = false;
    this.set('onSelect', () => {
      wasClicked = true;
    });

    await render(hbs`
      <AriaTabs @onSelect={{action onSelect}} as |at|>
        <at.tabList as |tl|>
          <tl.tab>Foo</tl.tab>
          <tl.tab>Bar</tl.tab>
          <tl.tab>
            <a href="a">Baz</a>
          </tl.tab>
          <tl.tab @disabled={{true}}>Qux</tl.tab>
        </at.tabList>
        <at.tabPanel>Hello Foo</at.tabPanel>
        <at.tabPanel>Hello Bar</at.tabPanel>
        <at.tabPanel>Hello Baz</at.tabPanel>
        <at.tabPanel>Hello Qux</at.tabPanel>
      </AriaTabs>
    `);

    assertTabSelected(assert, 0);

    await click(findAll('[role="tab"]')[0]);

    assertTabSelected(assert, 0);

    assert.equal(wasClicked, true);
  });
});
