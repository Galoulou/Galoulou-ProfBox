/* =========================================================
   GALOULOU PROFBOX
   script.js
   ========================================================= */

/* =========================================================
   1. DONNÉES DES OUTILS
   ========================================================= */

const tools = [
    {
        id: "file-search",
        title: "Recherche de fichiers",
        description: "Retrouvez rapidement vos fichiers dans vos dossiers.",
        category: "Fichiers",
        icon: "fa-folder-open",
        url: "tools/file-search.html"
    },

    {
        id: "average",
        title: "Calculateur de moyennes",
        description: "Calculez facilement les moyennes de vos élèves.",
        category: "Classe",
        icon: "fa-calculator",
        url: "tools/average.html"
    },

    {
        id: "random-student",
        title: "Tirage au sort",
        description: "Choisissez un élève au hasard en quelques secondes.",
        category: "Classe",
        icon: "fa-dice",
        url: "tools/random-student.html"
    },

    {
        id: "groups",
        title: "Créateur de groupes",
        description: "Répartissez automatiquement vos élèves en groupes.",
        category: "Classe",
        icon: "fa-users",
        url: "tools/groups.html"
    },

    {
        id: "timer",
        title: "Chronomètre / Minuteur",
        description: "Lancez un chronomètre ou un compte à rebours.",
        category: "Organisation",
        icon: "fa-stopwatch",
        url: "tools/timer.html"
    },

    {
        id: "pdf-merge",
        title: "Fusionneur de PDF",
        description: "Fusionnez plusieurs fichiers PDF directement dans le navigateur.",
        category: "PDF",
        icon: "fa-file-pdf",
        url: "tools/pdf-merge.html"
    },

    {
        id: "worksheet",
        title: "Générateur de feuilles",
        description: "Créez rapidement des feuilles d'exercices imprimables.",
        category: "Pédagogie",
        icon: "fa-file-pen",
        url: "tools/worksheet.html"
    },

    {
        id: "todo",
        title: "To-do / Planning",
        description: "Organisez vos tâches, cours et préparations.",
        category: "Organisation",
        icon: "fa-list-check",
        url: "tools/todo.html"
    },

    {
        id: "grade-table",
        title: "Tableau de notes",
        description: "Gérez les notes de votre classe simplement.",
        category: "Classe",
        icon: "fa-table",
        url: "tools/grade-table.html"
    },

    {
        id: "seating-plan",
        title: "Plan de classe",
        description: "Créez un plan de classe personnalisé.",
        category: "Classe",
        icon: "fa-chair",
        url: "tools/seating-plan.html"
    },

    {
        id: "countdown",
        title: "Compte à rebours",
        description: "Créez un compte à rebours visible pendant votre cours.",
        category: "Organisation",
        icon: "fa-hourglass-half",
        url: "tools/countdown.html"
    },

    {
        id: "dice",
        title: "Lancer de dés",
        description: "Lancez un ou plusieurs dés pour vos activités.",
        category: "Création",
        icon: "fa-dice-six",
        url: "tools/dice.html"
    },

    {
        id: "wheel",
        title: "Roue aléatoire",
        description: "Créez une roue pour tirer au sort un élève ou une activité.",
        category: "Création",
        icon: "fa-circle-notch",
        url: "tools/wheel.html"
    },

    {
        id: "text-generator",
        title: "Générateur de texte",
        description: "Créez du contenu pédagogique à partir de vos consignes.",
        category: "Pédagogie",
        icon: "fa-wand-magic-sparkles",
        url: "tools/text-generator.html"
    },

    {
        id: "pdf-split",
        title: "Découper un PDF",
        description: "Séparez les pages d'un PDF directement dans votre navigateur.",
        category: "PDF",
        icon: "fa-scissors",
        url: "tools/pdf-split.html"
    },

    {
        id: "pdf-images",
        title: "PDF vers images",
        description: "Transformez les pages d'un PDF en images.",
        category: "PDF",
        icon: "fa-images",
        url: "tools/pdf-images.html"
    },

    {
        id: "attendance",
        title: "Gestion des présences",
        description: "Notez rapidement les présences et absences.",
        category: "Classe",
        icon: "fa-clipboard-user",
        url: "tools/attendance.html"
    },

    {
        id: "random-number",
        title: "Nombre aléatoire",
        description: "Générez rapidement un nombre aléatoire.",
        category: "Création",
        icon: "fa-shuffle",
        url: "tools/random-number.html"
    }
];


