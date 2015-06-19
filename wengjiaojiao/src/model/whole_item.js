var $ = require('../../spec/fixtures.js');
var Item = require('./item.js');
var get_map_group = require('./map_group.js');
var cal_sum_price = require('./get_sum_price.js');

function get_whole_item(group_item) {
    var shop_cart = [];
    each(group_item,function(value, key) {
        shop_cart.push(get_map_group(value, key));
    });

    each(shop_cart,function(value, key) {
        shop_cart[key].sum_price = cal_sum_price(value,shop_cart);
    });
    return shop_cart;
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

module.exports = get_whole_item;
