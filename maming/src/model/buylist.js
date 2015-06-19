function buy_list(uniqueBarcodes,promotions){
    get_price(uniqueBarcodes,promotions,sum);


    dateDigitToString = function (num) {
        return num < 10 ? '0' + num : num;
    };
    var currentDate = new Date();
    year = dateDigitToString(currentDate.getFullYear());
    month = dateDigitToString(currentDate.getMonth() + 1);
    date = dateDigitToString(currentDate.getDate());
    hour = dateDigitToString(currentDate.getHours());
    minute = dateDigitToString(currentDate.getMinutes());
    second = dateDigitToString(currentDate.getSeconds());
    var formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
    // console.log(formattedDateString);
    var result = "***<没钱赚商店>购物清单***\n打印时间："+formattedDateString+"\n----------------------\n";
         var sum = 0;
         var discountSum = 0;

         for(var i=0; i<uniqueBarcodes.length; i++) {
             var exist = false;
             var subTotal =  uniqueBarcodes[i].count*uniqueBarcodes[i].price.toFixed(2);
             var discountsubTotal = parseInt((uniqueBarcodes[i].count/3))*uniqueBarcodes[i].price;

             for(var k = 0,plen=promotions[0].barcodes.length; k<plen; k++) {
                 if(uniqueBarcodes[i].barcode === promotions[0].barcodes[k]) {
                     result += "名称："+uniqueBarcodes[i].name+
                                 "，数量："+uniqueBarcodes[i].count+uniqueBarcodes[i].unit+
                                 "，单价："+uniqueBarcodes[i].price.toFixed(2)+
                               "(元)，小计："+(subTotal-discountsubTotal).toFixed(2)+
                               "(元)\n";
                     exist = true;
                 }
             }
             if(!exist) {
             result += "名称："+uniqueBarcodes[i].name+
                       "，数量："+uniqueBarcodes[i].count+uniqueBarcodes[i].unit+
                       "，单价："+uniqueBarcodes[i].price.toFixed(2)+
                       "(元)，小计："+subTotal.toFixed(2)+
                       "(元)\n";
             }
             sum += (uniqueBarcodes[i].count*uniqueBarcodes[i].price);
         }
         return result;


}
