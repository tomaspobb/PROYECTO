import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
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

            {/* Navbar Oscura */}
            <header className="bg-dark">
                <nav className="navbar navbar-expand-lg navbar-dark container-fluid">
                    <div className="container">
                        <Link href="/" className="navbar-brand fw-bold text-uppercase">Sapori di Italia</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link href="/" className="nav-link">Inicio</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/menu" className="nav-link">Menú</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/reservas" className="nav-link">Reservas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/contacto" className="nav-link">Contacto</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="container py-5">
                <h1 className="text-center mb-5">Nuestro Menú</h1>

                {Object.keys(dishes).map((category, index) => (
                    <div id={category} className="mb-5" key={index}>
                        <h2 className="text-center text-capitalize mb-4">{category}</h2>
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
                                            <h5 className="card-title text-center">{dish.name}</h5>
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
                <p>© {new Date().getFullYear()} Sapori di Italia. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Menu;
