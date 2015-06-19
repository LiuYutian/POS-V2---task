function get_price(uniqueBarcodes,promotions,result){
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
    return sum;
}
