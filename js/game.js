
var g = {
    cv: null,
    ctx: null,
    r: null,
    maxCards: 49,
    gcards: new Array(),
    _in: null,
    firstCard: null,
    secondCard: null,
    canSelect: function () {
        return (g.firstCard === null || g.secondCard === null);
    },
    rank: null,
    start: false,
    elapsedTime: 0,
    playing: true,
    lastGuessed: null
};

var firstPositionPoints;

var wre = null;


var p = {
    points: 0,
    wrongs: 0,
    name: null
};


var board = {
    width: 455,
    height: 455,
    position: new Point(),
    cols: 7,
    rows: 7,
    matrix: new Array(),
};


var src = {
    bgPat: 'src/redox_01.png',
    bgBoard1: 'src/boardbgs/1bw.jpg',
    bgBoard2: 'src/boardbgs/2bw.jpg',
    bgBoard3: 'src/boardbgs/3bw.jpg',
    cardback: 'src/cardbg/cardback.png',
    clock20: 'src/icons/clock20.png',
    star20: 'src/icons/star.png',
    error20: 'src/icons/error.png',
    cardbackHover: 'src/cardbg/cardbackHover.png',
    plusOne: 'src/plusOne.png',
    minusHalf: 'src/minusHalf.png',
    skull: 'src/faces/skull.png',
    peppeS: 'src/faces/peppeS.jpg',
    akg: 'src/faces/1kg.png',
    rosarioM: 'src/faces/rosarioM.jpg',
    dick: 'src/faces/dick.jpg',
    peppeF: 'src/faces/peppeF.png',
    feet: 'src/faces/feet.png',
    richardB: 'src/faces/richardB.jpg',
    guitar: 'src/faces/guitar.png',
    combo: 'src/combo.png',
    _3combo: 'src/3combo.png',
    n1: 'src/numbers/n1.png',
    n2: 'src/numbers/n2.png',
    n3: 'src/numbers/n3.png',
    trophy: 'src/trophy.png'
};

var bgBoard = null;



var snds = {
    inputok: {
        mp3: new Array('src/sounds/inputok.mp3'),
        ogg: new Array('src/sounds/inputok.ogg')
    },
    yes: {
        mp3: new Array('src/sounds/yes.mp3'),
        ogg: new Array('src/sounds/yes.ogg')
    },
    bgMusic1: {
        mp3: new Array('src/sounds/st1.mp3'),
        ogg: new Array('src/sounds/st1.ogg')
    },
    bgMusic2: {
        mp3: new Array('src/sounds/st2.mp3'),
        ogg: new Array('src/sounds/st2.ogg')
    },
    bgMusic3: {
        mp3: new Array('src/sounds/st3.mp3'),
        ogg: new Array('src/sounds/st3.ogg')
    },
    bgMusic4: {
        mp3: new Array('src/sounds/st4.mp3'),
        ogg: new Array('src/sounds/st4.ogg')
    },
    cartoonSlide: {
        mp3: new Array('src/sounds/canvasSlideDown.mp3'),
        ogg: new Array('src/sounds/canvasSlideDown.ogg')
    },
    pop: {
        mp3: new Array('src/sounds/pop.mp3'),
        ogg: new Array('src/sounds/pop.ogg')
    },
    navslide: {
        mp3: new Array('src/sounds/navslide.mp3'),
        ogg: new Array('src/sounds/navslide.ogg')
    },
    cardSlideUp: {
        mp3: new Array('src/sounds/card_slideUp.mp3'),
        ogg: new Array('src/sounds/card_slideUp.ogg')
    },
    cardsmatch: {
        mp3: new Array('src/sounds/cardsmatch.mp3'),
        ogg: new Array('src/sounds/cardsmatch.ogg')
    },
    cardswrong: {
        mp3: new Array('src/sounds/cardswrong.mp3'),
        ogg: new Array('src/sounds/cardswrong.ogg')
    },
    skullcard: {
        mp3: new Array('src/sounds/skullcard.mp3'),
        ogg: new Array('src/sounds/skullcard.ogg')
    },

    peppeS: {
        mp3: new Array('src/sounds/ps_monella.mp3', 'src/sounds/ps_scostumata.mp3'),
        ogg: new Array('src/sounds/ps_monella.ogg', 'src/sounds/ps_scostumata.ogg')
    },
    rosarioM: {
        mp3: new Array('src/sounds/rm_impotenti.mp3', 'src/sounds/rm_diventodonna.mp3', 'src/sounds/rm_noncelaf.mp3'),
        ogg: new Array('src/sounds/rm_impotenti.ogg', 'src/sounds/rm_diventodonna.ogg', 'src/sounds/rm_noncelaf.ogg')
    },
    peppeF: {
        mp3: new Array('src/sounds/pf_cafone.mp3', 'src/sounds/pf_vattene.mp3', 'src/sounds/pf_nonvogliamo.mp3'),
        ogg: new Array('src/sounds/pf_cafone.ogg', 'src/sounds/pf_vattene.ogg', 'src/sounds/pf_nonvogliamo.ogg')
    },
    richardB: {
        mp3: new Array('src/sounds/rb_spaventare.mp3', 'src/sounds/rb_dovestavo.mp3', 'src/sounds/rb_veronome.mp3', 'src/sounds/rb_vogliofare.mp3'),
        ogg: new Array('src/sounds/rb_spaventare.ogg', 'src/sounds/rb_dovestavo.ogg', 'src/sounds/rb_veronome.ogg', 'src/sounds/rb_vogliofare.ogg')
    },
    select: {
        mp3: new Array('src/sounds/select.mp3'),
        ogg: new Array('src/sounds/select.ogg')
    },
    combo: {
        mp3: new Array('src/sounds/combo.mp3'),
        ogg: new Array('src/sounds/combo.ogg')
    }

};
var type = '';
var types = ['ogg', 'mp3'];
var activeMusic = null;
var bgVol = 0.7;
var sndVol = 1;



