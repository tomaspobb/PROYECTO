import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'bootstrap/dist/css/bootstrap.min.css';

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const Menu = () => {
  const { t } = useTranslation('common');

  const dishes = {
    antipasta: [
      { name: t("bruschetta"), price: "$6,000 CLP", image: "/images/bruschetta.jpg", description: t("bruschettaDescription") },
      { name: t("capreseSalad"), price: "$7,000 CLP", image: "/images/ensalada-caprese.jpg", description: t("capreseSaladDescription") },
    ],
    pasta: [
      { name: t("carbonara"), price: "$10,000 CLP", image: "/images/carbonara.jpg", description: t("carbonaraDescription") },
    ],
    pizza: [
      { name: t("margaritaPizza"), price: "$8,000 CLP", image: "/images/pizza-margarita.jpg", description: t("margaritaPizzaDescription") },
    ],
    postre: [
      { name: t("pannaCotta"), price: "$5,000 CLP", image: "/images/panna-cotta.jpg", description: t("pannaCottaDescription") },
    ],
    bebidas: [
      { name: t("mineralWater"), price: "$1,500 CLP", image: "/images/agua-mineral.jpg", description: t("mineralWaterDescription") },
      { name: t("lemonade"), price: "$2,500 CLP", image: "/images/limonada.jpg", description: t("lemonadeDescription") },
    ],
  };

  return (
    <div>
      <Head>
        <title>{t('menu')} - {t('restaurantName')}</title>
        <meta name="description" content={t('menuDescription')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container py-5">
        <h1 className="text-center mb-5" style={{ color: 'var(--primary-color)' }}>{t('ourMenu')}</h1>
        {Object.keys(dishes).map((category, index) => (
          <div id={category} className="mb-5" key={index}>
            <h2 className="text-center text-capitalize mb-4" style={{ color: 'var(--primary-color)' }}>{t(category)}</h2>
            <div className="row justify-content-center">
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

      <footer className="text-center py-4 bg-dark text-light">
        <p>© {new Date().getFullYear()} {t('restaurantName')}. {t('allRightsReserved')}</p>
      </footer>
    </div>
  );
};

export default Menu;
