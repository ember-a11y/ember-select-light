import layout from '../templates/components/select-light';
import Component from '@ember/component';
import { computed } from '@ember/object';

const options = [];

export default Component.extend({
  layout,
  tagName: 'select',
  attributeBindings: ['name', 'id', 'disabled', 'tabindex'],

  value: null,
  name: null,
  id: null,
  disabled: false,
  tabindex: null,
  placeholder: '',
  options,
  valueKey: 'value',
  displayKey: 'label',

  isDeepOptions: computed('options', 'options.length', 'valueKey', 'displayKey', function() {
    if (!this.options || this.options.length === 0 || !this.valueKey || !this.displayKey) return false;

    let firstOptionValue = this.options[0][this.valueKey];
    let firstOptionDisplay = this.options[0][this.displayKey];
    return !(firstOptionValue === undefined && firstOptionDisplay === undefined);
  }),
});
