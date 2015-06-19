//TODO: Please write code in this file.
var receive = require('../spec/fixtures.js');
function printInventory(inputs) {
    var result = {};
    var listing = '';
    var giving = '';
    var total = 0;
    var save = 0;

    var barcode = receive.loadAllItems();
    var commodity = receive.loadPromotions()[0].barcodes;

    result = group(inputs,function(val,key) {
        return val.split('-')[0];
    });
    each(result,function(array,i) {
        result[i] = map(array,function(collection,i) {
            return collection.split('-')[1]*1 || 1;
        });
        result[i] = sum(result[i]);
    });

    each(result, function(array, i) {
        each(barcode, function(collection, j) {
            if (i===collection.barcode) {
                listing += the_shopping_cart(collection,i,array,commodity,barcode);

            //console.log(commodity);//商品，打折条码，数量；
            }
        });
    });
//    console.log(listing);
    each(result, function(array, i) {
        each(commodity, function(collection, j) {
        //    console.log(commodity);
            if (i===collection) {
                giving += giving_array(barcode,collection,array);//商品， 打折， 数量
            }else {
                //total += subtotal_func(i,barcode,array);
            }
        });
    });

    var he = 0;
    each(result,function(array, i) {
        for (var j = 0; j < commodity.length; j++) {
            if (i===commodity[j]) {

                total = subtotal_func(i,barcode,array);
                save += save_func(i,barcode,array);
                break;
            }else {
                total = subtotal_func(i,barcode,array);
            }
        }

        he += total;
    });
/*
    he_array = function(array,commodity,i,barcode) {
        var total = 0;
        for (var j = 0; j < commodity.length; j++) {
            if (i===commodity[j]) {
                total = subtotal_func(i,barcode,array);
                break;
            }else {
                total = subtotal_func(i,barcode,array);
            }
        }
        return total;
    };*/
        //console.log(total);
    var print =
        '***<没钱赚商店>购物清单***\n' +
        '打印时间：' + formattedDateString() + '\n' +
        '----------------------\n' +
        listing +
        '----------------------\n' +
        '挥泪赠送商品：\n' +
        giving +
        '----------------------\n' +
        '总计：'+he.toFixed(2)+'(元)\n'  +
        '节省：'+save.toFixed(2)+'(元)\n' +
        '**********************';

//    console.log(giving);
    return print;
}
module.exports = printInventory;

each = function(array,func) {
    if (Array.isArray(array)) {
        for (var i = 0; i < array.length; i++) {
            func(array[i],i);
        }
    }else {
        for (var j in array) {
            func(array[j], j);
        }
    }
};
sum = function(array) {
    var result = 0;
    each(array, function(collection,i) {
        result += collection;
    });
    return result;
};
group = function(array, func) {
    var result = {};
    each(array, function(val, key) {
        new_key = func(val, key);
        result[new_key] = result[new_key] || [];
        result[new_key].push(val);
    });
    return result;
};

map = function(array,func){
    var result = [];
    each(array,function(collection,i) {
        result.push(func(collection,i));
    });
    return result;
};

giving_array = function(barcode,result,count) {
    var giving;
    var name;
    var unit;
    each(barcode,function(array,i) {
        if (array.barcode===result) {
            name = array.name;
            unit = array.unit;
        }
    });
    giving =
            '名称：'+name+
            '，数量：'+parseInt(count/3) + unit+'\n';
    return giving;
};

the_shopping_cart = function (barcode,i,count,commodity,yuan) {
    var listing;
    var name = barcode.name;
    var unit = barcode.unit;
    var price = barcode.price;//单价
    var subtotal = 0 ;//小计
    var total = 0;
    for (var j = 0; j < commodity.length; j++) {
        if (i===commodity[j]) {
            total = subtotal_func(i,yuan,count);
            break;
        }else {
            total = subtotal_func(i,yuan,count);
        }
    }
    subtotal = total;
    listing =
            '名称：'+name+
            '，数量：'+count + unit+
            '，单价：'+price.toFixed(2)+'(元)，'+
            '小计：'+subtotal.toFixed(2)+'(元)\n';
    return listing;
};

subtotal_func = function(on_sale, goods, number) {
    var subtotal = 0;
    //console.log(on_sale);
    for (var i = 0; i < on_sale.length; i++) {

    }
    each(goods, function(array, i) {
    //    console.log(array.barcode);
        if (array.barcode === on_sale) {
            subtotal += array.price*(number - (number - number%3)/3);
        }
    });
    return subtotal;
};
save_func = function(on_sale, goods, number) {
    var save = 0;
    each(goods, function(array, i) {
    //    console.log(array.barcode);
        if (array.barcode === on_sale) {
            save += array.price*(number - number%3)/3;
        }
    });
    return save;
};

dateDigitToString = function (num) {
    return num < 10 ? '0' + num : num;
};
formattedDateString = function() {
    var currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),
        formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
        return formattedDateString;
};
