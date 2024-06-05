function Enemy() {
  var gameUI = GameUI.getInstance();

  var tickCounter = 0; //para animar o inimigo
  var maxTick = 10; //número máximo de ticks para mostrar o sprite inimigo

  var element = new Image();
  element.src = 'images/dog.png'; //cachorro como alvo

  this.x;
  this.y;
  this.velX = 1;
  this.velY = 0;
  this.grounded = false;
  this.type;
  this.state;

  this.sX;
  this.sY = 0;
  this.width = 32;
  this.height = 32;

  this.frame = 0;

  var that = this;

  this.goomba = function() {
    this.type = 20;
    that.sX = 0;
  };

  this.draw = function() {
    that.sX = that.width * that.frame;
    gameUI.draw(element, that.sX, that.sY, that.width, that.height, that.x, that.y, that.width, that.height);
  };

  this.update = function() {
    var gravity = 0.2;

    if (that.grounded) {
      that.velY = 0;
    }

    if (that.state == 'dead') {
      that.frame = 2; //Goomba esmagado

      tickCounter++;
      if (tickCounter >= 60) {
        that.frame = 4;
      }
    } else if (that.state == 'deadFromBullet') {
      //Goomba caindo
      that.frame = 3;
      that.velY += gravity;
      that.y += that.velY;
    } else {
      //só anime quando não estiver morto

      that.velY += gravity;
      that.x += that.velX;
      that.y += that.velY;

      //para animar
      tickCounter += 1;

      if (tickCounter > maxTick) {
        tickCounter = 0;
        if (that.frame == 0) {
          that.frame = 1;
        } else {
          that.frame = 0;
        }
      }
    }
  };
}
