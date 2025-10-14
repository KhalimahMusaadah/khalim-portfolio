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

    let currentIndex = 0;
    let boxesPerView = 3;

    function updateBoxesPerView() {
        if (window.innerWidth <= 768) {
            boxesPerView = 1;
        } else if (window.innerWidth <= 1200) {
            boxesPerView = 2;
        } else {
            boxesPerView = 3;
        }
    }

    function createDots() {
        dotsContainer.innerHTML = "";
        const totalSteps = boxes.length - boxesPerView + 1;
        for (let i = 0; i < totalSteps; i++) {
            const dot = document.createElement("div");
            dot.classList.add("carousel-dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => goToIndex(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateCarousel() {
        const boxWidth = boxes[0].offsetWidth + 24;
        wrapper.style.transform = `translateX(-${currentIndex * boxWidth}px)`;

        const dots = document.querySelectorAll(".carousel-dot");
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= boxes.length - boxesPerView;
    }

    function goToIndex(index) {
        currentIndex = Math.max(0, Math.min(index, boxes.length - boxesPerView));
        updateCarousel();
    }

    prevBtn.addEventListener("click", () => goToIndex(currentIndex - 1));
    nextBtn.addEventListener("click", () => goToIndex(currentIndex + 1));

    boxes.forEach(box => {
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

    window.addEventListener("resize", () => {
        updateBoxesPerView();
        createDots();
        updateCarousel();
    });

    updateBoxesPerView();
    createDots();
    updateCarousel();
});

function openCertificate(url) {
    console.log("Opening certificate:", url);
    window.open(url, "_blank");
}

//membuat pesan "berhasil dikirim"
const form = document.getElementById("contact-form");
const messageBox = document.getElementById("form-message")

form.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                Accept: "application/json",
            },
        });
        
        if (response.ok) {
            messageBox.textContent = "✅ Pesan berhasil dikirim!";
            messageBox.className = "success-message";
            messageBox.style.display = "block";
            form.reset();
        } else {
            throw new Error("Terjadi kesalahan saat mengirim pesan.");
        }
    } catch (error) {
        messageBox.textContent = "❌ Gagal mengirim pesan. Silakan coba lagi.";
        messageBox.className = "error-message";
        messageBox.style.display = "block";
    }
    
    setTimeout(() => {
        messageBox.style.display = "none";
    }, 5000);
});