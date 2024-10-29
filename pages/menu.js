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
                <meta name="description" content="Descubre nuestro delicioso menú italiano" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="bg-light p-3">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" href="/">Sapori di Italia</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" href="/menu">Menú</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/reservas">Reservas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/contacto">Contacto</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="container py-5">
                <h1 className="text-center mb-5">Sapori di Italia</h1> {/* Nombre del restaurante */}
                <h1 className="text-center mb-5">Nuestro Menú</h1>

                {/* Sección Antipasta */}
                <div id="antipasta" className="mb-5">
                    <h2>Antipasta</h2>
                    <div className="row">
                        {dishes.antipasta.map((dish, index) => (
                            <div className="col-md-4 mb-4" key={index}> {/* Recuadro más pequeño y cuadrado */}
                                <div className="card" style={{ width: '250px', height: '250px' }}>
                                    <Image
                                        src={dish.image}
                                        className="card-img-top"
                                        alt={dish.name}
                                        width={250}  // Ajustar tamaño de la imagen
                                        height={150} // Ajustar tamaño de la imagen
                                        objectFit="cover" // Mantener la relación de aspecto
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{dish.name}</h5>
                                        <p className="card-text">{dish.description}</p>
                                        <p className="card-text"><strong>{dish.price}</strong></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección Pasta */}
                <div id="pasta" className="mb-5">
                    <h2>Pasta</h2>
                    <div className="row">
                        {dishes.pasta.map((dish, index) => (
                            <div className="col-md-4 mb-4" key={index}> {/* Recuadro más pequeño y cuadrado */}
                                <div className="card" style={{ width: '250px', height: '250px' }}>
                                    <Image
                                        src={dish.image}
                                        className="card-img-top"
                                        alt={dish.name}
                                        width={250}  // Ajustar tamaño de la imagen
                                        height={150} // Ajustar tamaño de la imagen
                                        objectFit="cover" // Mantener la relación de aspecto
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{dish.name}</h5>
                                        <p className="card-text">{dish.description}</p>
                                        <p className="card-text"><strong>{dish.price}</strong></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección Pizza */}
                <div id="pizza" className="mb-5">
                    <h2>Pizza</h2>
                    <div className="row">
                        {dishes.pizza.map((dish, index) => (
                            <div className="col-md-4 mb-4" key={index}> {/* Recuadro más pequeño y cuadrado */}
                                <div className="card" style={{ width: '250px', height: '250px' }}>
                                    <Image
                                        src={dish.image}
                                        className="card-img-top"
                                        alt={dish.name}
                                        width={250}  // Ajustar tamaño de la imagen
                                        height={150} // Ajustar tamaño de la imagen
                                        objectFit="cover" // Mantener la relación de aspecto
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{dish.name}</h5>
                                        <p className="card-text">{dish.description}</p>
                                        <p className="card-text"><strong>{dish.price}</strong></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección Postre */}
                <div id="postre" className="mb-5">
                    <h2>Postre</h2>
                    <div className="row">
                        {dishes.postre.map((dish, index) => (
                            <div className="col-md-4 mb-4" key={index}> {/* Recuadro más pequeño y cuadrado */}
                                <div className="card" style={{ width: '250px', height: '250px' }}>
                                    <Image
                                        src={dish.image}
                                        className="card-img-top"
                                        alt={dish.name}
                                        width={250}  // Ajustar tamaño de la imagen
                                        height={150} // Ajustar tamaño de la imagen
                                        objectFit="cover" // Mantener la relación de aspecto
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{dish.name}</h5>
                                        <p className="card-text">{dish.description}</p>
                                        <p className="card-text"><strong>{dish.price}</strong></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección Bebidas */}
                <div id="bebidas" className="mb-5">
                    <h2>Bebidas</h2>
                    <div className="row">
                        {dishes.bebidas.map((dish, index) => (
                            <div className="col-md-4 mb-4" key={index}> {/* Recuadro más pequeño y cuadrado */}
                                <div className="card" style={{ width: '250px', height: '250px' }}>
                                    <Image
                                        src={dish.image}
                                        className="card-img-top"
                                        alt={dish.name}
                                        width={250}  // Ajustar tamaño de la imagen
                                        height={150} // Ajustar tamaño de la imagen
                                        objectFit="cover" // Mantener la relación de aspecto
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{dish.name}</h5>
                                        <p className="card-text">{dish.description}</p>
                                        <p className="card-text"><strong>{dish.price}</strong></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="text-center py-4">
                <p>© {new Date().getFullYear()} Sapori di Italia. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Menu;