var card = {
    w: 60,
    h: 60,
    marginL: 3,
    marginT: 2
};



function Point(x, y) {
    this.x = x || null;
    this.y = y || null;
};


function mouseToCanvas(mcoord) {

    if (mcoord === undefined)
        return;

    var cvc;

    cvc = g.cv.getBoundingClientRect();
    $('#test').text('CORD: ' + mcoord.x);
    return {
        x: (mcoord.x - cvc.left) * (g.cv.width / cvc.width),
        y: (mcoord.y - cvc.top) * (g.cv.height / cvc.height)
    }
};



function getKey(e) {
    if (e === undefined)
        return null;

    e = $.event.fix(e);

    return (e.keyCode || e.charCode || e.which);
}


function stopSound(snd) {
    snd.pause();
    snd.currentTime = 0;
    return snd;
};


function fadeVolume(audio, callback) {
    var factor = 0.01,
        speed = 50;
    if (audio.volume > factor) {
        setTimeout(function () {
            audio.volume -= factor;
            fadeVolume(audio, callback);
        }, speed);
    } else {
        (typeof (callback) !== 'function') || callback();
    }
}


function ieVer() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}




function Rank(callback) {
    this.xml;
    this.writer;
    this.init(callback);
};



Rank.prototype.init = function (callback) {

    var scope = this;

    $.ajax({
        url: 'data/rank.xml', 
        dataType: "xml",
        type: 'GET',
        success: function (data) {
            scope.xml = data;
            if (callback !== undefined)
                callback();
        },
        error: function () {
            throw ("Error: Something went wrong");
        }

    });
};



Rank.prototype.getNodes = function (nodeName, total) {
    var players = $(this.xml).find(nodeName);

    var out = new Array();
    var p;
    var pl;

    for (var i = 0; i < total; i++) {
        if (players[i] === undefined)
            break;

        pl = players[i];

        p = new Object();

        p.name = $(pl).find('name').eq(0).text();
        p.time = $(pl).find('time').eq(0).text();
        p.errors = Math.floor($(pl).find('errors').eq(0).text());
        p.points = Math.floor($(pl).find('points').eq(0).text());

        out.push(p);
    }

    return out;
};



Rank.prototype.addNode = function (n, e, t, p) {

    $.ajax({
        url: 'php/xmlWriter.php', 
        data: "write=1&name=" + n + "&errors=" + e + "&time=" + t + "&points=" + p + "",
        type: 'POST',
        success: function (data) {

        },
        error: function () {
            throw ("Error: Something went wrong in Rank.prototype.addNode");
        }

    });
};




var start = null;


function updateTime() {
    if (start === null)
        return;

    $('.voiceTime span').text((g.elapsedTime = calculateTime(start).substring(3, 8)));
};


function calculateTime(st) {

    var totSec = (new Date - st) / 1000;
    var hours = Math.floor(totSec / 3600);

    totSec = totSec % 3600;

    var minutes = Math.floor(totSec / 60);
    totSec = totSec % 60;

    var seconds = Math.floor(totSec);

    hours = timeString(hours);
    minutes = timeString(minutes);
    seconds = timeString(seconds);
    return hours + ":" + minutes + ":" + seconds;
};



function startTiming() {
    start = new Date();
};



function timeString(num) {
    return (num < 10 ? "0" : "") + num;
};





SoundLoader = function (onComplete, onProgress, onError) {

    this.errors = new Array();
    this.total = 0;
    this.loaded = 0;
    this.percentage = 0;
    this.loading = false;

    this.oncomplete = (onComplete !== undefined ? onComplete : undefined);
    this.onerror = (onError !== undefined ? onError : undefined);
    this.onprogress = (onProgress !== undefined ? onProgress : undefined);

    this.sources = [];
};

SoundLoader.prototype.addSrc = function (source, callback) {

    if (source !== undefined) {
        this.sources.push({
            src: source,
            onLoad: callback
        });
    }

    this.total = this.sources.length;
};


SoundLoader.prototype.startLoading = function () {
    for (var i = 0; i <= this.total - 1; i++)
        this.loadSound(this.sources[i].src, this.sources[i].onLoad);
};


SoundLoader.prototype.loadSound = function (source, onLoad) {

    var scope = this;
    var sound;
    this.loading = true;

    sound = new Audio();

    sound.addEventListener('canplaythrough', function () {

        if (onLoad !== undefined)
            onLoad(this);

        scope.loaded++;

        scope.percentage = (scope.loaded * 100) / scope.total;

        if (scope.onprogress !== undefined)
            scope.onprogress(this);

        if (scope.percentage === 100) {

            scope.loading = false;

            if (scope.oncomplete !== undefined)
                return scope.oncomplete();
        }

    });


    sound.addEventListener('error', function () {
        scope.errors.push(source);

        if (scope.onerror !== undefined)
            return scope.onerror(this);
    });

    sound.src = source;

};




