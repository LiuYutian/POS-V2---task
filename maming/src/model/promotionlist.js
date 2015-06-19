function get_promotion_list(result,uniqueBarcodes,promotions,discountSum,sum){
    result += '----------------------\n' +
        '挥泪赠送商品：\n';
        for(var i=0; i<uniqueBarcodes.length; i++) {
            for(var j=0; j<promotions[0].barcodes.length; j++) {
                if(uniqueBarcodes[i].barcode === promotions[0].barcodes[j]) {
                    result += "名称："+uniqueBarcodes[i].name+"，数量："+
                    parseInt(uniqueBarcodes[i].count/3)+uniqueBarcodes[i].unit+'\n';
                    discountSum += parseInt(uniqueBarcodes[i].count/3)*uniqueBarcodes[i].price.toFixed(2);
                }
            }
        }
        result += "----------------------\n总计："+(sum-discountSum).toFixed(2)+"(元)\n"
        result += "节省："+discountSum.toFixed(2)+"(元)\n**********************"
        return result;
}
