const menuToggle = document.querySelector(".menu-toggle");
const headerNav = document.querySelector(".header-nav");

const updateIcons = () => {
    if (window.lucide) {
        window.lucide.createIcons();
    } else {
        console.warn("Библиотека Lucide недоступна.");
    }
};

updateIcons();

if (menuToggle && headerNav) {
    const closeMenu = () => {
        headerNav.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Открыть меню");
        menuToggle.innerHTML = '<i data-lucide="menu"></i>';

        updateIcons();
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = headerNav.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Закрыть меню" : "Открыть меню"
        );

        menuToggle.innerHTML = isOpen
            ? '<i data-lucide="x"></i>'
            : '<i data-lucide="menu"></i>';

        updateIcons();
    });

    headerNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
}