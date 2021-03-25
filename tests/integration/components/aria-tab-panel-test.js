import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | aria-tab-panel', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with sane defaults', async function (assert) {
    await render(hbs`<AriaTabPanel>Hola</AriaTabPanel>`);

    assert.equal(this.element.textContent.trim(), '');
  });

  test('it renders when selected', async function (assert) {
    this.set('panelIds', ['myId']);
    await render(
      hbs`<AriaTabPanel id="myId" @selectedIndex={{0}} @panelIds={{panelIds}}>Hola</AriaTabPanel>`
    );

    assert.equal(this.element.textContent.trim(), 'Hola');
  });

  test('it renders when forced', async function (assert) {
    await render(hbs`<AriaTabPanel @forceRender={{true}}>Hola</AriaTabPanel>`);

    assert.equal(this.element.textContent.trim(), 'Hola');
  });

  test('it renders with class', async function (assert) {
    await render(hbs`<AriaTabPanel class="foobar" />`);

    let tabPanel = this.element.querySelector('[role="tabpanel"]');
    assert.equal(tabPanel.classList.contains('foobar'), true);
  });

  test('it supports being selected with custom class name', async function (assert) {
    this.set('panelIds', ['abcd']);
    await render(hbs`
      <AriaTabPanel
        id="abcd"
        @panelIds={{panelIds}}
        @selectedClassName="selected"
        @selectedIndex={{0}}
        @tabId="1234"
      >
        Hola
      </AriaTabPanel>
  `);

    let tabPanel = this.element.querySelector('[role="tabpanel"]');
    assert.equal(tabPanel.getAttribute('aria-labelledby'), '1234');
    assert.equal(tabPanel.classList.contains('selected'), true);
  });

  test('it should pass through custom properties', async function (assert) {
    await render(hbs`<AriaTabPanel data-tooltip="Tooltip contents" />`);

    let tab = this.element.querySelector('[role="tabpanel"]');
    assert.equal(tab.getAttribute('data-tooltip'), 'Tooltip contents');
  });
});
