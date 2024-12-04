import { useState, useEffect } from 'react';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import axios from 'axios';

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

const HorariosMasFrecuentados = () => {
  const { t, i18n } = useTranslation('common');
  const [todayData, setTodayData] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const [weekChart, setWeekChart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todayResponse, weekResponse] = await Promise.all([
          axios.get('/api/frequency-today'),
          axios.get('/api/frequency-week'),
        ]);
        setTodayData(todayResponse.data || []);
        setWeekData(weekResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (weekData.length > 0) {
      const updatedLabels = weekData.map(item => t(item.day)); // Traducir días al cambiar idioma
      setWeekChart({
        labels: updatedLabels,
        datasets: [
          {
            label: t('reservationsByDayOfWeek'),
            data: weekData.map(item => item.count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [i18n.language, weekData]);

  const todayChart = {
    labels: todayData.map(item => item.hour),
    datasets: [
      {
        label: t('reservationsByHour'),
        data: todayData.map(item => item.count),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container py-5">
      <h1 className="text-center">{t('mostFrequentedTimes')}</h1>
      <div className="d-flex justify-content-center mb-4">
        <Link href="/reservas">
          <button className="btn btn-primary">{t('backToReservations')}</button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center">
          <p>{t('loading')}</p>
        </div>
      ) : (
        <>
          <div className="mb-5">
            <h3 className="text-center">{t('reservationsToday')}</h3>
            <Bar data={todayChart} />
          </div>

          <div className="mb-5">
            <h3 className="text-center">{t('reservationsByDayOfWeek')}</h3>
            {weekChart && <Bar data={weekChart} />}
          </div>
        </>
      )}
    </div>
  );
};

export default HorariosMasFrecuentados;
