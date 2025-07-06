import EmberRouter from '@ember/routing/router';
import config from 'docs-app/config/environment';
import { addRoutes } from 'kolay';
import { properLinks } from 'ember-primitives/proper-links';

@properLinks
export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  addRoutes(this);
});
