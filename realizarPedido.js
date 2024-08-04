//TIENDA VIRTUAL DE SANDWICHES DE MIGA

let cantidadPedido = 0;
let valorTotal;

//OBJETO LISTA DE PRECIOS
const listaDePrecios =  [ 
    { id: 1 , nombre:"Jamón y Queso", precio: 850},
    { id: 2 , nombre:"Jamón y Huevo", precio: 850},
    { id: 3 , nombre:"Jamón y Tomate", precio: 850},
    { id: 4 , nombre:"Jamón y Morron", precio: 850},
    { id: 5 , nombre:"Jamón y Choclo", precio: 850},
    { id: 6 , nombre:"Jamón Crudo y queso", precio: 1200},
    { id: 7 , nombre:"Jamón Crudo y Tomate", precio: 1200},
    { id: 8 , nombre:"Jamón y Atún ", precio: 1200},
    { id: 9 , nombre:"Jamón y Palmitos", precio: 1200},
    { id: 10 , nombre:"Jamón y Roquefort", precio: 1200},
];

//CREO ELEMENTO DIV DENTRO DEL BODY
const divTarjetas = document.createElement("div");
divTarjetas.className = "seccionTarjetas";
document.body.append(divTarjetas);

//PARA CADA PRODUCTO , CREO UNA TARJETA DE PRODUCTO DENTRO DEL DIV PREVIO
listaDePrecios.forEach((elemento) => {
    const tarjetaProducto = document.createElement("div");
    tarjetaProducto.innerHTML = ` 
    <ul>
        <li><img></li>
        <li><h2>${elemento.nombre}</h2></li>
        <li><h2>$${elemento.precio}</h2></li>
        <li><button onclick="quitarDelCarrito(${elemento.id},${elemento.precio})">-</button><button onclick="agregarAlCarrito(${elemento.id},${elemento.precio},'${elemento.nombre}')" >+</button></li>
    </ul>`;
    tarjetaProducto.className = "tarjetaDelProducto";
    divTarjetas.appendChild(tarjetaProducto);
});

//pedido hace referencia al localStorage de la clave "clavePedido"
let pedido = JSON.parse(localStorage.getItem("clavePedido")) || [];


//SUMAR AL PEDIDO (a traves del Onclick del +  "SI EL ARTICULO NO ESTA EN EL PEDIDO se da de ALTA")
const agregarAlCarrito = (idDelProducto,precioDelProducto,nombreDelProducto) => {
    let productoExisteDentroPedido = pedido.find((elemento) => elemento.id === Number(idDelProducto));
    if(productoExisteDentroPedido){
        productoExisteDentroPedido.cantidad +=1;
        productoExisteDentroPedido.precio += precioDelProducto;
        localStorage.setItem("clavePedido", JSON.stringify(pedido));
    }else{
        pedidoCompleto = {
            id:idDelProducto, 
            nombre:nombreDelProducto,
            cantidad:1,
            precio:precioDelProducto,
        };
        pedido.push(pedidoCompleto); 
        localStorage.setItem("clavePedido", JSON.stringify(pedido));
    }
}

//RESTAR AL PEDIDO (a traves del Onclick del -  "SI EL ARTICULO NO ESTA EN EL PEDIDO (no se resta)")
const quitarDelCarrito = (idDelProducto,precioDelProducto) => {
    let productoExisteDentroPedido = pedido.find((elemento) => elemento.id === Number(idDelProducto));
    if(productoExisteDentroPedido.cantidad > 1){
        productoExisteDentroPedido.cantidad -= 1;
        productoExisteDentroPedido.precio -= precioDelProducto;
        localStorage.setItem("clavePedido", JSON.stringify(pedido));
    }else{
        let posicionAEliminar = pedido.findIndex((elemento) => elemento.id === Number(idDelProducto));
        let arrayPostEliminacion = pedido.splice(posicionAEliminar,posicionAEliminar+1);
        localStorage.setItem("clavePedido", JSON.stringify(pedido));
    }
}
