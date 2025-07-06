# Usage

## Compatibility

This addon is tested on **Ember.js v3.16** and above.

## Installation

```shell
ember install ember-aria-tabs
```

## Controlled vs Uncontrolled mode

ember-aria-tabs has two different modes it can operate in, which change the way how much you need to take care about the state yourself.

### Uncontrolled mode

This is the default mode of ember-aria-tabs and makes the ember-aria-tabs components handle its state internally. You can change the starting tab with `@defaultIndex` and you can listen for changes with `@onSelect`.

In this mode you cannot force a tab change during runtime.

```gjs live preview no-shadow
import { AriaTabs } from 'ember-aria-tabs';

const onSelect = (index) => {
  alert(`Selected tab index: ${index}`);
};

<template>
  <AriaTabs @defaultIndex={{1}} @onSelect={{onSelect}} as |at|>
    <at.tabList as |tl|>
      <tl.tab>
        Title 1
      </tl.tab>
      <tl.tab>
        Title 2
      </tl.tab>
    </at.tabList>

    <at.tabPanel>
      Panel 1
    </at.tabPanel>
    <at.tabPanel>
      Panel 2
    </at.tabPanel>
  </AriaTabs>
</template>
```

### Controlled mode

This mode has to be enabled by supplying `@selectedIndex` to the `<AriaTabs />` component.

In this mode ember-aria-tabs does not handle any tab selection state internally and leaves all the state management up to the outer application.

This mode also enforces you to set a handler for `@onSelect`. `@defaultIndex` does not have any effect and will therefore throw an error.

```gjs live preview no-shadow
import { AriaTabs } from 'ember-aria-tabs';
import { tracked } from '@glimmer/tracking';

class State {
  @tracked tabIndex = 0; // This is the tracked property that will hold the selected tab index
}

const state = new State();

const onSelect = (index) => {
  state.tabIndex = index; // Update the tracked property to change the selected tab
};

<template>
  <AriaTabs @selectedIndex={{state.tabIndex}} @onSelect={{onSelect}} as |at|>
    <at.tabList as |tl|>
      <tl.tab>
        Title 1
      </tl.tab>
      <tl.tab>
        Title 2
      </tl.tab>
    </at.tabList>

    <at.tabPanel>
      Panel 1
    </at.tabPanel>
    <at.tabPanel>
      Panel 2
    </at.tabPanel>
  </AriaTabs>
</template>
```

## Styling

`ember-aria-tabs` does not include any style loading by default.

However it does provide you default classes for each components and you can also customize components individually with classic `class` and `style` attributes.
