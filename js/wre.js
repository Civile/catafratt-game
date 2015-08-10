/*
==========================================
Window onresize events
Author: http://www.edoardocasella.it
==========================================
*/

function isFunction(func) {

    var getType = {};

    return func && getType.toString.call(func) === '[object Function]';
};

Wre = function () {

    this.funcs = new Array();

    this.init();

};

Wre.prototype.init = function () {

    var instance = this;

    window.onresize = function () {

        for (var i in instance.funcs)
            instance.funcs[i].f();
    };
};

Wre.prototype.addEvent = function (func, eventName, exe) {

    if (func !== undefined && isFunction(func))
        this.funcs.push({
            f: func,
            n: (eventName || '')
        });

    if (exe === true)
        func();

    return this;
};

Wre.prototype.removeEvent = function (eventName) {

    for (var i in this.funcs)
        if (this.funcs[i].n === eventName)
            this.funcs.splice(i, 1);

    return this;
};


Wre.prototype.haveEvent = function (eventName) {

    for (var i in this.funcs)
        if (this.funcs[i].n === eventName)
            return true;

    return false;
};