ImageLoader = function (onComplete, onProgress, onError) {

    this.errors = [];
    this.total = 0;
    this.loaded = 0;
    this.percentage = 0;
    this.loading = false;

    this.oncomplete = (onComplete !== undefined ? onComplete : undefined);
    this.onerror = (onError !== undefined ? onError : undefined);
    this.onprogress = (onProgress !== undefined ? onProgress : undefined);

    this.crossOrigin = true;

    this.sources = [];
};


ImageLoader.prototype.addSrc = function (source, callback) {

    if (source !== undefined) {
        this.sources.push({
            src: source,
            onLoad: callback
        });
    }

    this.total = this.sources.length;

};


ImageLoader.prototype.startLoading = function () {

    for (var i = 0; i <= this.total - 1; i++)
        this.loadImage(this.sources[i].src, this.sources[i].onLoad);

};


ImageLoader.prototype.loadImage = function (source, onLoad) {

    var scope = this;
    var image;


    this.loading = true;

    image = new Image();


    image.onload = function () {

        if (onLoad !== undefined)
            onLoad(this);

        scope.loaded++;

        scope.percentage = (scope.loaded * 100) / scope.total;

        if (scope.onprogress !== undefined)
            scope.onprogress();


        if (scope.percentage === 100) {

            scope.loading = false;

            if (scope.oncomplete !== undefined)
                return scope.oncomplete();
        }


    };



    image.onerror = function () {

        scope.errors.push(source);

        if (scope.onerror !== undefined)
            return scope.onerror(this);

    };



    image.crossOrigin = this.crossOrigin;

    image.src = source;

};


Input = function (preventDefault, DOMEl) {

  
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


        keySubtract: false,
        keyAdd: false,
        keyMultiply: false,
        keyDecimalPoint: false,
        keyDivide: false



    };

    this.heldTime = new Array();


    this.mouse = {
        position: { x: null, y: null },
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

    $(context).bind('mousewheel', function (e) {    	
        e = (window.event || e);

        if (preventDefault)
            e.preventDefault();

        self.mouse.wheelDelta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    }).bind('DOMMouseScroll', function (e) {            

        e = (window.event || e);

        if (preventDefault)
            e.preventDefault();

        self.mouse.wheelDelta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    });


    setInterval(function () {

        self.mouse.wheelDelta = 0;

    }, 50);

    return this;

};



function appendCard(x, y, w, h, fname, fsrc) {
    g.gcards.push(new Card(x, y, w, h, { name: fname, src: fsrc }));
};


function appendCardsToMatrix() {

   
    for (i = 0; i <= board.rows; i++)
        board.matrix[i] = new Array();

    var c = 0;
    var x = 0;
    var y = 0;
    var rrow, rcol;

    
    while (c < (board.cols * board.rows)) {

        rcol = Math.floor((Math.random() * board.cols) + 0);
        rrow = Math.floor((Math.random() * board.rows) + 0);

        if (board.matrix[rrow][rcol])
            continue;
        else {
            res = getNextFace();
            x = (rcol * 65) + 25;
            y = (65 * rrow) + 25;
            appendCard(x, y, card.w, card.h, res, src[res]);
            board.matrix[rrow][rcol] = true;
            c++;
        }

    }

};


var faces = {
    peppeS: 6,
    akg: 6,
    peppeF: 6,
    feet: 6,
    rosarioM: 6,
    dick: 6,
    skull: 1,
    richardB: 6,
    guitar: 6
}

function getNextFace() {
    for (var i in faces) {
        if (faces[i] > 0) {
            faces[i]--;
            return i;
        }
    }
};



var a_sup = 'slidingUp';
var a_sdown = 'slidingDown';
var a_right = 'slideRightDisappear';

function Card(x, y, w, h, face) {

    this.position = new Point(x, y);
    this.w = (w || undefined);
    this.h = 4;
    this.face = { name: face.name, src: face.src };
    this.linkedTo = this.getFaceLink();
    this.action = null;
    this.backBg = src.cardback;
    this.acc = 2.5;
    this.vel = 0;

    this.guessed = false;
    this.mouseOver = false;
};


Card.prototype.update = function () {

    if (this.h === 0)
        return;

    
    if (this.isHover()) {
        this.backBg = src.cardbackHover;
        this.mouseOver = true;
    }
    else {
        this.backBg = src.cardback;
        this.mouseOver = false;
    }

    if (g.canSelect())
        if (!this.isAnimating())
            if (g._in.mouse.leftButton === true)
                if (this.isHover()) {
                    stopSound(snds.pop[type][0]).play();
                    this.action = a_sup;
                    stopSound(snds.cardSlideUp[type][0]).play();

                   
                    if (g.firstCard === null)
                        g.firstCard = this;
                    else g.secondCard = this;
                }

   
    if (this.action !== null)
        this.performAction();

    if (this.guessed === true && this.h === 4)
        this.h = 0;

};


Card.prototype.isHover = function () {

    var mc = mouseToCanvas(g._in.mouse.position);

    if (mc.x <= this.position.x + this.w && mc.x >= this.position.x
        && mc.y <= this.position.y + this.h && mc.y >= this.position.y)
        return true;

    return false;
};


