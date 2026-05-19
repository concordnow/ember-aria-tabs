'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    scenarios: [
      {
        name: 'ember-lts-3.20',
        npm: {
          devDependencies: {
            'ember-source': '~3.20.5',
            'ember-qunit': '^5.1.5',
          },
        },
      },
      {
        name: 'ember-lts-3.24',
        npm: {
          devDependencies: {
            'ember-source': '~3.24.3',
            'ember-qunit': '^5.1.5',
          },
        },
      },
      {
        name: 'ember-lts-5.4',
        npm: {
          devDependencies: {
            'ember-source': '~5.4.0',
            'ember-qunit': '^8.0.2',
            '@ember/test-helpers': '^4.0.4',
          },
        },
      },
      {
        name: 'ember-lts-5.12',
        npm: {
          devDependencies: {
            'ember-source': '~5.12.0',
            'ember-qunit': '^8.1.1',
            '@ember/test-helpers': '^4.0.4',
          },
        },
      },
      {
        name: 'ember-lts-6.12',
        // Allowed to fail: the test bundle is loaded through the legacy AMD
        // bundle path of ember-cli 4.12, which Ember 6.x raises as the
        // `using-amd-bundles` deprecation. `raiseOnDeprecation` in the test
        // setup then prevents the test loader from running ("No tests were
        // run"). The addon itself builds and installs fine.
        // TODO(@YoanRoullard): drop once ember-cli is bumped to a version
        // that loads Ember via ES modules (planned in a follow-up PR).
        allowedToFail: true,
        npm: {
          devDependencies: {
            'ember-source': '~6.12.0',
            'ember-qunit': '^9.0.4',
            '@ember/test-helpers': '^5.4.2',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
          },
        },
      },
      {
        name: 'ember-default-with-jquery',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'jquery-integration': true,
          }),
        },
        npm: {
          devDependencies: {
            '@ember/jquery': '^1.1.0',
            'ember-qunit': '^5.1.5',
          },
        },
      },
      {
        name: 'ember-classic',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'application-template-wrapper': true,
            'default-async-observers': false,
            'template-only-glimmer-components': false,
          }),
        },
        npm: {
          devDependencies: {
            'ember-source': '~3.28.0',
            'ember-qunit': '^5.1.5',
          },
          ember: {
            edition: 'classic',
          },
        },
      },
      // embroider-safe and embroider-optimized are allowed to fail because
      // @ember/test-helpers 2.x imports `ember-cli-htmlbars` from its
      // addon-test-support tree without declaring it as a peer dependency.
      // Embroider stages test-helpers in a temp directory where webpack
      // cannot resolve the hoisted `ember-cli-htmlbars` from the project
      // root. Unblocking requires bumping @ember/test-helpers to 3.x,
      // whose peer (ember-qunit ^4 || ^5.0.0-beta.0 || ^6) is incompatible
      // with the ember-qunit ^5.1.5 these scenarios still rely on, and
      // ember-qunit 5 itself is the only version compatible with the
      // ember-lts-3.20 / ember-lts-3.24 LTS scenarios we must keep.
      {
        ...embroiderSafe({
          npm: {
            devDependencies: {
              'ember-qunit': '^5.1.5',
            },
          },
        }),
        // TODO(@YoanRoullard): drop when @ember/test-helpers can be bumped to 3.x
        // (blocked by ember-qunit 5.x compat with the LTS 3.20/3.24 scenarios).
        allowedToFail: true,
      },
      {
        ...embroiderOptimized({
          npm: {
            devDependencies: {
              'ember-qunit': '^5.1.5',
            },
          },
        }),
        // TODO(@YoanRoullard): drop when @ember/test-helpers can be bumped to 3.x
        // (blocked by ember-qunit 5.x compat with the LTS 3.20/3.24 scenarios).
        allowedToFail: true,
      },
    ],
  };
};
