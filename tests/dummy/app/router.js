import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('docs', function () {
    this.route('usage');
    this.route('examples');
    this.route('components', function () {
      this.route('aria-tab-list');
      this.route('aria-tab-panel');
      this.route('aria-tabs');
      this.route('aria-tab');
    });
  });
  this.route('not-found', { path: '/*path' });
});
