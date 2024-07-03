// Variable que mantiene el estado visible del carrito
var carritoVisible = false;

// Esperamos a que todos los elementos de la página carguen para ejecutar el script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    
    // Agregamos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i = 0; i < botonesEliminarItem.length; i++) {
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    // Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    // Agrego funcionalidad al botón restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    // Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    // Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

// Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked() {
    alert("Gracias por la compra");
    // Elimino todos los elementos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}

// Función que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

// Función que hace visible el carrito
function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

// Función que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    // Buscar si el producto ya está en el carrito
    var itemsEnCarrito = document.querySelectorAll('.carrito-item');
    for (var i = 0; i < itemsEnCarrito.length; i++) {
        var item = itemsEnCarrito[i];
        var tituloItem = item.querySelector('.carrito-item-titulo').textContent;
        if (tituloItem === titulo) {
            // Si el producto ya está en el carrito, aumentar la cantidad
            var cantidadElemento = item.querySelector('.carrito-item-cantidad');
            cantidadElemento.value = parseInt(cantidadElemento.value) + 1;
            actualizarTotalCarrito();
            return; // Salir de la función porque ya se encontró el producto
        }
    }

    // Si el producto no está en el carrito, crear un nuevo elemento
    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;

    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    var item = document.createElement('div');
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.appendChild(item);

    // Agregar funcionalidad de eliminar al nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    // Agregar funcionalidad de restar cantidad al nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    // Agregar funcionalidad de sumar cantidad al nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    actualizarTotalCarrito();
}

// Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = parseInt(selector.querySelector('.carrito-item-cantidad').value);
    cantidadActual++;
    selector.querySelector('.carrito-item-cantidad').value = cantidadActual;
    actualizarTotalCarrito();
}

// Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = parseInt(selector.querySelector('.carrito-item-cantidad').value);
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.querySelector('.carrito-item-cantidad').value = cantidadActual;
        actualizarTotalCarrito();
    }
}

// Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}

// Función que controla si hay elementos en el carrito. Si no hay, oculta el carrito.
function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount === 0) {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

// Actualizamos el total del carrito
function actualizarTotalCarrito() {
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    
    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.querySelector('.carrito-item-precio').innerText;
        var precio = parseFloat(precioElemento.replace('$', '').replace(',', ''));
        var cantidadItem = parseInt(item.querySelector('.carrito-item-cantidad').value);
        total += precio * cantidadItem;
    }
    
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";
}