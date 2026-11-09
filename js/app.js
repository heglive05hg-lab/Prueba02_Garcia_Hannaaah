// AutoNexo Servicios - Selección de servicio y resumen
// Los datos se leen de los atributos data-* de cada tarjeta (una sola fuente de verdad).

(function () {
  "use strict";

  // Referencias al DOM
  const tarjetas = document.querySelectorAll(".tarjeta");
  const vacio = document.getElementById("resumen-vacio");
  const detalle = document.getElementById("resumen-detalle");
  const resNombre = document.getElementById("res-nombre");
  const resDesc = document.getElementById("res-desc");
  const resDuracion = document.getElementById("res-duracion");
  const resPrecio = document.getElementById("res-precio");
  const btnLimpiar = document.getElementById("btn-limpiar");

  // Estado: id del servicio seleccionado (null = ninguno)
  let seleccionado = null;

  // Marca visualmente la tarjeta activa y desmarca las demás
  function marcarTarjeta(id) {
    tarjetas.forEach(function (t) {
      const activa = t.dataset.id === id;
      t.classList.toggle("tarjeta--activa", activa);
      const boton = t.querySelector(".btn--sel");
      boton.setAttribute("aria-pressed", String(activa));
      boton.textContent = activa ? "Seleccionado ✓" : "Seleccionar";
    });
  }

  // Muestra el resumen del servicio indicado
  function mostrarResumen(tarjeta) {

    resNombre.textContent = tarjeta.dataset.nombre;
    resDesc.textContent = tarjeta.dataset.desc;
    resDuracion.textContent = tarjeta.dataset.duracion;
    resPrecio.textContent = tarjeta.dataset.precio;
    vacio.hidden = true;
    detalle.hidden = false;
    btnLimpiar.disabled = false;
  }

  // Selecciona (o cambia) un servicio
  function seleccionarServicio(tarjeta) {
    seleccionado = tarjeta.dataset.id;
    marcarTarjeta(seleccionado);
    mostrarResumen(tarjeta);
  }

  // Limpia la selección y restaura el estado inicial
  function limpiarSeleccion() {
    seleccionado = null;
    marcarTarjeta(null);
    detalle.hidden = true;
    vacio.hidden = false;
    btnLimpiar.disabled = true;
  }

  // Delegación de eventos: un solo listener para todos los botones
  document.addEventListener("click", function (evento) {
    const boton = evento.target.closest(".btn--sel");
    if (!boton) return;
    const tarjeta = boton.closest(".tarjeta");
    seleccionarServicio(tarjeta);
  });


  btnLimpiar.addEventListener("click", limpiarSeleccion);

  // Estado inicial
  limpiarSeleccion();
})();