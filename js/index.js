const containerProducts = document.getElementById(`container-products`);
const modal = document.getElementById(`ventana-modal`);
const logginModal = document.getElementById(`loggin-modal`);
const enviarUsuario = document.getElementById(`enviarUsuario`);
const mensajeBienvenida = document.getElementById(`mensajeBienvenida`);
const agregarCarrito = document.getElementsByClassName(`agregar-carrito`);
const carrito =[];
const containerCart = document.getElementById('carritoCompras');
let productosUnicos =[];
const botonCarrito = document.getElementById('carrito');
const btnClose = document.getElementById('botonClose');
const totalCarrito = document.getElementById('total');

let usuario = JSON.parse(sessionStorage.getItem("usuario")) || undefined; 

const productos = [
	{
		id: 1,
		nombre: `Agua Pellegrino`,
		precio: 800,
		img: `agua-pellegrino.jpg`
	},
	{
		id: 2,
		nombre: `Agua Bonaqua`,
		precio: 500,
		img: `agua-bonagua.jpg`
	},
	{
		id: 3,
		nombre: `Andes Origen`,
		precio: 400,
		img: `andes-origen.jpg`
	},
	{
		id: 4,
		nombre: `Aquarius Pera`,
		precio: 130,
		img: `aquarius-pera.jpg`
	},
	{
		id: 5,
		nombre: `Aquarius Pomelo`,
		precio: 190,
		img: `aquarius-pomelo.jpg`
	}
];

const renderizarProductos = function () {
    for (const producto of productos) {
        const divCard = document.createElement(`div`);
        divCard.classList.add(`card`);
        divCard.innerHTML += `
            <img src="./img/${producto.img}" alt="${producto.nombre}" />
            <h4>${producto.nombre}</h4>
            <p>$${producto.precio}</p>
            <a id=${producto.id} class="boton agregar-carrito" href="#">Agregar</a>
        `;
        containerProducts.appendChild(divCard);
    };
};

botonCarrito.onclick = function () {
    modal.style.display = 'block';
    
};

btnClose.onclick = function () {
    modal.style.display = 'none';
};

if ( !usuario ) {
    logginModal.style.display =`block`;
    mensajeBienvenida.style.display = `none`
    enviarUsuario.onclick = function () {
        usuario = {
            nombre: document.getElementById(`nombre`).value,
            edad: document.getElementById(`edad`).value
        }
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
        location.reload();    
    }
} else {
    mensajeBienvenida.style.display = `block`
    mensajeBienvenida.innerText = `Bienvenido ${usuario.nombre}!`
    renderizarProductos();

    const agregarProducto = e => { 
        let total = 0;
        carrito.push(...productos.filter(x => x.id == e.target.id));

        while (containerCart.firstChild) {
            containerCart.removeChild(containerCart.firstChild);
        }

        let uniqueItems = carrito.filter((value, index, array) =>array.findIndex(y => y.nombre == value.nombre) === index);

        for (const elemento of uniqueItems) {
            const div = document.createElement('div');
            div.classList.add('contenedor-producto');
            div.innerHTML = `
                <img src="./img/${elemento.img}" width="100">
                <P>${elemento.nombre}</P>
                <P>$${elemento.precio}</P>
                <P>${carrito.filter(x => x.nombre == elemento.nombre).length}</P>
                <P>$${elemento.precio * carrito.filter(x => x.nombre == elemento.nombre).length}</P>
                <a href="#" class="eliminar-producto" id="${elemento.id}"> X </a>
            `;
            containerCart.appendChild(div);
        };

        for (const elemento of carrito){
            total += elemento.precio
        }
    
        alert(`El total del carrito es $ ${total} pesos`)
    }
      
    for (let boton of agregarCarrito) {
    boton.addEventListener("click", agregarProducto);
    }
};
