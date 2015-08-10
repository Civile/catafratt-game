/*
==========================================
Input
Author http://www.edoardocasella.it
==========================================
*/

Input = function (preventDefault, DOMEl) {

    //Keys
    this.keys = {

        keyUp: false,
        keyDown: false,
        keyLeft: false,
        keyRight: false,
        keySpace: false,
        keyCtrl: false,
        keyShift: false,
        keyAlt: false,
        keyEsc: false,
        keyDel: false,
        keyCapsL: false,
        keyPageUp: false,
        keyPageDown: false,
        keyEnter: false,

        //Functions
        keyF1: false,
        keyF2: false,
        keyF3: false,
        keyF4: false,
        keyF5: false,
        keyF6: false,
        keyF7: false,
        keyF8: false,
        keyF9: false,
        keyF10: false,
        keyF11: false,
        keyF12: false,

        //Numbers
        key1: false,
        key2: false,
        key3: false,
        key4: false,
        key5: false,
        key6: false,
        key7: false,
        key8: false,
        key9: false,
        key0: false,

        //Letter
        keyA: false,
        keyB: false,
        keyC: false,
        keyD: false,
        keyE: false,
        keyF: false,
        keyG: false,
        keyH: false,
        keyI: false,
        keyJ: false,
        keyK: false,
        keyL: false,
        keyM: false,
        keyN: false,
        keyO: false,
        keyP: false,
        keyQ: false,
        keyR: false,
        keyS: false,
        keyT: false,
        keyU: false,
        keyV: false,
        keyW: false,
        keyX: false,
        keyY: false,
        keyZ: false,

        //Operators | num pad
        keySubtract: false,
        keyAdd: false,
        keyMultiply: false,
        keyDecimalPoint: false,
        keyDivide: false

        //Numbers | num pad
        //
        //

    };

    this.heldTime = new Array();

    //Mouse
    this.mouse = {
        position: {x: null, y:null },
        leftButton: false,
        middleButton: false,
        rightButton: false,
        wheelDelta: null
    };
};



Input.prototype.init = function (element, preventDefault) {

    var element = (element !== undefined ? element : document);

    return this.initKeyboard()
        .initMouse(element, true, preventDefault);
};


