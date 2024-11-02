// pages/reservas.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const Reservas = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [selectedTable, setSelectedTable] = useState(null);
  const [reservedTables, setReservedTables] = useState([]);
  const tables = Array.from({ length: 5 * 5 }, (_, i) => i + 1);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  const handleTableClick = (tableNumber) => {
    if (reservedTables.includes(tableNumber)) return;
    setSelectedTable(tableNumber === selectedTable ? null : tableNumber);
  };

  const confirmReservation = () => {
    if (selectedTable) {
      setReservedTables([...reservedTables, selectedTable]);
      setSelectedTable(null);
      alert(t('reservationSuccess'));
    }
  };

  return (
    <div className="container py-5 text-center">
      <Head>
        <title>{t('reservations')} - {t('restaurantName')}</title>
        <meta name="description" content={t('reservationDescription')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <h1>{t('reservations')}</h1>
      <p>{t('reservationPrompt')}</p>
      
      <div className="d-flex flex-wrap justify-content-center mt-4">
        {tables.map((table) => (
          <div
            key={table}
            onClick={() => handleTableClick(table)}
            className={`table-seat ${reservedTables.includes(table) ? 'reserved' : ''} ${selectedTable === table ? 'selected' : ''}`}
          >
            {table}
          </div>
        ))}
      </div>
      {selectedTable && (
        <button onClick={confirmReservation} className="btn btn-primary mt-3">
          {t('confirmReservation')} {selectedTable}
        </button>
      )}

      <style jsx>{`
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
      `}</style>

      <footer className="text-center py-4 bg-dark text-light mt-5">
        <p>© {new Date().getFullYear()} {t('restaurantName')}. {t('allRightsReserved')}</p>
      </footer>
    </div>
  );
};

export default Reservas;
