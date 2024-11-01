// pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs'; // bcryptjs puede usarse en el cliente

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Función para registrar al usuario usando localStorage
  const registerUser = async (username, password) => {
    // Obtener usuarios de localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};

    // Validación para evitar duplicados
    if (users[username]) {
      throw new Error('Este usuario ya está registrado');
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Almacenar usuario en localStorage
    users[username] = hashedPassword;
    localStorage.setItem('users', JSON.stringify(users));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await registerUser(username, password);
      setSuccess(true);
      setError(null);
      router.push('/login'); // Redirigir a login tras el registro exitoso
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
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
        <button type="submit">Registrarse</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Usuario registrado exitosamente.</p>}
    </div>
  );
};

export default Register;
