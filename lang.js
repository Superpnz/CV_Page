function setLang(lang) {
    localStorage.setItem("lang", lang);

    document.querySelectorAll("[data-ru]").forEach((el) => {
        el.textContent = el.dataset[lang];
    });

    document.querySelectorAll(".lang-switch button").forEach((btn) => {
        btn.classList.toggle("active", btn.textContent === lang.toUpperCase());
    });
}

setLang(localStorage.getItem("lang") || "ru");
