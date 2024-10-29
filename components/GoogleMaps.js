// components/GoogleMaps.js
import React from 'react';
import styles from '../styles/GoogleMaps.module.css'; // Importa tus estilos

const GoogleMaps = () => {
    return (
        <div className={styles.mapContainer}>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.1275601126315!2d-70.65109348483062!3d-33.44889138084709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5bbf219f85d%3A0x4ee0d8b462545a35!2sSantiago%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses!2sus!4v1639788450150!5m2!1ses!2sus"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Mapa de Santiago"
            ></iframe>
        </div>
    );
};

export default GoogleMaps;
