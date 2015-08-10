/*
=============================
Main: Catafratt game
Author: http://www.edoardocasella.it, 2014
=============================
*/

'use strict';

/*Document ready*/
$(document).ready(function () {

    g.cv  = document.getElementById('cv');
    g.ctx = g.cv.getContext('2d');
    g.r = new Renderer();
    wre = new Wre();

    /*Init*/
    g._in = new Input();
    g._in.init(document);
    wre.addEvent(function () {
        $('body').width(window.innerWidth)
            .height(window.innerHeight);
    }, 'wndResize');


    /*Load game | page*/
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
    }, 10000);

});


/*
=============================
Initialize game
=============================
*/
function init() {
    p.attempts = 0;
    p.points = 0;
    board.position.x = (g.cv.width / 2)  - (board.width / 2);
    board.position.y = (g.cv.height / 2) - (board.height / 2);
    appendCardsToMatrix();
    bgBoard = src['bgBoard' + Math.floor((Math.random() * 3) + 1)];
    startTiming();
};


/*
=============================
Game loop
=============================
*/
function loop() {
    update();
    g.r.render();
    requestAnimationFrame(loop);
};


/*
=============================
Update
=============================
*/
function update() {

    if (g.maxCards > 1)
        checkCards();
    else
        theEnd();

    if (p.name === null || !g.playing)
        return;

    for (var i in g.gcards) {
        g.gcards[i].update();
        if (g.gcards[i] instanceof Number)
            if (g.gcards[i].remove === true) {
                g.gcards.splice(i, 1);
                continue;
            }
    }
    
    updateTime();
};


/*
=============================
Check cards
=============================
*/
function checkCards() {

    /*Skullcard*/
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
            if (g.firstCard.linkedTo !== g.secondCard.face.name)
            {
                /*WRONG COUPLE*/
                g.firstCard.action = a_sdown;
                g.secondCard.action = a_sdown;

                if (g.secondCard.face.name === 'skull')
                {
                    p.points -= 0.5;
                    stopSound(snds.skullcard[type][0]).play();
                    g.gcards.push(new Number(g.secondCard.position.x + ((g.secondCard.w / 2) - 30), g.secondCard.position.y, src.minusHalf));
                }

                /*Start relative voice*/
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

                p.wrongs++;
            }
            else
            {
                /*GUESSED*/
                stopSound(snds.cardsmatch[type][0]).play();
                g.firstCard.guessed = g.secondCard.guessed = true;

                /*Append points*/
                g.gcards.push(new Number(g.firstCard.position.x  + ((g.firstCard.w / 2) - 30), g.firstCard.position.y,  src.plusOne));
                g.gcards.push(new Number(g.secondCard.position.x + ((g.secondCard.w / 2) - 30), g.secondCard.position.y, src.plusOne));
                g.firstCard = g.secondCard = null;

                g.maxCards -= 2;
                p.points+=2;
            }
};


