// pages/register.js
import { useState } from 'react';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        if (username && password) {
            const user = { username, password: btoa(password) }; // Encriptado simple con btoa
            localStorage.setItem('user', JSON.stringify(user));
            alert('Usuario registrado');
        } else {
            alert('Por favor completa todos los campos');
        }
    };

    return (
        <div>
            <h2>Registro de Usuario</h2>
            <input type="text" placeholder="Nombre de usuario" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Registrar</button>
        </div>
    );
}
