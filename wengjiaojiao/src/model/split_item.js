function get_group_item(inputs) {
    var temp = (_(inputs).group(function (n,i) {
       return n.split("-")[0];
    }).value());

    var group_item = {};
    for(var key in temp) {
        _(temp[key]).map(function(n, i) {
            if(n.indexOf("-") === -1) {
                temp[key][i] = 1;
            }else
            temp[key][i] = parseInt(n.split('-')[1]);
        })

        group_item[key] = (_(temp[key]).reduce(function(a, b) {
            return a + b;
        }).value());

    }
    return group_item;
}
function each(collection,fun) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            fun(collection[i], i);
        }
    }else {
        for (var key in collection) {
            fun(collection[key], key);
        }
    }
}

function _(collection) {
    if(!(this instanceof _)) {
        return new _(collection);
    }else
    this.collection = collection;
}
_.prototype = {
    each: function(fun) {
        each(this.collection, fun);
    },
    group:function(fun) {
        var result ={};
        this.each(function(n, i) {
            result[fun(n, i)] = result[fun(n, i)] || [];
            result[fun(n, i)].push(n);
        });
        this.collection = result;
        return this;
    },
    map:function(fun) {
        var result = [];
        this.each(function(n, i) {
            result.push(fun(n, i));
        });
        this.collection = result;
        return this;
    },
    reduce:function(fun) {
        var result = this.collection[0];
        this.each(function(n, i) {
            if(i === 0) {
                result = n;
            }else {
                result = fun(result,n);
            }
        });
        this.collection = result;
        return this;
    },
    value:function() {
        return this.collection;
    }
}
module.exports = get_group_item;
