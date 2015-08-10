/*
==========================================
Image loader
Author: http://www.edoardocasella.it
==========================================
*/


ImageLoader = function ( onComplete, onProgress, onError ) {
    
    this.errors     = [];
    this.total      = 0;
    this.loaded     = 0;
    this.percentage = 0;
    this.loading    = false;

    this.oncomplete = (onComplete !== undefined ? onComplete : undefined);
    this.onerror    = (onError    !== undefined ? onError    : undefined);
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

          if (onLoad !== undefined )
               onLoad( this );

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

         if(scope.onerror !== undefined)
              return scope.onerror(this);

     };
        


     image.crossOrigin = this.crossOrigin;

     image.src = source;
    
};
