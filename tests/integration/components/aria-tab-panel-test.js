import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | aria-tab-panel', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with sane defaults', async function (assert) {
    await render(hbs`<AriaTabPanel>Hola</AriaTabPanel>`);

    assert.dom(this.element).hasText('');
  });

  test('it renders when selected', async function (assert) {
    this.set('panelIds', ['myId']);
    await render(
      hbs`<AriaTabPanel id="myId" @selectedIndex={{0}} @panelIds={{panelIds}}>Hola</AriaTabPanel>`
    );

    assert.dom(this.element).hasText('Hola');
  });

  test('it renders when forced', async function (assert) {
    await render(hbs`<AriaTabPanel @forceRender={{true}}>Hola</AriaTabPanel>`);

    assert.dom(this.element).hasText('Hola');
  });

  test('it renders with class', async function (assert) {
    await render(hbs`<AriaTabPanel class="foobar" />`);

    assert.dom('[role="tabpanel"]').hasClass('foobar');
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

    assert
      .dom('[role="tabpanel"]')
      .hasAttribute('aria-labelledby', '1234')
      .hasClass('selected');
  });

  test('it should pass through custom properties', async function (assert) {
    await render(hbs`<AriaTabPanel data-tooltip="Tooltip contents" />`);

    assert
      .dom('[role="tabpanel"]')
      .hasAttribute('data-tooltip', 'Tooltip contents');
  });
});
