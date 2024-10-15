// Traducciones de la página
const translations = {
    es: {
        title: "Bienvenidos a Nuestro Restorán Italiano",
        description: "Disfruta de la auténtica comida italiana en el mejor ambiente.",
        reserveButton: "Reservar Mesa",
        menu: {
            entradas: "Entradas",
            platos: "Platos Principales",
            postres: "Postres"
        }
    },
    en: {
        title: "Welcome to Our Italian Restaurant",
        description: "Enjoy authentic Italian cuisine in the best atmosphere.",
        reserveButton: "Book a Table",
        menu: {
            entradas: "Starters",
            platos: "Main Courses",
            postres: "Desserts"
        }
    }
};

// Función para cambiar el idioma
function changeLanguage(language) {
    // Cambiar el contenido según el idioma
    document.getElementById('title').textContent = translations[language].title;
    document.getElementById('description').textContent = translations[language].description;

    // Si es la página de reservas
    if (document.getElementById('reserveButton')) {
        document.getElementById('reserveButton').textContent = translations[language].reserveButton;
    }

    // Si es la página del menú
    if (document.getElementById('menuEntradas')) {
        document.getElementById('menuEntradas').textContent = translations[language].menu.entradas;
        document.getElementById('menuPlatos').textContent = translations[language].menu.platos;
        document.getElementById('menuPostres').textContent = translations[language].menu.postres;
    }

    // Guardar preferencia de idioma en Local Storage
    localStorage.setItem('language', language);
}

// Detectar el cambio de idioma
document.getElementById('languageSelect').addEventListener('change', function () {
    const selectedLanguage = this.value;
    changeLanguage(selectedLanguage);
});

// Cargar el idioma seleccionado previamente
window.addEventListener('load', function () {
    const savedLanguage = localStorage.getItem('language') || 'es';
    document.getElementById('languageSelect').value = savedLanguage;
    changeLanguage(savedLanguage);
});

