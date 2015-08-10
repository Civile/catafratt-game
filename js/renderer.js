/*
=============================
Renderer
=============================
*/



/*Constructor*/
function Renderer() {
    this.finalScreen;
};


/*
Render rect
=============================
*/
Renderer.prototype.rect = function (x, y, w, h, bg, br, shadow) {
    g.ctx.fillStyle   = (bg !== undefined ? bg : 'transparent');
    g.ctx.strokeStyle = (br !== undefined ? br : 'transparent');
    g.ctx.rect(x, y, w, h);

    if (shadow !== undefined) {
        g.ctx.shadowColor   = shadow.color;
        g.ctx.shadowBlur    = shadow.blur;
        g.ctx.shadowOffsetX = shadow.offsetX;
        g.ctx.shadowOffsetY = shadow.offsetY;
    }

    g.ctx.fill();
    g.ctx.stroke();
    return this;
};



/*
Draw board
=============================
*/
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

    /*Draw bgboard*/
    g.ctx.drawImage(bgBoard, 25, 26, 450, 450);

    g.ctx.restore();
    return this;
};



/*
Draw bg
=============================
*/
Renderer.prototype.drawBg = function () {
    
    var pattern;

    g.ctx.save();
    //pattern = g.ctx.createPattern(src.bgPat, 'repeat');
    //this.rect(0, 0, g.cv.width, g.cv.height, pattern);
    g.ctx.drawImage(src.bgPat, 0, 0, 500, 510);
    g.ctx.restore();
    return this;
};



/*
Render loop
=============================
*/
Renderer.prototype.render = function () {
    this.clear();
    this.drawBg();
    this.drawBoard();
    this.drawCards();
    this.drawInsetShadow();
    this.drawElapsed();
    this.drawPoints();

    if (!g.start)
        this.drawCountdownNumber();

    if (this.finalScreen)
        this.finalScreen.drawScreen();

    //this.drawCursor();
    return this;
};



/*
Clear screen
=============================
*/
Renderer.prototype.clear = function () {
    g.ctx.save();
    g.ctx.fillRect(0, 0, g.cv.width, g.cv.height);
    g.ctx.restore();
    return this;
};


/*
Draw cards
=============================
*/
Renderer.prototype.drawCards = function () {
    for (var i in g.gcards) {
        if (g.gcards[i] instanceof Card)
            this.drawCard(g.gcards[i]);
        else if (g.gcards[i] instanceof Number)
            this.drawNumber(g.gcards[i]);
    }
};


/*
Draw card
=============================
*/
Renderer.prototype.drawCard = function (tc) {
    if (tc === undefined || !tc instanceof Card)
        return false;

    var shadow = undefined;

    if (tc.guessed)
        return;

    g.ctx.save();
    g.ctx.beginPath();
    this.rect(tc.position.x - 2.5, tc.position.y - 2.5, 65, 65, 'white', '#DDD');
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
    this.rect(tc.position.x, tc.position.y, tc.w, tc.h, '#DDD', undefined, shadow);
    g.ctx.drawImage(tc.backBg, 0, 0, tc.w, tc.h, tc.position.x, tc.position.y, tc.w, tc.h);
    g.ctx.closePath();
    g.ctx.restore();
};


/*
Draw cursor
=============================
*/
Renderer.prototype.drawCursor = function () {
    var coord = new Point();
    coord = mouseToCanvas(g._in.mouse.position);
    g.ctx.drawImage(src.cursor, coord.x, coord.y, src.cursor.width, src.cursor.height);
};


/*
Draw number
=============================
*/
Renderer.prototype.drawNumber = function (n) {
    g.ctx.save();
    g.ctx.beginPath();
    g.ctx.globalAlpha = n.opacity;
    g.ctx.drawImage(n.src, n.position.x, n.position.y, n.src.width, n.src.height);
    g.ctx.closePath();
    g.ctx.restore();
};

/*
Draw elapsed time
=============================
*/
Renderer.prototype.drawElapsed = function () {
    g.ctx.save();
    g.ctx.font = '11pt Calibri';
    g.ctx.fillStyle = 'black';
    g.ctx.drawImage(src.clock20, 20, 486, 20, 20);
    g.ctx.fillText('' + g.elapsedTime, 44, 501);
    g.ctx.restore();
};

/*
Draw points
=============================
*/
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



Renderer.prototype.drawInsetShadow = function () {
   
};


Renderer.prototype.drawCountdownNumber = function () {
    g.ctx.save();
    switch(g.timeToStart) {
        case 2: g.ctx.drawImage(src.n1, 125, 85, src.n1.width, src.n2.height); break;
        case 1: g.ctx.drawImage(src.n2, 125, 85, src.n1.width, src.n2.height); break;
        case 0: g.ctx.drawImage(src.n3, 125, 85, src.n1.width, src.n2.height); break;
    }
    g.ctx.restore();
};

/*
Final screen
=============================
*/
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
    else
    {
        if(this.total != p.points)
            this.total += 0.5;
    }

};

FinalScreen.prototype.drawScreen = function () {
    g.ctx.save();
    g.ctx.beginPath();
    g.r.rect(this.position.x, this.position.y, this.w, this.h, 'rgba(0, 0, 0, 0.2)', '#333', {
        blur: 10,
        offsetY: 2,
        offsetX: 0,
        color:'#000'
    });
    if (this.total > 0)
    {
        g.ctx.save();
        g.ctx.font = '25pt Calibri';
        g.ctx.fillStyle = '#E0572A';
        g.ctx.fillText('Complimenti! Hai totalizzato', 60, 200);
        if (this.total === p.points)
            str = this.total + ' punti';
        else str = this.total;

        var tl = g.ctx.measureText(str).width;

        g.ctx.fillText(str, (g.cv.width/2) - (tl / 2), 250);
        g.ctx.restore();
    }
    if (this.total === p.points && p.points < firstPositionPoints)
    {
        g.ctx.save();
        g.ctx.font = '20pt Calibri';
        g.ctx.fillStyle = '#E0572A';
        g.ctx.fillText('...ma ti mancano ancora ' + (firstPositionPoints - p.points) + ' punti ', 70, 290);
        g.ctx.fillText('per raggiungere la prima posizione!', 75, 320);
        g.ctx.restore();
    }
    else if (this.total === p.points && p.points >= firstPositionPoints)
    {
        g.ctx.save();
        g.ctx.font = '20pt Calibri';
        g.ctx.fillStyle = '#5ABD5E';
        g.ctx.fillText('E SEI IN PRIMA POSIZIONE!', 100, 290);
        g.ctx.drawImage(src.trophy, 195, 300, src.trophy.width, src.trophy.height);
        g.ctx.restore();
    }
    g.ctx.closePath();
};