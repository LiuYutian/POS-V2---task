function Item(barcode, name, unit, count, price) {
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.count = count;
    this.price = price || 0.00;
}
