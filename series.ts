interface Serie {
    id: number;
    nombre: string;
    imagen: string;
  }
  
  // Series iniciales con imagen
  const series: Serie[] = [
    { id: 1, nombre: "The Boys", imagen: "img/TheBoys.jpeg" },
    { id: 2, nombre: "Stranger Things", imagen: "img/StrangerThings.jpg" },
    { id: 3, nombre: "Breaking Bad", imagen: "img/BreakingBad.jpeg" },
    { id: 4, nombre: "The Office", imagen: "img/TheOffice.jpeg" }
  ];
  

  let verMasTarde: Serie[] = JSON.parse(localStorage.getItem("verMasTarde") || "[]");
  
  const listaSeries = document.getElementById("lista-series") as HTMLDivElement;
  const listaVerMasTarde = document.getElementById("lista-ver-mas-tarde") as HTMLUListElement;
  
 
  function renderSeries() {
    listaSeries.innerHTML = "";
    series.forEach(s => {
      const card = document.createElement("div");
      card.className = "serie-card";
      card.style.backgroundImage = `url(${s.imagen})`;
      card.innerHTML = `
        <div class="overlay">
          <h3>${s.nombre}</h3>
          <button data-id="${s.id}">Agregar</button>
        </div>
      `;
      listaSeries.appendChild(card);
    });
  
    // Agregar listeners a botones(al hacer clic obtiene el id de la serie)
    listaSeries.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt((btn as HTMLButtonElement).dataset.id!);
        agregarASala(id);
      });
    });
  }
  
 
  function renderVerMasTarde() {
    listaVerMasTarde.innerHTML = "";
    verMasTarde.forEach(s => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${s.nombre}
        <button class="eliminar" data-id="${s.id}">❌</button>
      `;
      listaVerMasTarde.appendChild(li);
    });
  
    // Botones de eliminar
    listaVerMasTarde.querySelectorAll(".eliminar").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt((btn as HTMLButtonElement).dataset.id!);
        eliminarDeLista(id);
      });
    });
  
    localStorage.setItem("verMasTarde", JSON.stringify(verMasTarde));
  }
  
  // Agregar serie al carrito
  function agregarASala(id: number) {
    const serie = series.find(s => s.id === id);
    if (serie && !verMasTarde.some(s => s.id === id)) {
      verMasTarde.push(serie);
      renderVerMasTarde();
    }
  }
  
  // Eliminar serie de "ver más tarde"
  function eliminarDeLista(id: number) {
    verMasTarde = verMasTarde.filter(s => s.id !== id);
    renderVerMasTarde();
  }
  

  renderSeries();
  renderVerMasTarde();
  