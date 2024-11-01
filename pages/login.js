import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import bcrypt from 'bcryptjs';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Obtener usuarios de localStorage y verificar que se recuperan correctamente
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const storedUser = users[username];

    // Verificar si el usuario existe y la contraseña coincide
    if (storedUser && storedUser.password && bcrypt.compareSync(password, storedUser.password)) {
      localStorage.setItem('isAuthenticated', 'true');
      alert('Inicio de sesión exitoso.');
      router.push('/reservas');
    } else {
      alert('Credenciales incorrectas, por favor intenta de nuevo.');
    }
  };

  return (
    <div>
      <Head>
        <title>Iniciar Sesión - Sapori di Italia</title>
        <meta name="description" content="Inicia sesión en Sapori di Italia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Formulario de Inicio de Sesión */}
      <main className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
          <h3 className="text-center mb-4" style={{ color: 'var(--primary-color)' }}>Iniciar Sesión</h3>
          <form onSubmit={handleLogin}>
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
            <button type="submit" className="btn btn-primary w-100 mb-3">Iniciar Sesión</button>
          </form>
          <p className="text-center">
            ¿No tienes cuenta?{' '}
            <Link href="/register" legacyBehavior>
              <a className="text-info">Regístrate aquí</a>
            </Link>
          </p>
        </div>
      </main>

      {/* Footer Oscuro */}
      <footer className="text-center py-4 bg-dark text-light">
        <p>© {new Date().getFullYear()} Sapori di Italia. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
