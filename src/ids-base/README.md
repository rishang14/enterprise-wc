# Ids Base

This folder contains source code for the common base code for IDS. This includes shared functions, Core Css and The webcomponent base class `IdsElement`.

## Ids Base Css

The Ids base css class contains imports for core modules like typography (including labels), and imports for the Ids Identity token css variables and the functional classes mixins (similar to tailwind css).

## Ids Decorators

The ids-decorators are imported directly into ids-element and may not need to be called directly. Current there are there

1. One to add a version to the webcomponent and one to make a customer element for the web components. This is added in IdsElement if used
1. One to make the component a customElement
1. One to add a mixin to the components

## Ids Element

Ids Element is the general base class for most web components in IDS. Its used to have a base layer with common functions that all components will have. If only some components will have the functionality use a mixin instead. Ids Element current adds the following:

1. A version number from the package json
1. A name property from the element name
1. Handles setting changes
1. Removed attached event handlers (if the mixin is used)
1. Prevents flash of unstyled content
1. Holds the property (settings) list
1. Renders a template from the template property
1. Exports all mixins

## Ids Keyboard

- Handles detaching if a key is pressed down currently
- Adds a hot key mapper (for example google hot keys)
- Can list the supported keys for a component

## Ids Event Handler

Adds a small wrapper around component events. This can be used to see what event handlers are attached on a component as well as the fact that the Ids Element Base will call removeAll to remove all used event handlers.

## Ids Event Emitter

- Handles consistency on the data sent (element, event data, id, idx, custom ect)
- Some events can be vetoed
- All events should have past tense for example activated, beforeactivated, afteractived not activate, beforeactivate, afteractivate

## Ids Mixins

Mixins are simply functions with shared functionality that can be injected into a component. For example the IdsEventOmitter. They get around the issue that in JS that you cannot inherit from more than one object. Also they prevent the Base Element from getting bloated with functionality that not every component uses. Ids is using a simple object as a mixin that in "injected" into the component in the contructor and then used according to its documentation. If the mixin has UI elements it should probably be a web component instead.