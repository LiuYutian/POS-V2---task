function get_item_list(inputs,uniqueBarcodes,allItems){
    for(var i=0,ilen=inputs.length; i<ilen; i++) {
        var exist = false;
        for(var j=0, ulen=uniqueBarcodes.length; j<ulen; j++) {
            if(inputs[i] === uniqueBarcodes[j].barcode) {
                uniqueBarcodes[j].count++;
                exist = true;
            }
        }
        if(!exist) {
            var newItem = {};
            newItem.barcode=inputs[i].split('-')[0];
            newItem.count=1;
            newItem.count=parseInt(inputs[i].split('-')[1]) || 1;
            uniqueBarcodes.push(newItem);
        }
    }

    for(var i=0; i<uniqueBarcodes.length; i++) {
        for(j=0; j<allItems.length; j++){
            if(uniqueBarcodes[i].barcode === allItems[j].barcode){
                uniqueBarcodes[i].name = allItems[j].name;
                uniqueBarcodes[i].unit = allItems[j].unit;
                uniqueBarcodes[i].price = allItems[j].price;
            }
        }
    }
    return uniqueBarcodes;
}
