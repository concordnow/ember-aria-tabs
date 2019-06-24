ember-aria-tabs
==============================================================================

This addon is inspired by the _howto-tabs_ from the [howto-components](https://github.com/GoogleChromeLabs/howto-components) repository of _Goolge Chrome Labs_.

It is purposely made without any css at all.


Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```console
ember install ember-aria-tabs
```


Usage
------------------------------------------------------------------------------

Simple example with inline styles:

```hbs
{{#aria-tabs data-test="tabs" as |t|}}
  {{#t.tab
    class="defaultTabClassNames"
    selectClassNames="tabSelected"
    unselectClassNames="tabUnselected"
    data-test="tab-one"
  }}
    tab one
  {{/t.tab}}
  {{#t.panel
    class="defaultPanelClassNames"
    selectClassNames="panelSelected"
    unselecClassNames="panelUnselected"
    data-test="panel-one"
  }}
    panel one
  {{/t.panel}}
  {{#t.tab
    class="defaultTabClassNames"
    selectClassNames="tabSelected"
    unselectClassNames="tabUnselected"
    data-test="tab-two"
  }}
    tab two
  {{/t.tab}}
  {{#t.panel
    class="defaultPanelClassNames"
    selectClassNames="panelSelected"
    unselecClassNames="panelUnselected"
    data-test="panel-two"
  }}
    panel two
  {{/t.panel}}
  {{#t.tab
    class="defaultTabClassNames"
    selectClassNames="tabSelected"
    unselectClassNames="tabUnselected"
    data-test="tab-three"
  }}
    tab three
  {{/t.tab}}
  {{#t.panel
    class="defaultPanelClassNames"
    selectClassNames="panelSelected"
    unselecClassNames="panelUnselected"
    data-test="panel-three"
  }}
    panel three
  {{/t.panel}}
{{/aria-tabs}}
```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
