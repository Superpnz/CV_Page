const images = [
    "Assets/Udemy React Kalatilshchykau .webp",
    "Assets/сертификат_openAI.webp",
    "Assets/Сертификат itilogia.webp",
    "Assets/Сертификат_основы_алгоритмов_и_структур_данных.webp",
    "Assets/Сертификат_основы_цифровой_граматности.webp",
];

const slider = document.querySelector("[data-slider]");
const prevBtn = document.querySelector("[data-btn-prev]");
const nextBtn = document.querySelector("[data-btn-next]");
const pagination = document.querySelector("[data-pagination]");

if (slider && prevBtn && nextBtn && pagination) {
    let currentIndex = 0;

    const updatePagination = () => {
        const dots = pagination.querySelectorAll(".pagination-dot");

        dots.forEach((dot, index) => {
            const isActive = index === currentIndex;

            dot.classList.toggle("active", isActive);
            dot.setAttribute("aria-current", isActive ? "true" : "false");
        });
    };

    let isAnimating = false;
    const ANIMATION_TIME = 0.5;

    const setupSlides = () => {
        images.forEach((imageUrl, index) => {
            const img = document.createElement("img");
            img.classList.add("image");
            img.src = imageUrl;
            img.dataset.index = index;
            img.alt = `slide ${index + 1}`;
            slider.appendChild(img);

            const dot = document.createElement("button");
            dot.classList.add("pagination-dot");
            dot.dataset.index = index;
            dot.setAttribute(
                "aria-label",
                `Перейти к сертификату ${index + 1}`,
            );

            pagination.appendChild(dot);
        });

        const firstClone = slider.firstElementChild.cloneNode(true);
        const lastClone = slider.lastElementChild.cloneNode(true);

        slider.appendChild(firstClone);
        slider.insertBefore(lastClone, slider.firstChild);
    };

    const initSlider = () => {
        const slideWidth = slider.firstElementChild.offsetWidth;
        slider.style.transition = "none";
        slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
    };

    const goToPrevSlide = () => {
        if (isAnimating) return;
        isAnimating = true;

        const slideWidth = slider.firstElementChild.offsetWidth;
        currentIndex--;
        updatePagination();

        slider.style.transition = `translate ${ANIMATION_TIME}s ease-in-out`;
        slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;

        slider.addEventListener(
            "transitionend",
            () => {
                if (currentIndex < 0) {
                    currentIndex = images.length - 1;
                    updatePagination();
                    slider.style.transition = "none";
                    slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
                }

                isAnimating = false;
            },
            { once: true },
        );
    };

    const goToNextSlide = () => {
        if (isAnimating) return;
        isAnimating = true;

        const slideWidth = slider.firstElementChild.offsetWidth;

        currentIndex++;

        slider.style.transition = `translate ${ANIMATION_TIME}s ease-in-out`;
        slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;

        if (currentIndex >= images.length) {
            nextBtn.disabled = true;
        } else {
            updatePagination();
        }

        slider.addEventListener(
            "transitionend",
            () => {
                if (currentIndex >= images.length) {
                    currentIndex = 0;
                    slider.style.transition = "none";
                    slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
                    nextBtn.disabled = false;
                    updatePagination();
                }

                isAnimating = false;
            },
            { once: true },
        );
    };

    prevBtn.addEventListener("click", goToPrevSlide);

    pagination.addEventListener("click", (event) => {
        const dot = event.target.closest(".pagination-dot");

        if (!dot || isAnimating) return;

        const index = Number(dot.dataset.index);

        if (index === currentIndex) return;

        currentIndex = index;

        const slideWidth = slider.firstElementChild.offsetWidth;

        slider.style.transition = `translate ${ANIMATION_TIME}s ease-in-out`;
        slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;

        isAnimating = true;

        slider.addEventListener(
            "transitionend",
            () => {
                isAnimating = false;
            },
            { once: true },
        );

        updatePagination();
    });

    nextBtn.addEventListener("click", goToNextSlide);

    setupSlides();
    updatePagination();
    initSlider();

    window.addEventListener("resize", initSlider);
}
