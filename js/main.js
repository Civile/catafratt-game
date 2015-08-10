/*
=============================
Main: Catafratt game
Author: http://www.edoardocasella.it, 2014
=============================
*/

'use strict';

/*Window load*/
$(window).load(function () {

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


    /*Prevent print screen*/
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
    }, 5000);

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


/*
=============================
Check cards
=============================
*/
var combo = false;

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

                combo = false;
                p.wrongs++;
                g.lastGuessed = null;
            }
            else
            {
                /*GUESSED*/
                stopSound(snds.cardsmatch[type][0]).play();
                g.firstCard.guessed = g.secondCard.guessed = true;

                /*Append points*/
                g.gcards.push(new Number(g.firstCard.position.x  + ((g.firstCard.w / 2) - 30), g.firstCard.position.y,  src.plusOne));
                g.gcards.push(new Number(g.secondCard.position.x + ((g.secondCard.w / 2) - 30), g.secondCard.position.y, src.plusOne));
                
                /*Combo*/
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
    l.addSrc(src.dick,           function (param) { src.dick = param; });
    l.addSrc(src.guitar,        function (param) { src.guitar = param; });
    l.addSrc(src.richardB,      function (param) { src.richardB = param; });
    l.addSrc(src.minusHalf,     function (param) { src.minusHalf = param; });
    l.addSrc(src.clock20,       function (param) { src.clock20 = param; });
    l.addSrc(src.star20,        function (param) { src.star20 = param; });
    l.addSrc(src.error20,       function (param) { src.error20 = param; });
    l.addSrc(src.combo,         function (param) { src.combo = param; });
    l.addSrc(src._3combo,       function (param) { src._3combo = param; });
    
    l.addSrc(src.n1,            function (param) { src.n1 = param; });
    l.addSrc(src.n2,            function (param) { src.n2 = param; });
    l.addSrc(src.n3,            function (param) { src.n3 = param; });
    l.addSrc(src.trophy,        function (param) { src.trophy = param; });

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

    //Chrome fix | mp3 needed
    var is_chrome = /chrome/.test(navigator.userAgent.toLowerCase());
    if (is_chrome === true)
        type = 'mp3';

    l.addSrc(snds.bgMusic1[type][0],     function (param) { snds.bgMusic1[type][0] = param; });
    l.addSrc(snds.bgMusic2[type][0],     function (param) { snds.bgMusic2[type][0] = param; });
    l.addSrc(snds.bgMusic3[type][0],     function (param) { snds.bgMusic3[type][0] = param; });
    l.addSrc(snds.bgMusic4[type][0],     function (param) { snds.bgMusic4[type][0] = param; });
    l.addSrc(snds.cartoonSlide[type][0], function (param) { snds.cartoonSlide[type][0] = param; snds.cartoonSlide[type][0].volume = sndVol; });
    l.addSrc(snds.pop[type][0],          function (param) { snds.pop[type][0] = param; snds.pop[type][0].volume = sndVol; });
    l.addSrc(snds.navslide[type][0],     function (param) { snds.navslide[type][0] = param; snds.navslide[type][0].volume = sndVol; });
    l.addSrc(snds.cardSlideUp[type][0],  function (param) { snds.cardSlideUp[type][0] = param; snds.cardSlideUp[type][0].volume = sndVol; });
    l.addSrc(snds.cardsmatch[type][0],   function (param) { snds.cardsmatch[type][0] = param; snds.cardsmatch[type][0].volume = sndVol; });
    l.addSrc(snds.cardswrong[type][0],   function (param) { snds.cardswrong[type][0] = param; snds.cardswrong[type][0].volume = (sndVol / 2.5); });
    l.addSrc(snds.inputok[type][0],      function (param) { snds.inputok[type][0] = param; });
    l.addSrc(snds.skullcard[type][0],    function (param) { snds.skullcard[type][0] = param; });
    l.addSrc(snds.combo[type][0],        function (param) { snds.combo[type][0] = param; });
    l.addSrc(snds.select[type][0],       function (param) { snds.select[type][0] = param; });
    l.addSrc(snds.yes[type][0],          function (param) { snds.yes[type][0] = param; });
    

    /*Peppe simone*/
    l.addSrc(snds.peppeS[type][0],       function (param) { snds.peppeS[type][0] = param; snds.peppeS[type][0].volume = sndVol; });
    l.addSrc(snds.peppeS[type][1],       function (param) { snds.peppeS[type][1] = param; snds.peppeS[type][1].volume = sndVol; });
    /*Rosario muniz*/
    l.addSrc(snds.rosarioM[type][0],     function (param) { snds.rosarioM[type][0] = param; snds.rosarioM[type][0].volume = sndVol; });
    l.addSrc(snds.rosarioM[type][1],     function (param) { snds.rosarioM[type][1] = param; snds.rosarioM[type][1].volume = sndVol; });
    l.addSrc(snds.rosarioM[type][2],     function (param) { snds.rosarioM[type][2] = param; snds.rosarioM[type][2].volume = sndVol; });
    /*Peppe fetish*/
    /*l.addSrc(snds.peppeF[type][0],       function (param) { snds.peppeF[type][0] = param; snds.peppeF[type][0].volume = 1; });*/
    l.addSrc(snds.peppeF[type][0],       function (param) { snds.peppeF[type][0] = param; snds.peppeF[type][0].volume = 1; });
    l.addSrc(snds.peppeF[type][1],       function (param) { snds.peppeF[type][1] = param; snds.peppeF[type][1].volume = 1; });
    l.addSrc(snds.peppeF[type][2],       function (param) { snds.peppeF[type][2] = param; snds.peppeF[type][2].volume = 1; });
    /*Richard Bensson*/
    l.addSrc(snds.richardB[type][0],     function (param) { snds.richardB[type][0] = param; snds.richardB[type][0].volume = sndVol * 0.5; });
    l.addSrc(snds.richardB[type][1],     function (param) { snds.richardB[type][1] = param; snds.richardB[type][1].volume = sndVol * 0.5; });
    l.addSrc(snds.richardB[type][2],     function (param) { snds.richardB[type][2] = param; snds.richardB[type][2].volume = sndVol * 0.5; });
    l.addSrc(snds.richardB[type][3],     function (param) { snds.richardB[type][3] = param; snds.richardB[type][3].volume = sndVol * 0.5; });

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

        $('#display').css('visibility', 'visible').hide()
            .css('margin-top', '-600px').show()
                .animate({ marginTop: (($(document).height()/2) - 30) - ($('#display').height()/2) - 50 }, {
                    duration: 500,
                    start: snds.cartoonSlide[type][0].play(),
                    complete: function(){
                        loadLeftMenu();
                        wre.addEvent(function () {
                            $('#display').css('marginTop', (($(document).height() / 2) - 30) - ($('#display').height() / 2) - 50);
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
        stopSound(snds.select[type][0]).play();
        var li = $(this).parent().parent();
        var mleft = $(li).css('marginLeft').replace('px', '');

        if (Math.floor(mleft) > -300)
            $(li).stop(true, false).animate({ marginLeft: '-315px' }, 400);
        else 
            $(li).stop(true, false).animate({ marginLeft: '-40px' }, 400);
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

            $('#nameForm').effect('highlight', { color: 'yellow', times: 10 }, 500, function () {
                $(this).animate({ left: 0 - ($(this).width() + 20), top: '0px', width:0, height:0, }, {
                    duration:400,
                    complete: function () {
                        loadPage();
                        $(this).hide();
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
    var color;

    for (var i = 0; i < pl.length; i++) {
        if (i === 0)
            firstPositionPoints = pl[i].points;

        if (pl[i].points === firstPositionPoints)
            color = '#FDEDC3';
        else color = 'transparent';

        rows += '<tr style="background:'+color+';"><td>' + (i + 1) + '</td><td>' + pl[i].name + '</td><td style="color:#3A6B3B;">' + pl[i].points + '</td><td style="color:#7A3018;">' + pl[i].errors + '</td><td>' + pl[i].time + '</td></tr>';
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



/*
=============================
The end
=============================
*/
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