import Component from '@glimmer/component';
import { isNone, isPresent } from '@ember/utils';
import { action } from '@ember/object';
import { deprecate } from '@ember/debug';

export default class extends Component {
  constructor() {
    super(...arguments);

    this.valueKey = this.args.valueKey ?? 'value';
    this.displayKey = this.args.displayKey ?? 'label';
    this.change = this.args.onChange ?? this.args.change;

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

  @action
  onChange(event) {
    if (isPresent(this.change)) {
      const { args: { options, valueKey }, change, hasDetailedOptions } = this
      let selectedOptions = [...event.target.selectedOptions].map(function(option) {
        return hasDetailedOptions ? options.findBy(valueKey, option.value) : option.value
      })
      if (!event.target.multiple) {
        selectedOptions = selectedOptions[0]
      }
      change(selectedOptions, event)
    }
  }
}
