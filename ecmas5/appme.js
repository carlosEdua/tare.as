'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nuevaLista = document.getElementById('nuevaLista');
var inputText = document.getElementById('input');
var listContainer = document.getElementById('listContainer');
var contenedorListasPrincipales = document.getElementById('contenedorListas');

//hacer clase donde se crean todas las tareas básicas
//con metodos para saber si se completo o no la tarea

var Tarea = function () {
    function Tarea(name) {
        _classCallCheck(this, Tarea);

        this.name = name;
        this.isComplete = false;
    }

    _createClass(Tarea, [{
        key: 'completar',
        value: function completar() {
            this.isComplete = !this.isComplete;
        }
    }]);

    return Tarea;
}();

var ListaDeTareas = function () {
    function ListaDeTareas(nameTasksList) {
        _classCallCheck(this, ListaDeTareas);

        this.nameTasksList = nameTasksList;
        this.tasksArreglo = [];
    }

    _createClass(ListaDeTareas, [{
        key: 'addTask',
        value: function addTask(tareaToAdd) {
            //aqui
            this.tasksArreglo.push(tareaToAdd);
            // this.renderTask(elemento);
        }
    }, {
        key: 'removeTask',
        value: function removeTask(indice) {
            this.tasksArreglo.splice(indice, 1);
            // this.renderTask(elemento)
        }
    }, {
        key: 'renderTask',
        value: function renderTask(elemento) {
            var tareas = this.tasksArreglo.map(function (task) {
                return '\n            <li class="tarea ' + (task.isComplete ? 'complete' : '') + '"> \n            <input type="checkbox" \n            class="tarea__complete-button"\n            ' + (task.isComplete ? 'checked' : '') + '\n            >\n\n        <span class="tarea__name">' + task.name + '</span>\n        <a href="#" class="tarea__remove-button">X</a>\n        </li>\n\n            ';
            });
            console.log(tareas);

            elemento.innerHTML = tareas.reduce(function (a, b) {
                return a + b;
            }, '');
            // console.log(tareas);
        }
    }]);

    return ListaDeTareas;
}();

//crear nueva lista


var arrList = []; //arreglo donde se meten todas las nuevas listas

function newList(event) {
    if (event.key === "Enter") {
        //añadir tareas principales al array vacio
        arrList.push(new ListaDeTareas(this.value));
        this.value = "";
        //dibujar listas de tareas principales
        var ordenar = arrList.map(function (listTask) {
            return '\n            <div class="divBotones">\n            <button style="cursor:pointer" class="botonList">\n            ' + listTask.nameTasksList + '\n            </button>\n            </div>\n            \n            ';
        });
        contenedorListasPrincipales.innerHTML = ordenar.reduce(function (a, b) {
            return a + b;
        }, '');
    }
}
//evento para crear nueva lista principal y mostrarla en forma de botones
nuevaLista.addEventListener('keyup', newList);

//obtener indice de boton pulsado
var i = 0;
function getIndexButton(e) {
    var buttonItem = e.target.parentElement;
    var buttonsItems = [].concat(_toConsumableArray(contenedorListasPrincipales.querySelectorAll('div')));
    i = buttonsItems.indexOf(buttonItem);
    console.log(i);
    arrList[i].renderTask(listContainer);
}
contenedorListasPrincipales.addEventListener('click', getIndexButton);

//cambiar entre listas============


//================================

function addDOMTask(evento) {

    if (evento.key === "Enter") {
        var task = new Tarea(this.value);

        arrList[i].addTask(task); //aqui
        arrList[i].renderTask(listContainer);
        this.value = '';
    }
}
//evento para añadir tareas a las tareas principales
inputText.addEventListener("keyup", addDOMTask);

function getTaskIndex(p) {
    var taskItem = p.target.parentElement;
    var tasksItems = [].concat(_toConsumableArray(listContainer.querySelectorAll('li')));
    return tasksItems.indexOf(taskItem);
}

function removeDOMTask(evento) {
    if (evento.target.tagName === 'A') {
        //aqui ============
        // arrList[i].removeTask(getTaskIndex(evento));
        arrList[i].tasksArreglo.splice(getTaskIndex(evento), 1);
        arrList[i].renderTask(listContainer);
    }
}

//evento para remover
listContainer.addEventListener('click', removeDOMTask);

function completeDOMTask(evento) {
    if (evento.target.tagName === 'INPUT') {
        arrList[i].tasksArreglo[getTaskIndex(evento)].completar();

        //para añadir clase al input seleccionado y mejorar visualmente
        evento.target.parentElement.classList.toggle('complete');
    }
}
//evento para completar
listContainer.addEventListener('click', completeDOMTask);