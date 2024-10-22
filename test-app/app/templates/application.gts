import RouteTemplate from 'ember-route-template';
import { pageTitle } from 'ember-page-title';

import SuperMarioExample from 'test-app/components/super-mario-example';
import MattGroeningExample from 'test-app/components/matt-groening-example';
import AvengersExample from 'test-app/components/avengers-example';

interface ApplicationRouteSignature {
  Args: {
    model: string;
  };
}

export default RouteTemplate<ApplicationRouteSignature>(
  <template>
    {{pageTitle "Ember Aria Tabs"}}

    <h1>Examples</h1>

    <h2>Super Mario Example</h2>

    <SuperMarioExample />

    <h2>Matt Groening Example</h2>

    <MattGroeningExample />

    <h2>Avengers Example Example</h2>

    <AvengersExample />

    {{outlet}}
  </template>,
);
