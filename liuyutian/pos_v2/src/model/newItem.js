function NewItem(barcode, name, unit, price, count, privilegeCount){
   Item.call(this,barcode, name, unit, price);
   this.count = count;
   this.privilegeCount = privilegeCount;
}
