/*
=============================
Global
=============================
*/


/*Game*/
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

/*Wnd resize events instance*/
var wre = null;

/*Player*/
var p = {
    points: 0,
    wrongs: 0,
    name: null
};

/*Board*/
var board = {
    width: 455,
    height: 455,
    position: new Point(),
    cols: 7,
    rows: 7,
    matrix: new Array(),
};

/*Visual resources*/
var src = {
    bgPat:         'src/frame.png',
    bgBoard1:       'src/boardbgs/1bw.jpg',
    bgBoard2:       'src/boardbgs/2bw.jpg',
    bgBoard3:       'src/boardbgs/3bw.jpg',
    cardback:      'src/cardbg/cardback.png',
    clock20:       'src/icons/clock20.png',
    star20:         'src/icons/star.png',
    error20:        'src/icons/error.png',
    cardbackHover: 'src/cardbg/cardbackHover.png',
    plusOne:       'src/plusOne.png',
    minusHalf:     'src/minusHalf.png',
    skull:         'src/faces/skull.png',
    /*Peppe simone*/
    peppeS:        'src/faces/peppeS.jpg',
    akg:           'src/faces/1kg.png',
    /*Rosario muniz*/
    rosarioM:      'src/faces/rosarioM.jpg',
    dick:           'src/faces/dick.jpg',
    /*Peppe fetish*/
    peppeF:         'src/faces/peppeF.png',
    feet:           'src/faces/feet.png',
    /*Richard benson*/
    richardB:       'src/faces/richardB.jpg',
    guitar:         'src/faces/guitar.png',
    combo:          'src/combo.png',
    _3combo:        'src/3combo.png',
    n1:             'src/numbers/n1.png',
    n2:             'src/numbers/n2.png',
    n3:             'src/numbers/n3.png',
    trophy:         'src/trophy.png'
};

var bgBoard = null;


/*Sounds | cross compatibility*/
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
    /*Voices*/
    peppeS: {
        mp3: new Array('src/sounds/ps_monella.mp3', 'src/sounds/ps_scostumata.mp3'),
        ogg: new Array('src/sounds/ps_monella.ogg', 'src/sounds/ps_scostumata.ogg')
    },
    rosarioM: {
        mp3: new Array('src/sounds/rm_impotenti.mp3', 'src/sounds/rm_diventodonna.mp3', 'src/sounds/rm_noncelaf.mp3'),
        ogg: new Array('src/sounds/rm_impotenti.ogg', 'src/sounds/rm_diventodonna.ogg', 'src/sounds/rm_noncelaf.ogg')
    },
    peppeF: { 
        mp3: new Array(/*'src/sounds/pf_datemipiedi.mp3',*/ 'src/sounds/pf_cafone.mp3', 'src/sounds/pf_vattene.mp3', 'src/sounds/pf_nonvogliamo.mp3'),
        ogg: new Array(/*'src/sounds/pf_datemipiedi.ogg',*/ 'src/sounds/pf_cafone.ogg', 'src/sounds/pf_vattene.ogg', 'src/sounds/pf_nonvogliamo.ogg')
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
var type  = '';
var types = ['ogg', 'mp3'];
var activeMusic = null;
var bgVol       = 0.7;
var sndVol      = 1;


/*Card*/
var card = {
    w: 60,
    h: 60,
    marginL: 3,
    marginT: 2
};


/*Point*/
function Point(x, y) {
    this.x = x || null;
    this.y = y || null;
};

/*Get mouse location on canvas*/
function mouseToCanvas(mcoord) {

    if (mcoord === undefined)
        return;

    var cvc;
    
    cvc = g.cv.getBoundingClientRect();
    $('#test').text('CORD: '+ mcoord.x);
    return {
        x: (mcoord.x - cvc.left) * (g.cv.width / cvc.width),
        y: (mcoord.y - cvc.top) * (g.cv.height / cvc.height)
    }
};


/*Get key event*/
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

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
/*
Array.prototype.shuffle = function() {
    var temp, j;
    for (var i = this.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));

        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }

    return this;
}*/


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