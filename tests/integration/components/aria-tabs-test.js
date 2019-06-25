import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | tabs', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      {{#aria-tabs data-test="tabs" as |t|}}
        {{#t.tab data-test="tab-one"}}tab one{{/t.tab}}
        {{#t.panel data-test="panel-one"}}panel one{{/t.panel}}
        {{#t.tab data-test="tab-two"}}tab two{{/t.tab}}
        {{#t.panel data-test="panel-two"}}panel two{{/t.panel}}
      {{/aria-tabs}}
    `);

    // Because 'this.element' is not the component properly speaking
    // aria-tabs is wrapped inside a div
    let tabsContainer = this.element.querySelector('div[data-test="tabs"]');
    assert.equal(tabsContainer.childElementCount, 4);

    let elementTextContent = tabsContainer.textContent.replace(/\n|\r|\s|\t/g, '');
    assert.equal(elementTextContent, 'tabonepanelonetabtwopaneltwo');
  });

  test('it sets tabs and panel attibutes', async function(assert) {
    await render(hbs`
      {{#aria-tabs data-test="tabs" as |t|}}
        {{#t.tab data-test="tab-one"}}tab one{{/t.tab}}
        {{#t.panel data-test="panel-one"}}panel one{{/t.panel}}
        {{#t.tab data-test="tab-two"}}tab two{{/t.tab}}
        {{#t.panel data-test="panel-two"}}panel two{{/t.panel}}
      {{/aria-tabs}}
    `);

    // Because 'this.element' is not the component properly speaking
    // aria-tabs is wrapped inside a div
    let tabsContainer = this.element.querySelector('div[data-test="tabs"]');

    let tabOne = tabsContainer.querySelector('div[data-test="tab-one"]');
    let tabTwo = tabsContainer.querySelector('div[data-test="tab-two"]');
    let panelOne = tabsContainer.querySelector('div[data-test="panel-one"]');
    let panelTwo = tabsContainer.querySelector('div[data-test="panel-two"]');

    assert.equal(tabOne.getAttribute('aria-controls'), panelOne.getAttribute('id'));
    assert.equal(panelOne.getAttribute('aria-labelledby'), tabOne.getAttribute('id'));

    assert.equal(tabTwo.getAttribute('aria-controls'), panelTwo.getAttribute('id'));
    assert.equal(panelTwo.getAttribute('aria-labelledby'), tabTwo.getAttribute('id'));
  });

  test('it updates on click', async function(assert) {
    await render(hbs`
      {{#aria-tabs data-test="tabs" as |t|}}
        {{#t.tab data-test="tab-one"}}tab one{{/t.tab}}
        {{#t.panel data-test="panel-one"}}panel one{{/t.panel}}
        {{#t.tab data-test="tab-two"}}tab two{{/t.tab}}
        {{#t.panel data-test="panel-two"}}panel two{{/t.panel}}
      {{/aria-tabs}}
    `);

    // Because 'this.element' is not the component properly speaking
    // aria-tabs is wrapped inside a div
    let tabsContainer = this.element.querySelector('div[data-test="tabs"]');

    let tabOne = tabsContainer.querySelector('div[data-test="tab-one"]');
    let tabTwo = tabsContainer.querySelector('div[data-test="tab-two"]');
    let panelOne = tabsContainer.querySelector('div[data-test="panel-one"]');
    let panelTwo = tabsContainer.querySelector('div[data-test="panel-two"]');

    assert.equal(tabOne.getAttribute('selected'), '');
    assert.equal(tabOne.getAttribute('aria-selected'), '');
    assert.notEqual(tabOne.getAttribute('selected'), null);
    assert.notEqual(tabOne.getAttribute('aria-selected'), null);

    assert.equal(tabTwo.getAttribute('selected'), null);
    assert.equal(tabTwo.getAttribute('aria-selected'), null);
    assert.notEqual(tabTwo.getAttribute('selected'), '');
    assert.notEqual(tabTwo.getAttribute('aria-selected'), '');

    assert.equal(panelOne.getAttribute('hidden'), null);
    assert.notEqual(panelOne.getAttribute('hidden'), '');

    assert.equal(panelTwo.getAttribute('hidden'), '');
    assert.notEqual(panelTwo.getAttribute('hidden'), null);

    // Set second tab as active
    await click(tabTwo);

    assert.equal(tabOne.getAttribute('selected'), null);
    assert.equal(tabOne.getAttribute('aria-selected'), null);
    assert.notEqual(tabOne.getAttribute('selected'), '');
    assert.notEqual(tabOne.getAttribute('aria-selected'), '');

    assert.equal(tabTwo.getAttribute('selected'), '');
    assert.equal(tabTwo.getAttribute('aria-selected'), '');
    assert.notEqual(tabTwo.getAttribute('selected'), null);
    assert.notEqual(tabTwo.getAttribute('aria-selected'), null);

    assert.equal(panelOne.getAttribute('hidden'), '');
    assert.notEqual(panelOne.getAttribute('hidden'), null);

    assert.equal(panelTwo.getAttribute('hidden'), null);
    assert.notEqual(panelTwo.getAttribute('hidden'),  '');

    // Set first tab as active
    await click(tabOne);

    assert.equal(tabOne.getAttribute('selected'), '');
    assert.equal(tabOne.getAttribute('aria-selected'), '');
    assert.notEqual(tabOne.getAttribute('selected'), null);
    assert.notEqual(tabOne.getAttribute('aria-selected'), null);

    assert.equal(tabTwo.getAttribute('selected'), null);
    assert.equal(tabTwo.getAttribute('aria-selected'), null);
    assert.notEqual(tabTwo.getAttribute('selected'), '');
    assert.notEqual(tabTwo.getAttribute('aria-selected'), '');

    assert.equal(panelOne.getAttribute('hidden'), null);
    assert.notEqual(panelOne.getAttribute('hidden'), '');

    assert.equal(panelTwo.getAttribute('hidden'), '');
    assert.notEqual(panelTwo.getAttribute('hidden'), null);
  });
});
