//Classe principal do editor de níveis

function Editor() {
  var view = View.getInstance();
  var mainWrapper;

  var gameWorld;
  var viewPort;

  var grid;
  var elementwrapper;

  var map;
  var maxWidth;
  var height = 480;
  var tileSize = 32;
  var scrollMargin = 0;

  var selectedElement = [];

  var that = this;

  this.init = function() {
    mainWrapper = view.getMainWrapper();
    viewPort = view.create('div');

    view.addClass(viewPort, 'editor-screen');
    view.style(viewPort, { display: 'block' });
    view.append(mainWrapper, viewPort);

    that.createLevelEditor();
    that.drawGrid(3840); //desenha uma grade de tamanho 3840px por padrão no início
    that.showElements();
  };

  this.createLevelEditor = function() {
    var rightArrow = view.create('div');
    var leftArrow = view.create('div');
    gameWorld = view.create('div');

    view.style(gameWorld, { width: 6400 + 'px' });
    view.style(gameWorld, { height: height + 'px' });

    view.addClass(rightArrow, 'right-arrow');
    view.addClass(leftArrow, 'left-arrow');

    view.append(viewPort, rightArrow);
    view.append(viewPort, leftArrow);
    view.append(viewPort, gameWorld);

    rightArrow.addEventListener('click', that.rightScroll);
    leftArrow.addEventListener('click', that.leftScroll);
  };

  this.drawGrid = function(width) {
    maxWidth = width;
    grid = view.create('table');

    var row = height / tileSize;
    var column = maxWidth / tileSize;

    var mousedown = false;
    var selected = false;

    for (i = 1; i <= row; i++) {
      var tr = view.create('tr');
      for (j = 1; j <= column; j++) {
        var td = view.create('td');

        view.addClass(td, 'cell');

        td.addEventListener('mousedown', function(e) {
          e.preventDefault(); //para parar o ponteiro do mouse para mudar
        });

        td.onmousedown = (function(i, j) {
          return function() {
            selectedElement.push(this);
            view.addClass(this, 'active');
            mousedown = true;
          };
        })(i, j);

        td.onmouseover = (function(i, j) {
          return function() {
            if (mousedown) {
              selectedElement.push(this);
              view.addClass(this, 'active');
            }
          };
        })(i, j);

        td.onmouseup = function() {
          mousedown = false;
        };

        view.append(tr, td);
      }

      view.append(grid, tr);

      grid.onmouseleave = function() {
        //se o mouse passar sobre a tela do editor
        mousedown = false;
      };
    }

    view.append(gameWorld, grid);
  };

  this.showElements = function() {
    elementWrapper = view.create('div');

    view.addClass(elementWrapper, 'element-wrapper');
    view.append(mainWrapper, elementWrapper);

    var elements = [
      'cell',
      'platform',
      'coin-box',
      'power-up-box',
      'useless-box',
      'flag',
      'flag-pole',
      'pipe-left',
      'pipe-right',
      'pipe-top-left',
      'pipe-top-right',
      'goomba'
    ];
    var element;

    var saveMap = view.create('button');
    var clearMap = view.create('button');
    var lvlSize = view.create('div');
    var gridSmallBtn = view.create('button');
    var gridMediumBtn = view.create('button');
    var gridLargeBtn = view.create('button');

    //para cada elemento no array 'elements', ele cria uma div e define o nome da classe
    for (i = 0; i < elements.length; i++) {
      element = view.create('div');

      view.addClass(element, elements[i]);
      view.append(elementWrapper, element);

      element.onclick = (function(i) {
        return function() {
          that.drawElement(elements[i]);
        };
      })(i);
    }

    view.addClass(lvlSize, 'lvl-size');
    view.addClass(gridSmallBtn, 'grid-small-btn');
    view.addClass(gridMediumBtn, 'grid-medium-btn');
    view.addClass(gridLargeBtn, 'grid-large-btn');
    view.addClass(saveMap, 'save-map-btn');
    view.addClass(clearMap, 'clear-map-btn');
    view.style(elementWrapper, { display: 'block' });
    view.append(elementWrapper, lvlSize);
    view.append(elementWrapper, gridSmallBtn);
    view.append(elementWrapper, gridMediumBtn);
    view.append(elementWrapper, gridLargeBtn);
    view.append(elementWrapper, clearMap);
    view.append(elementWrapper, saveMap);

    saveMap.addEventListener('click', that.saveMap);
    clearMap.addEventListener('click', that.resetEditor);
    gridSmallBtn.addEventListener('click', that.gridSmall);
    gridMediumBtn.addEventListener('click', that.gridMedium);
    gridLargeBtn.addEventListener('click', that.gridLarge);
  };

  that.gridSmall = function() {
    view.remove(gameWorld, grid);
    that.drawGrid(1280); //tamanho de grade pequeno
  };

  that.gridMedium = function() {
    view.remove(gameWorld, grid);
    that.drawGrid(3840); //tamanho de grade médio
  };

  that.gridLarge = function() {
    view.remove(gameWorld, grid);
    that.drawGrid(6400); //tamanho de grade grande
  };

  this.drawElement = function(element) {
    /*
      cada elemento selecionado é colocado no array 'selectedElement'
      depois de clicar no elemento necessário, ele percorre o array e define o nome da classe 
      dessa célula, alterando o plano de fundo da célula.
    */

    for (var i = 0; i < selectedElement.length; i++) {
      view.addClass(selectedElement[i], element);
    }

    selectedElement = [];
  };

  that.generateMap = function() {
    var newMap = [];
    var gridRows = grid.getElementsByTagName('tr');

    //percorre as células da tabela e verifica o nome da classe, coloca o valor de acordo com seu className;
    for (var i = 0; i < gridRows.length; i++) {
      var columns = [];
      var gridColumns = gridRows[i].getElementsByTagName('td');
      for (var j = 0; j < gridColumns.length; j++) {
        var value;

        switch (gridColumns[j].className) {
          case 'platform':
            value = 1;
            break;

          case 'coin-box':
            value = 2;
            break;

          case 'power-up-box':
            value = 3;
            break;

          case 'useless-box':
            value = 4;
            break;

          case 'goomba':
            value = 20;
            break;

          case 'flag-pole':
            value = 5;
            break;

          case 'flag':
            value = 6;
            break;

          case 'pipe-left':
            value = 7;
            break;

          case 'pipe-right':
            value = 8;
            break;

          case 'pipe-top-left':
            value = 9;
            break;

          case 'pipe-top-right':
            value = 10;
            break;

          default:
            value = 0;
            break;
        }
        columns.push(value);
      }
      newMap.push(columns);
    }
    map = newMap;
  };

  this.saveMap = function() {
    var storage = new Storage();
    var levelCounter = storage.getItem('levelCounter') || 0;

    that.generateMap();

    levelCounter++;

    //para corrigir a classificação do localStorage, 01 02 ... 10 11, caso contrário a classificação seria 1 10 11 .. 2 20 21 ..
    if (levelCounter < 10) {
      levelName = 'savedLevel' + '0' + levelCounter;
    } else {
      levelName = 'savedLevel' + levelCounter;
    }

    storage.setItem(levelName, map);
    storage.setItem('levelCounter', levelCounter);

    console.log(storage.getItem(levelName)); //para copiar o mapa gerado, se necessário
  };

  this.rightScroll = function() {
    if (scrollMargin > -(maxWidth - 1280)) {
      scrollMargin += -160;
      view.style(gameWorld, { 'margin-left': scrollMargin + 'px' });
    }
  };

  this.leftScroll = function() {
    if (scrollMargin != 0) {
      scrollMargin += 160;
      view.style(gameWorld, { 'margin-left': scrollMargin + 'px' });
    }
  };

  this.resetEditor = function() {
    var gridRows = grid.getElementsByTagName('tr');
    for (var i = 0; i < gridRows.length; i++) {
      var gridColumns = gridRows[i].getElementsByTagName('td');

      for (var j = 0; j < gridColumns.length; j++) {
        view.addClass(gridColumns[j], 'cell');
      }
    }

    selectedElement = [];
    scrollMargin = 0;
    view.style(gameWorld, { 'margin-left': scrollMargin + 'px' });
  };

  this.removeEditorScreen = function() {
    if (viewPort) {
      that.resetEditor();
      view.style(viewPort, { display: 'none' });
      view.style(elementWrapper, { display: 'none' });
    }
  };

  this.showEditorScreen = function() {
    if (viewPort) {
      view.style(viewPort, { display: 'block' });
      view.style(elementWrapper, { display: 'block' });
    }
  };
}
