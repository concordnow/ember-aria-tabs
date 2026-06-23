# Security policy

## Reporting a vulnerability

If you discover a vulnerability that affects consumers of this addon at runtime, please open a private report via GitHub Security Advisories on this repository rather than a public issue.

## Runtime surface

`ember-aria-tabs` ships a small Ember addon. The consumer's application bundle includes the addon's own source (`addon/`, `app/`) plus its declared runtime `dependencies`:

- `@ember/render-modifiers` — render modifiers used by the tab components.
- `ember-cached-decorator-polyfill` — the `@cached` decorator polyfill, shipped at runtime.
- `ember-cli-babel` — transpiles the addon and injects `@babel/runtime` helpers into the bundle.
- `ember-cli-htmlbars` — compiles the addon's templates at build time.

`ember-cli-babel` and `ember-cli-htmlbars` run at build time; their only runtime footprint is the `@babel/runtime` helpers emitted into the compiled output. `@ember/render-modifiers` and `ember-cached-decorator-polyfill` ship runtime code into the consumer's bundle and are the meaningful runtime surface.

Outside these runtime dependencies and the helpers they emit, packages reported by `npm audit` belong to a developer's build/test/release tooling, not the application at runtime.

## Current advisory status

State as of 2026-06-23: `npm audit` reports **0 advisories** at every severity level. The addon builds on the Ember CLI `~4.12` toolchain (Node 20/22), which is recent enough that the build-time advisory cascades affecting older Ember CLI lines do not apply here.

## Mitigations already in place

`npm overrides` pin safe versions across the dependency tree so that transitive advisories stay resolved without waiting on each intermediate package to publish a fix:

- Build/runtime chain: `@babel/core`, `@babel/runtime`, `@babel/helpers`, `tmp`, `braces`, `micromatch`, `markdown-it`, `clean-css`, `ansi-html` (→ `ansi-html-community`), `js-yaml`, `diff`.
- Release/test tooling: `got`, `qs`, `ws`, `uuid`, `undici`.
- `ember-source` is pinned to the declared range via the `$ember-source` reference.

## Reviewing this policy

Re-evaluate the list above when any of the following happens:

- `npm audit` starts reporting an advisory that is not already covered by an override.
- A consumer reports a concrete exploit path against runtime code.
- The Ember CLI / `ember-source` toolchain is bumped — this can change both the advisory surface and which overrides are still required.
