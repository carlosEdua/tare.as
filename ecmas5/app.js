'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// clase donde se crean las tareas clasicas como tal
var Task = function () {
    function Task(name) {
        _classCallCheck(this, Task);

        this.name = name;
        this.isComplete = false;
        // this.isPrueba = false;
    }

    _createClass(Task, [{
        key: 'complete',
        value: function complete() {
            this.isComplete = !this.isComplete;
        }
        //metodo de prueba para saber si se pueden
        //usar desde fuera de la clase
        // prueba(){
        //     this.isPrueba = !this.isPrueba;

        //     if(this.isPrueba){
        //   return  alert('hola');    
        // } 
        // }

    }]);

    return Task;
}();
// clase para agregar listas de tareas especificas


var TaskList = function () {
    function TaskList(name) {
        _classCallCheck(this, TaskList);

        this.name = name;
        this.tasks = [];
    }
    // 3 metodos para agregar,remover, y mostrar las tareas

    // agregar tarea


    _createClass(TaskList, [{
        key: 'addTask',
        value: function addTask(task, element) {
            this.tasks.push(task);
            this.renderTasks(element);
        }
        // remover tarea

    }, {
        key: 'removeTask',
        value: function removeTask(i, element) {
            this.tasks.splice(i, 1);
            this.renderTasks(element);
        }
        // renderizar, mostrar en el HTML 

    }, {
        key: 'renderTasks',
        value: function renderTasks(element) {
            var tareas = this.tasks.map(function (task) {
                return '\n        <li class="tarea ' + (task.isComplete ? 'complete' : '') + '"> \n            <input type="checkbox" \n            class="tarea__complete-button"\n            ' + (task.isComplete ? 'checked' : '') + '\n            >\n\n        <span class="tarea__name">' + task.name + '</span>\n        <a href="#" class="tarea__remove-button">X</a>\n        </li>\n        ';
            });
            element.innerHTML = tareas.reduce(function (a, b) {
                return a + b;
            }, '');
        }
    }]);

    return TaskList;
}();

//obteniendo valores del DOM


var inputTarea = document.getElementById('texto_tarea');
var contenedorLista = document.getElementById('contenedorLista');
var inbox = new TaskList('inbox');
var superMercado = new TaskList('supermercado');
// console.log(inbox);


function addDOMTask(evento) {
    var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : inbox;

    if (evento.key === 'Enter') {
        var task = new Task(this.value);

        list.addTask(task, contenedorLista);
        this.value = "";
    }
}

//eventListener para el input text
inputTarea.addEventListener('keyup', addDOMTask);

//eventListener para escuchar elementos del contenedor padre
//y poder marcar como completa o eliminar

//obtener indice de tarea actual
function getTaskIndex(parametro) {
    var taskItem = parametro.target.parentElement;
    var tasksItems = [].concat(_toConsumableArray(contenedorLista.querySelectorAll("li")));
    var i = tasksItems.indexOf(taskItem);

    return i;
}

function removeDOMTask(evento) {
    var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : inbox;

    // detectar si se hizo click en el enlace
    if (evento.target.tagName === 'A') {
        //remover la tarea y llamar a la funcion para
        //obtener indice
        list.removeTask(getTaskIndex(evento), contenedorLista);
    }
}
contenedorLista.addEventListener('click', removeDOMTask);

//completar tarea desde el DOM

function completeDOMTask(evento) {
    var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : inbox;

    // detectar si se hizo click en el input
    if (evento.target.tagName === 'INPUT') {
        //completar la tarea y llamar a la funcion para
        //obtener indice
        list.tasks[getTaskIndex(evento)].complete();
        // list.tasks[getTaskIndex(evento)].prueba();
        evento.target.parentElement.classList.toggle('complete');
    }
}
contenedorLista.addEventListener('click', completeDOMTask);