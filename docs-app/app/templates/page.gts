import { Page } from 'kolay/components';

// Removes the App Shell / welcome UI
// before initial rending and chunk loading finishes
function removeLoader() {
  document.querySelector('#kolay__loading')?.remove();
}

<template>
  <Page>
    <:pending>
      <div class="loading-page">
        Loading, compiling, etc
      </div>
    </:pending>

    <:error as |error|>
      <div>
        {{error}}
      </div>
      {{(removeLoader)}}
    </:error>

    <:success as |Prose|>
      <Prose />
      {{(removeLoader)}}
    </:success>

  </Page>
</template>
