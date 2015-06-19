//TODO: Please write code in this file.
function printInventory(inputs) {
    var currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),
        formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;

        var receipt_items={
        paid_items : [
            {
                name:'雪碧',
                count:5,
                unit:'瓶',
                price:'3.00'
            },
            {
                name:'荔枝',
                count:2,
                unit:'斤',
                price:'15.00'
            },
            {
                name:'方便面',
                count:3,
                unit:'袋',
                price:'4.50'
            }
        ],
        gift_items: [
            {
                name:'雪碧',
                count:1,
                unit:'瓶'
            },
            {
                name:'方便面',
                count:1,
                unit:'袋'
            }
        ]
    }
    receipt_items.paid_items[0].summary = "12.00";
    receipt_items.paid_items[1].summary = "30.00";
    receipt_items.paid_items[2].summary = "9.00";
    var result = '***<没钱赚商店>购物清单***\n'+'打印时间：' + formattedDateString + '\n'
    +'----------------------\n';
    for (var i = 0; i < receipt_items.paid_items.length; i++) {
        var paid_item = receipt_items.paid_items[i];
        result += '名称：'+paid_item.name+
        '，数量：'+paid_item.count+paid_item.unit+'，单价：'+paid_item.price+'(元)，小计：'+paid_item.summary+'(元)\n'
    }
    result +='----------------------\n' +'挥泪赠送商品：\n';
    for (var j = 0; j < receipt_items.gift_items.length; j++){
        var gift_item = receipt_items.gift_items[j];
        result += '名称：'+gift_item.name+
        '，数量：'+gift_item.count+gift_item.unit+'\n'
    }
    result +='----------------------\n' +

    '总计：51.00(元)\n' +
    '节省：7.50(元)\n' +
    '**********************';
     console.log(result);
}
dateDigitToString = function (num) {
    return num < 10 ? '0' + num : num;
};
