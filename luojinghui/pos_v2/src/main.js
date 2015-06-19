
function printInventory(inputs) {
    var barcode_count = _(inputs).group(function(n, i){
        return n.split("-")[0];
    }).mapValue(function(value, key){
        return _.mapValue(value, function(value, key){
            return Number(value.split('-')[1]) || 1;
        }).reduce(function(a, b){
            return a + b;
        });
    }).value();

    var loadAllItem = loadAllItems();
    var array = [];

    for(var key in barcode_count) {
        for (var i = 0; i < loadAllItem.length; i++) {
            if(key === loadAllItem[i].barcode) {
                array.push({
                    barcode : loadAllItem[i].barcode,
                    name : loadAllItem[i].name,
                    unit : loadAllItem[i].unit,
                    price : loadAllItem[i].price.toFixed(2),
                    count : barcode_count[key],
                    save_count : 0,
                    subtotal : 0,
                })
            }
        }
    }

    var promotion = loadPromotions();

    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < promotion[0].barcodes.length; j++) {
            if(array[i].barcode === promotion[0].barcodes[j] && array[i].count >= 3) {
                var subtotal = 0;

                array[i].save_count = parseInt(array[i].count / 3);
                subtotal = ((array[i].count - array[i].save_count) * array[i].price).toFixed(2);
                array[i].subtotal = subtotal;
            } else if(array[i].barcode != promotion[0].barcodes[j] && array[i].count < 3) {
                array[i].subtotal = (array[i].count * array[i].price).toFixed(2);
            }
        }
    }


    var currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),
        formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;

    var result =
        '***<没钱赚商店>购物清单***\n' +
        '打印时间：' + formattedDateString + '\n' +
        '----------------------\n' ;
        for (var i = 0; i < array.length; i++) {
            result += '名称：' + array[i].name +
            '，数量：' + array[i].count + array[i].unit +
            '，单价：' + array[i].price + '(元)' +
            '，小计：' + array[i].subtotal + '(元)\n';
        }
        result += '----------------------\n' +
        '挥泪赠送商品：\n' ;
        for (var i = 0; i < array.length; i++) {
            if(array[i].save_count >=1) {
            result += '名称：' + array[i].name +
            '，数量：' + array[i].save_count + array[i].unit + '\n';
            }
        }

        result += '----------------------\n' ;
        var total_price = 0;
        var save_price = 0;

        for (var i = 0; i < array.length; i++) {
            total_price += Number(array[i].subtotal);
            if(array[i].save_count >=1) {
                save_price += array[i].save_count * array[i].price;
            }
        }
        result += '总计：'+total_price.toFixed(2)+'(元)\n' +
        '节省：'+save_price.toFixed(2)+'(元)\n' ;

        result +='**********************';

    console.log(result);
}

function dateDigitToString(num) {
    return num < 10 ? '0' + num : num;
};
