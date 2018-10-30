const inputNuevaLista = document.getElementById('nuevaLista');
const contenedorListas = document.getElementById('contenedorListas');
const inputTarea = document.getElementById('input');
const taskContainer = document.getElementById('taskContainer');


   
class Tarea{
  constructor(nombre) {
    this.nombre = nombre;
    this.isComplete = false;
  }
  completar(){
    this.isComplete = !this.isComplete;
    console.log(this.isComplete);
  }
}
 
class ListaDeTareas {
  constructor(nombreDeLista) {
    this.nombreDeLista = nombreDeLista;
    this.ArregloTareitas = [];
  }
  addTarea(tareita,elemento){
    this.ArregloTareitas.push(tareita);
    this.renderTarea(elemento);
  }
  quitarTarea(i,elemento){
    this.ArregloTareitas.splice(i,1);
    this.renderTarea(elemento);
  }
  renderTarea(elemento){
                      
    let tareaAdibujar = this.ArregloTareitas.map( (tarea) =>
      `
      <li class="tarea ${tarea.isComplete ? 'complete':''}">
      <input type="checkbox" class="tarea__complete-button" ${tarea.isComplete ? 'checked':''}>
  <span class="tarea__name">${tarea.nombre}</span>
  <a  class="tarea__remove-button">X</a>
  </li>
      `
    );
    elemento.innerHTML = tareaAdibujar.reduce((a,b) => a+b,'');
  }
}
 

//agregar listas de tareas nuevas
//array con listas
let listas = [];
function agregarLista(e) {
  if(e.key === "Enter"){
    let nuevaListica = new ListaDeTareas(this.value)
    listas.push(nuevaListica);
    this.value = '';
    dibujarLista();
  }
}
 inputNuevaLista.addEventListener('keyup',agregarLista)

 
 
 //dibujar nueva lista
 function dibujarLista() {
   let dibuList = listas.map((list) =>
`
      <div class="divBotones">
      <button style="cursor:pointer" class="botonList">
      ${list.nombreDeLista}
      </button>
      <a class="list-x-button">X</a>
      </div>

`
  );
  contenedorListas.innerHTML = dibuList.reduce((a,b) => a + b ,'');
 }

 
 
 //obtener indice de listas
 let i = 0;

function getIndexList(event){

  let item = event.target.parentElement;
  let items = [...contenedorListas.querySelectorAll('div')];
  let indice = items.indexOf(item);
  i = indice;
  console.log(indice);
   return indice;
  // dibujarLuegoDelIndex(i);

}
contenedorListas.addEventListener('click',getIndexList)




function dibujarLuegoDelIndex(e) {
  listas[getIndexList(e)].renderTarea(taskContainer);
}
contenedorListas.addEventListener('click',dibujarLuegoDelIndex);



//borrar listasPrincipales
function borrarLista(e) {
  if (e.target.tagName === "A") {      
    listas.splice(getIndexList(e),1);
    dibujarLista();
  }
}
contenedorListas.addEventListener('click',borrarLista)



//añadir tarea desde DOM a lista
function addDOMTarea(e){
  if(e.key === "Enter"){
    if(listas.length == 0){
       alert('primero añade una lista/evento en el lado derecho');
    }
    let nuevaTareita = new Tarea(this.value);
    listas[i].addTarea(nuevaTareita,taskContainer);
    this.value = '';
  }
}
inputTarea.addEventListener('keyup',addDOMTarea)



//indice de tareas
function getIndexTask(e) {
  let item = e.target.parentElement;
  let items = [...taskContainer.querySelectorAll('li')];
  return items.indexOf(item);
}



//completar tarea
function completarTarea(e) {
  if (e.target.tagName === 'INPUT') {
    listas[i].ArregloTareitas[getIndexTask(e)].completar();
    e.target.parentElement.classList.toggle('complete');
  }
}
taskContainer.addEventListener('click',completarTarea)



//eliminar Tarea
function removeDOMTarea(e) {
  if(e.target.tagName === 'A'){
    listas[i].quitarTarea(getIndexTask(e),taskContainer);
  }
}
taskContainer.addEventListener('click',removeDOMTarea)