Card.prototype.performAction = function () {

    switch (this.action) {
        case a_sup: 
            this.h -= this.vel;
            this.vel += this.acc;
            if (this.h <= 4) {
                this.h = 4;
                this.action = null;
                this.vel = 0;
            }
            break;
        case a_sdown:
            this.h += this.vel;
            this.vel += this.acc / 8;
            if (this.h >= 60) {
                this.h = 60;
                this.action = null;
                this.vel = 0;
                if (g.secondCard === this)
                    g.secondCard = null;
                if (g.firstCard === this)
                    g.firstCard = null;
            }
            break;
        case a_right:
            this.position.x += this.vel;
            this.vel += this.acc;
            if (this.position.x >= g.cv.width) {
                this.action = null;
                this.vel = 0;
                g.gcards.splice(g.gcards.indexOf(this), 1);
            }
            break;
    };

};



Card.prototype.isAnimating = function () {
    return (this.action === null ? false : this.action);
};



Card.prototype.getFaceLink = function () {

    switch (this.face.name) {
        case 'peppeS': return this.faceLink = 'akg';
        case 'akg': return this.faceLink = 'peppeS';
        case 'peppeF': return this.faceLink = 'feet';
        case 'feet': return this.faceLink = 'peppeF';
        case 'rosarioM': return this.faceLink = 'dick';
        case 'dick': return this.faceLink = 'rosarioM';
        case 'richardB': return this.faceLink = 'guitar';
        case 'guitar': return this.faceLink = 'richardB';
    };

};






function Number(x, y, src) {
    this.position = new Point(x || undefined, y || undefined);
    this.positionStart = new Point(x || undefined, y || undefined);
    this.vel = 0;
    this.acc = 0.1;
    this.src = (src || undefined);
    this.remove = false;
    this.opacity = 1;
    this.w = 20;
    this.h = 18;
};



Number.prototype.update = function () {
    this.vel += this.acc;
    this.position.y -= this.vel;
    this.opacity -= 0.01;
    if (this.opacity <= 0)
        this.remove = true;
};


'use strict';


$(window).load(function () {

    g.cv = document.getElementById('cv');
    g.ctx = g.cv.getContext('2d');
    g.r = new Renderer();
    wre = new Wre();


    g._in = new Input();
    g._in.init(document);
    wre.addEvent(function () {
        $('body').width(window.innerWidth)
            .height(window.innerHeight);
    }, 'wndResize');


    
    $(document).keyup(function (e) {
        var key = getKey(e);
        if (key == 44) {
            alert('Ehi furbacchione! Adesso col cavolo che giochi!');
            g.playing = false;
            g.maxCards = 1;
        }
    });

    if (ieVer() !== false)
        $('#advice').css('display', 'block');

  
    loadSrcs(function () {
        setTimeout(function () {
            slideUpCover();
            loadNameForm();
            startSoundtrack();
        }, 1000);

    }).startLoading();

    g.rank = new Rank(function () {
        loadRank();
    });

    $('#tableCont').slimScroll({
        height: '270px',
        railVisible: true,
        alwaysVisible: true
    });

    setInterval(function () {
        g.rank = new Rank(function () {
            loadRank();
        });
    }, 5000);

});



function init() {
    p.attempts = 0;
    p.points = 0;
    board.position.x = (g.cv.width / 2) - (board.width / 2);
    board.position.y = (g.cv.height / 2) - (board.height / 2);
    appendCardsToMatrix();
    bgBoard = src['bgBoard' + Math.floor((Math.random() * 3) + 1)];
    startTiming();
};


function loop() {
    update();
    g.r.render();
    requestAnimationFrame(loop);
};



function update() {

    updateTime();

    if (!g.start) {
        g.timeToStart = Math.floor(g.elapsedTime.substring(4, g.elapsedTime.length));
        if (g.timeToStart === 4) {
            snds.cartoonSlide[type][0].play();
            for (var i in g.gcards)
                g.gcards[i].action = a_sdown;

            g.start = true;
        }
        return;
    }

    if (g.maxCards > 1)
        checkCards();
    else
        theEnd();

    if (p.name === null)
        return;

    for (var i in g.gcards) {
        g.gcards[i].update();
        if (g.gcards[i] instanceof Number)
            if (g.gcards[i].remove === true) {
                g.gcards.splice(i, 1);
                continue;
            }
    }


};



var combo = false;

