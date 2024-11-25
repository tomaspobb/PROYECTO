// Importamos los módulos necesarios de Next.js y React para manejar las traducciones y los estilos de Bootstrap
import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'bootstrap/dist/css/bootstrap.min.css';

// Configuración de props estáticas para habilitar las traducciones en el menú
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const Menu = () => {
  // Hook para obtener las traducciones del archivo de idioma 'common'
  const { t } = useTranslation('common');

  // Objeto que contiene las categorías de platos con sus detalles: nombre, precio, imagen y descripción traducidos
  const dishes = {
    antipasta: [
      { name: t("bruschetta"), price: "$6,000 CLP", image: "/images/bruschetta.jpg", description: t("bruschettaDescription") },
      { name: t("capreseSalad"), price: "$7,000 CLP", image: "/images/ensalada-caprese.jpg", description: t("capreseSaladDescription") },
    ],
    pasta: [
      { name: t("carbonara"), price: "$10,000 CLP", image: "/images/carbonara.jpg", description: t("carbonaraDescription") },
      { name: t("fettuccine"), price: "$9,000 CLP", image: "/images/fettuccine.jpg", description: t("fettuccineDescription") },
      { name: t("gnocchipesto"), price: "$8,500 CLP", image: "/images/gnocchipesto.jpg", description: t("gnocchipestoDescription") },
      { name: t("ravioli"), price: "$10,500 CLP", image: "/images/raviolesricottaespinaca.jpg", description: t("ravioliDescription") },
    ],
    lasagna: [
      { name: t("traditionalLasagna"), price: "$11,000 CLP", image: "/images/lasaña.png", description: t("traditionalLasagnaDescription") },
      { name: t("hamCheeseLasagna"), price: "$12,000 CLP", image: "/images/lasañaquesojamon.jpg", description: t("hamCheeseLasagnaDescription") },
    ],
    pizza: [
      { name: t("margaritaPizza"), price: "$8,000 CLP", image: "/images/pizza-margarita.jpg", description: t("margaritaPizzaDescription") },
      { name: t("fourCheesePizza"), price: "$10,000 CLP", image: "/images/pizzacuatroquesos.jpg", description: t("fourCheesePizzaDescription") },
      { name: t("serranoPizza"), price: "$11,500 CLP", image: "/images/pizzajamonserrano.jpg", description: t("serranoPizzaDescription") },
    ],
    postre: [
      { name: t("pannaCotta"), price: "$5,000 CLP", image: "/images/panna-cotta.jpg", description: t("pannaCottaDescription") },
      { name: t("tiramisu"), price: "$6,000 CLP", image: "/images/tiramisu.jpg", description: t("tiramisuDescription") },
    ],
    bebidas: [
      { name: t("mineralWater"), price: "$1,500 CLP", image: "/images/agua-mineral.jpg", description: t("mineralWaterDescription") },
      { name: t("lemonade"), price: "$2,500 CLP", image: "/images/limonada.jpg", description: t("lemonadeDescription") },
    ],
  };

  return (
    <div>
      {/* Cabecera de la página de menú */}
      <Head>
        <title>{t('menu')} - {t('restaurantName')}</title>
        <meta name="description" content={t('menuDescription')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Contenido principal de la página */}
      <main className="container py-5">
        <h1 className="text-center mb-5" style={{ color: 'var(--primary-color)' }}>{t('ourMenu')}</h1>
        
        {/* Iteramos sobre cada categoría de platos */}
        {Object.keys(dishes).map((category, index) => (
          <div id={category} className="mb-5" key={index}>
            {/* Título de la categoría con estilo y traducción */}
            <h2 className="text-center text-capitalize mb-4" style={{ color: 'var(--primary-color)' }}>{t(category)}</h2>
            <div className="row justify-content-center">
              
              {/* Iteramos sobre cada plato dentro de la categoría actual */}
              {dishes[category].map((dish, idx) => (
                <div className="col-md-4 mb-4" key={idx}>
                  <div className="card h-100 shadow">
                    <Image
                      src={dish.image}
                      className="card-img-top"
                      alt={dish.name}
                      width={500}
                      height={300}
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-center" style={{ color: 'var(--primary-color)' }}>{dish.name}</h5>
                      <p className="card-text text-center">{dish.description}</p>
                      <p className="card-text text-center"><strong>{dish.price}</strong></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* Footer oscuro al final de la página */}
      <footer className="text-center py-4 bg-dark text-light">
        <p>© {new Date().getFullYear()} {t('restaurantName')}. {t('allRightsReserved')}</p>
      </footer>
    </div>
  );
};

export default Menu;