/* =========================================================
   2. CATÉGORIES
   ========================================================= */

const categories = [
    {
        id: "all",
        name: "Tous",
        icon: "fa-border-all"
    },

    {
        id: "Fichiers",
        name: "Fichiers",
        icon: "fa-folder"
    },

    {
        id: "Pédagogie",
        name: "Pédagogie",
        icon: "fa-book-open"
    },

    {
        id: "Classe",
        name: "Classe",
        icon: "fa-users"
    },

    {
        id: "Organisation",
        name: "Organisation",
        icon: "fa-calendar"
    },

    {
        id: "Création",
        name: "Création",
        icon: "fa-wand-magic-sparkles"
    },

    {
        id: "PDF",
        name: "PDF & Documents",
        icon: "fa-file-pdf"
    }
];


/* =========================================================
   3. ÉTAT GLOBAL
   ========================================================= */

let currentCategory = "all";
let currentSearch = "";

let favorites = JSON.parse(
    localStorage.getItem("profbox_favorites") || "[]"
);

let recentTools = JSON.parse(
    localStorage.getItem("profbox_recent") || "[]"
);


/* =========================================================
   4. DOM
   ========================================================= */

const searchInput = document.getElementById("searchInput");
const toolsGrid = document.getElementById("toolsGrid");
const categoriesContainer = document.getElementById("categories");

const recentSection = document.getElementById("recentSection");
const recentGrid = document.getElementById("recentGrid");

const noResults = document.getElementById("noResults");
const clearSearch = document.getElementById("clearSearch");

const toolsCount = document.querySelector(".tools-count");

const themeToggle = document.getElementById("themeToggle");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");


/* =========================================================
   5. INITIALISATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadTheme();

    renderCategories();

    renderTools();

    renderRecentTools();

    setupSearch();

    setupTheme();

    setupMobileMenu();

    setupKeyboardShortcuts();

    setupSearchChips();

    setupCategoryShowcase();

});


/* =========================================================
   6. RENDU DES CATÉGORIES
   ========================================================= */

