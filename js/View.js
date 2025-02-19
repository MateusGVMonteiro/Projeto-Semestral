//elementos div para o aplicativo

var View = (function() {
  var instance;

  function View() {
    this.getMainWrapper = function() {
      var element = document.getElementsByClassName('main-wrapper')[0];

      return element;
    };

    this.create = function(elementName) {
      var element = document.createElement(elementName);

      return element;
    };

    this.addClass = function(element, className) {
      element.className = className;
    };

    this.append = function(parentElement, childElement) {
      //anexa tudo antes do botão Voltar, o wrapper de pontuação na parte superior e tudo o mais entre
      if (childElement.className == 'score-wrapper') {
        parentElement.insertBefore(childElement, parentElement.firstChild);
      } else if (parentElement.lastChild && parentElement.lastChild.className == 'btn-wrapper') {
        parentElement.insertBefore(childElement, parentElement.lastChild);
      } else {
        parentElement.appendChild(childElement);
      }
    };

    this.appendToBody = function(childElement) {
      document.body.appendChild(childElement);
    };

    this.remove = function(parentElement, childElement) {
      parentElement.removeChild(childElement);
    };

    this.removeFromBody = function(childElement) {
      document.body.removeChild(childElement);
    };

    //estilo = {display: 'bloco', posição: 'absoluto', ...}
    this.style = function(element, styles) {
      for (var property in styles) {
        element.style[property] = styles[property];
      }
    };

    this.setHTML = function(element, content) {
      element.innerHTML = content;
    };
  }

  return {
    getInstance: function() {
      if (instance == null) {
        instance = new View();
      }

      return instance;
    }
  };
})();
