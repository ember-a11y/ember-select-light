import hbs from 'htmlbars-inline-precompile';
import {
  render,
  find,
  findAll,
  fillIn,
  triggerEvent
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | select-light', function(hooks) {
	setupRenderingTest(hooks);

	test('should be a <select> element', async function(assert) {
		await render(hbs`{{select-light}}`);

		assert.equal(find('select').tagName, 'SELECT');
	});

	test('should allow classes on parent <select>', async function(assert) {
		await render(hbs`{{select-light class="form-item"}}`);

		assert.ok(find('select').className.indexOf('form-item') !== -1);
	});

	test('should allow name and id changes on the parent <select>', async function(assert) {
		await render(hbs`{{select-light name="snail" id="slug"}}`)

		assert.dom('select').hasAttribute('name', 'snail');
		assert.dom('select').hasAttribute('id', 'slug');
	});

	test('should be able to toggle disabled status', async function(assert) {
		this.set('disabled', false);

		await render(hbs`{{select-light disabled=disabled}}`);

		assert.equal(find('select').hasAttribute('disabled'), false);

		this.set('disabled', true);
		assert.equal(find('select').hasAttribute('disabled'), true);
	});

	test('should support tabindex', async function(assert) {
		this.set('tabindex', null);

		await render(hbs`{{select-light tabindex=tabindex}}`);
		assert.equal(find('select').hasAttribute('tabindex'), false);

		this.set('tabindex', 0);
		assert.dom('select').hasAttribute('tabindex', '0');
	});

	test('should have no options if none are specified', async function(assert) {
		await render(hbs`{{select-light}}`);

		assert.equal(find('select').getElementsByTagName('option').length, 0);
	});

	test('should have placeholder option if specified', async function(assert) {
		await render(hbs`{{select-light placeholder="Walrus"}}`);

		assert.equal(find('select option').innerText.trim(), 'Walrus');
	});

	test('should have a disabled placeholder', async function(assert) {
		await render(hbs`{{select-light placeholder="Walrus"}}`);

		assert.dom('option').hasAttribute('disabled');
	});

	test('should be able to yield to passed options', async function(assert) {
		await render(hbs`
		{{#select-light}}
			<option value="plat">Platypus</option>
		{{/select-light}}
	`);

		assert.equal(find('select option').innerText, 'Platypus');
		assert.dom('select option').hasValue('plat');
	});

	test('should render options from passed flat array', async function(assert) {
		let options = ['squid', 'octopus'];
		this.setProperties({options});

		await render(hbs`{{select-light options=options}}`);

		assert.equal(findAll('select option').length, options.length);
	});

	test('should select option that matches value', async function(assert) {
		let options = ['squid', 'octopus'];
		let value = options[1];
		this.setProperties({
			options,
			value,
		});

		await render(hbs`{{select-light options=options value=value}}`);

		assert.dom('select').hasValue(value);
	});

	test('should change select value when changing data down value', async function(assert) {
		let options = ['shortfin', 'mako'];
		let value = options[1];
		this.setProperties({
			options,
			value,
		});

		await render(hbs`{{select-light options=options value=value placeholder="hammerhead"}}`);
		this.set('value', options[0]);

		assert.dom('select').hasValue(options[0]);
	});

	test('should render options correctly when passed array of objects', async function(assert) {
		let options = [
			{ value: 'shortfin', label: 'Shortfin Shark' },
			{ value: 'mako', label: 'Mako Shark' },
		];
		let value = options[1].value;
		this.setProperties({
			options,
			value,
		});

		await render(hbs`{{select-light options=options value=value}}`);

		assert.equal(findAll('select option').length, options.length);
		assert.dom('select option').hasAttribute('value', options[0].value);
		assert.equal(find('select option').innerText.trim(), options[0].label);
		assert.dom('select').hasValue(value);
	});

	test('should render options with customized value and display keys when passed array of objects', async function(assert) {
		let options = [
			{ val: 'shortfin', description: 'Shortfin Shark' },
			{ val: 'mako', description: 'Mako Shark' },
		];
		let value = options[1].value;
		this.setProperties({
			options,
			value,
		});

		await render(hbs`{{select-light options=options value=value valueKey="val" displayKey="description"}}`);

		assert.dom('select option').hasAttribute('value', options[0].val);
		assert.equal(find('select option').innerText.trim(), options[0].description);
	});

	test('should fire change when user chooses option, mut with yield', async function(assert) {
		this.set('myValue', null);

		await render(hbs`
		{{#select-light change=(action (mut myValue) value="target.value")}}
			<option value="turtle">Turtle</option>
		{{/select-light}}
	`);

		await fillIn('select', 'turtle');
		await triggerEvent('select', 'change');

		assert.dom('select').hasValue('turtle');
		assert.equal(this.myValue, 'turtle');
	});

	test('should fire change when user chooses option, mut with flat array', async function(assert) {
		let options = ['clam', 'starfish'];
		this.setProperties({
			options,
			myValue: options[1],
			value: options[1],
		});

		await render(hbs`{{select-light options=options value=value change=(action (mut myValue) value="target.value")}}`);

		await fillIn('select', options[0]);
		await triggerEvent('select', 'change');

		assert.dom('select').hasValue(options[0]);
		assert.equal(this.myValue, options[0]);
	});

	test('should fire change when user chooses option, custom action with flat array', async function(assert) {
		assert.expect(1);

		let options = ['clam', 'starfish'];
		this.setProperties({
			options,
			value: options[1],
			customAction: (event) => {
				assert.equal(event.target.value, options[0]);
			},
		});

		await render(hbs`{{select-light options=options value=value change=(action customAction)}}`);

		await fillIn('select', options[0]);
	});
});
