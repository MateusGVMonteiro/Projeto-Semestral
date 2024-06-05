function Mario() {
  var gameUI = GameUI.getInstance();

  this.type = 'small';
  this.x;
  this.y;
  this.width = 31;
  this.height = 44;
  this.speed = 3;
  this.velX = 0;
  this.velY = 0;
  this.jumping = false;
  this.grounded = false;
  this.invulnerable = false;
  this.sX = 0; // sprite x
  this.sY = 4; // sprite y
  this.frame = 0;

  var that = this;

  this.init = function() {
    that.x = 10;
    that.y = gameUI.getHeight() - 40 - 40;

    marioSprite = new Image();
    marioSprite.src = 'images/spriteprincipal.png';
  };

  this.draw = function() {
    that.sX = that.width * that.frame;
    gameUI.draw(marioSprite, that.sX, that.sY, that.width, that.height, that.x, that.y, that.width, that.height);
  };

  this.checkMarioType = function() {
    if (that.type == 'big') {
      that.height = 60;

      //posição grande do sprite do mario
      if (that.invulnerable) {
        that.sY = 276; //se for invulnerável, mostre Mario transparente
      } else {
        that.sY = 90;
      }
    } else if (that.type == 'small') {
      that.height = 44;

      //pequeno mario sprite
      if (that.invulnerable) {
        that.sY = 222; //se for invulnerável, mostre Mario transparente
      } else {
        that.sY = 4;
      }
    } else if (that.type == 'fire') {
      that.height = 60;

      //fogo mario sprite

      that.sY = 150;
    }
  };

  this.resetPos = function() {
    that.x = canvas.width / 10;
    that.y = canvas.height - 40;
    that.frame = 0;
  };
}
