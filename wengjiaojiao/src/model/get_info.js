var get_date = require('./get_date.js')

function get_info(shop_cart,gift_cart) {
    var result = '***<没钱赚商店>购物清单***\n' +
                  '打印时间：' + get_date() + '\n' +
                  '----------------------\n';
    var sum_price = 0;
    var save_price = 0;
    each(shop_cart,function(n, i) {
        result += '名称：'+ shop_cart[i].name +
                '，数量：'+ shop_cart[i].count + shop_cart[i].unit +
                '，单价：'+ shop_cart[i].price.toFixed(2) + '(元)'+
                '，小计：'+ shop_cart[i].sum_price.toFixed(2) + '(元)\n'
        sum_price += shop_cart[i].sum_price;
    });
    result += '----------------------\n' +
    '挥泪赠送商品：\n' ;
    each(gift_cart,function(n, i) {
        result += '名称：' + gift_cart[i].name +
                '，数量：' + gift_cart[i].count + gift_cart[i].unit +"\n";
    });
    result += '----------------------\n' +
    '总计：'+ sum_price.toFixed(1) +'(元)\n' +
    '节省：7.50(元)\n' +
    '**********************';
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

module.exports = get_info;
