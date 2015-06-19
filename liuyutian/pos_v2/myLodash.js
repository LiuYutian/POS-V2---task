"use strict";
function myLodash(collection){
    if(!(this instanceof myLodash)){
        return new myLodash(collection);
    }
    this.collection = collection;
}

function each(collection, fun){
    if(Array.isArray(collection)){
        for(var i = 0; i < collection.length; i++) {
            fun(collection[i], i);
        }
    }else{
        for(var key in collection){
            if(collection.hasOwnProperty(key)){
                fun(collection[key], key)
            }
        }
    }
}

myLodash.prototype.each = function(fun){
    each(this.collection, fun);

    return this;
}

myLodash.each = each;

function reduce(collection, fun){
    var result = 0;

    myLodash.each(collection, function(n, i){
        if(i === 0) {
            result = n;
        }else{
            result = fun(result, n);
        }
    });

    return result;
}

myLodash.prototype.reduce = function(fun){
    return reduce(this.collection, fun);
}

myLodash.reduce = reduce;

function map(collection, fun){
    var array = [];

    myLodash.each(collection, function(n, i){
        array.push(fun(n, i));
    });

    return array;
}

myLodash.prototype.map = function(fun){
    this.collection = map(this.collection, fun);
    return this;
}

myLodash.map = map;

function mapValues(collection, fun){
    myLodash.each(collection, function(value, key){
        collection[key] = fun(value, key);
    });

    return collection;
}

myLodash.prototype.mapValues = function(fun){
    return mapValues(this.collection, fun);
}

myLodash.mapValues = mapValues;

function mapKeys(collection, fun){
    each(collection, function(value, key){
        collection[fun(value, key)] = value;
        delete collection[key];
    });

    return collection;
}

myLodash.prototype.mapKeys = function(fun){
    return mapKeys(this.collection, fun);
}

myLodash.mapKeys = mapKeys;

myLodash.prototype.group = function(fun){
    var obj = {};

    this.each(function(n, i){
        obj[fun(n, i)] = obj[fun(n, i)] || [];
        obj[fun(n, i)].push(n);
    });

    this.collection = obj;
    return this;
}

myLodash.prototype.value = function(){
    return this.collection;
}
