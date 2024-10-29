// components/Footer.js
import React from 'react';
import styles from '../styles/Footer.module.css'; // Importa tus estilos

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; 2024 Restaurante La Dolce Vita. Todos los derechos reservados.</p>
            <p>Dirección: Calle de la Comida 123, Santiago, Chile</p>
            <p>Teléfono: (555) 123-4567</p>
        </footer>
    );
};

export default Footer;