function renderCategories() {

    if (!categoriesContainer) {
        return;
    }

    categoriesContainer.innerHTML = "";

    categories.forEach(category => {

        const button = document.createElement("button");

        button.className = "category-button";

        if (category.id === currentCategory) {
            button.classList.add("active");
        }

        button.dataset.category = category.id;

        button.innerHTML = `
            <i class="fa-solid ${category.icon}"></i>
            <span>${category.name}</span>
        `;

        button.addEventListener("click", () => {

            currentCategory = category.id;

            renderCategories();

            renderTools();

            document.getElementById("tools")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

        categoriesContainer.appendChild(button);

    });
}


/* =========================================================
   7. FILTRAGE DES OUTILS
   ========================================================= */

function getFilteredTools() {

    return tools.filter(tool => {

        const categoryMatch =
            currentCategory === "all" ||
            tool.category === currentCategory;

        const search = currentSearch
            .toLowerCase()
            .trim();

        const searchMatch =
            !search ||
            tool.title.toLowerCase().includes(search) ||
            tool.description.toLowerCase().includes(search) ||
            tool.category.toLowerCase().includes(search);

        return categoryMatch && searchMatch;

    });

}


/* =========================================================
   8. RENDU DES OUTILS
   ========================================================= */

function renderTools() {

    if (!toolsGrid) {
        return;
    }

    const filteredTools = getFilteredTools();

    toolsGrid.innerHTML = "";

    if (filteredTools.length === 0) {

        noResults?.classList.remove("hidden");

        if (toolsCount) {
            toolsCount.textContent = "0 outil";
        }

        return;
    }

    noResults?.classList.add("hidden");

    if (toolsCount) {

        const number = filteredTools.length;

        toolsCount.textContent =
            `${number} outil${number > 1 ? "s" : ""}`;

    }

    filteredTools.forEach(tool => {

        toolsGrid.appendChild(
            createToolCard(tool)
        );

    });

}


/* =========================================================
   9. CRÉATION D'UNE CARTE OUTIL
   ========================================================= */

function createToolCard(tool) {

    const card = document.createElement("article");

    card.className = "tool-card";

    card.dataset.toolId = tool.id;

    const isFavorite =
        favorites.includes(tool.id);

    card.innerHTML = `

        <div class="tool-card-top">

            <div class="tool-icon">
                <i class="fa-solid ${tool.icon}"></i>
            </div>

            <button
                class="favorite-button ${isFavorite ? "active" : ""}"
                aria-label="Ajouter aux favoris"
                title="Ajouter aux favoris"
            >
                <i class="${isFavorite ? "fa-solid" : "fa-regular"} fa-star"></i>
            </button>

        </div>

        <h3>${tool.title}</h3>

        <p>${tool.description}</p>

        <div class="tool-card-bottom">

            <span class="tool-category">
                ${tool.category}
            </span>

            <a
                class="tool-open"
                href="${tool.url}"
                data-tool-id="${tool.id}"
            >
                Ouvrir
                <i class="fa-solid fa-arrow-right"></i>
            </a>

        </div>

    `;


    /* FAVORI */

    const favoriteButton =
        card.querySelector(".favorite-button");

    favoriteButton.addEventListener("click", event => {

        event.preventDefault();

        event.stopPropagation();

        toggleFavorite(tool.id);

    });


    /* OUTIL */

    const openButton =
        card.querySelector(".tool-open");

    openButton.addEventListener("click", () => {

        addToRecent(tool.id);

    });


    return card;
}


/* =========================================================
   10. FAVORIS
   ========================================================= */

function toggleFavorite(toolId) {

    if (favorites.includes(toolId)) {

        favorites =
            favorites.filter(id => id !== toolId);

    } else {

        favorites.push(toolId);

    }

    localStorage.setItem(
        "profbox_favorites",
        JSON.stringify(favorites)
    );

    renderTools();

    renderRecentTools();

}


/* =========================================================
   11. OUTILS RÉCENTS
   ========================================================= */

function addToRecent(toolId) {

    recentTools =
        recentTools.filter(id => id !== toolId);

    recentTools.unshift(toolId);

    recentTools =
        recentTools.slice(0, 6);

    localStorage.setItem(
        "profbox_recent",
        JSON.stringify(recentTools)
    );

}


/* =========================================================
   12. RENDU DES OUTILS RÉCENTS
   ========================================================= */

function renderRecentTools() {

    if (!recentGrid || !recentSection) {
        return;
    }

    const validRecent =
        recentTools
            .map(id => tools.find(tool => tool.id === id))
            .filter(Boolean);

    if (validRecent.length === 0) {

        recentSection.classList.add("hidden");

        return;
    }

    recentSection.classList.remove("hidden");

    recentGrid.innerHTML = "";

    validRecent.forEach(tool => {

        const card =
            document.createElement("a");

        card.href = tool.url;

        card.className = "recent-card";

        card.innerHTML = `

            <div class="recent-card-icon">
                <i class="fa-solid ${tool.icon}"></i>
            </div>

            <div class="recent-card-info">

                <div class="recent-card-title">
                    ${tool.title}
                </div>

                <div class="recent-card-time">
                    Utilisé récemment
                </div>

            </div>

        `;

        card.addEventListener("click", () => {

            addToRecent(tool.id);

        });

        recentGrid.appendChild(card);

    });

}


/* =========================================================
   13. RECHERCHE
   ========================================================= */

function setupSearch() {

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener("input", () => {

        currentSearch =
            searchInput.value;

        renderTools();

    });


    clearSearch?.addEventListener("click", () => {

        searchInput.value = "";

        currentSearch = "";

        renderTools();

        searchInput.focus();

    });

}


/* =========================================================
   14. CHIPS DE RECHERCHE
   ========================================================= */

function setupSearchChips() {

    const chips =
        document.querySelectorAll(".search-chip");

    chips.forEach(chip => {

        chip.addEventListener("click", () => {

            const text =
                chip.textContent.trim();

            if (!searchInput) {
                return;
            }

            searchInput.value = text;

            currentSearch = text;

            renderTools();

            searchInput.focus();

        });

    });

}


/* =========================================================
   15. MODE SOMBRE / CLAIR
   ========================================================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem("profbox_theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

    } else {

        document.body.classList.remove("light-mode");

    }

    updateThemeIcon();

}


/* =========================================================
   16. THEME TOGGLE
   ========================================================= */

function setupTheme() {

    if (!themeToggle) {
        return;
    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle(
            "light-mode"
        );

        const isLight =
            document.body.classList.contains(
                "light-mode"
            );

        localStorage.setItem(
            "profbox_theme",
            isLight ? "light" : "dark"
        );

        updateThemeIcon();

    });

}


function updateThemeIcon() {

    if (!themeToggle) {
        return;
    }

    const icon =
        themeToggle.querySelector("i");

    if (!icon) {
        return;
    }

    const isLight =
        document.body.classList.contains(
            "light-mode"
        );

    icon.className =
        isLight
            ? "fa-solid fa-moon"
            : "fa-solid fa-sun";

}


/* =========================================================
   17. MENU MOBILE
   ========================================================= */

function setupMobileMenu() {

    if (!mobileMenuButton || !mobileMenu) {
        return;
    }

    mobileMenuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

        const icon =
            mobileMenuButton.querySelector("i");

        if (!icon) {
            return;
        }

        const isOpen =
            mobileMenu.classList.contains("open");

        icon.className =
            isOpen
                ? "fa-solid fa-xmark"
                : "fa-solid fa-bars";

    });


    const links =
        mobileMenu.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            const icon =
                mobileMenuButton.querySelector("i");

            if (icon) {
                icon.className =
                    "fa-solid fa-bars";
            }

        });

    });

}


