// components/AuthContext.js
// Importamos los módulos necesarios de React y Next.js
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Creamos un contexto para gestionar la autenticación en toda la aplicación
export const AuthContext = createContext();

// Definimos el proveedor de autenticación, que envolverá los componentes hijos con el contexto de autenticación
export const AuthProvider = ({ children }) => {
  // Estado para verificar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Estado para almacenar el nombre de usuario
  const [username, setUsername] = useState(null);
  // Hook de Next.js para manejar la navegación
  const router = useRouter();

  // useEffect para cargar el estado de autenticación almacenado en localStorage al cargar el componente
  useEffect(() => {
    // Obtenemos el estado de autenticación y el nombre de usuario del localStorage
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUsername = localStorage.getItem('username');

    // Si el usuario está autenticado, actualizamos el estado
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  // Función para iniciar sesión
  const login = (token, username) => {
    // Guardamos el estado de autenticación, el token y el nombre de usuario en localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);

    // Actualizamos el estado de autenticación y el nombre de usuario
    setIsAuthenticated(true);
    setUsername(username);

    // Redireccionamos al usuario a la página de reservas después de iniciar sesión
    router.push('/reservas');
  };

  // Función para cerrar sesión
  const logout = () => {
    // Eliminamos el estado de autenticación, el token y el nombre de usuario de localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');

    // Actualizamos el estado para reflejar que el usuario ya no está autenticado
    setIsAuthenticated(false);
    setUsername(null);
    // Redireccionamos al usuario a la página principal después de cerrar sesión
    router.push('/');
  };

  // Proveemos el estado de autenticación y las funciones de login/logout a los componentes hijos
  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


