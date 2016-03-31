angular
    .module('app', ['dnd'])
    .controller('AppCtrl', AppCtrl);

function AppCtrl($scope) {
    'use strict';

    var vm = this;

    vm.list_1 = items().slice(0,3);
    vm.list_2 = items().slice(3,5);
    vm.list_3 = items().slice(5,7);

    vm.dragModel = dragModel;
    vm.dropModel = dropModel;

    var dragModels = {};
    var dropModels = {};

    //lazily build drag models for items
    function dragModel(list, item) {
        if (dragModels.hasOwnProperty(item.text)) {
            return dragModels[item.text];
        } else {
            var model = {
                list:list,

                data: function () {
                    // dnd payload e.g. {text:'R',color:'red'}
                    return item;
                },
                isDraggable: function () {
                    // don't allow box to become empty
                    return list.length > 1;
                },
                dragStart: function (el) {
                    // give dagged item dotted border
                    el.css('border-style', 'dotted');
                },
                dragDrop: function (data) {
                    // remove dropped item from source list
                    list.splice(list.indexOf(data), 1);
                    delete dragModels[data.text];
                    $scope.$apply();
                },
                dragEnd: function (el) {
                    // retore dragged items solid border
                    el.css('border-style', 'solid');
                }
            };
            dragModels[item.text] = model;
            return model;
        }
    }

    //lazily build drop models for items
    function dropModel(i, list) {
        if (dropModels.hasOwnProperty(i)) {
            return dropModels[i];
        } else {
            var model = {
                list:list,

                isDroppable: function () {
                    // don't allow drop if box is full
                    return list.length < 4;
                },
                dragEnter: function (el) {
                    // indicate drop target with gray background
                    el.css('background-color', 'lightgray');
                },
                dragDrop: function (data) {
                    // add dropped item to destination list
                    list.push(data);
                    $scope.$apply();
                },
                dragLeave: function (el) {
                    // restore drop target white background
                    el.css('background-color', 'white');
                }
            };
            dropModels[i] = model;
            return model;
        }
    }

    // 7 dnd payloads
    function items() {
        return [
            {text:'R',color:'red'},
            {text:'O',color:'orange'},
            {text:'Y',color:'yellow'},
            {text:'G',color:'lightgreen'},
            {text:'B',color:'lightblue'},
            {text:'I',color:'indigo'},
            {text:'V',color:'violet'}
        ];
    }
}