/* =========================================================
   18. RACCOURCIS CLAVIER
   ========================================================= */

function setupKeyboardShortcuts() {

    document.addEventListener("keydown", event => {

        /* CTRL + K */

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            searchInput?.focus();

            searchInput?.select();

        }


        /* ESC */

        if (event.key === "Escape") {

            if (
                mobileMenu &&
                mobileMenu.classList.contains("open")
            ) {

                mobileMenu.classList.remove("open");

                const icon =
                    mobileMenuButton?.querySelector("i");

                if (icon) {
                    icon.className =
                        "fa-solid fa-bars";
                }

            }

        }

    });

}


/* =========================================================
   19. CATÉGORIES DE LA PAGE D'ACCUEIL
   ========================================================= */

function setupCategoryShowcase() {

    const categoryCards =
        document.querySelectorAll(
            "[data-category-link]"
        );

    categoryCards.forEach(card => {

        card.addEventListener("click", event => {

            const category =
                card.dataset.categoryLink;

            if (!category) {
                return;
            }

            event.preventDefault();

            currentCategory = category;

            currentSearch = "";

            if (searchInput) {
                searchInput.value = "";
            }

            renderCategories();

            renderTools();

            document.getElementById("tools")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

        });

    });

}


/* =========================================================
   20. RECHERCHE PAR URL
   ========================================================= */

function loadSearchFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const search =
        params.get("search");

    if (!search || !searchInput) {
        return;
    }

    searchInput.value = search;

    currentSearch = search;

    renderTools();

}


/* =========================================================
   21. COMPTEUR GLOBAL
   ========================================================= */

function updateGlobalToolCount() {

    const elements =
        document.querySelectorAll(
            "[data-tool-count]"
        );

    elements.forEach(element => {

        element.textContent =
            tools.length;

    });

}


/* =========================================================
   22. EXPOSITION DES DONNÉES
   ========================================================= */

window.ProfBox = {

    tools,

    categories,

    getFavorites: () => [...favorites],

    getRecent: () => [...recentTools],

    addToRecent,

    toggleFavorite,

    search: function (query) {

        currentSearch = query || "";

        if (searchInput) {
            searchInput.value = currentSearch;
        }

        renderTools();

    },

    setCategory: function (category) {

        currentCategory =
            category || "all";

        renderCategories();

        renderTools();

    }

};


/* =========================================================
   23. FINALISATION
   ========================================================= */

loadSearchFromURL();

updateGlobalToolCount();
