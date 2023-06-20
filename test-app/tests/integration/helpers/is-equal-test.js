
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Helper | is-equal', function(hooks) {
	setupRenderingTest(hooks);

	test('should be true when passed true and true', async function(assert) {
		await render(hbs`{{is-equal true true}}`);

		assert.equal(this.element.innerText.trim(), 'true');
	});

	test('should be false when passed false and true', async function(assert) {
		await render(hbs`{{is-equal false true}}`);

		assert.equal(this.element.innerText.trim(), 'false');
	});

	test('should be false when passed true and false', async function(assert) {
		await render(hbs`{{is-equal true false}}`);

		assert.equal(this.element.innerText.trim(), 'false');
	});

	test('should be true when passed false and false', async function(assert) {
		await render(hbs`{{is-equal false false}}`);

		assert.equal(this.element.innerText.trim(), 'true');
	});

	test('should be true if passed matching strings', async function(assert) {
		await render(hbs`{{is-equal 'foo' 'foo'}}`);

		assert.equal(this.element.innerText.trim(), 'true');
	});

	test('should be false if passed NOT matching strings', async function(assert) {
		await render(hbs`{{is-equal 'foo' 'bar'}}`);

		assert.equal(this.element.innerText.trim(), 'false');
	});

	test('should be true if passed two matching properties', async function(assert) {
		this.setProperties({
			left: 'foo',
			right: 'foo',
		});

		await render(hbs`{{is-equal left right}}`);

		assert.equal(this.element.innerText.trim(), 'true');
	});

	test('should be false if passed two NOT matching properties', async function(assert) {
		this.setProperties({
			left: 'foo',
			right: 'bar',
		});

		await render(hbs`{{is-equal left right}}`);

		assert.equal(this.element.innerText.trim(), 'false');
	});

	test('should switch as computed properties change', async function(assert) {
		this.setProperties({
			left: 'foo',
			right: 'bar',
		});

		await render(hbs`{{is-equal left right}}`);

		assert.equal(this.element.innerText.trim(), 'false');

		this.set('right', 'foo');
		assert.equal(this.element.innerText.trim(), 'true');

		this.set('left', 'bar');
		assert.equal(this.element.innerText.trim(), 'false');
	});


	test('should be true when comparing with the get helper', async function(assert) {
		this.setProperties({
			left: 'foo',
			right: { deeper: 'foo', },
		});

		await render(hbs`{{is-equal left (get right 'deeper')}}`);

		assert.equal(this.element.innerText.trim(), 'true');
	});

	test('should be usable inline to toggle an attribute', async function(assert) {
		this.setProperties({
			left: 'foo',
			right: 'bar',
		});

		await render(hbs`<input disabled={{is-equal left right}} />`);

		assert.equal(this.element.children[0].hasAttribute('disabled'), false);

		this.set('right', 'foo');
		assert.equal(this.element.children[0].hasAttribute('disabled'), true);
	});
});

