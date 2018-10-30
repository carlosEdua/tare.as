// clase donde se crean las tareas clasicas como tal
class Task {
    constructor(name){
        this.name = name;
        this.isComplete = false;
        // this.isPrueba = false;
    }
    complete(){
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
} 
// clase para agregar listas de tareas especificas
class TaskList{
    constructor(name){
        this.name = name;
        this.tasks = [];
    }
    // 3 metodos para agregar,remover, y mostrar las tareas
    
    // agregar tarea
    addTask(task,element){
        this.tasks.push(task);
        this.renderTasks(element)
    }
    // remover tarea
    removeTask(i,element){
        this.tasks.splice(i,1);
        this.renderTasks(element);
    }  
    // renderizar, mostrar en el HTML 
    renderTasks(element){
        let tareas = this.tasks.map( task => `
        <li class="tarea ${task.isComplete ? 'complete':''}"> 
            <input type="checkbox" 
            class="tarea__complete-button"
            ${task.isComplete ? 'checked':''}
            >

        <span class="tarea__name">${task.name}</span>
        <a href="#" class="tarea__remove-button">X</a>
        </li>
        `);
        element.innerHTML = tareas.reduce((a,b)=> a+b,'');
    }
}

//obteniendo valores del DOM
const inputTarea = document.getElementById('texto_tarea')
const contenedorLista = document.getElementById('contenedorLista')
const inbox = new TaskList('inbox');
const superMercado = new TaskList('supermercado');
// console.log(inbox);


function addDOMTask(evento,list = inbox) {
    if(evento.key === 'Enter'){
        let task = new Task(this.value);
       
    list.addTask(task,contenedorLista);
    this.value = "";
    }
}


//eventListener para el input text
inputTarea.addEventListener('keyup',addDOMTask);

//eventListener para escuchar elementos del contenedor padre
//y poder marcar como completa o eliminar

//obtener indice de tarea actual
function getTaskIndex(parametro){
    let taskItem = parametro.target.parentElement;
    let tasksItems = [...contenedorLista.querySelectorAll("li")];
    let i = tasksItems.indexOf(taskItem);
    
    return i;
}


function removeDOMTask(evento, list = inbox){
    // detectar si se hizo click en el enlace
    if(evento.target.tagName === 'A'){
        //remover la tarea y llamar a la funcion para
        //obtener indice
        list.removeTask(getTaskIndex(evento),contenedorLista);
    }
    
}
contenedorLista.addEventListener('click',removeDOMTask);

//completar tarea desde el DOM

function completeDOMTask(evento, list = inbox){
    // detectar si se hizo click en el input
    if(evento.target.tagName === 'INPUT'){
        //completar la tarea y llamar a la funcion para
        //obtener indice
        list.tasks[getTaskIndex(evento)].complete();
        // list.tasks[getTaskIndex(evento)].prueba();
        evento.target.parentElement.classList.toggle('complete')        
    }
    
}
contenedorLista.addEventListener('click',completeDOMTask);
 
    