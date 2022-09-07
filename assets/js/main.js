/* DataBase */
const productos = [
  {
    id: 1,
    nombre: 'Palomitas de Maiz - Personal',
    imagen: 'https://img.freepik.com/vector-premium/palomitas-maiz-realistas-cubo-papel-rayado-blanco-rojo-pelicula-vector-envase-snack-teatro_208581-1003.jpg?w=740',
    precio: 5,
    unidades: 250
  },
  {
    id: 2,
    nombre: 'Gaseosa - 500 ml',
    imagen: 'https://tofuu.getjusto.com/orioneat-prod-resized/Hm8BaD9qcEzsaqn8L-1200-1200.webp',
    precio: 2,
    unidades: 100
  },
  {
    id: 3,
    nombre: 'Hot Dog - Clasico',
    imagen: 'https://img.freepik.com/fotos-premium/pancho_488220-15631.jpg?w=740',
    precio: 20,
   unidades: 50
  },
  {
    id: 4,
    nombre: 'Galletas Oreo - 4 Unid',
    imagen: 'https://transmarket.pe/wp-content/uploads/2020/05/galleta-oreo-chocolate.png',
    precio: 2,
    unidades: 25
  }
]

/* Productos */
const productosContenedor = document.querySelector('.products__container')

function pintarProductos () {
  let html = ''
  for (const { id, nombre, imagen, precio, unidades } of productos) {
    html += `
    <div>
    <article class="products__item">
    <div class="products__price">$${precio}</div>


      <img class="products__image" src="${imagen}" alt="${nombre}">

      <div class="products__data">
        <div class="products__info">
          <h2 class="products__title">${nombre}</h2>
          <span class="products__stock">Cant: ${unidades}</span>
        </div>

        <div class="products__button">
          <button type="button" class="agregar button" data-id="${id}"><i class='bx bx-add-to-queue' ></i></button>
        </div>
      </div>
    </article>
  </div>
    `
  }
  productosContenedor.innerHTML = html
}

pintarProductos()

/* Carrito */
let carrito = []

const articulosContenedor = document.querySelector('.cart__container .cart__list')
const contadorDeArticulos = document.getElementById('cart-count')
const totalPrecio = document.getElementById('cart-total')
const botonComprar = document.querySelector('.btn--checkout')

function pintarCarrito () {
  let html = ''

  for (const { id, cantidad } of carrito) {
    const { nombre, imagen } = productos.find(producto => producto.id === id)
    html += `
    <li class="cart__item">
    <article class="cart__article grid">
      <img class="cart__image" src="${imagen}" alt="${nombre}">

      <div class="cart__data">
        <h2 class="cart__name">${nombre}</h2>

        <div class="cart__minmax">
          <button type="button" class="cart__button btn--remove" id="cart-remove" data-id="${id}"><i class='bx bx-minus' ></i></button>
          <span id="cart-qty">${cantidad}</span>
          <button type="button" class="cart__button btn--add" id="cart-add" data-id="${id}"><i class='bx bx-plus' ></i></button>
        </div>

      </div>
      <div class="cart__delete">
        <button type="button" class="cart__button btn--delete" id="cart-delete" data-id="${id}"><i class='bx bx-trash' ></i></button>
      </div>
    </article>
  </li>
    `
  }

  articulosContenedor.innerHTML = html
  contadorDeArticulos.innerHTML = contarArticulos()
  totalPrecio.innerHTML = total()
}

function agregarAlCarrito (id) {
  const cantidad = 1

  // si el producto (x) en su propiedad id es igual al id que pasamos como párametro, retornalo.
  const productoEncontrado = productos.find(producto => producto.id === id)

  if (productoEncontrado && productoEncontrado.unidades > 0) {
    // si el articulo (x) en su propiedad id es igual al id que pasamos como párametro, retornalo.
    const articuloEncontrado = carrito.find(articulo => articulo.id === id)

    if (articuloEncontrado) {
    // console.log('aumenta su cantidad')

      // verificar las unidades dispobibles
      if (checarUnidades(id, cantidad + articuloEncontrado.cantidad)) {
        articuloEncontrado.cantidad += cantidad
      } else {
        window.alert('supera las unidades disponibles')
      }
    } else {
      carrito.push({ id, cantidad })
    }
  } else {
    window.alert('Lo sentimos no contamos con unidades disponibles')
  }
  pintarCarrito()
}

function checarUnidades (id, cantidad) {
  const productoEncontrado = productos.find(producto => producto.id === id)

  // console.log('id: ', id)
  // console.log('cantidad: ', cantidad)

  return productoEncontrado.unidades - cantidad >= 0
}

function removerDelCarrito (id) {
  const cantidad = 1

  // si el articulo (x) en su propiedad id es igual al id que pasamos como párametro, retornalo.
  const articuloEncontrado = carrito.find(articulo => articulo.id === id)

  if (articuloEncontrado && articuloEncontrado.cantidad - cantidad > 0) {
    articuloEncontrado.cantidad -= cantidad
  } else {
    carrito = carrito.filter(articulo => articulo.id !== id)
  }
  pintarCarrito()
}

function eliminarArticulo (id) {
  carrito = carrito.filter(articulo => articulo.id !== id)
  pintarCarrito()
}

function contarArticulos () {
  let suma = 0
  for (const articulo of carrito) {
    suma += articulo.cantidad
  }
  return suma
}

function total () {
  let suma = 0

  for (const articulo of carrito) {
    const productoEncontrado = productos.find(producto => producto.id === articulo.id)
    suma += articulo.cantidad * productoEncontrado.precio
  }

  return suma
}

function comprar () {
  for (const articulo of carrito) {
    const productoEncontrado = productos.find(producto => producto.id === articulo.id)

    productoEncontrado.unidades -= articulo.cantidad
  }

  window.alert('gracias por su compra')
  carrito = []
  pintarCarrito()
  pintarProductos()
}

pintarCarrito()

productosContenedor.addEventListener('click', e => {
  if (e.target.closest('.agregar')) {
    const id = +e.target.closest('.agregar').dataset.id
    agregarAlCarrito(id)
  }
})

articulosContenedor.addEventListener('click', e => {
  if (e.target.closest('#cart-add')) {
    const id = +e.target.closest('#cart-add').dataset.id
    agregarAlCarrito(id)
  }

  if (e.target.closest('#cart-remove')) {
    const id = +e.target.closest('#cart-remove').dataset.id
    removerDelCarrito(id)
  }

  if (e.target.closest('#cart-delete')) {
    const id = +e.target.closest('#cart-delete').dataset.id
    eliminarArticulo(id)
  }
})

botonComprar.addEventListener('click', () => {
  comprar()
})
