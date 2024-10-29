// components/Header.js
import React, { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css'; // Asegúrate de tener estilos para el header

const images = [
    '/images/plato1.jpg', // Reemplaza con las rutas de tus imágenes
    '/images/plato2.jpg',
    '/images/plato3.jpg',
];

const Header = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Cambia la imagen cada 3 segundos

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.header}>
            <img src={images[currentIndex]} alt="Delicious Dish" className={styles.image} />
            <h1 className={styles.title}>Restaurante Italiano - La Dolce Vita</h1>
        </div>
    );
};

export default Header;