function checkCards() {

    
    if (g.firstCard !== null)
        if (g.firstCard.face.name === 'skull' && !g.firstCard.isAnimating()) {
            stopSound(snds.skullcard[type][0]).play();
            g.firstCard.action = a_sdown;
            p.points -= 0.5;
            g.gcards.push(new Number(g.firstCard.position.x + ((g.firstCard.w / 2) - 30), g.firstCard.position.y, src.minusHalf));
            return g.firstCard = null;
        }

    if (g.firstCard !== null && g.secondCard !== null)
        if (!g.firstCard.isAnimating() && !g.secondCard.isAnimating())
            if (g.firstCard.linkedTo !== g.secondCard.face.name) {
                
                g.firstCard.action = a_sdown;
                g.secondCard.action = a_sdown;

                if (g.secondCard.face.name === 'skull') {
                    p.points -= 0.5;
                    stopSound(snds.skullcard[type][0]).play();
                    g.gcards.push(new Number(g.secondCard.position.x + ((g.secondCard.w / 2) - 30), g.secondCard.position.y, src.minusHalf));
                }

                
                if (g.firstCard.face.name === 'peppeS')
                    snds.peppeS[type][Math.floor((Math.random() * snds.peppeS[type].length) + 0)].play();
                else if (g.firstCard.face.name === 'rosarioM')
                    snds.rosarioM[type][Math.floor((Math.random() * snds.rosarioM[type].length) + 0)].play();
                else if (g.firstCard.face.name === 'peppeF')
                    snds.peppeF[type][Math.floor((Math.random() * snds.peppeF[type].length) + 0)].play();
                else if (g.firstCard.face.name === 'richardB') {
                    snds.richardB[type][Math.floor((Math.random() * snds.richardB[type].length) + 0)].play();
                    $('#display').effect('shake', {
                        times: 30,
                        distance: 2
                    }, 1700);
                }
                else
                    stopSound(snds.cardswrong[type][0]).play();

                combo = false;
                p.wrongs++;
                g.lastGuessed = null;
            }
            else {
                
                stopSound(snds.cardsmatch[type][0]).play();
                g.firstCard.guessed = g.secondCard.guessed = true;

                
                g.gcards.push(new Number(g.firstCard.position.x + ((g.firstCard.w / 2) - 30), g.firstCard.position.y, src.plusOne));
                g.gcards.push(new Number(g.secondCard.position.x + ((g.secondCard.w / 2) - 30), g.secondCard.position.y, src.plusOne));

                
                if (g.lastGuessed !== null) {
                    var elap = calculateTime(g.lastGuessed);
                    if (Math.floor(elap.substring(7, elap.length)) < 3) {
                        stopSound(snds.combo[type][0]).play();
                        g.gcards.push(new Number(g.secondCard.position.x + ((g.secondCard.w / 2) - 30), g.secondCard.position.y, src.combo));
                        p.points += 3;
                        if (combo === true) {
                            g.gcards.push(new Number(g.secondCard.position.x + ((g.secondCard.w / 2) - 10), g.secondCard.position.y, src._3combo));
                            stopSound(snds.yes[type][0]).play();
                        }
                        combo = true;
                    }
                }

                g.lastGuessed = new Date();
                g.firstCard = g.secondCard = null;
                g.maxCards -= 2;
                p.points += 2;

            }
};



function loadSrcs(callback) {

    var l = new ImageLoader();

    l.addSrc(src.bgBoard1, function (param) { src.bgBoard1 = param; });
    l.addSrc(src.bgBoard2, function (param) { src.bgBoard2 = param; });
    l.addSrc(src.bgBoard3, function (param) { src.bgBoard3 = param; });
    l.addSrc(src.bgPat, function (param) { src.bgPat = param; });
    l.addSrc(src.cardback, function (param) { src.cardback = param; });
    l.addSrc(src.cardbackHover, function (param) { src.cardbackHover = param; });
    l.addSrc(src.skull, function (param) { src.skull = param; });
    l.addSrc(src.peppeS, function (param) { src.peppeS = param; });
    l.addSrc(src.rosarioM, function (param) { src.rosarioM = param; });
    l.addSrc(src.peppeF, function (param) { src.peppeF = param; });
    l.addSrc(src.akg, function (param) { src.akg = param; });
    l.addSrc(src.plusOne, function (param) { src.plusOne = param; });
    l.addSrc(src.feet, function (param) { src.feet = param; });
    l.addSrc(src.dick, function (param) { src.dick = param; });
    l.addSrc(src.guitar, function (param) { src.guitar = param; });
    l.addSrc(src.richardB, function (param) { src.richardB = param; });
    l.addSrc(src.minusHalf, function (param) { src.minusHalf = param; });
    l.addSrc(src.clock20, function (param) { src.clock20 = param; });
    l.addSrc(src.star20, function (param) { src.star20 = param; });
    l.addSrc(src.error20, function (param) { src.error20 = param; });
    l.addSrc(src.combo, function (param) { src.combo = param; });
    l.addSrc(src._3combo, function (param) { src._3combo = param; });

    l.addSrc(src.n1, function (param) { src.n1 = param; });
    l.addSrc(src.n2, function (param) { src.n2 = param; });
    l.addSrc(src.n3, function (param) { src.n3 = param; });
    l.addSrc(src.trophy, function (param) { src.trophy = param; });

    l.oncomplete = function () {
        loadSounds(callback);
    };

    l.onerror = function (param) {
        alert('Operation failed while loading: ' + param.src);
    };

    l.onprogress = function (param) {
        appendPercentage('CARICO LE RISORSE CATAFRATTE..' + Math.floor(this.percentage) + '%');
    };
    return l;
};



