document.addEventListener('DOMContentLoaded', () => {
  mostrarClientes();
  cargarFraseExterna();
});
document.getElementById('form-cliente').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const nuevoCliente = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    telefono: document.getElementById('telefono').value,
    categoria: document.getElementById('categoria').value
  };

  let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  clientes.push(nuevoCliente);
  localStorage.setItem('clientes', JSON.stringify(clientes));

  fetch('https://formspree.io/f/mqewqqpj', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      window.location.href = 'index.html';
    } else {
      alert('Error al enviar el formulario a Formspree.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Ocurrió un error de conexión.');
  });
});

function mostrarClientes() {
  const tbody = document.getElementById('lista-clientes-body');
  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

  if (clientes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No hay registros aún.</td></tr>`;
    return;
  }

  tbody.innerHTML = clientes.map(c => `
    <tr>
      <td>${c.nombre}</td>
      <td>${c.email}</td>
      <td>${c.telefono}</td>
      <td>${c.categoria}</td>
    </tr>
  `).join('');
}

function cargarFraseExterna() {
  fetch('https://api.quotable.io/random')
    .then(res => res.json())
    .then(data => console.log('Dato externo cargado:', data.content))
    .catch(err => console.error('Error con fuente externa:', err));
}
