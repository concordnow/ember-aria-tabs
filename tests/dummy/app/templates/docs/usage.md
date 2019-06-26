# Usage

## A _bare metal_ use case:

{{#docs-demo as |demo|}}
  {{#demo.example name='docs-demo-basic.hbs'}}
    {{#aria-tabs as |at|}}
      {{#at.tab style='cursor: pointer; color: red;'}}one{{/at.tab}}
      {{#at.panel}}one{{/at.panel}}
      {{#at.tab style='cursor: pointer; color: red;'}}two{{/at.tab}}
      {{#at.panel}}two{{/at.panel}}
    {{/aria-tabs}}
  {{/demo.example}}

  {{demo.snippet 'docs-demo-basic.hbs'}}
{{/docs-demo}}

## Use case with some css

{{#docs-demo as |demo|}}
  {{#demo.example name='docs-demo-css.hbs'}}
    {{#aria-tabs class="tabsClassNames" as |at|}}
      {{#at.tab
        class="defaultTabClassNames"
        selectClassNames="tabSelected"
        unselectClassNames="tabUnselected"
      }}
        one
      {{/at.tab}}
      {{#at.panel
        class="defaultPanelClassNames"
        selectClassNames="panelSelected"
        unselectClassNames="panelUnselected"
      }}
        one
      {{/at.panel}}
      {{#at.tab
        class="defaultTabClassNames"
        selectClassNames="tabSelected"
        unselectClassNames="tabUnselected"
      }}
        two
      {{/at.tab}}
      {{#at.panel
        class="defaultPanelClassNames"
        selectClassNames="panelSelected"
        unselectClassNames="panelUnselected"
      }}
        two
      {{/at.panel}}
    {{/aria-tabs}}
  {{/demo.example}}

  {{demo.snippet 'docs-demo-css.hbs'}}
{{/docs-demo}}

{{docs-snippet name="aria-tabs.css"}}
