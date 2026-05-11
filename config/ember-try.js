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
        name: 'ember-release',
        // Allowed to fail: the dummy app's ember-export-application-global
        // initializer relies on Ember.String.classify, which Ember 4+
        // removed. Unblocking requires moving ember-source past the 3.28
        // LTS pin and reworking the dummy app, which is a breaking change
        // for addon consumers and out of scope here.
        allowedToFail: true,
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
        allowedToFail: true,
      },
    ],
  };
};
