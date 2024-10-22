import { pageTitle } from 'ember-page-title';
import { PageNav } from 'kolay/components';
import { pascalCase, sentenceCase } from 'change-case';

import './styles.css';
import './ember-aria-tabs-styles.css';

import type { Page } from 'kolay';

<template>
  {{pageTitle "Ember Aria Tabs"}}

  <div class="min-h-screen flex flex-col">

    <header class="border-b border-gray-200 shadow-sm h-16 bg-gray-900">
      <div
        class="max-w-7xl mx-auto flex items-center justify-between pl-8 py-4"
      >
        <div class="flex items-center mr-4">
          <a
            class="flex items-center no-underline"
            href="/introduction/index.md"
          >
            <span class="text-xs text-white">
              Ember
            </span>
            <span
              class="pt-1 ml-2 text-2xl font-semibold leading-none text-red-500"
            >
              Aria Tabs
            </span>
          </a>
        </div>

        <div class="hidden md:flex space-x-4">
          <a
            aria-label="GitHub repository"
            href="https://github.com/concordnow/ember-aria-tabs"
            target="_blank"
            rel="noopener noreferrer"
          ><svg
              viewBox="0 0 20 20"
              class="size-5 fill-black/40 dark:fill-gray-400"
            ><path
                d="M10 0C4.475 0 0 4.475 0 10a9.994 9.994 0 006.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.287-.6-1.175-1.025-1.412-.35-.188-.85-.65-.013-.663.788-.013 1.35.725 1.538 1.025.9 1.512 2.337 1.087 2.912.825.088-.65.35-1.088.638-1.338-2.225-.25-4.55-1.112-4.55-4.937 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.274.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 012.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0020 10c0-5.525-4.475-10-10-10z"
              ></path></svg></a>
        </div>
      </div>
    </header>

    <main class="flex-1 bg-white">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row p-8 gap-8">

        <nav
          class="w-full md:w-40 shrink-0 border md:border-r border-gray-200 bg-gray-50 rounded md:rounded-none md:bg-transparent md:border-none"
        >
          <div class="p-4 md:p-0">
            <PageNav class="space-y-2">
              <:page as |x|>
                <x.Link
                  class="block rounded px-3 py-2 text-gray-700 hover:bg-blue-100 focus:outline-none focus:bg-blue-200"
                >
                  {{nameFor x.page}}
                </x.Link>
              </:page>
              <:collection as |x|>
                {{#if x.index}}
                  <x.index.Link
                    class="block rounded px-3 py-2 text-gray-700 hover:bg-blue-100 focus:outline-none focus:bg-blue-200"
                  >
                    {{sentenceCase x.collection.name}}
                  </x.index.Link>
                {{else}}
                  <span class="layout__text">
                    {{sentenceCase x.collection.name}}
                  </span>
                {{/if}}
              </:collection>
            </PageNav>
          </div>
        </nav>

        <div class="prose">
          {{outlet}}
        </div>
      </div>
    </main>

    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-5xl mx-auto p-4 text-center text-gray-500 text-sm">
        &copy;
        {{year}}
        Built with ❤️ and Ember
      </div>
    </footer>
  </div>
</template>

const year = new Date().getFullYear();

function nameFor(x: Page) {
  // We defined componentName via json file

  if ('componentName' in x && typeof x.componentName === 'string') {
    return `${x.componentName}`;
  }

  if (x.path.includes('/components/')) {
    return `<${pascalCase(x.name)} />`;
  }

  return sentenceCase(x.name);
}
