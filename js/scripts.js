//var direccionWebService = "http://localhost:61078/";
//var direccionWebService = "http://192.168.1.41/WS_Server_Ventas_MVC_Rodriguez/";
//var direccionWebService = "http://192.168.0.25/WS_Server_Ventas_MVC_Rodriguez/";

var direccionWebService = "http://172.30.105.77/WS_Server_Ventas_MVC_Rodriguez/";

var direccionWebServiceMetodos = direccionWebService + "WebServices/WebServiceVentas.asmx/";

function ListarProductos(tipo, valor) {
    let productosList = document.getElementById("productosList");
    productosList.innerHTML = "";

    var obj = {};

    let urlListar = "";
    if (tipo === "id") {
        urlListar = "ListarProductosPorId";
        obj = {
            id: valor
        };
    } else if (tipo === "nombre") {
        urlListar = "ListarProductos";
        obj = {
            nombre: valor
        };
    } else {
        urlListar = "ListarProductos";
        obj = {
            nombre: ""
        };
    }

    $.ajax({
        type: "POST",
        crossDomain: true,
        data: obj,
        url: direccionWebServiceMetodos + urlListar,
        success: function (resp) {
            let productos = resp.getElementsByTagName("ProductoDTO");
            for (var i = 0; i < productos.length; i++) {
                let producto = productos[i];

                var cardDiv = document.createElement("div");

                let imagen = producto.getElementsByTagName("Imagen");
                let imagenText = imagen[0].textContent;
                let urlImagen = `${direccionWebService}Uploads/${imagenText}`;

                cardDiv.innerHTML = `<div class="mdl-grid">
                                        <div class="mdl-layout-spacer"></div>
                                        <div class="mdl-cell mdl-cell--8-col demo-card-wide mdl-card mdl-shadow--2dp">
                                            <div class="mdl-card__title" style="height: 176px;
                                            background: url('${urlImagen}') center / cover;">
                                                <!-- <h2 class="mdl-card__title-text">Welcome</h2> -->
                                            </div>                                            
                                        </div>
                                        <div class="mdl-layout-spacer"></div>
                                    </div>`

                productosList.appendChild(cardDiv);

                var cardSuportingText = document.createElement("div");
                cardSuportingText.classList.add("mdl-card__supporting-text");


                let nodes = producto.getElementsByTagName("*");
                for (var j = 0; j < nodes.length; j++) {
                    var li = document.createElement("li");
                    li.innerHTML = nodes[j].nodeName + ":" + nodes[j].textContent;

                    let divContent = document.createElement("div");
                    divContent.innerHTML =
                        `
                            <div class="mdl-grid margin-b-x">
                                <div class="mdl-cell mdl-cell--2-col-phone">
                                    ${nodes[j].nodeName} :
                                </div>
                                <div class="mdl-cell mdl-cell--2-col-phone">
                                    ${nodes[j].textContent}
                                </div>
                            </div>
                        `;
                    cardSuportingText.appendChild(divContent);
                }

                let divaux = cardDiv.getElementsByTagName('div')[2];
                divaux.appendChild(cardSuportingText);
            }
        },
        error: function () {}
    });
}

function ListarCategorias(tipo, valor) {
    let productosList = document.getElementById("categoriasList");
    productosList.innerHTML = "";

    var obj = {};

    let urlListar = "";
    if (tipo === "id") {
        urlListar = "ListarCategoriasPorId";
        obj = {
            id: valor
        };
    } else if (tipo === "nombre") {
        urlListar = "ListarCategoriasPorNombre";
        obj = {
            nombre: valor
        };
    } else {
        urlListar = "ListarCategorias";
        obj = {
            nombre: ""
        };
    }

    $.ajax({
        type: "POST",
        crossDomain: true,
        data: obj,
        url: direccionWebServiceMetodos + urlListar,
        success: function (resp) {
            let productos = resp.getElementsByTagName("CategoriaDTO");
            for (var i = 0; i < productos.length; i++) {
                let producto = productos[i];

                var cardDiv = document.createElement("div");


                let categoria = producto.getElementsByTagName("CategoriaId");
                let categoriaText = categoria[0].textContent;
                let nombre = producto.getElementsByTagName("Nombre");
                let nombreText = nombre[0].textContent;

                cardDiv.innerHTML = `<div class="mdl-grid">
                                        <div class="mdl-layout-spacer"></div>
                                        <div class="mdl-cell mdl-cell--8-col bg-white mdl-shadow--2dp">
                                            <div class="mdl-card__title">
                                                <h2 class="mdl-card__title-text">${nombreText}</h2>
                                            </div>
                                            <div class="mdl-card__supporting-text">
                                                ID : ${categoriaText}
                                            </div>                                            
                                        </div>
                                        <div class="mdl-layout-spacer"></div>
                                    </div>`

                productosList.appendChild(cardDiv);
            }
        },
        error: function () {}
    });
}




var searchProductos = document.getElementById("searchProductos");
searchProductos.addEventListener("keyup", function (event) {
    var tipo = document.querySelector('input[name="opcionProductos"]:checked').value;
    var valor = searchProductos.value;
    if (event.keyCode === 13) {
        event.preventDefault();
        ListarProductos(tipo, valor);
    }
});

var searchCategorias = document.getElementById("searchCategorias");
searchCategorias.addEventListener("keyup", function (event) {
    var tipo = document.querySelector('input[name="opcionCategorias"]:checked').value;
    var valor = searchCategorias.value;
    if (event.keyCode === 13) {
        event.preventDefault();
        ListarCategorias(tipo, valor);
    }
});

$(document).ready(function () {
    ListarProductos();
    ListarCategorias();
});