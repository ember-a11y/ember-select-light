# Upgrade Guide

## Deprecation no-passed-in-event-handlers

Deprecation warning begins showing at v2.0.5 of ember-select-light to reflect ember-template-lint v3.4.2's related warning.

[Issue](https://github.com/ember-a11y/ember-select-light/issues/37)
[Related ember-template-lint rule](https://github.com/ember-template-lint/ember-template-lint/blob/master/docs/rule/no-passed-in-event-handlers.md)

Before:

```handlebars
<SelectLight @change={{action "handleChange"}} />
```

After:

```handlebars
<SelectLight @onChange={{action "handleChange"}} />
```

## Upgrading to 2.0 from 1.x

With Glimmer any attributes intended to go onto the `<select>` are handled by a `...attributes`, custom functionality is handled as a passed in property.

This means that standard attributes such as `disabled`, `id`, `class` can be used like so...

```handlebars
<SelectLight
  name="snail"
  id="slug"
  class="form-item" />
```

Meanwhile, `@placeholder`, `@options`, `@value`, `@placeholder`, `@valueKey`, and `@displayKey` must be prefixed with an `@` to specify properties we're passing to the component (rather than an attribute passed to the select element).

```handlebars
<SelectLight
  class="form-item"
  @options={{array 'turtle' 'tortoise'}}
  @value="turtle" />
```
