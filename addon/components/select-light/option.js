import Component from '@glimmer/component';


export default class SelectLightOption extends Component {
  constructor() {
    super(...arguments);

    this.valueKey = this.args.valueKey ?? 'value';
    this.displayKey = this.args.displayKey ?? 'label';

    if (this.args.parent) {
      this.args.parent.registerChild(this);
    }
  }

  willDestroy() {
    super.willDestroy(...arguments);

    if (this.args.parent) {
      this.args.parent.unregisterChild(this);
    }
  }

  get objValue() {
    return this.args.value;
  }

  get value() {
    if (typeof this.args.value === 'string' || !this.args.value) {
      return this.args.value;
    }

    return this.args.value?.[this.valueKey] ?? this.args.value;
  }

  get label() {
    return this.args.value?.[this.displayKey];
  }

  get selected() {
    return this.args.selectedValue == this.args.value || this.args.selectedValue == this.value;
  }
}
