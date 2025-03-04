function saveAppointment() {
    var clientName = document.getElementById('client-name').value;
    var cedula = document.getElementById('cedula').value;
    var appointmentDate = document.getElementById('appointment-date').value;
    var appointmentTime = document.getElementById('appointment-time').value;
    var motivo = document.getElementById('motivo').value;
    var amount = document.getElementById('amount').value;
    var currency = document.querySelector('input[name="currency"]:checked').value;
    var whatsappNumber = document.getElementById('whatsapp-number').value;

    var cita = {
        name: clientName,
        cedula: cedula,
        date: appointmentDate,
        time: appointmentTime,
        motivo: motivo,
        amount: amount,
        currency: currency,
        status: 'Pendiente',
        whatsapp: whatsappNumber
    };

    // Obtener citas almacenadas en el localStorage
    var citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];

    // Agregar la nueva cita al array
    citasGuardadas.push(cita);

    // Guardar el array actualizado en el localStorage
    localStorage.setItem('citas', JSON.stringify(citasGuardadas));

    // Mostrar citas
    displayAppointments();
    clearForm();
}

function displayAppointments() {
    var citasPendientesContainer = document.getElementById('citas-pendientes');
    var citasCumplidasContainer = document.getElementById('citas-cumplidas');
    var citasPospuestasContainer = document.getElementById('citas-pospuestas');

    // Obtener citas almacenadas en el localStorage
    var citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];

    citasPendientesContainer.innerHTML = '';
    citasCumplidasContainer.innerHTML = '';
    citasPospuestasContainer.innerHTML = '';

    citasGuardadas.forEach(function(cita, index) {
        var citaElement = document.createElement('div');
        citaElement.className = 'cita';
        citaElement.innerHTML = `
            <span>Nombre: ${cita.name} - Fecha: ${cita.date} - Estado: ${cita.status}</span>
            <br>Cedula: ${cita.cedula}
            <br>Fecha: ${cita.date}
            <br>Hora: ${cita.time}
            <br>Motivo: ${cita.motivo}
            <br>Monto Pagado: ${cita.amount} ${cita.currency}
            <br>Número de WhatsApp: ${cita.whatsapp}
            <br><button onclick="markAs('Cumplida', ${index})">Cumplida</button>
            <button onclick="markAs('Pospuesta', ${index})">Pospuesta</button>
            <button onclick="markAs('Pendiente', ${index})">Pendiente</button>
            <button onclick="confirmDelete(${index})">Eliminar</button>
        `;

        if (cita.status === 'Pendiente') {
            citasPendientesContainer.appendChild(citaElement);
        } else if (cita.status === 'Cumplida') {
            citasCumplidasContainer.appendChild(citaElement);
        } else if (cita.status === 'Pospuesta') {
            citasPospuestasContainer.appendChild(citaElement);
        } else if (cita.status === 'Pendiente') {
            citasPospuestasContainer.appendChild(citaElement);
        }
    });
}

function markAs(status, index) {
    // Cambiar el estado de la cita y actualizar el localStorage
    var citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];
    citasGuardadas[index].status = status;
    localStorage.setItem('citas', JSON.stringify(citasGuardadas));
    displayAppointments();
}

function confirmDelete(index) {
    // Preguntar al usuario si realmente desea eliminar la cita
    var result = confirm('¿Estás seguro de que quieres eliminar esta cita?');
    if (result) {
        // Eliminar la cita y actualizar el localStorage
        var citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];
        citasGuardadas.splice(index, 1);
        localStorage.setItem('citas', JSON.stringify(citasGuardadas));
        displayAppointments();
    }
}

// Llamar a displayAppointments() cuando la página se carga para mostrar las citas almacenadas
window.onload = function() {
    displayAppointments();
};
