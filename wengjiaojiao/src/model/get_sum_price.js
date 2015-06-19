function cal_sum_price(value,shop_cart) {
    var sum_price = 0;
    each(shop_cart, function(value_b, key_b) {
        sum_price = value.price * value.count;
    })
    return sum_price;
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
module.exports = cal_sum_price;
