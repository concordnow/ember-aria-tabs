import { module, test, todo } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';
import {
  findAll,
  click,
  render,
  focus,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { AriaTabs } from 'ember-aria-tabs';
import { on } from '@ember/modifier';
import { TrackedObject } from 'tracked-built-ins';
import percySnapshot from '@percy/ember';

function createTabs() {
  return render(
    <template>
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
    </template>,
  );
}

function assertTabSelected(assert: Assert, index: number) {
  const tab = findAll('[role="tab"]')[index];
  const panel = findAll('[role="tabpanel"]')[index];

  assert.dom(tab).hasAttribute('aria-selected', 'true');
  assert.dom(panel).hasAnyText();
}

module('Integration | Component | aria-tabs', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with sane default', async function (assert) {
    await createTabs();

    const tabList = findAll('[role="tablist"]');
    const tabs = findAll('[role="tab"]');
    const tabPanels = findAll('[role="tabpanel"]');
    const disabledTab = findAll('[role="tab"][aria-disabled="true"]');
    assert.strictEqual(tabList.length, 1);
    assert.strictEqual(tabs.length, 4);
    assert.strictEqual(tabPanels.length, 4);
    assert.strictEqual(disabledTab.length, 1);
    assert.dom(disabledTab[0]).hasText('Qux');

    assert.dom(tabPanels[0]).hasText('Hello Foo');
    assert.dom(tabPanels[1]).hasNoText();
    assert.dom(tabPanels[2]).hasNoText();
    assert.dom(tabPanels[3]).hasNoText();
  });

  test('it renders with positive defaultIndex prop', async function (assert) {
    await render(
      <template>
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
      </template>,
    );

    const selectedTab = findAll('[role="tab"][aria-selected="true"]');
    const tabPanels = findAll('[role="tabpanel"]');

    assert.strictEqual(selectedTab.length, 1);
    assert.dom(selectedTab[0]).hasText('Bar');
    assert.dom(tabPanels[0]).hasNoText();
    assert.dom(tabPanels[1]).hasText('Hello Bar');
    assert.dom(tabPanels[2]).hasNoText();
    assert.dom(tabPanels[3]).hasNoText();
  });

  test('it renders with negative defaultIndex prop', async function (assert) {
    await render(
      <template>
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
      </template>,
    );

    const selectedTab = findAll('[role="tab"][aria-selected="true"]');
    const tabPanels = findAll('[role="tabpanel"]');

    assert.strictEqual(selectedTab.length, 0);

    assert.dom(tabPanels[0]).hasNoText();
    assert.dom(tabPanels[1]).hasNoText();
    assert.dom(tabPanels[2]).hasNoText();
    assert.dom(tabPanels[3]).hasNoText();
  });

  test('it calls onSelect when selection changes', async function (assert) {
    const called = new TrackedObject<{
      index: number | null;
      last: number | null;
    }>({ index: -1, last: -1 });

    const onSelect = (index: number | null, last: number | null) => {
      called.index = index;
      called.last = last;
    };

    await render(
      <template>
        <AriaTabs @onSelect={{onSelect}} as |at|>
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
      </template>,
    );

    const tab = findAll('[role="tab"]')[1];
    if (tab) {
      await click(tab);
    }

    assert.strictEqual(called.index, 1);
    assert.strictEqual(called.last, 0);
  });

  test('it renders with class names', async function (assert) {
    await render(
      <template>
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
      </template>,
    );

    assert.dom('.ember-tabs').hasClass('foobar');
  });

  test('it updates selectedIndex when clicked', async function (assert) {
    assert.expect(2);
    await createTabs();

    const tab = findAll('[role="tab"]')[1];

    if (tab) {
      await click(tab);
    }

    assertTabSelected(assert, 1);
  });

  test('it updates selectedIndex when tab child is clicked', async function (assert) {
    assert.expect(2);
    await render(
      <template>
        <AriaTabs as |at|>
          <at.tabList as |tl|>
            <tl.tab>Foo</tl.tab>
            <tl.tab>Bar</tl.tab>
            <tl.tab>
              <button class="foobar" type="button">Baz</button>
            </tl.tab>
            <tl.tab @disabled={{true}}>Qux</tl.tab>
          </at.tabList>
          <at.tabPanel>Hello Foo</at.tabPanel>
          <at.tabPanel>Hello Bar</at.tabPanel>
          <at.tabPanel>Hello Baz</at.tabPanel>
          <at.tabPanel>Hello Qux</at.tabPanel>
        </AriaTabs>
      </template>,
    );

    await click('.foobar');

    assertTabSelected(assert, 2);
  });

  test('it yield selected state', async function (assert) {
    await render(
      <template>
        <AriaTabs @forceRenderTabPanel={{true}} as |at|>
          <at.tabList as |tl|>
            <tl.tab as |t|>Foo {{t.selected}}</tl.tab>
            <tl.tab as |t|>Bar {{t.selected}}</tl.tab>
            <tl.tab as |t|>Baz {{t.selected}}</tl.tab>
            <tl.tab @disabled={{true}} as |t|>Qux {{t.selected}}</tl.tab>
          </at.tabList>
          <at.tabPanel as |tp|>Hello Foo {{tp.selected}}</at.tabPanel>
          <at.tabPanel as |tp|>Hello Bar {{tp.selected}}</at.tabPanel>
          <at.tabPanel as |tp|>Hello Baz {{tp.selected}}</at.tabPanel>
          <at.tabPanel as |tp|>Hello Qux {{tp.selected}}</at.tabPanel>
        </AriaTabs>
      </template>,
    );

    const tabs = findAll('[role="tab"]');
    const panels = findAll('[role="tabpanel"]');

    assert.dom(tabs[0]).hasText('Foo true');
    assert.dom(tabs[1]).hasText('Bar false');
    assert.dom(tabs[2]).hasText('Baz false');
    assert.dom(tabs[3]).hasText('Qux false');

    assert.dom(panels[0]).hasText('Hello Foo true');
    assert.dom(panels[1]).hasText('Hello Bar false');
    assert.dom(panels[2]).hasText('Hello Baz false');
    assert.dom(panels[3]).hasText('Hello Qux false');

    const tabTwo = tabs[2];
    if (tabTwo) {
      await click(tabTwo);
    }

    assert.dom(tabs[0]).hasText('Foo false');
    assert.dom(tabs[1]).hasText('Bar false');
    assert.dom(tabs[2]).hasText('Baz true');
    assert.dom(tabs[3]).hasText('Qux false');

    assert.dom(panels[0]).hasText('Hello Foo false');
    assert.dom(panels[1]).hasText('Hello Bar false');
    assert.dom(panels[2]).hasText('Hello Baz true');
    assert.dom(panels[3]).hasText('Hello Qux false');
  });

  test('it changes the selected tab in controlled mode', async function (assert) {
    const context = new TrackedObject({
      tabIndex: 0,
    });

    const moveTab = (index: number) => {
      context.tabIndex = index;
    };

    assert.expect(10);

    await render(
      <template>
        <AriaTabs
          @selectedIndex={{context.tabIndex}}
          @onSelect={{moveTab}}
          as |at|
        >
          <at.tabList as |tl|>
            <tl.tab as |t|>Foo {{t.selected}}</tl.tab>
            <tl.tab as |t|>Bar {{t.selected}}</tl.tab>
          </at.tabList>
          <at.tabPanel as |tp|>Hello Foo {{tp.selected}}</at.tabPanel>
          <at.tabPanel as |tp|>Hello Bar {{tp.selected}}</at.tabPanel>
        </AriaTabs>
      </template>,
    );

    const tabs = findAll('[role="tab"]');
    const panels = findAll('[role="tabpanel"]');

    assertTabSelected(assert, 0);

    assert.dom(tabs[0]).hasText('Foo true');
    assert.dom(tabs[1]).hasText('Bar false');

    assert.dom(panels[0]).hasText('Hello Foo true');
    assert.dom(panels[1]).hasNoText();

    if (tabs[1]) {
      await click(tabs[1]);
    }
    assertTabSelected(assert, 1);

    assert.dom(panels[0]).hasNoText();
    assert.dom(panels[1]).hasText('Hello Bar true');
  });

  test('it does not change selectedIndex when clicking a disabled tab', async function (assert) {
    assert.expect(2);
    await createTabs();

    const tab = findAll('[role="tab"]')[3];

    if (tab) {
      await click(tab);
    }

    assertTabSelected(assert, 0);
  });

  test('it updates selectedIndex when arrow right key pressed', async function (assert) {
    assert.expect(2);
    await createTabs();

    const target = findAll('[role="tab"]')[1];

    if (target) {
      await click(target);
      await focus(target);
      await triggerKeyEvent(target, 'keyup', 'ArrowRight');
    }

    assertTabSelected(assert, 2);
  });

  todo(
    'it does not not change selectedIndex when arrow left key pressed on a disabled tab',
    async function (assert) {
      assert.expect(2);
      await createTabs();

      const target = findAll('[role="tab"]')[0];

      if (target) {
        await click(target);
        await focus(target);
        await triggerKeyEvent(target, 'keyup', 'ArrowLeft');
      }

      assertTabSelected(assert, 2);
    },
  );

  test('it only renders the selected tab', async function (assert) {
    await createTabs();

    const tabPanels = findAll('[role="tabpanel"]');
    assert.dom(tabPanels[0]).hasText('Hello Foo');
    assert.dom(tabPanels[1]).hasNoText();
    assert.dom(tabPanels[2]).hasNoText();

    const tabOne = findAll('[role="tab"]')[1];
    if (tabOne) {
      await click(tabOne);
    }

    assert.dom(tabPanels[0]).hasNoText();
    assert.dom(tabPanels[1]).hasText('Hello Bar');
    assert.dom(tabPanels[2]).hasNoText();

    const tabTwo = findAll('[role="tab"]')[2];
    if (tabTwo) {
      await click(tabTwo);
    }

    assert.dom(tabPanels[0]).hasNoText();
    assert.dom(tabPanels[1]).hasNoText();
    assert.dom(tabPanels[2]).hasText('Hello Baz');
  });

  test('it renders all tabs if forceRenderTabPanel is true', async function (assert) {
    await render(
      <template>
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
      </template>,
    );

    const tabPanels = findAll('[role="tabpanel"]');
    assert.dom(tabPanels[0]).hasText('Hello Foo');
    assert.dom(tabPanels[1]).hasText('Hello Bar');
    assert.dom(tabPanels[2]).hasText('Hello Baz');
    assert.dom(tabPanels[3]).hasText('Hello Qux');
  });

  test('it renders without children', async function (assert) {
    await render(<template><AriaTabs /></template>);
    assert.dom('.ember-tabs').hasNoText();
  });

  test('it renders with just tabList', async function (assert) {
    await render(
      <template>
        <AriaTabs as |at|>
          <at.tabList />
        </AriaTabs>
      </template>,
    );
    assert.dom('.ember-tabs').hasNoText();
  });

  test('it renders conditionally', async function (assert) {
    await render(
      <template>
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
      </template>,
    );

    const tabs = findAll('[role="tab"]');
    const tabPanels = findAll('[role="tabpanel"]');
    assert.strictEqual(tabs.length, 1);
    assert.strictEqual(tabPanels.length, 1);
  });

  test('it supports nested tabs', async function (assert) {
    await render(
      <template>
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
      </template>,
    );

    const secondTab = findAll('.second > [role="tablist"] > [role="tab"]')[1];
    if (secondTab) {
      await click(secondTab);
    }

    const tab = findAll('.first > [role="tablist"] > [role="tab"]')[0];
    assert.strictEqual(tab?.getAttribute('aria-selected'), 'true');

    const tab2 = findAll('.second > [role="tablist"] > [role="tab"]')[1];
    assert.strictEqual(tab2?.getAttribute('aria-selected'), 'true');
  });

  test('it allows other DOM nodes', async function (assert) {
    await render(
      <template>
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
      </template>,
    );

    const buttons = findAll('#tabs-nav-wrapper button');
    assert.strictEqual(buttons.length, 2);
    assert.dom(buttons[0]).hasText('Left');
    assert.dom(buttons[1]).hasText('Right');

    const tabList = findAll('.tabs-container [role="tablist"]');
    const tabs = findAll('.tabs-container [role="tab"]');
    const tabPanels = findAll('.tab-panels [role="tabpanel"]');
    assert.strictEqual(tabList.length, 1);
    assert.strictEqual(tabs.length, 2);
    assert.strictEqual(tabPanels.length, 2);
  });

  test('it cancels if event handler returns false', async function (assert) {
    assert.expect(6);
    const onSelect = () => false;

    await render(
      <template>
        <AriaTabs @onSelect={{onSelect}} as |at|>
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
      </template>,
    );

    assertTabSelected(assert, 0);

    const tab = findAll('[role="tab"]')[1];
    if (tab) {
      await click(tab);
    }

    assertTabSelected(assert, 0);

    const tabTwo = findAll('[role="tab"]')[2];
    if (tabTwo) {
      await click(tabTwo);
    }

    assertTabSelected(assert, 0);
  });

  test('it trigger onSelect handler when clicking', async function (assert) {
    assert.expect(5);

    let wasClicked = false;

    const onSelect = () => {
      wasClicked = true;
    };

    await render(
      <template>
        <AriaTabs @onSelect={{onSelect}} as |at|>
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
      </template>,
    );

    assertTabSelected(assert, 0);

    const tab = findAll('[role="tab"]')[1];
    if (tab) {
      await click(tab);
    }

    assertTabSelected(assert, 1);

    assert.true(wasClicked);
  });

  todo(
    'it trigger onSelect handler when clicking on open tab',
    async function (assert) {
      assert.expect(5);

      let wasClicked = false;
      const onSelect = () => {
        wasClicked = true;
      };

      await render(
        <template>
          <AriaTabs @onSelect={{onSelect}} as |at|>
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
        </template>,
      );

      assertTabSelected(assert, 0);

      const tab = findAll('[role="tab"]')[0];

      if (tab) {
        await click(tab);
      }

      assertTabSelected(assert, 0);

      assert.true(wasClicked);
    },
  );

  todo('it handles dynamic tabs', async function (assert) {
    const context = new TrackedObject({
      removed: false,
    });
    const removeTab = () => {
      context.removed = true;
    };

    await render(
      <template>
        <button data-test-remove-tab type="button" {{on "click" removeTab}}>
          Remove tab
        </button>

        <AriaTabs as |at|>
          <at.tabList as |tl|>
            {{#unless context.removed}}
              <tl.tab data-test-tab-foo>Foo</tl.tab>
            {{/unless}}
            <tl.tab>Bar</tl.tab>
            <tl.tab>Baz</tl.tab>
            <tl.tab @disabled={{true}}>Qux</tl.tab>
          </at.tabList>
          {{#unless context.removed}}
            <at.tabPanel data-test-panel-foo>Hello Foo</at.tabPanel>
          {{/unless}}
          <at.tabPanel data-test-panel-bar>Hello Bar</at.tabPanel>
          <at.tabPanel>Hello Baz</at.tabPanel>
          <at.tabPanel>Hello Qux</at.tabPanel>
        </AriaTabs>
      </template>,
    );

    assert.dom('[data-test-panel-foo]').isVisible();

    await click('[data-test-remove-tab]');

    assert.dom('[data-test-panel-foo]').isNotVisible();
    assert.dom('[data-test-panel-bar]').isVisible();
  });

  todo('it handles negative default index', async function (assert) {
    await render(
      <template>
        <AriaTabs as |at|>
          <at.tabList as |tl|>
            <tl.tab data-test-tab-foo>Foo</tl.tab>
            <tl.tab>Bar</tl.tab>
            <tl.tab>Baz</tl.tab>
            <tl.tab @disabled={{true}}>Qux</tl.tab>
          </at.tabList>
          <at.tabPanel data-test-panel-foo>Hello Foo</at.tabPanel>
          <at.tabPanel data-test-panel-bar>Hello Bar</at.tabPanel>
          <at.tabPanel>Hello Baz</at.tabPanel>
          <at.tabPanel>Hello Qux</at.tabPanel>
        </AriaTabs>
      </template>,
    );

    assert.dom('[data-test-panel-foo]').isNotVisible();

    await click('[data-test-tab-foo]');

    assert.dom('[data-test-panel-foo]').isVisible();
  });

  test('it handles complex layout', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <AriaTabs @forceRenderTabPanel={{true}} @defaultIndex={{1}} as |at|>
          <at.tabList as |tl|>
            <tl.tab>The Simpsons</tl.tab>
            <tl.tab>Futurama</tl.tab>
          </at.tabList>
          <at.tabPanel>
            <AriaTabs @forceRenderTabPanel={{true}} as |at2|>
              <at2.tabList as |tl2|>
                <tl2.tab>Homer Simpson</tl2.tab>
                <tl2.tab>Marge Simpson</tl2.tab>
                <tl2.tab>Bart Simpson</tl2.tab>
                <tl2.tab>Lisa Simpson</tl2.tab>
                <tl2.tab>Maggie Simpson</tl2.tab>
              </at2.tabList>
              <at2.tabPanel>
                <p>Husband of Marge; father of Bart, Lisa, and Maggie.</p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Homer_Simpson_2006.png/212px-Homer_Simpson_2006.png"
                  alt="Homer Simpson"
                />
              </at2.tabPanel>
              <at2.tabPanel>
                <p>Wife of Homer; mother of Bart, Lisa, and Maggie.</p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Marge_Simpson.png/220px-Marge_Simpson.png"
                  alt="Marge Simpson"
                />
              </at2.tabPanel>
              <at2.tabPanel>
                <p>Oldest child and only son of Homer and Marge; brother of Lisa
                  and Maggie.</p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png"
                  alt="Bart Simpson"
                />
              </at2.tabPanel>
              <at2.tabPanel>
                <p>Middle child and eldest daughter of Homer and Marge; sister
                  of Bart and Maggie.</p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Lisa_Simpson.png/200px-Lisa_Simpson.png"
                  alt="Lisa Simpson"
                />
              </at2.tabPanel>
              <at2.tabPanel>
                <p>Youngest child and daughter of Homer and Marge; sister of
                  Bart and Lisa.</p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Maggie_Simpson.png/223px-Maggie_Simpson.png"
                  alt="Maggie Simpson"
                />
              </at2.tabPanel>
            </AriaTabs>
          </at.tabPanel>
          <at.tabPanel>
            <AriaTabs @forceRenderTabPanel={{true}} as |at2|>
              <at2.tabList as |tl2|>
                <tl2.tab>Philip J. Fry</tl2.tab>
                <tl2.tab>Turanga Leela</tl2.tab>
                <tl2.tab>Bender Bending Rodriguez</tl2.tab>
                <tl2.tab>Amy Wong</tl2.tab>
                <tl2.tab>Professor Hubert J. Farnsworth</tl2.tab>
                <tl2.tab>Doctor John Zoidberg</tl2.tab>
              </at2.tabList>
              <at2.tabPanel>
                <p>Protagonist, from the 20th Century. Delivery boy. Many times
                  great-uncle to Professor Hubert Farnsworth. Suitor of Leela.</p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Philip_Fry.png/175px-Philip_Fry.png"
                  alt="Philip J. Fry"
                />
              </at2.tabPanel>
              <at2.tabPanel>
                <p>Mutant cyclops. Captain of the Planet Express Ship. Love
                  interest of Fry.</p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Turanga_Leela.png/150px-Turanga_Leela.png"
                  alt="Turanga Leela"
                />
              </at2.tabPanel>
              <at2.tabPanel>
                <p>A kleptomaniacal, lazy, cigar-smoking, heavy-drinking robot
                  who is Fry's best friend. Built in Tijuana, Mexico, he is the
                  Planet Express Ship's cook.</p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Bender_Rodriguez.png/220px-Bender_Rodriguez.png"
                  alt="Bender Bending Rodriguez"
                />
              </at2.tabPanel>
              <at2.tabPanel>
                <p>Chinese-Martian intern at Planet Express. Fonfon Ru of Kif
                  Kroker.</p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/FuturamaAmyWong.png/140px-FuturamaAmyWong.png"
                  alt="Amy Wong"
                />
              </at2.tabPanel>
              <at2.tabPanel>
                <p>Many times great-nephew of Fry. CEO and owner of Planet
                  Express delivery company. Tenured professor of Mars
                  University.</p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/FuturamaProfessorFarnsworth.png/175px-FuturamaProfessorFarnsworth.png"
                  alt="Professor Hubert J. Farnsworth"
                />
              </at2.tabPanel>
              <at2.tabPanel>
                <p>Alien from Decapod 10. Planet Express' staff doctor and
                  steward. Has a medical degree and Ph.D in art history.</p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Dr_John_Zoidberg.png/200px-Dr_John_Zoidberg.png"
                  alt="Doctor John Zoidberg"
                />
              </at2.tabPanel>
            </AriaTabs>
          </at.tabPanel>
        </AriaTabs>
      </template>,
    );

    await percySnapshot(assert);

    // Prevent 0 assertion exception
    assert.strictEqual(0, 0);
  });
});
