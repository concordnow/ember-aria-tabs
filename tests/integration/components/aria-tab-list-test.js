import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | aria-tab-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with sane default', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<AriaTabList />`);

    assert.dom('[role="tablist"]').hasText('');
  });

  test('it renders with the default class', async function (assert) {
    await render(hbs`<AriaTabList />`);

    assert.dom('[role="tablist"]').hasClass('ember-tabs__tab-list');
  });

  test('it renders with class', async function (assert) {
    await render(hbs`<AriaTabList class="foobar" />`);

    assert
      .dom('[role="tablist"]')
      .hasClass('foobar')
      .hasClass('ember-tabs__tab-list');
  });

  test('it pass through custom properties', async function (assert) {
    await render(hbs`<AriaTabList data-tooltip="Tooltip contents" />`);

    assert
      .dom('[role="tablist"]')
      .hasAttribute('data-tooltip', 'Tooltip contents');
  });

  test('it retains the default classnames for active and disabled tab', async function (assert) {
    await render(hbs`
      <AriaTabs @defaultIndex={{0}} as |at|>
        <at.tabList as |tl|>
          <tl.tab>Foo</tl.tab>
          <tl.tab @disabled={{true}}>Bar</tl.tab>
        </at.tabList>
        <at.tabPanel>Foo</at.tabPanel>
        <at.tabPanel>Bar</at.tabPanel>
      </AriaTabs>
    `);

    assert
      .dom('[role="tab"]:nth-child(2)')
      .hasClass('ember-tabs__tab--disabled');
  });

  test('it display the custom classnames for selected and disabled tab specified on tabs', async function (assert) {
    await render(hbs`
      <AriaTabs
        @defaultIndex={{0}}
        @selectedTabClassName="active"
        @disabledTabClassName="disabled"
      as |at|>
        <at.tabList as |tl|>
          <tl.tab>Foo</tl.tab>
          <tl.tab @disabled={{true}}>Bar</tl.tab>
        </at.tabList>
        <at.tabPanel>Foo</at.tabPanel>
        <at.tabPanel>Bar</at.tabPanel>
      </AriaTabs>
    `);

    assert.dom('[role="tab"]:nth-child(1)').hasClass('active');
    assert.dom('[role="tab"]:nth-child(2)').hasClass('disabled');
  });

  test('it display the custom classnames for selected and disabled tab', async function (assert) {
    await render(hbs`
      <AriaTabs @defaultIndex={{0}} as |at|>
        <at.tabList as |tl|>
          <tl.tab @selectedClassName="active" @disabledClassName="disabled">
            Foo
          </tl.tab>
          <tl.tab @disabled={{true}} @selectedClassName="active" @disabledClassName="disabled">
            Bar
          </tl.tab>
        </at.tabList>
        <at.tabPanel>Foo</at.tabPanel>
        <at.tabPanel>Bar</at.tabPanel>
      </AriaTabs>
    `);

    assert.dom('[role="tab"]:nth-child(1)').hasClass('active');
    assert.dom('[role="tab"]:nth-child(2)').hasClass('disabled');
  });
});
