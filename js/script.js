document.addEventListener('DOMContentLoaded', function () {
    const contentBoxes = document.querySelectorAll('.education-content .content');

    contentBoxes.forEach(box => {
        box.addEventListener('click', () => {
            contentBoxes.forEach(b => {
                if (b !== box) b.classList.remove('active');
            });

            box.classList.toggle('active');
        });
    });
});

const seeMoreBtn = document.getElementById('see-more-btn');
const extraProjects = document.querySelector('.extra-projects');
let isVisible = false;

if (seeMoreBtn && extraProjects) {
    seeMoreBtn.addEventListener('click', () => {
        isVisible = !isVisible;
        extraProjects.classList.toggle('hidden', !isVisible);
        seeMoreBtn.textContent = isVisible ? 'See Less' : 'See More';
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".certificates-wrapper");
    const boxes = document.querySelectorAll(".certificate-box");
    const prevBtn = document.querySelector(".carousel-btn-prev");
    const nextBtn = document.querySelector(".carousel-btn-next");
    const dotsContainer = document.querySelector(".carousel-dots");

    if (!wrapper || !boxes.length || !prevBtn || !nextBtn || !dotsContainer) {
        console.error("Elemen carousel tidak ditemukan!");
        return;
    }

    let currentPage = 0;
    const boxesPerPage = 3;
    const totalPages = Math.ceil(boxes.length / boxesPerPage);

    function openCertificate(url) {
        console.log("Opening certificate:", url);
        window.open(url, "_blank");
    }

    boxes.forEach(box => {
        box.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const onclickAttr = box.getAttribute('onclick');
            if (onclickAttr) {
                const urlMatch = onclickAttr.match(/openCertificate\('([^']+)'\)/);
                if (urlMatch && urlMatch[1]) {
                    openCertificate(urlMatch[1]);
                }
            }
        });

        const overlay = box.querySelector('.certificate-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                e.stopPropagation();
                const onclickAttr = box.getAttribute('onclick');
                if (onclickAttr) {
                    const urlMatch = onclickAttr.match(/openCertificate\('([^']+)'\)/);
                    if (urlMatch && urlMatch[1]) {
                        openCertificate(urlMatch[1]);
                    }
                }
            });
        }
    });

    function createDots() {
        dotsContainer.innerHTML = "";
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement("div");
            dot.classList.add("carousel-dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => goToPage(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateCarousel() {
        const boxWidth = boxes[0].offsetWidth + 24; 
        wrapper.style.transform = `translateX(-${currentPage * boxWidth * boxesPerPage}px)`;

        document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === currentPage);
        });

        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
    }

    function goToPage(page) {
        currentPage = Math.max(0, Math.min(page, totalPages - 1));
        updateCarousel();
    }

    prevBtn.addEventListener("click", () => goToPage(currentPage - 1));
    nextBtn.addEventListener("click", () => goToPage(currentPage + 1));

    window.addEventListener("resize", updateCarousel);

    createDots();
    updateCarousel();
});

function openCertificate(url) {
    console.log("Opening certificate:", url);
    window.open(url, "_blank");
}