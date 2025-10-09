# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

-## [Unreleased]

-## [Released]

## [7.1.0] - 2025-10-09

### Changed
* Upgrade @percy/cli from 1.20.0 to 1.23.0
* Upgrade dependabot/fetch-metadata from 1.3.6 to 1.4.0
* Upgrade ember-auto-import from 2.6.0 to 2.6.1
* Upgrade ember-qunit from 6.1.1 to 6.2.0
* Upgrade ember-resolver from 10.0.0 to 10.1.0
* Upgrade ember-template-lint from 5.5.1 to 5.7.3
* Upgrade engine.io and socket.io
* Upgrade eslint-config-prettier from 8.6.0 to 8.8.0
* Upgrade eslint-plugin-ember from 11.4.6 to 11.5.1
* Upgrade express from 4.18.2 to 4.21.2
* Upgrade minimist from 0.2.1 to 0.2.4
* Upgrade prettier from 2.8.4 to 2.8.7
* Upgrade vm2 from 3.9.11 to 3.9.17
* Upgrade webpack from 5.75.0 to 5.98.0
* reduce dependabot pr limit

## [7.0.0] - 2023-02-21

### Fixed
- Lint issues
- Fix incompatible ember-qunit dependency with older ember versions
- Fix dependabot automerge
- Remove Array prototype extension usage

### Changed
- Upgrade @ember/render-modifiers from 2.0.4 to 2.0.5
- Upgrade @ember/test-helpers from 2.6.0 to 2.9.3
- Upgrade @embroider/test-setup from 1.5.0 to 2.1.1
- Upgrade @glimmer/component from 1.0.4 to 1.1.2
- Upgrade @glimmer/tracking from 1.0.4 to 1.1.2
- Upgrade @percy/cli from 1.0.0-beta.76 to 1.20.0
- Upgrade @percy/ember from 3.0.0 to 4.2.0
- Upgrade @xmldom/xmldom from 0.8.3 to 0.8.6
- Upgrade async from 2.6.3 to 2.6.4
- Upgrade decode-uri-component from 0.2.0 to 0.2.2
- Upgrade dependabot/fetch-metadata from 1.3.0 to 1.3.6
- Upgrade ember-auto-import from 2.4.0 to 2.6.0
- Upgrade ember-cached-decorator-polyfill from 0.1.4 to 1.0.1
- Upgrade ember-cli-dependency-checker from 3.2.0 to 3.3.1
- Upgrade ember-cli-htmlbars from 6.0.1 to 6.2.0
- Upgrade ember-qunit from 5.1.5 to 6.1.1
- Upgrade ember-resolver from 8.0.3 to 10.0.0
- Upgrade ember-template-lint from 4.3.0 to 5.5.1
- Upgrade ember-template-lint-plugin-prettier from 4.0.0 to 4.1.0
- Upgrade engine.io from 3.5.0 to 6.2.1
- Upgrade eslint-config-prettier from 8.5.0 to 8.6.0
- Upgrade eslint-plugin-ember from 10.5.9 to 11.4.6
- Upgrade eslint-plugin-prettier from 4.0.0 to 4.2.1
- Upgrade eslint-plugin-qunit from 7.2.0 to 7.3.4
- Upgrade http-cache-semantics from 4.1.0 to 4.1.1
- Upgrade loader-utils from 1.4.0 to 1.4.2
- Upgrade minimatch from 3.0.4 to 3.1.2
- Upgrade mout from 1.2.3 to 1.2.4
- Upgrade parse-url from 6.0.0 to 6.0.2
- Upgrade prettier from 2.6.0 to 2.8.4
- Upgrade qunit from 2.18.0 to 2.19.4
- Upgrade release-it from 14.13.1 to 14.14.3
- Upgrade shell-quote from 1.7.2 to 1.7.3
- Upgrade terser from 4.8.0 to 4.8.1
- Upgrade vm2 from 3.9.9 to 3.9.11
- Upgrade webpack from 5.70.0 to 5.75.0

## [6.0.2] - 2022-03-28

