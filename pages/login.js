// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.username === username && storedUser.password === btoa(password)) {
            localStorage.setItem('isAuthenticated', true);
            router.push('/reservas');
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <input type="text" placeholder="Nombre de usuario" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Iniciar Sesión</button>
        </div>
    );
}
