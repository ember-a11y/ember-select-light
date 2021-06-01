import Component from '@glimmer/component';
import { isNone } from '@ember/utils';
import { deprecate } from '@ember/debug';

const noop = () => {};

export default class extends Component {
  constructor() {
    super(...arguments);

    this.valueKey = this.args.valueKey ?? 'value';
    this.displayKey = this.args.displayKey ?? 'label';
    this.change = this.args.onChange ?? this.args.change ?? noop;

    deprecate(`Triggering @change on <SelectLight /> is deprecated in favor of @onChange due to ember-template-lint's no-passed-in-event-handlers rule`, !this.args.change, {
      id: 'ember-select-light.no-passed-in-event-handlers',
      until: '3.0.0',
      for: 'ember-select-light',
      since: {
        enabled: '2.0.5',
      },
    });
  }

  get hasDetailedOptions() {
    return ![ // Returns a boolean if all data is available for a { label: foo, value: bar } style list of options
      this.args.options?.[0][this.valueKey],
      this.args.options?.[0][this.displayKey],
    ].some(isNone);
  }
}
