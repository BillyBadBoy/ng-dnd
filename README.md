# ng-dnd
Simple angular directives for drag-and drop, allowing *any* javascript object to be transferred as the dnd payload.

Implemented using plain angular and html5.

## Overview
There are 2 angular directives in this module: `dndDraggable` and `dndDroppable`, for dnd sources and destinations
respectively. These are used as attributes, e.g.
```html
<div dnd-draggable="vm.myDragModel" etc...
<div dnd-droppable="vm.myDropModel" etc...
```
The models contain callback functions which are invoked when dnd events occur.

## Examples
The examples directory contains a couple of test pages. To build the examples:
- clone the repo
- from the repo root directory run:
```html
> npm install
> grunt serve
```

This will launch the examples in a browser.

## Usage
-  add dnd script to html page:
```html
        <script src="foo/dnd-all-min.js"></script>
```
- __optional:__ if support for touch devices is required add this 3rd party script ([based on this]
(https://github.com/timruffles/ios-html5-drag-drop-shim)) to html page:
````html
        <script src="bar/ios-drag-drop.js"></script>
````
- make some html element a drag source by adding the `dnd-draggable` attribute:
```html
        <img dnd-draggable="vm.myDragModel" etc...`
```
- make some html element a drag target by adding the `dnd-droppable` attribute;
```html
        <div dnd-droppable="vm.myDropModel" etc...
```
- add initially empty client models by adding the following to your controller:
```javascript
        vm.myDragModel = {debug:true};
        vm.myDropModel = {debug:true};
```
You should now be able to:

1. open the page in a browser
1. open the browser console
1. view logged drag and drop messages

The logged messages will guide you in adding functions to your models.

## Models
Both `dndDraggable` and `dndDroppable` require a model. If the model contains appropriately named functions then they
will be called automatically when dnd events occur. These functions are described below.

### `dndDraggable` model
(note all these functions relate to the dnd source)

function            | description                             | default
--------------------| ----------------------------------------|-----------
`data()`            | builds the dnd transfer payload         | `null`
`isDraggable()`     | true if currently draggable             | `true`
`dragStart(element)`| used to add drag styling to source      | do nothing
`dragEnd(element)`  | used to remove drag styling from source | do nothing
`dragDrop(data)`    | drag dropped on some target             | do nothing

Note: if `dragStart` is invoked then `dragEnd` will also be invoked later (plus possibly `dragDrop` if the drop was successful).

### `dndDroppable` model
(note all these functions relate to a dnd target)

function            | description                             | default
--------------------| ----------------------------------------|-----------
`isDroppable(data)` | true if data is acceptable              | `true`
`dragEnter(element)`| used to add drag styling to target      | do nothing
`dragLeave(element)`| used to remove drag styling from target | do nothing
`dragDrop(data)`    | data dropped on this target             | do nothing

Note: if `dragEnter` is invoked then `dragLeave` will also be invoked later (plus possibly `dragDrop` if the drop was successful).

#### Minimal implementation
All model functions are optional. If a model is missing a function then a default (do nothing) implementation is used instead.

In addition to the functions described above, models may also include a boolean `debug` property which, if `true`, will log messages to the console about missing functions. Therefore a minimal implementation for either a dndDraggable or dndDroppable model is `{debug:true}` - this will respond to dnd events with messages to the console.
