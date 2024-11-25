// Importamos los módulos necesarios de Next.js, React y Axios
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';

// Configuramos las props estáticas para cargar las traducciones
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const Vote = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  // Estado para manejar los platos disponibles y la selección del usuario
  const [dishes, setDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState('');

  useEffect(() => {
    // Obtener los platos disponibles desde la API
    const fetchDishes = async () => {
      try {
        const response = await axios.get('/api/get-dishes'); // Ruta de la API para obtener los platos
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);

  // Función para manejar el envío del voto
  const handleVote = async () => {
    if (!selectedDish) {
      alert(t('selectADish')); // Mensaje de error si no se selecciona ningún plato
      return;
    }

    try {
      await axios.post('/api/vote', { dishId: selectedDish }); // Enviar el ID del plato
      alert(t('voteSubmitted')); // Mensaje de confirmación
      router.push('/'); // Redirigir al inicio después de votar
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert(t('voteError')); // Mensaje de error
    }
  };

  return (
    <div className="container py-5 text-center">
      <h1 className="mb-4" style={{ color: 'var(--primary-color)' }}>{t('voteForYourFavoriteDish')}</h1>

      {/* Dropdown para seleccionar el plato */}
      <select
        className="form-select w-50 mx-auto mb-4"
        value={selectedDish}
        onChange={(e) => setSelectedDish(e.target.value)}
      >
        <option value="">{t('selectDish')}</option>
        {dishes.map((dish) => (
          <option key={dish.id} value={dish.id}>
            {dish.name}
          </option>
        ))}
      </select>

      {/* Botón para enviar el voto */}
      <button className="btn btn-primary" onClick={handleVote}>
        {t('submitVote')}
      </button>
    </div>
  );
};

export default Vote;
