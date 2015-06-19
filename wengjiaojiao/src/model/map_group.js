var $ = require('../../spec/fixtures.js');
var Item = require('./item.js');

function get_map_group(value, key) {
    var result;
    var allItems = $.loadAllItems();
    each(allItems,function (value_a,key_a) {
        if (key === value_a.barcode) {
            result = new Item(value_a.barcode,value_a.name,value_a.unit,value_a.price,value);
        }
    });
    return result;
}

function each(collection,fun) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            fun(collection[i], i);
        }
    }else {
        for (var key in collection) {
            fun(collection[key], key);
        }
    }
}
module.exports = get_map_group;
