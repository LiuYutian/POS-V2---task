'use strict'
function _(collection) {
    if(!(this instanceof _)) {
        return new _(collection);
    }
    this.collection = collection;
}

function each(collection,fun) {
    if(Array.isArray(collection)){
    for (var i = 0; i < collection.length; i++) {
        fun(collection[i],i);
        }
    } else {
        for(var key in collection) {
            fun(collection[key],key);
        }
    }
}

_.prototype.each = function(fun) {
    each(this.collection,fun);
    return this;
};

_.each = each;

_.prototype.filter = function(fun) {
    var result = [];

    this.each(function(n,i) {
        if(fun(n,i)) {
            result.push(n);
        }
    });
    this.collection = result;
    return this;
};

function map(collection,fun) {
    var result = [];

    _.each(collection,function(n,i) {
        result.push(fun(n));
    });
    return result;
}

_.prototype.map = function(fun) {
    var result = [];

    result = _.map(this.collection,fun);
    this.collection = result;
    return this;
};

_.map = map;

function mapValue(collection,fun) {
    each(collection,function(value,key) {
        value = fun(value,key);
        collection[key] = value;
    });
    return collection;
}

_.prototype.mapValue = function(fun){
    mapValue(this.collection,fun);
    return this;
}

_.mapValue = mapValue;

// function mapKey(collection,fun) {
//     each(collection,function(value,key) {
//         key = fun(value,key);
//         collection[key];
//     });
//     return collection;
// }

_.prototype.group = function(fun) {
    var array = {};

    this.each(function(n,i) {
        array[fun(n)] = array[fun(n)] || [];
        array[fun(n)].push(n);
    })
    this.collection = array;
    return this;
}

function reduce(collection,fun) {
    var result = collection[0];

    _.each(collection,function(n,i) {
        if(i === 0) {
            result = n;
        } else {
            result = fun(result,n);
        }
    });
    return result;
}

_.prototype.reduce = function(fun) {
    return reduce(this.collection,fun);
}

_.reduce = reduce;

_.prototype.no_repeat = function() {
    var array = {};
    var result = [];

    this.each(function(n) {
        m = n.split('-')[0]
        c = parseInt(n.split('-')[1]) || 1
        array[m + ' '] = array[m + ' '] || 0;
        array[m + ' '] += c;
    });
    return array;
}

_.prototype.value = function() {
    return this.collection;
};
