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

    let tabList = this.element.querySelector('[role="tablist"]');
    assert.equal(tabList.textContent.trim(), '');
  });

  test('it renders with class', async function (assert) {
    await render(hbs`<AriaTabList class="foobar" />`);

    let tabList = this.element.querySelector('[role="tablist"]');
    assert.equal(tabList.classList.contains('foobar'), true);
  });

  test('it pass through custom properties', async function (assert) {
    await render(hbs`<AriaTabList data-tooltip="Tooltip contents" />`);

    let tabList = this.element.querySelector('[role="tablist"]');
    assert.equal(tabList.getAttribute('data-tooltip'), 'Tooltip contents');
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

    let tabs = this.element.querySelectorAll('[role="tab"]');
    // assert.equal(tabs[0].classList.contains('ember-tabs__tab--selected'), true);
    assert.equal(tabs[1].classList.contains('ember-tabs__tab--disabled'), true);
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

    let tabs = this.element.querySelectorAll('[role="tab"]');
    assert.equal(tabs[0].classList.contains('active'), true);
    assert.equal(tabs[1].classList.contains('disabled'), true);
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

    let tabs = this.element.querySelectorAll('[role="tab"]');
    assert.equal(tabs[0].classList.contains('active'), true);
    assert.equal(tabs[1].classList.contains('disabled'), true);
  });
});
