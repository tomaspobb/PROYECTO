// pages/reservas.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import axios from 'axios';

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const Reservas = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [reservedTables, setReservedTables] = useState([]);
  const [availableTimeOptions, setAvailableTimeOptions] = useState([]);
  const tables = Array.from({ length: 5 * 5 }, (_, i) => i + 1);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Set available times based on current hour in Chile timezone
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

  const handleTableClick = (tableNumber) => {
    if (reservedTables.some(reservation => reservation.table === tableNumber && reservation.time === selectedTime)) return;
    setSelectedTable(tableNumber === selectedTable ? null : tableNumber);
  };

  const confirmReservation = async () => {
    const userId = localStorage.getItem('userId'); // Obtén el ID del usuario autenticado
    if (selectedTable && selectedTime && userId) {
      try {
        const isTableReserved = reservedTables.some(
          reservation => reservation.table === selectedTable && reservation.time === selectedTime
        );

        if (isTableReserved) {
          alert(t('tableAlreadyReserved'));
          return;
        }

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
        <h3>{t('reserveForToday')}</h3> {/* Indicador de que es por día */}

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
        
        {selectedTable && selectedTime && (
          <button onClick={confirmReservation} className="btn btn-primary mt-3">
            {t('confirmReservation')}
          </button>
        )}
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} {t('restaurantName')}. {t('allRightsReserved')}</p>
      </footer>

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
      `}</style>
    </>
  );
};

export default Reservas;

