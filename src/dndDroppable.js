angular
    .module('dnd')
    .directive('dndDroppable', ['$log', '$timeout', 'dndData',  dndDroppable]);

function dndDroppable($log, $timeout, dndData) {
    'use strict';

    var directive = {
        restrict: 'A',
        scope: {
            dndModel: '=dndDroppable'
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

        vm.dragEnter = dragEnter;
        vm.dragOver  = dragOver;
        vm.dragLeave = dragLeave;
        vm.dragDrop  = dragDrop;

        // check client model is present
        if (vm.dndModel === null) {
            $log.error('dndDroppable directive needs a model! e.g. <div dnd-droppable="vm.myDndModel">');
        }

        var droppable = false;

        function dragEnter(el, event) {
            droppable = null;
            if (isDroppable()) {
                event.preventDefault();
                if (typeof vm.dndModel.dragEnter === 'function') {
                    vm.dndModel.dragEnter(el);
                } else if (vm.dndModel.debug) {
                    $log.info('dndDroppable:  no "dragEnter(element)"   function in model: default to do-nothing');
                }
            }
        }

        function dragOver(event) {
            if (isDroppable()) {
                event.preventDefault();
            }
        }

        function dragLeave(el) {
            if (isDroppable()) {
                if (typeof vm.dndModel.dragLeave === 'function') {
                    vm.dndModel.dragLeave(el);
                } else if (vm.dndModel.debug) {
                    $log.info('dndDroppable:  no "dragLeave(element)"   function in model: default to do-nothing');
                }
            }
        }

        function dragDrop(event) {
            if (isDroppable()) {
                event.preventDefault();
                var data = dndData.getData();
                dndData.dropData();
                if (typeof vm.dndModel.dragDrop === 'function') {
                    vm.dndModel.dragDrop(data);
                } else if (vm.dndModel.debug) {
                    $log.info('dndDroppable:  no "dragDrop(data)"       function in model: default to do-nothing');
                }
            }
        }

        function isDroppable() {
            if (droppable === null) {
                if (!dndData.isDragging()) {
                    droppable = false;
                } else if (typeof vm.dndModel.isDroppable === 'function') {
                    droppable = vm.dndModel.isDroppable(dndData.getData());
                } else {
                    if (vm.dndModel.debug) {
                        $log.info('dndDroppable:  no "isDroppable(data)"    function in model: default to true');
                    }
                    droppable  = true;
                }
            }
            return droppable;
        }
    }

    function linker(scope, el, attrs, vm) {

        var inCount = 0;
        var promise;

        // listen to drag-related events...

        el.on('dragenter', function (event) {
            inCount++;
            if (inCount === 1) {
                vm.dragEnter(el, event);
            }
        });

        el.on('dragleave', function () {
            inCount--;
            if (inCount === 0) {
                $timeout.cancel(promise);
                vm.dragLeave(el);
            } else {
                monitorDragOvers();
            }
        });

        el.on('drop', function (event) {
            vm.dragDrop(event);
            vm.dragLeave(el);

            inCount = 0;
        });

        el.on('dragover', function (event) {
            $timeout.cancel(promise);
            vm.dragOver(event);
        });

        function monitorDragOvers() {
            $timeout.cancel(promise);//cancel before overwriting
            promise = $timeout(function() {
                vm.dragLeave(el);
                inCount = 0;
            }, (500));
        }
    }
}