function loadSounds(callback) {

    var l = new SoundLoader();

    for (var i in types)
        if (Modernizr.audio[types[i]]) {
            type = types[i];
            break;
        }

    l.addSrc(snds.bgMusic1[type][0], function (param) { snds.bgMusic1[type][0] = param; });
    l.addSrc(snds.bgMusic2[type][0], function (param) { snds.bgMusic2[type][0] = param; });
    l.addSrc(snds.bgMusic3[type][0], function (param) { snds.bgMusic3[type][0] = param; });
    l.addSrc(snds.bgMusic4[type][0], function (param) { snds.bgMusic4[type][0] = param; });
    l.addSrc(snds.cartoonSlide[type][0], function (param) { snds.cartoonSlide[type][0] = param; snds.cartoonSlide[type][0].volume = sndVol; });
    l.addSrc(snds.pop[type][0], function (param) { snds.pop[type][0] = param; snds.pop[type][0].volume = sndVol; });
    l.addSrc(snds.navslide[type][0], function (param) { snds.navslide[type][0] = param; snds.navslide[type][0].volume = sndVol; });
    l.addSrc(snds.cardSlideUp[type][0], function (param) { snds.cardSlideUp[type][0] = param; snds.cardSlideUp[type][0].volume = sndVol; });
    l.addSrc(snds.cardsmatch[type][0], function (param) { snds.cardsmatch[type][0] = param; snds.cardsmatch[type][0].volume = sndVol; });
    l.addSrc(snds.cardswrong[type][0], function (param) { snds.cardswrong[type][0] = param; snds.cardswrong[type][0].volume = (sndVol / 2.5); });
    l.addSrc(snds.inputok[type][0], function (param) { snds.inputok[type][0] = param; });
    l.addSrc(snds.skullcard[type][0], function (param) { snds.skullcard[type][0] = param; });
    l.addSrc(snds.combo[type][0], function (param) { snds.combo[type][0] = param; });
    l.addSrc(snds.select[type][0], function (param) { snds.select[type][0] = param; });
    l.addSrc(snds.yes[type][0], function (param) { snds.yes[type][0] = param; });


    
    l.addSrc(snds.peppeS[type][0], function (param) { snds.peppeS[type][0] = param; snds.peppeS[type][0].volume = sndVol; });
    l.addSrc(snds.peppeS[type][1], function (param) { snds.peppeS[type][1] = param; snds.peppeS[type][1].volume = sndVol; });
   
    l.addSrc(snds.rosarioM[type][0], function (param) { snds.rosarioM[type][0] = param; snds.rosarioM[type][0].volume = sndVol; });
    l.addSrc(snds.rosarioM[type][1], function (param) { snds.rosarioM[type][1] = param; snds.rosarioM[type][1].volume = sndVol; });
    l.addSrc(snds.rosarioM[type][2], function (param) { snds.rosarioM[type][2] = param; snds.rosarioM[type][2].volume = sndVol; });

 
    l.addSrc(snds.peppeF[type][0], function (param) { snds.peppeF[type][0] = param; snds.peppeF[type][0].volume = 1; });
    l.addSrc(snds.peppeF[type][1], function (param) { snds.peppeF[type][1] = param; snds.peppeF[type][1].volume = 1; });
    l.addSrc(snds.peppeF[type][2], function (param) { snds.peppeF[type][2] = param; snds.peppeF[type][2].volume = 1; });
   
    l.addSrc(snds.richardB[type][0], function (param) { snds.richardB[type][0] = param; snds.richardB[type][0].volume = sndVol * 0.5; });
    l.addSrc(snds.richardB[type][1], function (param) { snds.richardB[type][1] = param; snds.richardB[type][1].volume = sndVol * 0.5; });
    l.addSrc(snds.richardB[type][2], function (param) { snds.richardB[type][2] = param; snds.richardB[type][2].volume = sndVol * 0.5; });
    l.addSrc(snds.richardB[type][3], function (param) { snds.richardB[type][3] = param; snds.richardB[type][3].volume = sndVol * 0.5; });

    l.onprogress = function (param) {
        appendPercentage('CARICO LE ASSURDITA\' SONORE...' + Math.floor(this.percentage) + '%');
    };

    l.onerror = function (param) {
        alert('TEST :::: Operation failed while loading: ' + param.src);
    };

    l.oncomplete = function (param) {
        if (callback !== undefined)
            callback();
    };

    l.startLoading();
};



function loadPage() {

    $('#display').css('visibility', 'visible').hide()
        .css('margin-top', '-600px').show()
            .animate({ marginTop: (($(document).height() / 2) - 30) - ($('#display').height() / 2) - 50 }, {
                duration: 500,
                start: snds.cartoonSlide[type][0].play(),
                complete: function () {
                    loadLeftMenu();
                    wre.addEvent(function () {
                        $('#display').css('marginTop', (($(document).height() / 2) - 30) - ($('#display').height() / 2) - 50);
                    }, 'wndResize');
                }
            });
    init();
    loop();

};



function slideUpCover(callback) {
    if ($('#curtain')[0])
        $('#curtain').slideUp('slow', function () {
            if (callback !== undefined && callback)
                callback();
        });
};



function appendPercentage(text) {
    if (text !== undefined)
        $('#curtain .percentage').text(text);
};



function printPoints() {
    $('.guessed').text(p.points);
    $('.wrongs').text(p.wrongs);
};



function startSoundtrack() {
    snds.bgMusic2[type][0].play();
    activeMusic = snds.bgMusic2[type][0];
    activeMusic.volume = bgVol;
    snds.bgMusic2[type][0].onended = function () {
        snds.bgMusic1[type][0].play();
        activeMusic = snds.bgMusic1[type][0];
        activeMusic.volume = bgVol;
        snds.bgMusic1[type][0].onended = function () {
            snds.bgMusic3[type][0].play();
            activeMusic = snds.bgMusic3[type][0];
            activeMusic.volume = bgVol;
            snds.bgMusic3[type][0].onended = startSoundtrack;
        };
    };
};




function loadLeftMenu() {

    loadLi($('#leftMenu li').eq(0));

    $('.musicControl').click(function (e) {
        e = $.event.fix(e);
        e.preventDefault();
        if (!activeMusic.paused) {
            $(this).text('play music');
            return activeMusic.pause();
        }
        else {
            $(this).text('stop music');
            return activeMusic.play();
        }
    });

    $('.rankButton a').click(function (e) {
        e = $.event.fix(e);
        e.preventDefault();
        stopSound(snds.select[type][0]).play();
        var li = $(this).parent().parent();
        var mleft = $(li).css('marginLeft').replace('px', '');

        if (Math.floor(mleft) > -300)
            $(li).stop(true, false).animate({ marginLeft: '-315px' }, 400);
        else
            $(li).stop(true, false).animate({ marginLeft: '-40px' }, 400);
    });

};




