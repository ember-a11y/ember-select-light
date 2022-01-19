import Component from '@glimmer/component';
import { isNone } from '@ember/utils';
import { deprecate } from '@ember/debug';
import { action } from '@ember/object';

const noop = () => {};

export default class extends Component {
  childComponents = new Set();

  constructor() {
    super(...arguments);
    this.changeCallback = this.args.onChange ?? this.args.change ?? noop;

    this.valueKey = this.args.valueKey ?? 'value';
    this.displayKey = this.args.displayKey ?? 'label';

    deprecate(`Triggering @change on <SelectLight /> is deprecated in favor of @onChange due to ember-template-lint's no-passed-in-event-handlers rule`, !this.args.change, {
      id: 'ember-select-light.no-passed-in-event-handlers',
      until: '3.0.0',
      for: 'ember-select-light',
      since: {
        enabled: '2.0.5',
      },
    });
  }

  registerChild(option) {
    this.childComponents.add(option);
  }

  unregisterChild(option) {
    this.childComponents.delete(option);
  }

  getValue(valueStr) {
    return Array.from(this.childComponents).reduce((selectedValue, childComponent) => {
      return childComponent.value == valueStr ? childComponent.objValue : selectedValue
    }, valueStr);
  }

  @action
  change(ev) {
    let value = this.getValue(ev.target.value);

    return this.changeCallback(value, ev);
  }

  get hasDetailedOptions() {
    return ![ // Returns a boolean if all data is available for a { label: foo, value: bar } style list of options
      this.args.options?.[0][this.valueKey],
      this.args.options?.[0][this.displayKey],
    ].some(isNone);
  }
}
