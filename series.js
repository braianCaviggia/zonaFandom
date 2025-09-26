// Series iniciales con imagen
var series = [
    { id: 1, nombre: "The Boys", imagen: "img/TheBoys.jpeg" },
    { id: 2, nombre: "Stranger Things", imagen: "img/StrangerThings.jpg" },
    { id: 3, nombre: "Breaking Bad", imagen: "img/BreakingBad.jpeg" },
    { id: 4, nombre: "The Office", imagen: "img/TheOffice.jpeg" }
];
var verMasTarde = JSON.parse(localStorage.getItem("verMasTarde") || "[]");
var listaSeries = document.getElementById("lista-series");
var listaVerMasTarde = document.getElementById("lista-ver-mas-tarde");
function renderSeries() {
    listaSeries.innerHTML = "";
    series.forEach(function (s) {
        var card = document.createElement("div");
        card.className = "serie-card";
        card.style.backgroundImage = "url(".concat(s.imagen, ")");
        card.innerHTML = "\n        <div class=\"overlay\">\n          <h3>".concat(s.nombre, "</h3>\n          <button data-id=\"").concat(s.id, "\">Agregar</button>\n        </div>\n      ");
        listaSeries.appendChild(card);
    });
    // Agregar listeners a botones(al hacer clic obtiene el id de la serie)
    listaSeries.querySelectorAll("button").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var id = parseInt(btn.dataset.id);
            agregarASala(id);
        });
    });
}
function renderVerMasTarde() {
    listaVerMasTarde.innerHTML = "";
    verMasTarde.forEach(function (s) {
        var li = document.createElement("li");
        li.innerHTML = "\n        ".concat(s.nombre, "\n        <button class=\"eliminar\" data-id=\"").concat(s.id, "\">\u274C</button>\n      ");
        listaVerMasTarde.appendChild(li);
    });
    // Botones de eliminar
    listaVerMasTarde.querySelectorAll(".eliminar").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var id = parseInt(btn.dataset.id);
            eliminarDeLista(id);
        });
    });
    localStorage.setItem("verMasTarde", JSON.stringify(verMasTarde));
}
// Agregar serie al carrito
function agregarASala(id) {
    var serie = series.find(function (s) { return s.id === id; });
    if (serie && !verMasTarde.some(function (s) { return s.id === id; })) {
        verMasTarde.push(serie);
        renderVerMasTarde();
    }
}
// Eliminar serie de "ver más tarde"
function eliminarDeLista(id) {
    verMasTarde = verMasTarde.filter(function (s) { return s.id !== id; });
    renderVerMasTarde();
}
renderSeries();
renderVerMasTarde();
