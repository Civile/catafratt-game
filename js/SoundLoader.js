/*
==========================================
Sound loader
Author: http://www.edoardocasella.it
==========================================
*/



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