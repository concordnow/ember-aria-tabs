import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { AriaTabPanel } from 'ember-aria-tabs';

module('Integration | Component | aria-tab-panel', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with sane defaults', async function (assert) {
    await render(
      <template>
        <AriaTabPanel data-test-aria-tab-panel>Hola</AriaTabPanel>
      </template>,
    );

    assert.dom('[data-test-aria-tab-panel]').hasNoText();
  });

  test('it renders when selected', async function (assert) {
    const panelIds = ['myId'];

    await render(
      <template>
        <AriaTabPanel
          id="myId"
          @selectedIndex={{0}}
          @panelIds={{panelIds}}
          data-test-aria-tab-panel
        >
          Hola
        </AriaTabPanel>
      </template>,
    );

    assert.dom('[data-test-aria-tab-panel]').hasText('Hola');
  });

  test('it renders when forced', async function (assert) {
    await render(
      <template>
        <AriaTabPanel @forceRender={{true}} data-test-aria-tab-panel>
          Hola
        </AriaTabPanel>
      </template>,
    );

    assert.dom('[data-test-aria-tab-panel]').hasText('Hola');
  });

  test('it renders with class', async function (assert) {
    await render(<template><AriaTabPanel class="foobar" /></template>);

    assert.dom('[role="tabpanel"]').hasClass('foobar');
  });

  test('it supports being selected with custom class name', async function (assert) {
    const panelIds = ['abcd'];
    await render(
      <template>
        <AriaTabPanel
          id="abcd"
          @panelIds={{panelIds}}
          @selectedClassName="selected"
          @selectedIndex={{0}}
          @tabId="1234"
        >
          Hola
        </AriaTabPanel>
      </template>,
    );
    // await this.pauseTest();
    assert
      .dom('[role="tabpanel"]')
      .hasAttribute('aria-labelledby', '1234')
      .hasClass('selected');
  });

  test('it should pass through custom properties', async function (assert) {
    await render(
      <template><AriaTabPanel data-tooltip="Tooltip contents" /></template>,
    );

    assert
      .dom('[role="tabpanel"]')
      .hasAttribute('data-tooltip', 'Tooltip contents');
  });
});
