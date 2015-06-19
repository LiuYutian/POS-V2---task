function printInventory(inputs){
    var inputsObj = myLodash(inputs).group(function(n, i){
        return n.split("-")[0];
    }).mapValues(function(value, key){
        return myLodash.mapValues(value, function(value, key){
            return value.split('-')[1] || 1;
        }).reduce(function(a, b){
            return a + b;
        });
    });

    var resultObject = [];

    for(var key in inputsObj){
        resultObject.push(new NewItem(key, '', '', 0, inputsObj[key], 0));
    }

    var loadAllItem = loadAllItems();

    for(var i = 0; i < resultObject.length; i++) {
        for(var j = 0; j < loadAllItem.length; j++){
            if(resultObject[i].barcode === loadAllItem[j].barcode){
                resultObject[i].name = loadAllItem[j].name;
                resultObject[i].unit = loadAllItem[j].unit;
                resultObject[i].price = loadAllItem[j].price;
            }
        }
    }

    var loadPromotion = loadPromotions()[0].barcodes;
    for(var i = 0; i < loadPromotion.length; i++) {
        for(var j = 0; j < resultObject.length; j++){
            if(loadPromotion[i] === resultObject[j].barcode){
                resultObject[j].privilegeCount = Math.floor(resultObject[j].count / 3);
            }
        }
    }

     console.log(resultObject);
}
