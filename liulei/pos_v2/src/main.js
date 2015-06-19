function printInventory(inputs) {
     var newItem = [];
     for (var i = 0; i < inputs.length; i++) {
         var inputsBarcode = inputs[i].indexOf("-") != -1 ? inputs[i].split("-")[0] : inputs[i];
         var inputsCount = inputs[i].indexOf("-") != -1 ? parseInt((inputs[i].split("-"))[1]) : 1;
         var exist = false;
         for (var j = 0; j < newItem.length; j++) {
             if (inputsBarcode == newItem[j].barcode) {
                 newItem[j].count = newItem[j].count || 0;
                 newItem[j].count += inputsCount;
                 exist = true;
                 break;
             }
         }
         if (!exist) {
             newItem.push({
                 barcode: inputsBarcode,
                 count: inputsCount,
                 privilegeCount: 0
             });
         }
     }

     var loadAllItem = loadAllItems();
     for (var i = 0; i < loadAllItem.length; i++) {
         for (var j = 0; j < newItem.length; j++) {
             if (newItem[j].barcode === loadAllItem[i].barcode) {
                 newItem[j].name = loadAllItem[i].name;
                 newItem[j].unit = loadAllItem[i].unit;
                 newItem[j].price = loadAllItem[i].price;
             }
         }
     }

     var promotionsBarcode = loadPromotions()[0].barcodes;
     for (var i = 0; i < promotionsBarcode.length; i++) {
         for (var j = 0; j < newItem.length; j++) {
             if (promotionsBarcode[i] == newItem[j].barcode) {
                 newItem[j].privilegeCount = Math.floor((newItem[j].count) / 3);
             }
         }
     }

     var sum = 0;
     var list = "***<没钱赚商店>购物清单***\n";
     for (var i = 0; i < newItem.length; i++) {
         if (newItem[i].count > 0) {
             list += "名称：" + newItem[i].name + "，";
             list += "数量：" + newItem[i].count + newItem[i].unit + "，";
             list += "单价：" + newItem[i].price.toFixed(2) + "(元)，";
             list += "小计：" + ((newItem[i].count - newItem[i].privilegeCount) * newItem[i].price).toFixed(2) + "(元)\n";
             sum += newItem[i].count * newItem[i].price;
         }
     }

     list += '----------------------\n';
     list += '挥泪赠送商品：\n';
     var cheap = 0;
     for (var i = 0; i < newItem.length; i++) {
         for (var j = 0; j < promotionsBarcode.length; j++) {
             if (newItem[i].barcode == promotionsBarcode[j]) {
                 list += "名称：" + newItem[i].name + "，";
                 list += "数量：" + newItem[i].privilegeCount + newItem[i].unit + "\n";
                 cheap += newItem[i].price;
             }
         }
     }

     list += '----------------------\n'
     list += "总计：" + (sum - cheap).toFixed(2) + "(元)\n";
     list += "节省：" + cheap.toFixed(2) + "(元)\n";
     list += '**********************';

     console.log(list);
 }
