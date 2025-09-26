//aca guardo lo que clickee para ver mas tarde
let listaVerMasTarde = [];

//pongo en el array los partidos en los que se haga click
function verMasTarde(partido) {
    listaVerMasTarde.push(partido)
    actualizarLista()
}

//recorro el array para que vaya creando las listas
function actualizarLista() {
    let contenedor = document.getElementById("lista")   
    contenedor.innerHTML = ""; //limpio para que no vuelva a mostrar el anterior

    for (let i = 0; i < listaVerMasTarde.length; i++) {
    let li = document.createElement("li");
    li.textContent = listaVerMasTarde[i];
    contenedor.appendChild(li)

}

}

