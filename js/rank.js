/*
=============================
Rank
=============================
*/


/*
Constructor
=============================
*/
function Rank(callback) {
    this.xml;
    this.writer;
    this.init(callback);
};


/*
Init
=============================
*/
Rank.prototype.init = function (callback) {

    var scope = this;

    $.ajax({
        url: 'data/rank.xml', // name of file you want to parse
        dataType: "xml",
        type:'GET',
        success: function (data) {
            scope.xml = data;
            if (callback !== undefined)
                callback();
        },
        error: function () {
            throw("Error: Something went wrong");
        }

    });
};


/*
Get nodes
=============================
*/
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

        p.name    = $(pl).find('name').eq(0).text();
        p.time    = $(pl).find('time').eq(0).text();
        p.errors  = Math.floor($(pl).find('errors').eq(0).text());
        p.points  = Math.floor($(pl).find('points').eq(0).text());

        out.push(p);
    }

    return out;
};


/*
Add node
=============================
*/
Rank.prototype.addNode = function (n, e, t, p) {
    
    $.ajax({
        url: 'php/xmlWriter.php', // name of file you want to parse
        data: "write=1&name=" + n + "&errors=" + e + "&time=" + t + "&points=" + p + "",
        type: 'POST',
        success: function (data) {
            
        },
        error: function () {
            throw("Error: Something went wrong in Rank.prototype.addNode");
        }

    });
};