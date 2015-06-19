function get_promotion_price(uniqueBarcodes,promotions,result){
    var discountSum;
    for(var i=0; i<uniqueBarcodes.length; i++) {
          for(var j=0; j<promotions[0].barcodes.length; j++) {
              if(uniqueBarcodes[i].barcode === promotions[0].barcodes[j]) {
                  result += "名称："+uniqueBarcodes[i].name+"，数量："+
                  parseInt(uniqueBarcodes[i].count/3)+uniqueBarcodes[i].unit+'\n';
                  discountSum += parseInt(uniqueBarcodes[i].count/3)*uniqueBarcodes[i].price.toFixed(2);
              }
          }
      }
      return discountSum;
}
