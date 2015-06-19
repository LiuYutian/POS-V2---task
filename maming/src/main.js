
function printInventory(inputs){

    // var promotion = loadPromotions()[0].barcodes;

    var uniqueBarcodes = [];
    var allItems = loadAllItems();
    var promotions = loadPromotions();
    var a = get_item_list(inputs,uniqueBarcodes,allItems);
    // console.log(a);
    var b = buy_list(uniqueBarcodes,promotions);
    //console.log(buy_list(uniqueBarcodes,promotions));
    //console.log(get_promotion_list(b,uniqueBarcodes,promotions));

    //console.debug(get_price(uniqueBarcodes,promotions));
    //console.debug(get_price(uniqueBarcodes,promotions,b));
    console.debug(get_promotion_price(uniqueBarcodes,promotions,b));

}

// module.exports = printInventory;
