function setLang(lang) {
    if (!["ru", "en"].includes(lang)) {
        console.warn(`Неподдерживаемый язык: ${lang}`);
        return;
    }

    try {
        localStorage.setItem("lang", lang);
    } catch (error) {
        console.warn("Не удалось сохранить предпочтительный язык:", error);
    }

    document.querySelectorAll("[data-ru]").forEach((el) => {
        el.textContent = el.dataset[lang];
    });

    document.querySelectorAll(".lang-switch button").forEach((btn) => {
        btn.classList.toggle("active", btn.textContent === lang.toUpperCase());
    });
}

window.setLang = setLang;

let savedLang = "ru";

try {
    savedLang = localStorage.getItem("lang") || "ru";
} catch (error) {
    console.warn("Не удалось сохранить предпочтительный язык:", error);
}

setLang(savedLang);
