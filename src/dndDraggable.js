angular
    .module('dnd')
    .directive('dndDraggable', ['$log', 'dndData', dndDraggable]);

function dndDraggable($log, dndData) {
    'use strict';

    var directive = {
        restrict: 'A',
        scope: {
            dndModel: '=dndDraggable'
        },
        link: linker,
        controller: controller,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;

    function controller() {

        /* jshint validthis: true */
        var vm = this;

        vm.dragStart = dragStart;
        vm.dragEnd   = dragEnd;
        vm.dragDrop  = dragDrop;

        // check client model is present
        if (vm.dndModel === null) {
            $log.error('dndDraggabale directive needs a model! e.g. <div dnd-draggable="vm.myDndModel">');
        }

        function dragStart(el, event) {
            setDataTransfer(event);
            dndData.setData(getData(), vm, el);

            if (typeof vm.dndModel.dragStart === 'function') {
                vm.dndModel.dragStart(el);
            } else if (vm.dndModel.debug) {
                $log.info('dndDraggabale: no "dragStart(element)"   function in model: default to do-nothing.');
            }
        }

        function dragDrop() {
            if (typeof vm.dndModel.dragDrop === 'function') {
                vm.dndModel.dragDrop(dndData.getData());
            } else if (vm.dndModel.debug) {
                $log.info('dndDraggabale: no "dragDrop(data)"       function in model: default to do-nothing');
            }
        }

        function dragEnd(el) {
            dndData.delData();
            if (typeof vm.dndModel.dragEnd === 'function') {
                vm.dndModel.dragEnd(el);
            } else if (vm.dndModel.debug) {
                $log.info('dndDraggable:  no "dragEnd(element)"     function in model: default to do-nothing');
            }
        }

        function getData () {
            if (typeof vm.dndModel.data === 'function') {
                return vm.dndModel.data();
            } else {
                if (vm.dndModel.debug) {
                    $log.info('dndDraggable:  no "data()"               function in model: default to null');
                }
                return null;
            }
        }

        // location of dataTransfer depends on whether jquery is present
        function setDataTransfer(event) {
            if ('dataTransfer' in event) {
                event.dataTransfer.setData('"text', '');
            } else if (('originalEvent' in event) &&
                ('dataTransfer' in event.originalEvent)) {
                event.originalEvent.dataTransfer.setData('text','');
            } else{
                $log.error('dndDraggable could not set the dataTransfer data!');
            }
        }
    }

    function linker(scope, el, attrs, vm) {

        // watch draggable property of client model
        scope.$watch(isDraggable(), function () {
            el.attr('draggable', isDraggable()());
        });

        // listen to drag-related events...

        el.on('dragstart', function (event) {
            // guard against selected text
            if (!dndData.isDragging() && isDraggable()()) {
                vm.dragStart(el, event);
            }
        });
        el.on('dragend', function () {
            // guard against selected text
            if (dndData.isDragging()) {
                vm.dragEnd(el);
            }
        });

        function isDraggable() {
            if (typeof vm.dndModel.isDraggable === 'function') {
                return vm.dndModel.isDraggable;
            } else {
                if (vm.dndModel.debug) {
                    $log.info('dndDraggabale: no "isDraggable()"        function in model: default to true');
                }
                return function () { return true; };
            }
        }
    }
}