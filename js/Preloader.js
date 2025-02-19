function Preloader() {
  var view = View.getInstance();

  var loadingPercentage;

  var imageSources;
  var soundSources;

  var that = this;

  this.init = function() {
    loadingPercentage = view.create('div');

    view.addClass(loadingPercentage, 'loading-percentage');
    view.setHTML(loadingPercentage, '0%');
    view.appendToBody(loadingPercentage);

    imageSources = {
      1: 'images/btnmenu.png',
      2: 'images/bg.png',
      3: 'images/bullet.png',
      4: 'images/clear-map-btn.png',
      5: 'images/coin.png',
      6: 'images/delete-all-btn.png',
      7: 'images/editor-btn.png',
      8: 'images/elements.png',
      9: 'images/dog.png',
      10: 'images/flag-pole.png',
      11: 'images/flag.png',
      12: 'images/tela inicial jogo.png',
      13: 'images/grid-large-btn.png',
      14: 'images/grid-medium-btn.png',
      15: 'images/grid-small-btn.png',
      16: 'images/grid.png',
      17: 'images/lvl-size.png',
      18: 'images/cabeçadopersonagem.png',
      19: 'images/sprite personagem.png',
      20: 'images/powerups.png',
      21: 'images/save-map-btn.png',
      22: 'images/saved-btn.png',
      23: 'images/slider-left.png',
      24: 'images/slider-right.png',
      25: 'images/btnJOGAR.png'
    };

    that.loadImages(imageSources);
  };

  this.loadImages = function(imageSources) {
    var images = {};
    var loadedImages = 0;
    var totalImages = 0;

    for (var key in imageSources) {
      totalImages++;
    }

    for (var key in imageSources) {
      images[key] = new Image();
      images[key].src = imageSources[key];

      images[key].onload = function() {
        loadedImages++;
        percentage = Math.floor(loadedImages * 100 / totalImages);

        view.setHTML(loadingPercentage, percentage + '%'); //exibindo porcentagem
        if (loadedImages >= totalImages) {
          view.removeFromBody(loadingPercentage);
          that.initMainApp();
        }
      };
    }
  };

  this.initMainApp = function() {
    var marioMakerInstance = MarioMaker.getInstance();
    marioMakerInstance.init();
  };
}

window.onload = function() {
  var preloader = new Preloader();
  preloader.init();
};
