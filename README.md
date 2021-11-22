ember-aria-tabs
==============================================================================

[![Build Status](https://github.com/concordnow/ember-aria-tabs/actions/workflows/main.yml/badge.svg?branch=master)](https://github.com/concordnow/ember-aria-tabs/actions/workflows/main.yml)
[![Ember Observer Score](https://emberobserver.com/badges/ember-aria-tabs.svg)](https://emberobserver.com/addons/ember-aria-tabs)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/concordnow/ember-aria-tabs)

An accessible and easy tab component for EmberJS. Documentation can be found [here](https://concordnow.github.io/ember-aria-tabs/)

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above
* ember-auto-import >= 2


Installation
------------------------------------------------------------------------------

```
ember install ember-aria-tabs
```


Usage
------------------------------------------------------------------------------

Here is a basic example:

```hbs
<AriaTabs as |at|>
  <at.tabList as |tl|>
    <tl.tab>Title 1</tl.tab>
    <tl.tab>Title 2</tl.tab>
  </at.tabList>
  <at.tabPanel>
    <h2>Any content 1</h2>
  </at.tabPanel>
  <at.tabPanel>
    <h2>Any content 2</h2>
  </at.tabPanel>
</AriaTabs>

```

You can find more examples [here](https://concordnow.github.io/ember-aria-tabs/#/docs/examples).


Thanks
------------------------------------------------------------------------------

* [react-tabs](https://github.com/reactjs/react-tabs)


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
