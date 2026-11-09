const API_URL = 'http://localhost:4000/api';

// --- MANEJO DE REGISTRO ---
document.getElementById('form-registro')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('reg-nombre').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    try {
        const resp = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, password })
        });

        const data = await resp.json();
        if (data.ok) {
            alert(`¡Registro exitoso! Bienvenido ${data.nombre}`);
            localStorage.setItem('token', data.token);
            document.getElementById('form-registro').reset();
        } else {
            alert(data.msg || 'Error en el registro');
        }
    } catch (error) {
        console.error(error);
        alert('No se pudo conectar con el servidor backend');
    }
});

// --- MANEJO DE LOGIN ---
document.getElementById('form-login')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const resp = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await resp.json();
        if (data.ok) {
            alert(`¡Sesión iniciada correctamente! Hola ${data.nombre}`);
            localStorage.setItem('token', data.token);
            document.getElementById('form-login').reset();
        } else {
            alert(data.msg || 'Credenciales incorrectas');
        }
    } catch (error) {
        console.error(error);
        alert('No se pudo conectar con el servidor backend');
    }
});