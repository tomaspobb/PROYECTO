// Importamos los módulos necesarios de React, Next.js y Axios para manejar las traducciones, autenticación y reservas
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import axios from 'axios';

// Configuración de props estáticas para habilitar las traducciones en la página de reservas
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const Reservas = () => {
  // Hook para obtener las traducciones del archivo de idioma 'common'
  const { t } = useTranslation('common');
  const router = useRouter();
  
  // Estados para manejar la selección de mesa, hora, mesas reservadas y opciones de horario disponibles
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [reservedTables, setReservedTables] = useState([]);
  const [availableTimeOptions, setAvailableTimeOptions] = useState([]);
  
  // Definimos un array de mesas (25 mesas numeradas del 1 al 25)
  const tables = Array.from({ length: 5 * 5 }, (_, i) => i + 1);

  // Efecto para verificar la autenticación del usuario y cargar las reservas existentes
  useEffect(() => {
    // Verificamos si el usuario está autenticado, de lo contrario lo redirigimos al login
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Configuramos los horarios disponibles basados en la hora actual de Chile
    const chileTime = new Date().toLocaleString('en-US', { timeZone: 'America/Santiago' });
    const currentHour = new Date(chileTime).getHours();
    const options = [
      { label: "13:00", value: "13:00" },
      { label: "14:00", value: "14:00" },
      { label: "15:00", value: "15:00" },
      { label: "16:00", value: "16:00" },
      { label: "17:00", value: "17:00" },
      { label: "18:00", value: "18:00" },
      { label: "19:00", value: "19:00" },
      { label: "20:00", value: "20:00" },
      { label: "21:00", value: "21:00" },
      { label: "22:00", value: "22:00" },
      { label: "23:00", value: "23:00" }
    ].filter(option => parseInt(option.value) > currentHour);

    setAvailableTimeOptions(options);

    // Función para cargar las mesas reservadas desde la API
    const fetchReservedTables = async () => {
      try {
        const response = await axios.get('/api/reservas');
        setReservedTables(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservedTables();
  }, [router]);

  // Función para manejar la selección de una mesa
  const handleTableClick = (tableNumber) => {
    // Si la mesa está reservada a la hora seleccionada, no permite seleccionarla
    if (reservedTables.some(reservation => reservation.table === tableNumber && reservation.time === selectedTime)) return;
    // Alterna la selección de la mesa
    setSelectedTable(tableNumber === selectedTable ? null : tableNumber);
  };

  // Función para confirmar la reserva de una mesa
  const confirmReservation = async () => {
    const userId = localStorage.getItem('userId'); // Obtiene el ID del usuario autenticado
    if (selectedTable && selectedTime && userId) {
      try {
        // Verifica si la mesa ya está reservada en el horario seleccionado
        const isTableReserved = reservedTables.some(
          reservation => reservation.table === selectedTable && reservation.time === selectedTime
        );

        if (isTableReserved) {
          alert(t('tableAlreadyReserved'));
          return;
        }

        // Enviamos la reserva a la API y actualizamos el estado
        await axios.post('/api/reservas', { table: selectedTable, time: selectedTime, userId });
        setReservedTables([...reservedTables, { table: selectedTable, time: selectedTime, userId }]);
        setSelectedTable(null);
        setSelectedTime('');
        alert(t('reservationSuccess'));
      } catch (error) {
        console.error("Error confirming reservation:", error);
      }
    } else {
      alert(t('selectTableAndTime'));
    }
  };

  // Función para manejar la selección del horario
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  return (
    <>
      <div className="container py-5 text-center">
        <Head>
          <title>{t('reservations')} - {t('restaurantName')}</title>
          <meta name="description" content={t('reservationDescription')} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <h1>{t('reservationTitle')}</h1>
        <p>{t('reservationPrompt')}</p>
        <h3>{t('reserveForToday')}</h3>

        {/* Selector de horarios */}
        <div className="d-flex justify-content-center mt-4">
          <select 
            className="form-select w-auto"
            value={selectedTime}
            onChange={handleTimeChange}
          >
            <option value="">{t('selectTime')}</option>
            {availableTimeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Visualización de mesas */}
        <div className="d-flex flex-wrap justify-content-center mt-4">
          {tables.map((table) => (
            <div
              key={table}
              onClick={() => handleTableClick(table)}
              className={`table-seat ${reservedTables.some(reservation => reservation.table === table && reservation.time === selectedTime) ? 'reserved' : ''} ${selectedTable === table ? 'selected' : ''}`}
            >
              {table}
            </div>
          ))}
        </div>
        
        {/* Botón de confirmación */}
        {selectedTable && selectedTime && (
          <button onClick={confirmReservation} className="btn btn-primary mt-3">
            {t('confirmReservation')}
          </button>
        )}

        {/* Botón para redirigir a "Horarios Más Frecuentados" */}
        <div className="d-flex justify-content-center mt-4">
          <a href="/horarios-mas-frecuentados" className="btn-frecuentados">
            {t('mostFrequentedTimes')}
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} {t('restaurantName')}. {t('allRightsReserved')}</p>
      </footer>

      {/* Estilos CSS en línea para la disposición de las mesas y el footer */}
      <style jsx>{`
        .container {
          min-height: calc(100vh - 60px);
        }
        .table-seat {
          width: 50px;
          height: 50px;
          margin: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: lightgray;
          border-radius: 5px;
        }
        .table-seat.selected {
          background-color: lightblue;
        }
        .table-seat.reserved {
          background-color: red;
          cursor: not-allowed;
        }
        .footer {
          width: 100%;
          padding: 1rem;
          background-color: #333;
          color: white;
          text-align: center;
          position: fixed;
          bottom: 0;
          left: 0;
        }
        .btn-frecuentados {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          color: white;
          background-color: #007bff;
          border-radius: 20px;
          text-decoration: none;
          text-align: center;
          margin-top: 20px;
          transition: background-color 0.3s ease;
        }
        .btn-frecuentados:hover {
          background-color: #0056b3;
        }
      `}</style>
    </>
  );
};

export default Reservas;
