// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const { redirect } = router.query; // Captura el parámetro de redirección

  const authenticateUser = async (username, password) => {
    // Obtener usuarios de localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};

    // Verificar si el usuario existe
    if (!users[username]) {
      throw new Error('Usuario no encontrado');
    }

    // Comparar contraseña cifrada
    const isPasswordValid = await bcrypt.compare(password, users[username]);
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await authenticateUser(username, password);
      localStorage.setItem('isAuthenticated', 'true'); // Establecer autenticación
      router.push(`/${redirect || ''}`); // Redirigir a reservas o a la página principal
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de Usuario:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