/*
=============================
Load resources
=============================
*/
function loadSrcs(callback) {
    
    var l = new ImageLoader();

    l.addSrc(src.bgBoard1,      function (param) { src.bgBoard1 = param; });
    l.addSrc(src.bgBoard2,      function (param) { src.bgBoard2 = param; });
    l.addSrc(src.bgBoard3,      function (param) { src.bgBoard3 = param; });
    l.addSrc(src.bgPat,         function (param) { src.bgPat = param; });
    l.addSrc(src.cardback,      function (param) { src.cardback = param; });
    l.addSrc(src.cardbackHover, function (param) { src.cardbackHover = param; });
    l.addSrc(src.skull,         function (param) { src.skull = param; });
    l.addSrc(src.peppeS,        function (param) { src.peppeS = param; });
    l.addSrc(src.rosarioM,      function (param) { src.rosarioM = param; });
    l.addSrc(src.peppeF,        function (param) { src.peppeF = param; });
    l.addSrc(src.akg,           function (param) { src.akg = param; });
    l.addSrc(src.plusOne,       function (param) { src.plusOne = param; });
    l.addSrc(src.feet,          function (param) { src.feet = param; });
    l.addSrc(src.ass,           function (param) { src.ass = param; });
    l.addSrc(src.guitar,        function (param) { src.guitar = param; });
    l.addSrc(src.richardB,      function (param) { src.richardB = param; });
    l.addSrc(src.minusHalf,     function (param) { src.minusHalf = param; });
    l.addSrc(src.clock20,       function (param) { src.clock20 = param; });
    l.addSrc(src.star20,        function (param) { src.star20 = param; });
    l.addSrc(src.error20,       function (param) { src.error20 = param; });

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


/*
=============================
Load sounds
=============================
*/
function loadSounds(callback) {
    
    var l = new SoundLoader();

    for (var i in types)
        if (Modernizr.audio[types[i]]) {
            type = types[i];
            break;
        }

    l.addSrc(snds.bgMusic1[type][0],     function (param) { snds.bgMusic1[type][0] = param; });
    l.addSrc(snds.bgMusic2[type][0],     function (param) { snds.bgMusic2[type][0] = param; });
    l.addSrc(snds.bgMusic3[type][0],     function (param) { snds.bgMusic3[type][0] = param; });
    l.addSrc(snds.cartoonSlide[type][0], function (param) { snds.cartoonSlide[type][0] = param; snds.cartoonSlide[type][0].volume = sndVol; });
    l.addSrc(snds.pop[type][0],          function (param) { snds.pop[type][0] = param; snds.pop[type][0].volume = sndVol; });
    l.addSrc(snds.navslide[type][0],     function (param) { snds.navslide[type][0] = param; snds.navslide[type][0].volume = sndVol; });
    l.addSrc(snds.cardSlideUp[type][0],  function (param) { snds.cardSlideUp[type][0] = param; snds.cardSlideUp[type][0].volume = sndVol; });
    l.addSrc(snds.cardsmatch[type][0],   function (param) { snds.cardsmatch[type][0] = param; snds.cardsmatch[type][0].volume = sndVol; });
    l.addSrc(snds.cardswrong[type][0],   function (param) { snds.cardswrong[type][0] = param; snds.cardswrong[type][0].volume = (sndVol / 2.5); });
    l.addSrc(snds.inputok[type][0],      function (param) { snds.inputok[type][0] = param; });
    l.addSrc(snds.skullcard[type][0],    function (param) { snds.skullcard[type][0] = param; });

    /*Peppe simone*/
    l.addSrc(snds.peppeS[type][0],       function (param) { snds.peppeS[type][0] = param; snds.peppeS[type][0].volume = sndVol; });
    l.addSrc(snds.peppeS[type][1],       function (param) { snds.peppeS[type][1] = param; snds.peppeS[type][1].volume = sndVol; });

    /*Rosario muniz*/
    l.addSrc(snds.rosarioM[type][0], function (param) { snds.rosarioM[type][0] = param; snds.rosarioM[type][0].volume = sndVol; });
    l.addSrc(snds.rosarioM[type][1], function (param) { snds.rosarioM[type][1] = param; snds.rosarioM[type][1].volume = sndVol; });
    l.addSrc(snds.rosarioM[type][2], function (param) { snds.rosarioM[type][2] = param; snds.rosarioM[type][2].volume = sndVol; });

    /*Peppe fetish*/
    l.addSrc(snds.peppeF[type][0], function (param) { snds.peppeF[type][0] = param; snds.peppeF[type][0].volume = 1; });
    l.addSrc(snds.peppeF[type][1], function (param) { snds.peppeF[type][1] = param; snds.peppeF[type][1].volume = 1; });
    l.addSrc(snds.peppeF[type][2], function (param) { snds.peppeF[type][2] = param; snds.peppeF[type][2].volume = 1; });
    l.addSrc(snds.peppeF[type][3], function (param) { snds.peppeF[type][3] = param; snds.peppeF[type][3].volume = 1; });

    /*Richard Bensson*/
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


/*
=============================
Load dom elements
=============================
*/
function loadPage() {

    //if (window.innerWidth <= 1200)
      //  $('#display').css('left', (window.innerWidth) - ($('#display').width() + 60));

        $('#display').css('visibility', 'visible').hide()
            .css('margin-top', '-600px').show()
                .animate({ marginTop: (($(document).height()/2) - 30) - ($('#display').height()/2) - 50 }, {
                    duration: 500,
                    start: snds.cartoonSlide[type][0].play(),
                    complete: function(){
                        loadLeftMenu();
                        wre.addEvent(function () {
                            //$('#display').css('marginTop', (($(document).height() / 2) - 30) - ($('#display').height() / 2) - 50);
                            /*ADD*/
                            //if ($(document).width() <= 1200)
                                //$('#display').css('left', ($(document).width()) - ($('#display').width() + 60));
                            //else 
                              $('#display').css('left', (($(document).width() / 2)) - ($('#display').innerWidth() / 2));
                        }, 'wndResize');
                    }
                });
        init();
        loop();
   
};


/*
=============================
Slide up curtain
=============================
*/
function slideUpCover(callback) {
    if($('#curtain')[0])
        $('#curtain').slideUp('slow', function () {
            if (callback !== undefined && callback)
                callback();
        });
};


/*
=============================
Percentage div
=============================
*/
function appendPercentage(text) {
    if(text !== undefined)
        $('#curtain .percentage').text(text);
};


/*
=============================
Print points
=============================
*/
function printPoints() {
    $('.guessed').text(p.points);
    $('.wrongs').text(p.wrongs);
};



/*
=============================
Play soundtrack
=============================
*/
function startSoundtrack() {
    snds.bgMusic1[type][0].play();
    activeMusic = snds.bgMusic1[type][0];
    activeMusic.volume = bgVol;
    snds.bgMusic1[type][0].onended = function () {
        snds.bgMusic2[type][0].play();
        activeMusic = snds.bgMusic2[type][0];
        activeMusic.volume = bgVol;
        snds.bgMusic2[type][0].onended = function () {
            snds.bgMusic3[type][0].play();
            activeMusic = snds.bgMusic3[type][0];
            activeMusic.volume = bgVol;
            snds.bgMusic3[type][0].onended = startSoundtrack;
        };
    };
};



/*
=============================
Load left menu
=============================
*/
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

        var li = $(this).parent().parent();
        var mleft = $(li).css('marginLeft').replace('px', '');

        if (Math.floor(mleft) > -300)
            $(li).stop(true, false).animate({ marginLeft: '-315px' }, 500);
        else 
            $(li).stop(true, false).animate({ marginLeft: '-40px' }, 500);
    });

};



