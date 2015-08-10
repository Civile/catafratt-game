

/*
=============================
Add a card to the game
=============================
*/
function appendCard(x, y, w, h, fname, fsrc) {
    g.gcards.push(new Card(x, y, w, h, { name:fname, src:fsrc }));
};


function appendCardsToMatrix() {

    //Create matrix
    for (i = 0; i <= board.rows; i++)
        board.matrix[i] = new Array();

    var c = 0;
    var x = 0;
    var y = 0;
    var rrow, rcol;

    //Add cards
    while (c < (board.cols * board.rows)) {

        rcol = Math.floor((Math.random() * board.cols) + 0);
        rrow = Math.floor((Math.random() * board.rows) + 0);

        if (board.matrix[rrow][rcol])
            continue;
        else
        {
            res = getNextFace();
            x = (rcol * 65) + 25;
            y = (65 * rrow) + 29;
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


/*
=============================
Card object
=============================
*/
/*Actions*/
var a_sup   = 'slidingUp';
var a_sdown = 'slidingDown';
var a_right = 'slideRightDisappear';

function Card(x, y, w, h, face) {
    
    this.position = new Point(x, y);
    this.w        = (w || undefined);
    this.h        = 4;
    this.face     = { name: face.name, src: face.src };
    this.linkedTo = this.getFaceLink();
    this.action   = null;
    this.backBg   = src.cardback;
    this.acc      = 2.5;
    this.vel      = 0;

    this.guessed   = false;
    this.mouseOver = false;
};

/*
Update
=============================
*/
Card.prototype.update = function () {

    if (this.h === 0)
        return;

    /*Mouse hover*/
    if (this.isHover()) {
        this.backBg = src.cardbackHover;
        this.mouseOver = true;
    }
    else
    {
        this.backBg = src.cardback;
        this.mouseOver = false;
    }

    if(g.canSelect())
        if (!this.isAnimating())
            if(g._in.mouse.leftButton === true)
                if (this.isHover()) {
                    stopSound(snds.pop[type][0]).play();
                    this.action = a_sup;
                    stopSound(snds.cardSlideUp[type][0]).play();

                    /*Mem card*/
                    if(g.firstCard === null)
                        g.firstCard = this;
                    else g.secondCard = this;
                }

    /*Check actions*/
    if (this.action !== null)
        this.performAction();

    if (this.guessed === true && this.h === 4)
        this.h = 0;

};

/*
Is hover
=============================
*/
Card.prototype.isHover = function () {

    var mc = mouseToCanvas(g._in.mouse.position);

    if (mc.x <= this.position.x + this.w && mc.x >= this.position.x
        && mc.y <= this.position.y + this.h && mc.y >= this.position.y)
        return true;

    return false;
};

/*
Perform action
=============================
*/
Card.prototype.performAction = function () {
    
    switch (this.action) {
        case a_sup: /*slideUp*/
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


/*
Perform action
=============================
*/
Card.prototype.isAnimating = function () {
    return (this.action === null ? false : this.action);
};


/*
Add face link
=============================
*/
Card.prototype.getFaceLink = function () {

    switch (this.face.name) {
        case 'peppeS':   return this.faceLink = 'akg';
        case 'akg':      return this.faceLink = 'peppeS';
        case 'peppeF':   return this.faceLink = 'feet';
        case 'feet':     return this.faceLink = 'peppeF';
        case 'rosarioM': return this.faceLink = 'dick';
        case 'dick':      return this.faceLink = 'rosarioM';
        case 'richardB': return this.faceLink = 'guitar';
        case 'guitar':   return this.faceLink = 'richardB';
    };

};





/*
=============================
Number
=============================
*/
function Number (x, y, src) {
    this.position      = new Point(x || undefined, y || undefined);
    this.positionStart = new Point(x || undefined, y || undefined);
    this.vel = 0;
    this.acc = 0.1;
    this.src = (src || undefined);
    this.remove = false;
    this.opacity = 1;
    this.w = 20;
    this.h = 18;
};


/*
Update number
=============================
*/
Number.prototype.update = function () {
    this.vel += this.acc;
    this.position.y -= this.vel;
    this.opacity -= 0.01;
    if (this.opacity <= 0)
        this.remove = true;
};
