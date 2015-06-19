var $ = require('../spec/fixtures.js');
var Item = require('./model/item.js');
var get_group_item = require('./model/split_item.js');
var get_whole_item = require('./model/whole_item.js');
var get_info = require('./model/get_info.js');
var get_gift_item = require('./model/gift_item.js');

function printInventory(inputs){
    var group_item = get_group_item(inputs);
    var shop_cart = get_whole_item(group_item);
    return  get_gift_item(shop_cart);
    // /return get_info(shop_cart,gift_cart);
}

module.exports = printInventory;
