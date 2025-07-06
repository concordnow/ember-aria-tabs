import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { AriaTab } from 'ember-aria-tabs';

module('Integration | Component | aria-tab', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with sane default', async function (assert) {
    await render(<template><AriaTab /></template>);

    assert.dom('[role="tab"]').hasNoText();
  });

  test('it renders with class', async function (assert) {
    await render(
      <template>
        <AriaTab class="foobar">Hello</AriaTab>
      </template>,
    );

    assert.dom('[role="tab"]').hasClass('foobar');
  });

  test('it support being selected', async function (assert) {
    const tabIds = ['abcd'];

    await render(
      <template>
        <AriaTab id="abcd" @tabIds={{tabIds}} @selectedIndex={{0}}>
          Hello
        </AriaTab>
      </template>,
    );

    assert
      .dom('[role="tab"]')
      .hasAttribute('id', 'abcd')
      .hasAttribute('aria-selected', 'true')
      .hasText('Hello');
  });

  test('it support being selected with custom class name', async function (assert) {
    const tabIds = ['abcd'];
    await render(
      <template>
        <AriaTab
          id="abcd"
          @tabIds={{tabIds}}
          @selectedIndex={{0}}
          @selectedClassName="cool"
        />
      </template>,
    );

    assert.dom('[role="tab"]').hasClass('cool');
  });

  test('it support being disabled', async function (assert) {
    await render(<template><AriaTab @disabled={{true}} /></template>);

    assert.dom('[role="tab"]').hasAttribute('aria-disabled', 'true');
  });

  test('it support being disabled with custom class name', async function (assert) {
    await render(
      <template>
        <AriaTab @disabled={{true}} @disabledClassName="coolDisabled" />
      </template>,
    );

    assert.dom('[role="tab"]').hasClass('coolDisabled');
  });

  test('it pass through custom properties', async function (assert) {
    await render(
      <template><AriaTab data-tooltip="Tooltip contents" /></template>,
    );

    assert.dom('[role="tab"]').hasAttribute('data-tooltip', 'Tooltip contents');
  });

  test('it override the tabIndex if it was provided', async function (assert) {
    await render(<template><AriaTab @tabIndex="0" /></template>);

    assert.dom('[role="tab"]').hasAttribute('tabindex', '0');
  });
});
