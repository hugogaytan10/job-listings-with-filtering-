//arreglo0 de las etiquetas de busqueda
let etiquetas = [];
// Agrega un evento click a cada caja de texto
let cajas = document.querySelectorAll('.card .caja-texto');
cajas.forEach(function (caja) {
    caja.addEventListener('click', function () {
        // Obtén el valor de la caja de texto
        let valor = this.getAttribute('data-valor');
        //agregamos ese filtro al buscador
        if (!revizarElemento(valor)) {
            // Crea un nuevo elemento div con la clase "buscar"
            let buscar = document.createElement('div');
            buscar.classList.add('buscar');

            // Crea un nuevo elemento div con la clase "texto"
            let texto = document.createElement('div');
            texto.classList.add('texto');
            texto.textContent = valor; // Agrega el texto al elemento

            // Crea un nuevo elemento div con la clase "cancelar"
            let cancelar = document.createElement('div');
            cancelar.classList.add('cancelar');
            cancelar.textContent = 'X'; // Agrega el texto "X" al elemento

            // Agrega los elementos hijos al elemento "buscar"
            buscar.appendChild(texto);
            buscar.appendChild(cancelar);

            // Agrega el elemento "buscar" como hijo del elemento con el id "buscador"
            let buscador = document.getElementById('buscador');
            buscador.appendChild(buscar);
            // Agrega un evento click al elemento "cancelar" para eliminar el elemento "buscar"
            cancelar.addEventListener('click', function () {
                buscador.removeChild(buscar);
                //elimnamos el elemto del arreglo
                eliminarElemento(valor);
                actualizar();
            });
        }

        //tengo que tener un arreglo de valores porque aqui solo toma uno
        actualizar();
    });
});

function actualizar() {
    // Filtra las cards basándose en el valor de la caja de texto
    let cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        let bandera = true;
        for(element of etiquetas){
            if(!card.innerHTML.includes(element)){
                bandera = false;
            }
        }
        if (bandera) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function revizarElemento(valor) {
    let bandera = etiquetas.includes(valor);
    if (!bandera) {
        etiquetas.push(valor);
    }
    return bandera;
}

function eliminarElemento(valor){
    for(let i = 0; i< etiquetas.length; i++){
        if(etiquetas[i] == valor){
            etiquetas.splice(i,1);
        }
    }
}
function limpiar(){
    etiquetas = [];
    //actualizar();
    window.location.reload();
}