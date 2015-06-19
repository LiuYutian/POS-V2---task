var $ = require('../../spec/fixtures.js');
var Promotion = require('./promotion.js');
var Gift_item = require('./Gift_item.js');

function get_gift_item(shop_cart) {
    var gift_cart = [];
    var promotions = $.loadPromotions()[0].barcodes;
    var result,shop_cart_barcode = [];

    // each(shop_cart,function(n) {
    //     shop_cart_barcode.push(n.barcode);
    // })
    return shop_cart;
    // each(promotions,function (n) {
    //     if (shop_cart_barcode === n) {
    //         result = new Gift_item(shop_cart.name,Math.floor(shop_cart.count / 3),shop_cart.unit);
    //     }
    //     return result;
    // });
    // if (result !== undefined) {
    //        gift_cart.push(result);
    //    }
      //return gift_cart;
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
module.exports = get_gift_item;
