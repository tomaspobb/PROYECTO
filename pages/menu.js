import Head from 'next/head';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = () => {
    const dishes = {
        antipasta: [
            {
                name: "Bruschetta",
                price: "$6,000 CLP",
                image: "/images/bruschetta.jpg",
                description: "Rebanadas de pan tostado con tomate fresco y albahaca."
            },
            {
                name: "Ensalada Caprese",
                price: "$7,000 CLP",
                image: "/images/ensalada-caprese.jpg",
                description: "Ensalada fresca de tomate, mozzarella y albahaca."
            },
        ],
        pasta: [
            {
                name: "Carbonara",
                price: "$10,000 CLP",
                image: "/images/carbonara.jpg",
                description: "Pasta con una rica salsa de huevo, queso y panceta."
            },
        ],
        pizza: [
            {
                name: "Pizza Margarita",
                price: "$8,000 CLP",
                image: "/images/pizza-margarita.jpg",
                description: "Pizza clásica con salsa de tomate, mozzarella y albahaca fresca."
            },
        ],
        postre: [
            {
                name: "Panna Cotta",
                price: "$5,000 CLP",
                image: "/images/panna-cotta.jpg",
                description: "Postre italiano cremoso, suave y con un toque de vainilla."
            },
        ],
        bebidas: [
            {
                name: "Agua Mineral",
                price: "$1,500 CLP",
                image: "/images/agua-mineral.jpg",
                description: "Refrescante agua mineral."
            },
            {
                name: "Limonada",
                price: "$2,500 CLP",
                image: "/images/limonada.jpg",
                description: "Deliciosa limonada casera."
            },
        ],
    };

    return (
        <div>
            <Head>
                <title>Menú - Sapori di Italia</title>
                <meta name="description" content="Descubre nuestro delicioso menú italiano" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container py-5">
                <h1 className="text-center mb-5" style={{ color: 'var(--primary-color)' }}>Nuestro Menú</h1>

                {Object.keys(dishes).map((category, index) => (
                    <div id={category} className="mb-5" key={index}>
                        <h2 className="text-center text-capitalize mb-4" style={{ color: 'var(--primary-color)' }}>{category}</h2>
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

            {/* Footer Oscuro */}
            <footer className="text-center py-4 bg-dark text-light">
                <p>© {new Date().getFullYear()} Sapori di Italia. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Menu;
