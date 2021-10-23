//Variables
const carrito = document.querySelector("#carrito");
const listaArticulos = document.querySelector("#lista-articulos");
const divCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

registrarEventListeners(); //la llamo despues de crearla
function registrarEventListeners() {
  listaArticulos.addEventListener("click", agregarArticulo); //AGREGAR PRESIONANDO
  //ELIMINAR ARTICULO
  carrito.addEventListener("click", eliminarArticulo);

  //al vaciar carrito
  vaciarCarrito.addEventListener("click", limpiarHtml);
}

//Funciones
//AGREGAR ARTICULO
function agregarArticulo(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const articuloSeleccionado = e.target.parentElement.parentElement;
    leerDatosArticulo(articuloSeleccionado);
  }
}

//LEER EL HTML DONDE DIMOS CLICK Y EXTRAEMOS
function leerDatosArticulo(articulo) {
  //console.log(articulo);
  //creemos un objeto con el contenido del articulo
  const infoArticulo = {
    imagen: articulo.querySelector("img").src,
    titulo: articulo.querySelector("h4").textContent,
    precio: articulo.querySelector(".precio span").textContent,
    id: articulo.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  //Revisa si un articulo ya existe
  const existe = articulosCarrito.some(
    (articulo) => articulo.id === infoArticulo.id
  );
  if (existe) {
    //actualizamos cantidad
    const articulos = articulosCarrito.map((articulo) => {
      if (articulo.id === infoArticulo.id) {
        articulo.cantidad++;
        return articulo; //retorna el objeto actualizado
      } else {
        return articulo; //retorna los objetos nuevos
      }
    });
    articulosCarrito = [...articulos];
  } else {
    //agregamos el articulo al carrito
    //agregar elementos al carrito
    articulosCarrito = [...articulosCarrito, infoArticulo];
    /* console.table(articulosCarrito); */
  }

  carritoHtml(); //debo llamarla en mi proceso principal
}

//pongo mi funcion eliminar articulo antes de leer datos
function eliminarArticulo(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-articulo")) {
    const ArticuloId = e.target.getAttribute("data-id");
    //eliminamos del arreglo articuloCarrito por el dat-id
    articulosCarrito = articulosCarrito.filter(
      (articulo) => articulo.id !== ArticuloId
    );
    carritoHtml();
  }
}

//Mostrar los articulos añadiendo el html
function carritoHtml() {
  //Limpiar el html
  limpiarHtml();

  //recorre el carrito y genera el html
  articulosCarrito.forEach((articulo) => {
    const { imagen, titulo, precio, cantidad, id } = articulo;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td> <img src="${imagen}" width="100"> </td>
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td> <a href="#" class="borrar-articulo" data-id="${id}"> X </a> </td>
        `;
    //agrega el html al table
    divCarrito.appendChild(row);
  });
}

//elimina los articulos del tbody
function limpiarHtml() {
  //formalenta de eliminar html
  // divCarrito.innerHTML = '';
  //mejoremos el performance
  while (divCarrito.firstChild) {
    divCarrito.removeChild(divCarrito.firstChild);
  }
}
