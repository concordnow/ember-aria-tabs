import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, setupOnerror } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | aria-tab', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with sane default', async function(assert) {
    await render(hbs`<AriaTab />`);

    let tab = this.element.querySelector('[role="tab"]');
    assert.equal(tab.textContent.trim(), '');
  });

  test('it renders with class', async function(assert) {
    await render(hbs`<AriaTab class="foobar">Hello</AriaTab>`);

    let tab = this.element.querySelector('[role="tab"]');
    assert.equal(tab.classList.contains('foobar'), true);
  });

  test('it support being selected', async function(assert) {
    await render(hbs`
      <AriaTab id="abcd" @selected={{true}} @panelId="1234">
        Hello
      </AriaTab>
    `);
    let tab = this.element.querySelector('[role="tab"]');
    assert.equal(tab.id, 'abcd');
    assert.equal(tab.textContent.trim(), 'Hello');
    assert.equal(tab.getAttribute('aria-selected'), 'true');
  });

  test('it support being selected with custom class name', async function(assert) {
    await render(hbs`<AriaTab @selected={{true}} @selectedClassName="cool" />`);

    let tab = this.element.querySelector('[role="tab"]');
    assert.equal(tab.classList.contains('cool'), true);
  });

  test('it support being disabled', async function(assert) {
    await render(hbs`<AriaTab @disabled={{true}} />`);

    let tab = this.element.querySelector('[role="tab"]');
    assert.equal(tab.getAttribute('aria-disabled'), 'true');
  });

  test('it support being disabled with custom class name', async function(assert) {
    await render(hbs`<AriaTab @disabled={{true}} @disabledClassName="coolDisabled" />`);

    let tab = this.element.querySelector('[role="tab"]');
    assert.equal(tab.classList.contains('coolDisabled'), true);
  });

  test('it pass through custom properties', async function(assert) {
    await render(hbs`<AriaTab data-tooltip="Tooltip contents" />`);

    let tab = this.element.querySelector('[role="tab"]');
    assert.equal(tab.getAttribute('data-tooltip'), 'Tooltip contents');
  });

  test('it does not allow overriding all default properties', async function(assert) {
    setupOnerror(function(err) {
      assert.ok(err);
    });

    await render(hbs`<AriaTab @role="micro-tab" />`);
  });

  test('it override the tabIndex if it was provided', async function(assert) {
    await render(hbs`<AriaTab @tabIndex="0" />`);

    let tab = this.element.querySelector('[role="tab"]');
    assert.equal(tab.tabIndex, '0');
  });
});