Input.prototype.initKeyboard = function () {
    
    var self = this;
    
    window.addEventListener('keydown', function (e) {

        e = (window.event || e);

        switch (e.which) {

            case 39: self.keys.keyRight = self.held('keyRight', true); break;
            case 37: self.keys.keyLeft = self.held('keyLeft', true); break;
            case 38: self.keys.keyUp = self.held('keyUp', true); break;
            case 40: self.keys.keyDown = self.held('keyDown', true); break;
            case 17: self.keys.keyCtrl = self.held('keyCtrl', true); break;
            case 16: self.keys.keyShift = self.held('keyShift', true); break;
            case 18: self.keys.keyAlt = self.held('keyAlt', true); break;
            case 32: self.keys.keySpace = self.held('keySpace', true); break;
            case 27: self.keys.keyEsc = self.held('keyEsc', true); break;
            case 46: self.keys.keyDel = self.held('keyDel', true); break;
            case 20: self.keys.keyCapsL = self.held('keyCapsL', true); break;
            case 33: self.keys.keyPageUp = self.held('keyPageUp', true); break;
            case 34: self.keys.keyPageDown = self.held('keyPageDown', true); break;
            case 13: self.keys.keyEnter = self.held('keyEnter', true); break;

                //Functions
            case 112: self.keys.keyF1 = self.held('keyF1', true); break;
            case 113: self.keys.keyF2 = self.held('keyF2', true); break;
            case 114: self.keys.keyF3 = self.held('keyF3', true); break;
            case 115: self.keys.keyF4 = self.held('keyF4', true); break;
            case 116: self.keys.keyF5 = self.held('keyF5', true); break;
            case 117: self.keys.keyF6 = self.held('keyF6', true); break;
            case 118: self.keys.keyF7 = self.held('keyF7', true); break;
            case 119: self.keys.keyF8 = self.held('keyF8', true); break;
            case 120: self.keys.keyF9 = self.held('keyF9', true); break;
            case 121: self.keys.keyF10 = self.held('keyF10', true); break;
            case 122: self.keys.keyF11 = self.held('keyF11', true); break;
            case 123: self.keys.keyF12 = self.held('keyF12', true); break;

                //Numbers
            case 48: self.keys.key0 = self.held('key0', true); break;
            case 49: self.keys.key1 = self.held('key1', true); break;
            case 50: self.keys.key2 = self.held('key2', true); break;
            case 51: self.keys.key3 = self.held('key3', true); break;
            case 52: self.keys.key4 = self.held('key4', true); break;
            case 53: self.keys.key5 = self.held('key5', true); break;
            case 54: self.keys.key6 = self.held('key6', true); break;
            case 55: self.keys.key7 = self.held('key7', true); break;
            case 56: self.keys.key8 = self.held('key8', true); break;
            case 57: self.keys.key9 = self.held('key9', true); break;

                //Letters
            case 65: self.keys.keyA = self.held('keyA', true); break;
            case 66: self.keys.keyB = self.held('keyB', true); break;
            case 67: self.keys.keyC = self.held('keyC', true); break;
            case 68: self.keys.keyD = self.held('keyD', true); break;
            case 69: self.keys.keyE = self.held('keyE', true); break;
            case 70: self.keys.keyF = self.held('keyF', true); break;
            case 71: self.keys.keyG = self.held('keyG', true); break;
            case 72: self.keys.keyH = self.held('keyH', true); break;
            case 73: self.keys.keyI = self.held('keyI', true); break;
            case 74: self.keys.keyJ = self.held('keyJ', true); break;
            case 75: self.keys.keyK = self.held('keyK', true); break;
            case 76: self.keys.keyL = self.held('keyL', true); break;
            case 77: self.keys.keyM = self.held('keyM', true); break;
            case 78: self.keys.keyN = self.held('keyN', true); break;
            case 79: self.keys.keyO = self.held('keyO', true); break;
            case 80: self.keys.keyP = self.held('keyP', true); break;
            case 81: self.keys.keyQ = self.held('keyQ', true); break;
            case 82: self.keys.keyR = self.held('keyR', true); break;
            case 83: self.keys.keyS = self.held('keyS', true); break;
            case 84: self.keys.keyT = self.held('keyT', true); break;
            case 85: self.keys.keyU = self.held('keyU', true); break;
            case 86: self.keys.keyV = self.held('keyV', true); break;
            case 87: self.keys.keyW = self.held('keyW', true); break;
            case 88: self.keys.keyX = self.held('keyX', true); break;
            case 89: self.keys.keyY = self.held('keyY', true); break;
            case 90: self.keys.keyZ = self.held('keyZ', true); break;


                //Operators
            case 106: self.keys.keyMultiply = self.held('keyMultiply', true); break;
            case 107: self.keys.keyAdd = self.held('keyAdd', true); break;
            case 109: self.keys.keySubtract = self.held('keySubtract', true); break;
            case 110: self.keys.keyDecimalPoint = self.held('keyDecimalPoint', true); break;
            case 111: self.keys.keyDivide = self.held('keyDivide', true); break;
            default: break;
        }
    });

    window.addEventListener('keyup', function (e) {

        e = window.event || e;

        switch (e.which) {

            case 39: self.keys.keyRight = self.held('keyRight', false); break;
            case 37: self.keys.keyLeft = self.held('keyLeft', false); break;
            case 38: self.keys.keyUp = self.held('keyUp', false); break;
            case 40: self.keys.keyDown = self.held('keyDown', false); break;
            case 17: self.keys.keyCtrl = self.held('keyCtrl', false); break;
            case 16: self.keys.keyShift = self.held('keyShift', false); break;
            case 18: self.keys.keyAlt = self.held('keyAlt', false); break;
            case 32: self.keys.keySpace = self.held('keySpace', false); break;
            case 27: self.keys.keyEsc = self.held('keyEsc', false); break;
            case 46: self.keys.keyDel = self.held('keyDel', false); break;
            case 20: self.keys.keyCapsL = self.held('keyCapsL', false); break;
            case 33: self.keys.keyPageUp = self.held('keyPageUp', false); break;
            case 34: self.keys.keyPageDown = self.held('keyPageDown', false); break;
            case 13: self.keys.keyEnter = self.held('keyEnter', false); break;

                //Functions
            case 112: self.keys.keyF1 = self.held('keyF1', false); break;
            case 113: self.keys.keyF2 = self.held('keyF2', false); break;
            case 114: self.keys.keyF3 = self.held('keyF3', false); break;
            case 115: self.keys.keyF4 = self.held('keyF4', false); break;
            case 116: self.keys.keyF5 = self.held('keyF5', false); break;
            case 117: self.keys.keyF6 = self.held('keyF6', false); break;
            case 118: self.keys.keyF7 = self.held('keyF7', false); break;
            case 119: self.keys.keyF8 = self.held('keyF8', false); break;
            case 120: self.keys.keyF9 = self.held('keyF9', false); break;
            case 121: self.keys.keyF10 = self.held('keyF10', false); break;
            case 122: self.keys.keyF11 = self.held('keyF11', false); break;
            case 123: self.keys.keyF12 = self.held('keyF12', false); break;

                //Numbers
            case 48: self.keys.key0 = self.held('key0', false); break;
            case 49: self.keys.key1 = self.held('key1', false); break;
            case 50: self.keys.key2 = self.held('key2', false); break;
            case 51: self.keys.key3 = self.held('key3', false); break;
            case 52: self.keys.key4 = self.held('key4', false); break;
            case 53: self.keys.key5 = self.held('key5', false); break;
            case 54: self.keys.key6 = self.held('key6', false); break;
            case 55: self.keys.key7 = self.held('key7', false); break;
            case 56: self.keys.key8 = self.held('key8', false); break;
            case 57: self.keys.key9 = self.held('key9', false); break;

                //Letters
            case 65: self.keys.keyA = self.held('keyA', false); break;
            case 66: self.keys.keyB = self.held('keyB', false); break;
            case 67: self.keys.keyC = self.held('keyC', false); break;
            case 68: self.keys.keyD = self.held('keyD', false); break;
            case 69: self.keys.keyE = self.held('keyE', false); break;
            case 70: self.keys.keyF = self.held('keyF', false); break;
            case 71: self.keys.keyG = self.held('keyG', false); break;
            case 72: self.keys.keyH = self.held('keyH', false); break;
            case 73: self.keys.keyI = self.held('keyI', false); break;
            case 74: self.keys.keyJ = self.held('keyJ', false); break;
            case 75: self.keys.keyK = self.held('keyK', false); break;
            case 76: self.keys.keyL = self.held('keyL', false); break;
            case 77: self.keys.keyM = self.held('keyM', false); break;
            case 78: self.keys.keyN = self.held('keyN', false); break;
            case 79: self.keys.keyO = self.held('keyO', false); break;
            case 80: self.keys.keyP = self.held('keyP', false); break;
            case 81: self.keys.keyQ = self.held('keyQ', false); break;
            case 82: self.keys.keyR = self.held('keyR', false); break;
            case 83: self.keys.keyS = self.held('keyS', false); break;
            case 84: self.keys.keyT = self.held('keyT', false); break;
            case 85: self.keys.keyU = self.held('keyU', false); break;
            case 86: self.keys.keyV = self.held('keyV', false); break;
            case 87: self.keys.keyW = self.held('keyW', false); break;
            case 88: self.keys.keyX = self.held('keyX', false); break;
            case 89: self.keys.keyY = self.held('keyY', false); break;
            case 90: self.keys.keyZ = self.held('keyZ', false); break;


                //Operators
            case 106: self.keys.keyMultiply = self.held('keyMultiply', false); break;
            case 107: self.keys.keyAdd = self.held('keyAdd', false); break;
            case 109: self.keys.keySubtract = self.held('keySubtract', false); break;
            case 110: self.keys.keyDecimalPoint = self.held('keyDecimalPoint', false); break;
            case 111: self.keys.keyDivide = self.held('keyDivide', false); break;
            default: break;
        }
    });

    return this;
};

