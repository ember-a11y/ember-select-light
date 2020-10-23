import Component from '@glimmer/component';
import { isPresent } from '@ember/utils';

const noop = () => {};

export default class extends Component {
  constructor() {
    super(...arguments);

    this.valueKey = this.args.valueKey ?? 'value';
    this.displayKey = this.args.displayKey ?? 'label';
    this.change = this.args.change ?? noop;
  }

  get hasDetailedOptions() {
    return [ // Returns a boolean if all data is available for a { label: foo, value: bar } style list of options
      this.args.options?.[0][this.valueKey],
      this.args.options?.[0][this.displayKey],
    ].every(isPresent);
  }
}
