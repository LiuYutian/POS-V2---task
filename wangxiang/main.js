var loadAllItems = require('./fixtures.js');
var loadPromotions = require('./fixturess.js');
function _(collection) {
    if(!(this instanceof _)) {
        return new _(collection);
    }
    this.collection = collection;
}
_.prototype = {
    constructor: _,
    each: function (func) {
        for (var i = 0; i < this.collection.length; i++) {
            func(this.collection[i], i);
        }
        return this;
    },
    map: function (func) {
        var result = [];
        if (Array.isArray(this.collection)) {
            for (var i = 0; i < this.collection.length; i++) {
                result.push(func(this.collection[i],i));
            }
        }else {
            for(var key in this.collection){
                result.push(func(this.collection[key],key));
            }
        }
        this.collection = result;
        return this;
    },
    filter: function (func) {
        var result = [];
        this.each(function (element,i) {
            if (func(element,i)) {
                result.push(element);
            }
        });
        this.collection = result;
        return this;
    },
    group: function (func) {
        var temp = {};
        this.each(function (element,i) {
            temp[func(element)] = temp[func(element)] || [];
            temp[func(element)].push(element);
        });
        this.collection = temp;
        return this;
    },
    findWhere: function (items) {
        var result;
        if (Array.isArray(this.collection)) {
            this.each(function (element, i) {
                if (items['barcode'] === element) {
                    result = element;
                }
            });
        }
        this.each(function (element, i) {
            if (items['barcode'] === element.barcode) {
                result = element;
            }
        });
        return result;
    },
    value: function () {
        return this.collection;
    }
};
function find_item_by_barcode(barcode) {
    return _(loadAllItems()).findWhere({'barcode':barcode});
}
function isPromotions(items) {
    var promotions = loadPromotions()[0].barcodes;
    if (_(promotions).findWhere({'barcode':items.barcode})) {
        return true;
    }else {
        return false;
    }
}
function calculate_gift_count(count) {
    var promote_count = 0;
    while (count > 2) {
        count -= 3;
        promote_count++;
    }
    return promote_count;
}
function build_gift_items_by_shop_list(shop_list) {
    return _(shop_list).filter(function (element,i) {
        return isPromotions(element);
    }).map(function (element) {
        return {
            barcode: element.barcode,
            name: element.name,
            count: calculate_gift_count(element.count),
            unit: element.unit,
            price_number: Number(element.price)
        }
    }).value();
}
function has_gift(paid_items,gift_items) {
    for(var key in paid_items){
        if (_(gift_items).findWhere({'barcode':paid_items[key]})) {
            return true;
        }
    }
}
function calculate_paid_item_summary(item,gift_items) {
    var item_gift = _(gift_items).findWhere({'barcode':item.barcode});
    return item.price_number * (item.count - item_gift.count);
}
function build_paid_items_string(paid_items,formattedDateString) {
    var expectText ='***<没钱赚商店>购物清单***\n'+
                    '打印时间：' + formattedDateString + '\n';
    _(paid_items).each(function (element, i) {
        var paid_item = element;
        var count_unit = paid_item.count+paid_item.unit;
        expectText += '名称：'+ paid_item.name + '，' +
                      '数量：'+ count_unit + '，' +
                      '单价：'+ paid_item.price + '(元)，' +
                      '小计：'+ paid_item.summary+'(元)\n';
    });
    return expectText;
}
function build_gift_items_string(gift_items) {
    var expectText = '----------------------\n'+
                     '挥泪赠送商品：\n';
    _(gift_items).each(function (element) {
        var gift_item = element;
        var reduce_count_list =  gift_item.count + gift_item.unit;
        expectText +='名称：'+ gift_item.name + '，' +
                     '数量：'+ reduce_count_list +'\n';
    });
    return expectText;
}
function build_sum_price_string(paid_items,gift_items) {
    var total_price = 0;
    var reduce_price = 0;
    _(paid_items).each(function (element) {
        total_price += Number(element.summary);
    });
    _(gift_items).each(function (element) {
        reduce_price += element.count * element.price_number;
    });
    var expectText = '----------------------\n'+
                   '总计：'+total_price.toFixed(2)+'(元)\n'+
                   '节省：'+reduce_price.toFixed(2)+'(元)\n'+
                   '**********************';
    return expectText;
}
function calculate_paid_item(inputs) {
    var paid_items =  _(inputs).group(function (element) {
        return element;
    }).map(function (value, key) {
        var item_barcode = key;
        var item_count = value.length;
        if (key.indexOf('-') != -1) {
            item_barcode = key.substring(0,key.indexOf('-'));
            item_count = key.substring(key.indexOf('-')+1);
        }
        return {
            barcode: item_barcode,
            count: Number(item_count)
            };
    }).map(function (element) {
        var temp = find_item_by_barcode(element.barcode);
        return {
            barcode: element.barcode,
            name: temp.name,
            count: element.count,
            unit: temp.unit,
            price: temp.price.toFixed(2),
            price_number: temp.price
        }
    }).value();
    return paid_items;
}
function dateDigitToString (num) {
    return num < 10 ? '0' + num : num;
}
function get_datetime_string() {
    var formattedDateString;
    var currentDate = new Date(),
            year = dateDigitToString(currentDate.getFullYear()),
            month = dateDigitToString(currentDate.getMonth() + 1),
            date = dateDigitToString(currentDate.getDate()),
            hour = dateDigitToString(currentDate.getHours()),
            minute = dateDigitToString(currentDate.getMinutes()),
            second = dateDigitToString(currentDate.getSeconds()),
            formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
    return formattedDateString;
}
function printInventory(inputs) {
    var expectText ='';
    var paid_items = calculate_paid_item(inputs);
    var gift_items =  build_gift_items_by_shop_list(paid_items);
    _(paid_items).each(function (element) {
        if (has_gift(element,gift_items)) {
            element.summary = calculate_paid_item_summary(element,gift_items).toFixed(2);
        }else {
            element.summary = (element.price_number * element.count).toFixed(2);
        }
    });
    var formattedDateString = get_datetime_string();
    expectText = build_paid_items_string(paid_items,formattedDateString);
    expectText += build_gift_items_string(gift_items);
    expectText += build_sum_price_string(paid_items,gift_items);
    return expectText;
}
module.exports = printInventory;
