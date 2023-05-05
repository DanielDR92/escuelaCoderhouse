/** Declarar variables */
const nombres = [];
const apellidos = [];
const nombresCompletos = [];

/** Seteo de controlador para ciclo while */
let controlador = false;

/** Ciclo while para empezar a agregar informacion en el client side */
while ( !controlador ) {
  let nombre = prompt(`Ingrese el nombre en orden, si desea parar, no ingrese informacion`);
  if ( nombre == `` ) 
    controlador = true;
  else
    nombres.push(nombre)
}

/** Ciclo for con do while para ingresar apellidos de cada entrada */
for ( i = 0; i < nombres.length; i++ ) {
  let apellido = ``;
  do {
    apellido = prompt(`Ingrese los apellidos en orden`)
    apellidos.push(apellido);
  } while (apellido != `` && nombres.length > apellidos.length);
}

/** Funcion para concatenar nombres completos */
const concatenarNombreCompleto = function() {
  for ( i = 0; i < nombres.length; i++ ) {
    nombresCompletos.push(`${nombres[i]} ${apellidos[i]}`);
    alert(`${i+1}.- ${nombresCompletos[i]}`);
  }
}

/** Llamado a la funcion */
concatenarNombreCompleto();
