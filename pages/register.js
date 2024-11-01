// pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import bcrypt from 'bcryptjs';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Función para registrar al usuario usando localStorage
  const registerUser = async (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
      throw new Error('Este usuario ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = { password: hashedPassword };
    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await registerUser(username, password);
      setSuccess(true);
      router.push('/login'); // Redirigir a login tras el registro exitoso
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Registro - Sapori di Italia</title>
        <meta name="description" content="Regístrate en Sapori di Italia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar Oscura */}
      <header className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold text-uppercase">Sapori di Italia</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/" className="nav-link">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link href="/menu" className="nav-link">Menú</Link>
              </li>
              <li className="nav-item">
                <Link href="/contacto" className="nav-link">Contacto</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Formulario de Registro */}
      <main className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="text-center mb-4" style={{ color: 'var(--primary-color)' }}>Registro de Usuario</h2>
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
      </main>

      {/* Footer Oscuro */}
      <footer className="text-center py-4 bg-dark text-light">
        <p>© {new Date().getFullYear()} Restaurante Sapori di Italia. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Register;
