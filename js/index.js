const containerProducts = document.getElementById(`container-products`);
const modal = document.getElementById(`ventana-modal`);
const logginModal = document.getElementById(`loggin-modal`);
const enviarUsuario = document.getElementById(`enviarUsuario`);
const mensajeBienvenida = document.getElementById(`mensajeBienvenida`);
const carrito =[];
const containerCart = document.getElementById('carritoCompras');
let productosUnicos =[];
const botonCarrito = document.getElementById('carrito');
const btnClose = document.getElementById('botonClose');
const totalCarrito = document.getElementById('total');


let usuario = JSON.parse(localStorage.getItem("usuario")) || undefined; 

const productos = [];

const getAllProducts = async function () {
    let data = await fetch('../data/productos.json')
    data = await data.json()
    productos.push(...data)
}


const renderizarProductos = async function () {
    try {
        await getAllProducts()
        for (const producto of productos) {
            const divCard = document.createElement(`div`);
            divCard.classList.add(`card`);
            divCard.innerHTML += `
                <img src="./img/${producto.img}" alt="${producto.nombre}" />
                <h4>${producto.nombre}</h4>
                <p>$${producto.precio}</p>
                <button id=${producto.id} class="boton agregar-carrito" href="#">Agregar</button>
            `;
            containerProducts.appendChild(divCard);
        };
    } catch (error) {
        console.error(error)
    }
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
        localStorage.setItem("usuario", JSON.stringify(usuario));
        location.reload();    
    }
} else {
    mensajeBienvenida.style.display = `block`
    mensajeBienvenida.innerText = `Bienvenido ${usuario.nombre}!`
    renderizarProductos();

    const agregarProducto = function (e)  { 
        let total = 0;
        carrito.push(...productos.filter(x => x.id == e.target.id));
        sessionStorage.setItem("carrito", JSON.stringify(carrito))

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
        
        totalCarrito.innerText = `$ ${total}`;
        sweetAlert(`El total del carrito es $ ${total} pesos`)
    }


    containerProducts.addEventListener('click', (e) => {
        if(e.target.classList.contains('agregar-carrito')) {
            agregarProducto(e)
        }
    })

}