/*
=============================
Load a li
=============================
*/
function loadLi(li) {

    var mg = -160;

    if($(li).hasClass('voiceTxt'))
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



/*
=============================
Load name form
=============================
*/
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

        if (key === 13 && $(this).val().replace(/\s+/g, "") !== "")
        {
            p.name = $(this).val();

            $(this).unbind('keyup');
            snds.inputok[type][0].play();

            $('#nameForm').css('border-radius', 0)
                .html('<h1 style="font-size:20px; margin-top:12%;">' + $(this).val() + '</h1>');

            $('#nameForm').effect('highlight', { color: 'yellow', times: 10 }, 500, function () {
                $(this).animate({ left: '0px', top: '0px' }, {
                    duration:500,
                    complete: function () {
                        loadPage();
                    }
                });
            });
            

        }
    });

};


/*
=============================
Rank
=============================
*/
function loadRank() {
    var pl = g.rank.getNodes('player', 200);

    pl.sort(compare);

    var rows = new String();

    for (var i = 0; i < pl.length; i++) {
        rows += '<tr><td>'+i+'</td><td>'+ pl[i].name + '</td><td>' + pl[i].points + '</td><td>' + pl[i].errors + '</td><td>' + pl[i].time.substring(3, pl[i].time.length) + '</td></tr>';
    }
    $('.rankTable tbody').html(rows);
};

function compare(a, b) {
    if (a.errors < b.errors)
        return -1;
    if (a.errors > b.errors)
        return 1;
    return 0;
}

function saveRank() {
    g.rank.addNode(p.name, p.wrongs, g.elapsedTime, p.points);
};



/*
=============================
The end
=============================
*/
function theEnd() {
    if (g.playing === true) {
        saveRank();
        g.playing = false;
    }

    alert('Il gioco è finito, manca il finale.');
    
};