### Removed

- Ember 3.16 quirk

## [6.0.1] - 2022-03-25

### Fixed

- Fix whitespace control in panel

## [6.0.0] - 2021-12-03

### Changed

- Bump dependencies
- Drop ember 3.16 support

## [5.0.0] - 2021-09-09

### Changed

- Bump dependencies
- Requires ember-auto-import >= 2
- Turn `onKeyDown` into `onKeyUp` [no-down-event-binding](https://github.com/ember-template-lint/ember-template-lint/blob/master/docs/rule/no-down-event-binding.md)

## [4.0.2] - 2021-09-01

### Changed

- Bump dependencies

## [4.0.1] - 2021-08-31

### Fixed

- Fix broken tab switching in controlled mode (#260) @mayatron
- Add missing default class name for tab list (#259) @mayatron

## [4.0.0] - 2021-06-16

### Changed

- Apply ember-cli-update
- Bump dependencies
- Move to glimmer components

### Removed

- Drop ember 3.12 support

## [3.0.1] - 2020-12-01

### Fixed

- Fix tag

## [3.0.0] - 2020-09-04

### Changed

- Change changelog format
- Apply ember-cli-update
- Bump dependencies

### Removed

- Drop node 8 support
- Drop ember 3.1 support
- Drop ember 3.4 support
- Drop ember 3.8 support
- Remove ember polyfills

## [2.1.0] - 2019-10-24

### Added

- Add selected state in yield

### Removed

- Useless dependencies

## [2.0.1] - 2019-08-20

### Fixed

- Fix documentation

## [2.0.0] - 2019-08-14

### Added

- Add second implementation based on react-tabs

### Removed

- Remove first implementation

## [1.0.5] - 2019-07-22

### Changed

- Bump dependencies

## [1.0.4] - 2019-07-11

### Changed

- Bump dependencies

## [1.0.3] - 2019-07-09

### Changed

- Bump dependencies

## [1.0.2] - 2019-06-27

### Added

- Add documentation

## [1.0.1] - 2019-06-26

### Changed

- Bump dependencies

## [1.0.0] - 2019-06-25

### Added

- First implementation

[7.0.0]: https://github.com/concordnow/ember-aria-tabs/compare/v6.0.2...v7.0.0
[6.0.2]: https://github.com/concordnow/ember-aria-tabs/compare/v6.0.1...v6.0.2
[6.0.1]: https://github.com/concordnow/ember-aria-tabs/compare/v6.0.0...v6.0.1
[6.0.0]: https://github.com/concordnow/ember-aria-tabs/compare/v5.0.0...v6.0.0
[5.0.0]: https://github.com/concordnow/ember-aria-tabs/compare/v4.0.2...v5.0.0
[4.0.2]: https://github.com/concordnow/ember-aria-tabs/compare/v4.0.1...v4.0.2
[4.0.1]: https://github.com/concordnow/ember-aria-tabs/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/concordnow/ember-aria-tabs/compare/v3.0.1...v4.0.0
[3.0.1]: https://github.com/concordnow/ember-aria-tabs/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/concordnow/ember-aria-tabs/compare/v2.1.0...v3.0.0
[2.1.0]: https://github.com/concordnow/ember-aria-tabs/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/concordnow/ember-aria-tabs/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/concordnow/ember-aria-tabs/compare/1.0.5...v2.0.0
[1.0.5]: https://github.com/concordnow/ember-aria-tabs/compare/1.0.4...1.0.5
[1.0.4]: https://github.com/concordnow/ember-aria-tabs/compare/1.0.3...1.0.4
[1.0.3]: https://github.com/concordnow/ember-aria-tabs/compare/1.0.2...1.0.3
[1.0.2]: https://github.com/concordnow/ember-aria-tabs/compare/1.0.1...1.0.2
[1.0.1]: https://github.com/concordnow/ember-aria-tabs/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/concordnow/ember-aria-tabs/releases/tag/1.0.0


[unreleased]: https://github.com/concordnow/ember-aria-tabs/compare/v7.0.0...HEAD
