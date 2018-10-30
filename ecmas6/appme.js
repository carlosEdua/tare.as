let nuevaLista = document.getElementById('nuevaLista');
const inputText = document.getElementById('input')
const listContainer = document.getElementById('listContainer')
let contenedorListasPrincipales = document.getElementById('contenedorListas')

//hacer clase donde se crean todas las tareas básicas
//con metodos para saber si se completo o no la tarea
class Tarea{
    constructor(name){
        this.name = name;
        this.isComplete = false;
    }
    completar(){
        this.isComplete = !this.isComplete;
    }
}

class ListaDeTareas{
    constructor(nameTasksList){
        this.nameTasksList = nameTasksList;
        this.tasksArreglo = [];
    }
    addTask(tareaToAdd){//aqui
        this.tasksArreglo.push(tareaToAdd);
        // this.renderTask(elemento);
    }
    removeTask(indice){
        this.tasksArreglo.splice(indice,1)
        // this.renderTask(elemento)
    }
    renderTask(elemento){
        let tareas = this.tasksArreglo.map(task => 
            `
            <li class="tarea ${task.isComplete ? 'complete':''}"> 
            <input type="checkbox" 
            class="tarea__complete-button"
            ${task.isComplete ? 'checked':''}
            >

        <span class="tarea__name">${task.name}</span>
        <a href="#" class="tarea__remove-button">X</a>
        </li>

            `
        );
        console.log(tareas);
        
        
        elemento.innerHTML = tareas.reduce((a,b) => a+b,'');
        // console.log(tareas);
        
    }
}

//crear nueva lista
let arrList = [];  //arreglo donde se meten todas las nuevas listas

function newList(event) {
    if(event.key === "Enter"){
        //añadir tareas principales al array vacio
        arrList.push(new ListaDeTareas(this.value));
        this.value = "";
        //dibujar listas de tareas principales
        let ordenar = arrList.map(listTask => 
            `
            <div class="divBotones">
            <button style="cursor:pointer" class="botonList">
            ${listTask.nameTasksList}
            </button>
            </div>
            
            `
            
        );
        contenedorListasPrincipales.innerHTML = ordenar.reduce((a,b)=> a+b,'');
    }
}
//evento para crear nueva lista principal y mostrarla en forma de botones
nuevaLista.addEventListener('keyup',newList);

//obtener indice de boton pulsado
let i = 0;
function getIndexButton(e) {
    let buttonItem = e.target.parentElement;
     let buttonsItems = [...contenedorListasPrincipales.querySelectorAll('div')];
    i = buttonsItems.indexOf(buttonItem);
    console.log(i);
    arrList[i].renderTask(listContainer)
    
}
contenedorListasPrincipales.addEventListener('click',getIndexButton)

//cambiar entre listas============


//================================

function addDOMTask(evento){

    if(evento.key === "Enter"){
        let task = new Tarea(this.value);
        
        arrList[i].addTask(task);//aqui
        arrList[i].renderTask(listContainer);
        this.value = '';
        
    }
}
//evento para añadir tareas a las tareas principales
 inputText.addEventListener("keyup",addDOMTask);
 

function getTaskIndex(p){
    let taskItem = p.target.parentElement;
    let tasksItems = [...listContainer.querySelectorAll('li')];
    return tasksItems.indexOf(taskItem);
}

function removeDOMTask(evento){
    if(evento.target.tagName === 'A'){
    //aqui ============
        // arrList[i].removeTask(getTaskIndex(evento));
        arrList[i].tasksArreglo.splice(getTaskIndex(evento),1);
    arrList[i].renderTask(listContainer)
    }
}

//evento para remover
listContainer.addEventListener('click',removeDOMTask);

function completeDOMTask(evento){
    if(evento.target.tagName === 'INPUT'){
        arrList[i].tasksArreglo[getTaskIndex(evento)].completar();

        //para añadir clase al input seleccionado y mejorar visualmente
    evento.target.parentElement.classList.toggle('complete')    
    }
}
//evento para completar
listContainer.addEventListener('click',completeDOMTask);