function loadLi(li) {

    var mg = -160;

    if ($(li).hasClass('voiceTxt'))
        mg = -40;

    $(li).eq(0).animate({ marginLeft: mg + 'px' }, {
        duration: 200,
        start: function () { snds.navslide[type][0].play(); },
        complete: function () {
            var next = $(this).next('li');
            if (next.length)
                loadLi(next);
        }

    });
};



function loadNameForm() {

    $('#nameForm').css('visibility', 'visible')
        .css('left', $(g.cv).offset().left + ($(g.cv).width() / 2) - ($('#nameForm').width() / 2))
            .css('top', $(g.cv).offset().top).animate({ opacity: 1 }, {
                duration: 500,
                complete: function () {
                    $('#nameForm input[type=text]').focus();
                }
            });

    $('#nameForm input[type=text]').keyup(function (e) {
        var key = getKey(e);

        if (key === 13 && $(this).val().replace(/\s+/g, "") !== "") {
            p.name = $(this).val();

            $(this).unbind('keyup');
            snds.inputok[type][0].play();

            $('#nameForm').effect('highlight', { color: 'yellow', times: 10 }, 500, function () {
                $(this).animate({ left: 0 - ($(this).width() + 20), top: '0px', width: 0, height: 0, }, {
                    duration: 400,
                    complete: function () {
                        loadPage();
                        $(this).hide();
                    }
                });
            });


        }
    });

};



function loadRank() {
    var pl = g.rank.getNodes('player', 200);

    pl.sort(compare);

    var rows = new String();

    for (var i = 0; i < pl.length; i++) {
        if (i === 0)
            firstPositionPoints = pl[i].points;

        rows += '<tr><td>' + (i + 1) + '</td><td>' + pl[i].name + '</td><td style="color:#3A6B3B;">' + pl[i].points + '</td><td style="color:#7A3018;">' + pl[i].errors + '</td><td>' + pl[i].time + '</td></tr>';
    }
    $('.rankTable tbody').html(rows);
};

function compare(a, b) {
    if (b.points < a.points)
        return -1;
    if (b.points > a.points)
        return 1;
    return 0;
}

function saveRank() {
    g.rank.addNode(p.name, p.wrongs, g.elapsedTime, p.points);
};



function theEnd() {

    if (g.playing === true) {

        saveRank();
        g.playing = false;

        for (var i in g.gcards)
            if (g.gcards[i] instanceof Card)
                g.gcards[i].action = a_right;

        g.gcards.push((g.r.finalScreen = new FinalScreen()));

        fadeVolume(activeMusic, function () {
            activeMusic.onended = null;
            activeMusic = snds.bgMusic4[type][0];
            activeMusic.volume = bgVol;
            activeMusic.play();
        });

    }
};





function Renderer() {
    this.finalScreen;
};



Renderer.prototype.rect = function (x, y, w, h, bg, br, shadow) {
    g.ctx.fillStyle = (bg !== undefined ? bg : 'transparent');
    g.ctx.strokeStyle = (br !== undefined ? br : 'transparent');
    g.ctx.rect(x, y, w, h);

    if (shadow !== undefined) {
        g.ctx.shadowColor = shadow.color;
        g.ctx.shadowBlur = shadow.blur;
        g.ctx.shadowOffsetX = shadow.offsetX;
        g.ctx.shadowOffsetY = shadow.offsetY;
    }

    g.ctx.fill();
    g.ctx.stroke();
    return this;
};




Renderer.prototype.drawBoard = function () {
    g.ctx.save();
    g.ctx.beginPath();
    g.r.rect(board.position.x,
             board.position.y,
             board.width, board.height, 'white', '#ddd', {
                 color: 'black',
                 offsetX: 0,
                 offsetY: 0,
                 blur: 0,
             });
    g.ctx.closePath();

    
    g.ctx.drawImage(bgBoard, 25, 25, 450, 450);

    g.ctx.restore();
    return this;
};




Renderer.prototype.drawBg = function () {

    var pattern;

    g.ctx.save();
    g.ctx.beginPath();
    pattern = g.ctx.createPattern(src.bgPat, 'repeat');
    this.rect(0, 0, g.cv.width, g.cv.height, pattern);
    g.ctx.closePath();
    g.ctx.restore();
    return this;
};




Renderer.prototype.render = function () {
    this.clear();
    this.drawBg();
    this.drawBoard();
    this.drawCards();
    this.drawElapsed();
    this.drawPoints();

    if (!g.start)
        this.drawCountdownNumber();

    if (this.finalScreen)
        this.finalScreen.drawScreen();


    return this;
};




Renderer.prototype.clear = function () {
    g.ctx.save();
    g.ctx.fillRect(0, 0, g.cv.width, g.cv.height);
    g.ctx.restore();
    return this;
};



Renderer.prototype.drawCards = function () {
    for (var i in g.gcards) {
        if (g.gcards[i] instanceof Card)
            this.drawCard(g.gcards[i]);
        else if (g.gcards[i] instanceof Number)
            this.drawNumber(g.gcards[i]);
    }
};



