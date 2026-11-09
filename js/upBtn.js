const upButton = document.querySelector(".btn-up-arrow");

if (upButton) {
    const toggleUpButton = () => {
        upButton.classList.toggle("show", window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleUpButton);

    upButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    toggleUpButton();
}