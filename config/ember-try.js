'use strict';

const getChannelURL = require('ember-source-channel-url');
const bootstrapVersion = `^${process.env.BOOTSTRAPVERSION}.0.0`;
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    useYarn: true,
    scenarios: [
      {
        name: 'ember-lts-3.16',
        npm: {
          devDependencies: {
            'ember-source': '~3.16.0',
            bootstrap: bootstrapVersion,
          },
        },
      },
      {
        name: 'ember-lts-3.20',
        npm: {
          devDependencies: {
            'ember-source': '~3.20.5',
            bootstrap: bootstrapVersion,
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
            bootstrap: bootstrapVersion,
          },
        },
        env: {
          // FAIL_ON_DEPRECATION: true,
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
            bootstrap: bootstrapVersion,
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
            bootstrap: bootstrapVersion,
          },
        },
        env: {
          // FAIL_ON_DEPRECATION: true,
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
            bootstrap: bootstrapVersion,
          },
        },
      },
      {
        name: 'ember-classic',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            // TODO: tests fail if optional feature application-template-wrapper is enabled
            // 'application-template-wrapper': true,
            'default-async-observers': false,
            'template-only-glimmer-components': false,
          }),
        },
        npm: {
          devDependencies: {
            bootstrap: bootstrapVersion,
          },
          ember: {
            edition: 'classic',
          },
        },
      },
      {
        name: 'node-tests',
        command: 'yarn run nodetest',
      },
      embroiderSafe({
        env: {
          FASTBOOT_DISABLED: true,
        },
        npm: {
          devDependencies: {
            bootstrap: bootstrapVersion,
          },
        },
      }),
      embroiderOptimized({
        env: {
          FASTBOOT_DISABLED: true,
        },
        npm: {
          devDependencies: {
            bootstrap: bootstrapVersion,
          },
        },
      }),
    ],
  };
};
