# Ember-Select-Light

![build status](https://travis-ci.org/q2ebanking/ember-select-light.svg?branch=master) [![npm version](https://badge.fury.io/js/ember-select-light.svg)](https://badge.fury.io/js/ember-select-light) [![Ember Observer Score](https://emberobserver.com/badges/ember-select-light.svg)](https://emberobserver.com/addons/ember-select-light)

Ember Select Light is an Ember Addon written [data-down, actions up (DDAU)](https://dockyard.com/blog/2016/11/18/checkbox-list-ember) written with in [test-driven development](https://www.agilealliance.org/glossary/tdd/) practices.

The intent is to provide a barebones `<select>` element that pairs well with modern Ember practices without styling assumptions. The result is a very functional, yet customizable, option for developers seeking a simple solution to select elements in their forms and apps.

## Getting Started

```bash
ember install ember-select-light
```

### Example Usage

```handlebars
<SelectLight
  @value="turtle"
  @options=(array "turtle" "tortoise")
  @change={{action "handleChange"}} />
```

#### With an array of objects...

```handlebars
<SelectLight
  @options=(array
    (hash value="shortfin" label="Shortfin Shark")
    (hash value="mako" label="Mako Shark")
  ) />
```

`value` and `label` will be the default object keys used unless `@valueKey="...` and/or `@displayKey="...` are used respectively, like so...

```handlebars
<SelectLight
  @options=(array
    (hash myValue="shortfin" myLabel="Shortfin Shark")
    (hash myValue="mako" myLabel="Mako Shark")
  )
  @valueKey="myValue"
  @displayKey="myLabel" />
```

#### As a Yield

```handlebars
<SelectLight>
	<option value="clown">Clown Fish</option>
	<option value="cat">Cat Fish</option>
</SelectLight>
```

### Other arguments

Other arguments are spread onto the `<select ...attributes` as you'd expect, allowing you to use common attributes such as `disabled`, `tabindex` and of course `class`.

```handlebars
<SelectLight class="my-select" disabled="true" />
```

---

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

## Contributing

We love pull requests from everyone. By participating in this project, you agree to abide by the [code of conduct](./code-of-conduct.md) and is subject to the [project license](./LICENSE.md).

Clone this repo, make your changes with test coverage, push up a fork and [submit a pull request](https://github.com/sharpshark28/ember-select-light/compare).

Soon after some primary contributors will review your code and submit feedback and hopefully click the fancy green approve button. Any test and linting failures should be caught during the pull request continuous integration environment and human eyes here after.

## Running Tests

* `npm run test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* or `ember test`
