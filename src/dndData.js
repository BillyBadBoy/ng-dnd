angular
    .module('dnd')
    .service('dndData', dndData);

function dndData() {
    'use strict';

    var data_  = null;
    var model_ = null;
    var el_    = null;

    var service = {

        isDragging: isDragging,

        setData: setData,
        getData: getData,
        delData: delData,

        dropData: dropData
    };
    return service;

    ////////////

    function isDragging() {
        return model_ !== null;
    }

    function setData(data, model, el) {
        data_  = data;
        model_ = model;
        el_    = el;
    }

    function getData() {
        return data_;
    }

    function dropData() {
        model_.dragDrop();
        model_.dragEnd(el_);
    }

    function delData() {
        data_  = null;
        model_ = null;
        el_    = null;
    }
}