Input.prototype.key = function (key) {
    return this.keys[key];
};

Input.prototype.held = function (keyName, status) {

    if (this.getHeldTime(keyName) && !status)
        return this.heldTime[keyName] = null;

    if (!this.heldTime[keyName] && status == true)
        return this.heldTime[keyName] = new Date();

    return this.heldTime[keyName];

};

Input.prototype.getHeldTime = function (keyName) {

    if (this.heldTime[keyName])
        return new Date() - this.heldTime[keyName];
    else return 0;

};

Input.prototype.initMouse = function (context, mouseWheel, preventDefault) {

    var self = this;

    $(context).mousemove(function (e) {

        e = $.event.fix(e);

        if (preventDefault)
            e.preventDefault();

        self.mouse.position.x = e.pageX;

        self.mouse.position.y = e.pageY;

    }).mousedown(function (e) {

        e = $.event.fix(e);

        if (preventDefault)
            e.preventDefault();

        switch (e.which) {

            case 1: self.mouse.leftButton = true; break;

            case 2: self.mouse.middleButton = true; break;

            case 3: self.mouse.rightButton = true; break;

            default: break;
        }

    }).mouseup(function (e) {

        e = $.event.fix(e);

        if (preventDefault)
            e.preventDefault();

        switch (e.which) {

            case 1: self.mouse.leftButton = false; break;

            case 2: self.mouse.middleButton = false; break;

            case 3: self.mouse.rightButton = false; break;

            default: break;
        }
    });

    if (!mouseWheel)
        return;

    $(context).bind('mousewheel', function (e) {    	// IE9, Chrome, Safari, Opera
        e = (window.event || e);

        if (preventDefault)
            e.preventDefault();

        self.mouse.wheelDelta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    }).bind('DOMMouseScroll', function (e) {            // Firefox

        e = (window.event || e);

        if (preventDefault)
            e.preventDefault();

        self.mouse.wheelDelta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    });

    //Reset mouse wheel
    setInterval(function () {

        self.mouse.wheelDelta = 0;

    }, 50);

    return this;

};
