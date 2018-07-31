'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var inputNuevaLista = document.getElementById('nuevaLista');
var contenedorListas = document.getElementById('contenedorListas');
var inputTarea = document.getElementById('input');
var taskContainer = document.getElementById('taskContainer');

var Tarea = function () {
  function Tarea(nombre) {
    _classCallCheck(this, Tarea);

    this.nombre = nombre;
    this.isComplete = false;
  }

  _createClass(Tarea, [{
    key: 'completar',
    value: function completar() {
      this.isComplete = !this.isComplete;
      console.log(this.isComplete);
    }
  }]);

  return Tarea;
}();

var ListaDeTareas = function () {
  function ListaDeTareas(nombreDeLista) {
    _classCallCheck(this, ListaDeTareas);

    this.nombreDeLista = nombreDeLista;
    this.ArregloTareitas = [];
  }

  _createClass(ListaDeTareas, [{
    key: 'addTarea',
    value: function addTarea(tareita, elemento) {
      this.ArregloTareitas.push(tareita);
      this.renderTarea(elemento);
    }
  }, {
    key: 'quitarTarea',
    value: function quitarTarea(i, elemento) {
      this.ArregloTareitas.splice(i, 1);
      this.renderTarea(elemento);
    }
  }, {
    key: 'renderTarea',
    value: function renderTarea(elemento) {

      var tareaAdibujar = this.ArregloTareitas.map(function (tarea) {
        return '\n      <li class="tarea ' + (tarea.isComplete ? 'complete' : '') + '">\n      <input type="checkbox" class="tarea__complete-button" ' + (tarea.isComplete ? 'checked' : '') + '>\n  <span class="tarea__name">' + tarea.nombre + '</span>\n  <a  class="tarea__remove-button">X</a>\n  </li>\n      ';
      });
      elemento.innerHTML = tareaAdibujar.reduce(function (a, b) {
        return a + b;
      }, '');
    }
  }]);

  return ListaDeTareas;
}();

//agregar listas de tareas nuevas
//array con listas


var listas = [];
function agregarLista(e) {
  if (e.key === "Enter") {
    var nuevaListica = new ListaDeTareas(this.value);
    listas.push(nuevaListica);
    this.value = '';
    dibujarLista();
  }
}
inputNuevaLista.addEventListener('keyup', agregarLista);

//dibujar nueva lista
function dibujarLista() {
  var dibuList = listas.map(function (list) {
    return '\n      <div class="divBotones">\n      <button style="cursor:pointer" class="botonList">\n      ' + list.nombreDeLista + '\n      </button>\n      <a class="list-x-button">X</a>\n      </div>\n\n';
  });
  contenedorListas.innerHTML = dibuList.reduce(function (a, b) {
    return a + b;
  }, '');
}

//obtener indice de listas
var i = 0;

function getIndexList(event) {

  var item = event.target.parentElement;
  var items = [].concat(_toConsumableArray(contenedorListas.querySelectorAll('div')));
  var indice = items.indexOf(item);
  i = indice;
  console.log(indice);
  return indice;
  // dibujarLuegoDelIndex(i);
}
contenedorListas.addEventListener('click', getIndexList);

function dibujarLuegoDelIndex(e) {
  listas[getIndexList(e)].renderTarea(taskContainer);
}
contenedorListas.addEventListener('click', dibujarLuegoDelIndex);

//borrar listasPrincipales
function borrarLista(e) {
  if (e.target.tagName === "A") {
    listas.splice(getIndexList(e), 1);
    dibujarLista();
  }
}
contenedorListas.addEventListener('click', borrarLista);

//añadir tarea desde DOM a lista
function addDOMTarea(e) {
  if (e.key === "Enter") {
    if (listas.length == 0) {
      alert('primero añade una lista/evento en el lado derecho');
    }
    var nuevaTareita = new Tarea(this.value);
    listas[i].addTarea(nuevaTareita, taskContainer);
    this.value = '';
  }
}
inputTarea.addEventListener('keyup', addDOMTarea);

//indice de tareas
function getIndexTask(e) {
  var item = e.target.parentElement;
  var items = [].concat(_toConsumableArray(taskContainer.querySelectorAll('li')));
  return items.indexOf(item);
}

//completar tarea
function completarTarea(e) {
  if (e.target.tagName === 'INPUT') {
    listas[i].ArregloTareitas[getIndexTask(e)].completar();
    e.target.parentElement.classList.toggle('complete');
  }
}
taskContainer.addEventListener('click', completarTarea);

//eliminar Tarea
function removeDOMTarea(e) {
  if (e.target.tagName === 'A') {
    listas[i].quitarTarea(getIndexTask(e), taskContainer);
  }
}
taskContainer.addEventListener('click', removeDOMTarea);