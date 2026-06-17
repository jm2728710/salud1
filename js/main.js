document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ALERTAS PARA LOS BOTONES DE SERVICIOS
    const botonesServicio = document.querySelectorAll(".btn-servicio");
    if (botonesServicio.length > 0) {
        botonesServicio.forEach(boton => {
            boton.addEventListener("click", (e) => {
                const nombreServicio = e.target.getAttribute("data-servicio");
                alert(`✨ Solicitud Iniciada: Has seleccionado la especialidad de "${nombreServicio}". Redirigiéndote con un asesor de salud.`);
            });
        });
    }

    // 2. TABLA DINÁMICA DE MÉDICOS (A partir de un Arreglo de Objetos)
    const medicos = [
        { nombre: "Dra. Elena Rostova", area: "Cardiología", disponible: "Lunes a Viernes" },
        { nombre: "Dr. Carlos Mendoza", area: "Pediatría", disponible: "Lunes y Miércoles" },
        { nombre: "Dra. Sofía Martínez", area: "Dermatología", disponible: "Martes y Jueves" },
        { nombre: "Dr. Luis Peralta", area: "Medicina General", disponible: "Diario" },
        { nombre: "Dra. Lucía Méndez", area: "Psicología", disponible: "Previa Cita" }
    ];

    const tablaBody = document.getElementById("tablaMedicosBody");
    const filtroInput = document.getElementById("filtroMedicos");

    // Función para renderizar la tabla
    function cargarTabla(listaMedicos) {
        if (!tablaBody) return; // Evita errores en páginas donde no exista la tabla
        tablaBody.innerHTML = "";
        listaMedicos.forEach(medico => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="fw-bold">${medico.nombre}</td>
                <td><span class="badge bg-success">${medico.area}</span></td>
                <td>${medico.disponible}</td>
            `;
            tablaBody.appendChild(fila);
        });
    }

    // Inicializar tabla
    cargarTabla(medicos);

    // Filtrado en Tiempo Real (Captura de Eventos)
    if (filtroInput) {
        filtroInput.addEventListener("input", (e) => {
            const busqueda = e.target.value.toLowerCase();
            const filtrados = medicos.filter(medico => 
                medico.nombre.toLowerCase().includes(busqueda) || 
                medico.area.toLowerCase().includes(busqueda)
            );
            cargarTabla(filtrados);
        });
    }

    // 3. VALIDACIÓN ESTRICTA DEL FORMULARIO DE CONTACTO
    const formContacto = document.getElementById("formContacto");
    if (formContacto) {
        formContacto.addEventListener("submit", (e) => {
            // Prevenir la acción por defecto
            e.preventDefault();

            const nombre = document.getElementById("nombre");
            const email = document.getElementById("email");
            const mensaje = document.getElementById("mensaje");
            let valido = true;

            // Validación de campo Nombre
            if (nombre.value.trim() === "") {
                nombre.classList.add("is-invalid");
                valido = false;
            } else {
                nombre.classList.remove("is-invalid");
                nombre.classList.add("is-valid");
            }

            // Validación de campo Email (Expresión regular básica)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                email.classList.add("is-invalid");
                valido = false;
            } else {
                email.classList.remove("is-invalid");
                email.classList.add("is-valid");
            }

            // Validación de campo Mensaje
            if (mensaje.value.trim() === "") {
                mensaje.classList.add("is-invalid");
                valido = false;
            } else {
                mensaje.classList.remove("is-invalid");
                mensaje.classList.add("is-valid");
            }

            // Si todo es válido, lanza la alerta solicitada y resetea
            if (valido) {
                alert(`📩 ¡Mensaje Enviado con Éxito!\n\nGracias por escribirnos, ${nombre.value}. Nos pondremos en contacto al correo ${email.value} lo antes posible.`);
                formContacto.reset();
                nombre.classList.remove("is-valid");
                email.classList.remove("is-valid");
                mensaje.classList.remove("is-valid");
            }
        });
    }
});
//  ALERTAS PARA LOS BOTONES DE SERVICIOS
const botonesServicio = document.querySelectorAll(".btn-servicio");
if (botonesServicio.length > 0) {
    botonesServicio.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const nombreServicio = e.target.getAttribute("data-servicio");
            
            // Muestra la alerta primero
            alert(`✨ Solicitud Iniciada: Has seleccionado la especialidad de "${nombreServicio}". Redirigiéndote con un asesor de salud.`);
            
            // NUEVO: Esta línea hace la redirección automática a la página de contacto al cerrar la alerta
            window.location.href = "contacto.html"; 
        });
    });
}