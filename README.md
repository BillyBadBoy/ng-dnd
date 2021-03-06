# ng-dnd

Simple angular drag-and-drop directives that allow *any* json object to be used as the dnd payload. Implemented using plain angular and html5.

![ex gif](example.gif)

## Overview
There are 2 angular directives in this module: `dndDraggable` and `dndDroppable`, for dnd sources and destinations
respectively. These are used as attributes, e.g.
```html
<div dnd-draggable="vm.myDragModel" etc...></div>
<div dnd-droppable="vm.myDropModel" etc...></div>
```
The models contain callback functions which are invoked when dnd events occur.

## Building
To build (assuming you have `npm` properly installed), clone the repo, then from the repo root directory run:
```
> npm install
> grunt
```

## Examples
Once `examples/dnd-all-min.js` has been built, you can run the examples by running the following from the repo root directory:
```
> grunt serve
```
There are 2 examples. 
- _minimal_: uses empty models with debug enabled. If you open the browser console you can see when the model functions are invoked. 
- _maximal_: has models with implementations for all the model functions. It also demonstrates an arbitrary json object being used as the drag-and-drop payload.

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

You can now incrementally add model functions to your models. The details of the functions available are given below.

## Models
Both `dndDraggable` and `dndDroppable` require a model. If the model contains appropriately named functions then they
will be called automatically when dnd events occur. These functions are described below.

### `dndDraggable` model

function            | description                             | default
--------------------| ----------------------------------------|-----------
`data()`            | builds the dnd transfer payload         | `null`
`isDraggable()`     | true if currently draggable             | `true`
`dragStart(element)`| used to add drag styling to source      | do nothing
`dragEnd(element)`  | used to remove drag styling from source | do nothing
`dragDrop(data)`    | drag dropped on some target             | do nothing

Note: if `dragStart` is invoked then `dragEnd` will also be invoked later (plus possibly `dragDrop` if the drop was successful).

### `dndDroppable` model

function            | description                             | default
--------------------| ----------------------------------------|-----------
`isDroppable(data)` | true if data is acceptable              | `true`
`dragEnter(element)`| used to add drag styling to target      | do nothing
`dragLeave(element)`| used to remove drag styling from target | do nothing
`dragDrop(data)`    | data dropped on this target             | do nothing

Note: if `dragEnter` is invoked then `dragLeave` will also be invoked later (plus possibly `dragDrop` if the drop was successful).

#### Minimal implementation
All model functions are optional. If a model is missing a function then a default (do nothing) implementation is used instead.

In addition to the functions described above, models may also include a boolean `debug` property which, if `true`, will log messages to the console about missing functions. Therefore a minimal implementation for either a `dndDraggable` or `dndDroppable` model is `{debug:true}` - this will respond to dnd events with messages to the console.
