function addItem () {
  let element = document.getElementById("addItemForm");
  let hidden = element.getAttribute("hidden");
  let button = document.getElementById("addItemButton");
  if (hidden) {
    element.removeAttribute("hidden");
    button.innerText = "Cancelar";
    document.getElementById("nombre").value = '';
    document.getElementById("descripcion").value = '';
    document.getElementById("precio").value = 0;
 } else {
    element.setAttribute("hidden", "hidden");
    button.innerText = "Agregar Elemento";
 }
}

function aceptar() {
  let nombre = document.getElementById("nombre").value;
  let descripcion = document.getElementById("descripcion").value;
  let precio = document.getElementById("precio").value;
  let element = document.getElementById("addItemForm");
  let button = document.getElementById("addItemButton");

  if ( nombre == '' || descripcion == '' || precio == '' ) 
    return alert ('Llena todos los campos');

  if ( items.some(x => x.nombre == nombre) )
    return alert ('Elemento ya agregado');

  items.push({
    nombre: nombre,
    descripcion: descripcion,
    precio: precio
  });

  document.getElementById("nombre").value = '';
  document.getElementById("descripcion").value = '';
  document.getElementById("precio").value = 0;

  document.getElementById('listaItems').innerText = ''

  let ul = document.createElement('ul');

  for (const item of items){
    let li = document.createElement('li');
    li.innerHTML = "Nombre: " + item.nombre;
    ul.appendChild(li);
    li = document.createElement('li')
    li.innerHTML = "Descripcion: " + item.descripcion;
    ul.appendChild(li);
    li = document.createElement('li')
    li.innerHTML = "Precio: " + "$" + item.precio;
    ul.appendChild(li);
    let div = document.createElement('div');
  }
  document.getElementById('listaItems').appendChild(ul);
  element.setAttribute("hidden", "hidden");
  button.innerText = "Agregar Elemento";

}

const items = [];
