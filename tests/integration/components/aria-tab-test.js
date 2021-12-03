import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | aria-tab', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with sane default', async function (assert) {
    await render(hbs`<AriaTab />`);

    assert.dom('[role="tab"]').hasNoText();
  });

  test('it renders with class', async function (assert) {
    await render(hbs`<AriaTab class="foobar">Hello</AriaTab>`);

    assert.dom('[role="tab"]').hasClass('foobar');
  });

  test('it support being selected', async function (assert) {
    this.set('tabIds', ['abcd']);
    await render(hbs`
      <AriaTab id="abcd" @tabIds={{this.tabIds}} @selectedIndex={{0}}>
        Hello
      </AriaTab>
    `);
    assert
      .dom('[role="tab"]')
      .hasAttribute('id', 'abcd')
      .hasAttribute('aria-selected', 'true')
      .hasText('Hello');
  });

  test('it support being selected with custom class name', async function (assert) {
    this.set('tabIds', ['abcd']);
    await render(
      hbs`<AriaTab id="abcd" @tabIds={{this.tabIds}} @selectedIndex={{0}} @selectedClassName="cool" />`
    );

    assert.dom('[role="tab"]').hasClass('cool');
  });

  test('it support being disabled', async function (assert) {
    await render(hbs`<AriaTab @disabled={{true}} />`);

    assert.dom('[role="tab"]').hasAttribute('aria-disabled', 'true');
  });

  test('it support being disabled with custom class name', async function (assert) {
    await render(
      hbs`<AriaTab @disabled={{true}} @disabledClassName="coolDisabled" />`
    );

    assert.dom('[role="tab"]').hasClass('coolDisabled');
  });

  test('it pass through custom properties', async function (assert) {
    await render(hbs`<AriaTab data-tooltip="Tooltip contents" />`);

    assert.dom('[role="tab"]').hasAttribute('data-tooltip', 'Tooltip contents');
  });

  test('it override the tabIndex if it was provided', async function (assert) {
    await render(hbs`<AriaTab @tabIndex="0" />`);

    assert.dom('[role="tab"]').hasAttribute('tabindex', '0');
  });
});
