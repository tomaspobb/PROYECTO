// pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs';

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

    // Almacenar usuario en localStorage con la contraseña cifrada
    users[username] = { password: hashedPassword };
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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre de Usuario</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Registrarse</button>
        </form>
        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">Usuario registrado exitosamente.</p>}
      </div>
    </div>
  );
};

export default Register;
