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
                    return item;
                },
                isDraggable: function () {
                    return list.length > 1;
                },
                dragStart: function (el) {
                    el.css('border-style', 'dotted');
                },
                dragDrop: function (data) {
                    list.splice(list.indexOf(data), 1);
                    delete dragModels[data.text];
                    $scope.$apply();
                },
                dragEnd: function (el) {
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
                    return list.length < 4;
                },
                dragEnter: function (el) {
                    el.css('background-color', 'lightgray');
                },
                dragDrop: function (data) {
                    list.push(data);
                    $scope.$apply();
                },
                dragLeave: function (el) {
                    el.css('background-color', 'white');
                }
            };
            dropModels[i] = model;
            return model;
        }
    }

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