Renderer.prototype.drawCard = function (tc) {
    if (tc === undefined || !tc instanceof Card)
        return false;

    var shadow = undefined;

    if (tc.guessed)
        return;

    g.ctx.save();
    g.ctx.beginPath();
    this.rect(tc.position.x - 2.5, tc.position.y - 2.5, 65, 65, 'white', '#333');
    g.ctx.closePath();
    g.ctx.drawImage(tc.face.src, 0, 0, tc.face.src.width, tc.face.src.height, tc.position.x, tc.position.y, tc.face.src.width, tc.face.src.height);
    g.ctx.restore();

    g.ctx.save();
    g.ctx.beginPath();
    if (tc.mouseOver === true || tc.h == 4)
        shadow = {
            color: '#36611D',
            offsetX: 0,
            offsetY: 0,
            blur: 15
        }
    this.rect(tc.position.x, tc.position.y, tc.w, tc.h, '#19B9E3', undefined, shadow);
    g.ctx.drawImage(tc.backBg, 0, 0, tc.w, tc.h, tc.position.x, tc.position.y, tc.w, tc.h);
    g.ctx.closePath();
    g.ctx.restore();
};



Renderer.prototype.drawCursor = function () {
    var coord = new Point();
    coord = mouseToCanvas(g._in.mouse.position);
    g.ctx.drawImage(src.cursor, coord.x, coord.y, src.cursor.width, src.cursor.height);
};



Renderer.prototype.drawNumber = function (n) {
    g.ctx.save();
    g.ctx.beginPath();
    g.ctx.globalAlpha = n.opacity;
    g.ctx.drawImage(n.src, n.position.x, n.position.y, n.src.width, n.src.height);
    g.ctx.closePath();
    g.ctx.restore();
};


Renderer.prototype.drawElapsed = function () {
    g.ctx.save();
    g.ctx.font = '11pt Calibri';
    g.ctx.fillStyle = 'black';
    g.ctx.drawImage(src.clock20, 20, 486, 20, 20);
    g.ctx.fillText('' + g.elapsedTime, 44, 501);
    g.ctx.restore();
};


Renderer.prototype.drawPoints = function () {
    g.ctx.save();
    g.ctx.drawImage(src.star20, 440, 1, 20, 20);
    g.ctx.font = '12pt Calibri';
    g.ctx.fillStyle = 'black';
    g.ctx.fillText('' + p.points, 462, 16);
    g.ctx.restore();

    g.ctx.save();
    g.ctx.drawImage(src.error20, 390, 1, 20, 20);
    g.ctx.font = '12pt Calibri';
    g.ctx.fillStyle = 'black';
    g.ctx.fillText('' + p.wrongs, 413, 16);
    g.ctx.restore();

};



Renderer.prototype.drawCountdownNumber = function () {
    g.ctx.save();
    switch (g.timeToStart) {
        case 2: g.ctx.drawImage(src.n1, 125, 70, src.n1.width, src.n2.height); break;
        case 1: g.ctx.drawImage(src.n2, 125, 70, src.n1.width, src.n2.height); break;
        case 0: g.ctx.drawImage(src.n3, 125, 70, src.n1.width, src.n2.height); break;
    }
    g.ctx.restore();
};


function FinalScreen() {

    this.w = g.cv.width;
    this.h = g.cv.height;
    this.vel = 0;
    this.acc = 0.03;
    this.alpha = 1;
    this.position = new Point(0, 0 - this.h);
    this.z = 0.5;
    this.total = 00;
};


FinalScreen.prototype.update = function () {

    this.z -= 0.001;
    if (this.position.y < 0) {
        this.position.y += this.vel += this.acc;
    }
    else {
        if (this.total != p.points)
            this.total += 0.5;
    }

};

FinalScreen.prototype.drawScreen = function () {
    g.ctx.save();
    g.ctx.beginPath();
    g.r.rect(this.position.x, this.position.y, this.w, this.h, '#235EA2', '#333', {
        blur: 10,
        offsetY: 2,
        offsetX: 0,
        color: '#000'
    });
    if (this.total > 0) {
        g.ctx.save();
        g.ctx.font = '25pt Calibri';
        g.ctx.fillStyle = '#E0572A';
        g.ctx.fillText('Complimenti! Hai totalizzato', 60, 200);
        if (this.total === p.points)
            str = this.total + ' punti';
        else str = this.total;

        var tl = g.ctx.measureText(str).width;

        g.ctx.fillText(str, (g.cv.width / 2) - (tl / 2), 250);
        g.ctx.restore();
    }
    if (this.total === p.points && p.points < firstPositionPoints) {
        g.ctx.save();
        g.ctx.font = '20pt Calibri';
        g.ctx.fillStyle = '#E0572A';
        g.ctx.fillText('...ma ti mancano ancora ' + (firstPositionPoints - p.points) + ' punti ', 75, 290);
        g.ctx.fillText('per raggiungere la prima posizione!', 75, 320);
        g.ctx.restore();
    }
    else if (this.total === p.points && p.points >= firstPositionPoints) {
        g.ctx.save();
        g.ctx.font = '20pt Calibri';
        g.ctx.fillStyle = '#5ABD5E';
        g.ctx.fillText('E SEI IN PRIMA POSIZIONE!', 100, 290);
        g.ctx.drawImage(src.trophy, 195, 300, src.trophy.width, src.trophy.height);
        g.ctx.restore();
    }
    g.ctx.closePath();
};



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